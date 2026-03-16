"use client";

import { useCallback, useState } from "react";
import { upload } from "@vercel/blob/client";
import PhotoGrid, { PhotoEntry, detectType } from "./photo_grid";
import SqlPreview from "./sql_preview";
import { Grading, ImageType, ImageVariant } from "@/types/types";

// ─── Types ────────────────────────────────────────────────────────────────────

type UploadedBlob = {
  type: ImageType;
  variant: ImageVariant;
  url: string;
};

type Stage = "form" | "uploading" | "preview" | "inserting" | "done";

const GRADINGS: Grading[] = ["NM", "VG+", "VG", "G+", "G", "F", "P"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function resizeToBlob(file: File, width: number, height: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("canvas.toBlob returned null"))),
        "image/webp",
        0.88,
      );
    };
    img.onerror = () => reject(new Error(`No se pudo cargar ${file.name}`));
    img.src = URL.createObjectURL(file);
  });
}

function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => resolve({ width: 0, height: 0 });
    img.src = url;
  });
}

function buildSqlPreview(
  slug: string,
  title: string,
  artist: string,
  price: string,
  stock: string,
  discCount: string,
  coverCondition: Grading,
  discCondition: Grading,
  blobs: UploadedBlob[],
): string {
  const esc = (s: string) => s.replace(/'/g, "''");
  const imageRows = blobs
    .map((b) => `  ('${b.type}', '${b.variant}', '${b.url}', <product_id>)`)
    .join(",\n");

  return (
    `INSERT INTO products (slug, title, artist, price, stock, disc_count, cover_condition, disc_condition)\n` +
    `VALUES ('${esc(slug)}', '${esc(title)}', '${esc(artist)}', ${price}, ${stock}, ${discCount}, '${coverCondition}', '${discCondition}');\n\n` +
    `-- Imágenes (${blobs.length} filas)\n` +
    `INSERT INTO product_images (type, variant, url, product_id) VALUES\n` +
    `${imageRows};`
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function UploadClient() {
  // Metadata
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("1");
  const [discCount, setDiscCount] = useState("1");
  const [coverCondition, setCoverCondition] = useState<Grading>("VG");
  const [discCondition, setDiscCondition] = useState<Grading>("VG");
  const [slug, setSlug] = useState("");
  const [slugError, setSlugError] = useState("");

  // Photos
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);

  // Flow
  const [stage, setStage] = useState<Stage>("form");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [uploadedBlobs, setUploadedBlobs] = useState<UploadedBlob[]>([]);
  const [sqlPreview, setSqlPreview] = useState("");
  const [insertError, setInsertError] = useState("");
  const [resultSlug, setResultSlug] = useState("");
  const [formError, setFormError] = useState("");

  // ── Slug handling ────────────────────────────────────────────────────────────

  function handleTitleChange(value: string) {
    setTitle(value);
    setSlug(generateSlug(value));
    setSlugError("");
  }

  async function checkSlugUniqueness(value: string) {
    if (!value) return;
    const res = await fetch(`/api/admin/products?slug=${encodeURIComponent(value)}`);
    const data = await res.json();
    if (data.exists) {
      setSlugError(`"${value}" ya existe — probá "${value}-2"`);
    }
  }

  // ── File handling ────────────────────────────────────────────────────────────

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const entries: PhotoEntry[] = [];
    for (const file of Array.from(files)) {
      const objectUrl = URL.createObjectURL(file);
      const type = detectType(file.name);
      const { width, height } = await getImageDimensions(objectUrl);
      entries.push({ id: crypto.randomUUID(), file, objectUrl, type, width, height });
    }
    setPhotos((prev) => [...prev, ...entries]);
  }, []);

  function handleTypeChange(id: string, type: ImageType | "") {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, type } : p)));
  }

  function handleRemove(id: string) {
    setPhotos((prev) => {
      const entry = prev.find((p) => p.id === id);
      if (entry) URL.revokeObjectURL(entry.objectUrl);
      return prev.filter((p) => p.id !== id);
    });
  }

  // ── Validation ───────────────────────────────────────────────────────────────

  function validate(): string | null {
    if (!title.trim()) return "Falta el título.";
    if (!artist.trim()) return "Falta el artista.";
    if (!price || isNaN(Number(price)) || Number(price) <= 0) return "Precio inválido.";
    if (!stock || isNaN(Number(stock)) || Number(stock) < 0) return "Stock inválido.";
    if (!discCount || isNaN(Number(discCount)) || Number(discCount) <= 0)
      return "Cantidad de discos inválida.";
    if (!slug) return "El slug está vacío.";
    if (slugError) return slugError;
    if (photos.length === 0) return "Agregá al menos una foto.";
    const untyped = photos.filter((p) => p.type === "");
    if (untyped.length > 0) return `${untyped.length} foto(s) sin tipo asignado.`;
    const hasFrente = photos.some((p) => p.type === "frente");
    if (!hasFrente) return "Falta la foto de portada (frente).";
    return null;
  }

  // ── Process & Upload ─────────────────────────────────────────────────────────

  async function handleProcessAndUpload() {
    const err = validate();
    if (err) { setFormError(err); return; }
    setFormError("");
    setStage("uploading");

    // Build list of all variants to produce and upload
    type Variant = { path: string; blob?: Blob; type: ImageType; variant: ImageVariant };
    const variants: Variant[] = [];

    for (const photo of photos) {
      const t = photo.type as ImageType;
      if (t === "frente") {
        variants.push({ path: `cart/${slug}-frente.webp`, type: t, variant: "cart" });
        variants.push({ path: `grid/${slug}-frente.webp`, type: t, variant: "grid" });
        variants.push({ path: `modal/${slug}-frente.webp`, type: t, variant: "modal" });
      } else {
        variants.push({ path: `modal/${slug}-${t}.webp`, type: t, variant: "modal" });
      }
    }

    setProgress({ done: 0, total: variants.length });

    // Resize and upload one variant at a time
    const blobResults: UploadedBlob[] = [];
    const sizeMap: Record<ImageVariant, [number, number]> = {
      cart: [96, 96],
      grid: [768, 768],
      modal: [1536, 1536],
    };

    for (let i = 0; i < variants.length; i++) {
      const v = variants[i];
      // Find the source photo for this variant
      const photo = photos.find((p) => {
        if (v.type === "frente") return p.type === "frente";
        return p.type === v.type;
      })!;

      try {
        const [w, h] = sizeMap[v.variant];
        const resized = await resizeToBlob(photo.file, w, h);
        const result = await upload(v.path, resized, {
          access: "public",
          handleUploadUrl: "/api/admin/blob-token",
        });
        blobResults.push({ type: v.type, variant: v.variant, url: result.url });
        setProgress({ done: i + 1, total: variants.length });
      } catch (err) {
        setFormError(`Error al subir ${v.path}: ${(err as Error).message}`);
        setStage("form");
        return;
      }
    }

    setUploadedBlobs(blobResults);
    setSqlPreview(
      buildSqlPreview(slug, title, artist, price, stock, discCount, coverCondition, discCondition, blobResults),
    );
    setStage("preview");
  }

  // ── DB Insert ─────────────────────────────────────────────────────────────────

  async function handleInsert() {
    setInsertError("");
    setStage("inserting");

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        title,
        artist,
        price: parseInt(price),
        stock: parseInt(stock),
        disc_count: parseInt(discCount),
        cover_condition: coverCondition,
        disc_condition: discCondition,
        images: uploadedBlobs.map(({ type, variant, url }) => ({ type, variant, url })),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setInsertError(data.error || "Error desconocido al insertar.");
      setStage("preview");
      return;
    }

    const data = await res.json();
    setResultSlug(data.slug);
    setStage("done");
  }

  function handleReset() {
    setTitle(""); setArtist(""); setPrice(""); setStock("1"); setDiscCount("1");
    setCoverCondition("VG"); setDiscCondition("VG"); setSlug(""); setSlugError("");
    photos.forEach((p) => URL.revokeObjectURL(p.objectUrl));
    setPhotos([]); setUploadedBlobs([]); setSqlPreview(""); setInsertError("");
    setFormError(""); setResultSlug(""); setStage("form");
  }

  // ── Render ────────────────────────────────────────────────────────────────────

  if (stage === "uploading") {
    return (
      <main className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-2">Procesando y subiendo...</p>
          <p className="text-gray-500 text-sm">
            {progress.done} / {progress.total} variantes
          </p>
          <div className="mt-4 w-64 bg-gray-200 h-2">
            <div
              className="bg-black h-2 transition-all"
              style={{ width: `${(progress.done / progress.total) * 100}%` }}
            />
          </div>
        </div>
      </main>
    );
  }

  if (stage === "preview" || stage === "inserting") {
    return (
      <SqlPreview
        sql={sqlPreview}
        onConfirm={handleInsert}
        onCancel={() => setStage("form")}
        loading={stage === "inserting"}
        error={insertError}
      />
    );
  }

  if (stage === "done") {
    return (
      <main className="flex h-screen items-center justify-center">
        <div className="text-center flex flex-col gap-4">
          <p className="text-lg font-medium">¡Listo!</p>
          <p className="text-gray-500 text-sm">
            Producto <code className="bg-gray-100 px-1">{resultSlug}</code> agregado.
          </p>
          <button onClick={handleReset} className="bg-black text-white px-5 py-2 text-sm">
            Agregar otro
          </button>
        </div>
      </main>
    );
  }

  // Stage: "form"
  return (
    <main className="max-w-4xl mx-auto p-6 flex flex-col gap-8">
      <h1 className="text-xl font-medium">Agregar vinilo</h1>

      {/* ── Metadata ── */}
      <section className="flex flex-col gap-4">
        <h2 className="font-medium text-sm uppercase tracking-wide text-gray-500">Datos</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 flex flex-col gap-1">
            <label className="text-xs text-gray-500">Título</label>
            <input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="border px-3 py-2 text-sm w-full"
              placeholder="Cheiro de Amor"
            />
          </div>

          <div className="col-span-2 flex flex-col gap-1">
            <label className="text-xs text-gray-500">Artista</label>
            <input
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="border px-3 py-2 text-sm w-full"
              placeholder="Suingue"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Slug</label>
            <input
              value={slug}
              onChange={(e) => { setSlug(e.target.value); setSlugError(""); }}
              onBlur={(e) => checkSlugUniqueness(e.target.value)}
              className={`border px-3 py-2 text-sm ${slugError ? "border-red-400" : ""}`}
            />
            {slugError && <p className="text-xs text-red-500">{slugError}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Precio (ARS)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border px-3 py-2 text-sm"
              placeholder="14000"
              min={1}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border px-3 py-2 text-sm"
              min={0}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Cantidad de discos</label>
            <input
              type="number"
              value={discCount}
              onChange={(e) => setDiscCount(e.target.value)}
              className="border px-3 py-2 text-sm"
              min={1}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Condición portada</label>
            <select
              value={coverCondition}
              onChange={(e) => setCoverCondition(e.target.value as Grading)}
              className="border px-3 py-2 text-sm"
            >
              {GRADINGS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Condición disco</label>
            <select
              value={discCondition}
              onChange={(e) => setDiscCondition(e.target.value as Grading)}
              className="border px-3 py-2 text-sm"
            >
              {GRADINGS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* ── Photos ── */}
      <section className="flex flex-col gap-4">
        <h2 className="font-medium text-sm uppercase tracking-wide text-gray-500">
          Fotos {photos.length > 0 && `(${photos.length})`}
        </h2>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="text-sm"
        />
        <PhotoGrid
          photos={photos}
          slug={slug || "slug"}
          onTypeChange={handleTypeChange}
          onRemove={handleRemove}
        />
      </section>

      {/* ── Submit ── */}
      {formError && <p className="text-red-500 text-sm">{formError}</p>}
      <button
        onClick={handleProcessAndUpload}
        className="bg-black text-white px-6 py-3 text-sm self-start"
      >
        Procesar y subir
      </button>
    </main>
  );
}
