"use client";

import { ImageType } from "@/types/types";

export type PhotoEntry = {
  id: string;
  file: File;
  objectUrl: string;
  type: ImageType | "";
  width: number;
  height: number;
};

const KNOWN_TYPES: ImageType[] = [
  "frente",
  "rev",
  "disco",
  "disco1",
  "disco2",
  "disco3",
  "folleto",
  "folleto_rev",
];

type Props = {
  photos: PhotoEntry[];
  slug: string;
  onTypeChange: (id: string, type: ImageType | "") => void;
  onRemove: (id: string) => void;
};

export default function PhotoGrid({ photos, slug, onTypeChange, onRemove }: Props) {
  if (photos.length === 0) return null;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
      {photos.map((p) => (
        <div key={p.id} className="border p-2 text-xs flex flex-col gap-1">
          <div className="relative">
            <img
              src={p.objectUrl}
              alt=""
              className="w-full aspect-square object-cover bg-gray-100"
            />
            <button
              onClick={() => onRemove(p.id)}
              className="absolute top-0 right-0 bg-black text-white w-5 h-5 flex items-center justify-center leading-none"
              title="Eliminar"
            >
              ×
            </button>
          </div>

          <select
            value={p.type}
            onChange={(e) => onTypeChange(p.id, e.target.value as ImageType | "")}
            className={`border px-1 py-0.5 text-xs w-full ${p.type === "" ? "border-red-400" : ""}`}
          >
            <option value="">-- tipo --</option>
            {KNOWN_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <div className="text-gray-500 truncate">
            {p.type ? (
              `${slug}-${p.type}.webp`
            ) : (
              <span className="text-red-400">sin tipo</span>
            )}
          </div>

          {p.width > 0 && (
            <div className="text-gray-400">
              {p.width}×{p.height}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function detectType(filename: string): ImageType | "" {
  // Sort longest first so 'folleto_rev' matches before 'folleto', 'disco1' before 'disco'
  const sorted = [...KNOWN_TYPES].sort((a, b) => b.length - a.length);
  const base = filename.replace(/\.[^.]+$/, "").toLowerCase();
  for (const t of sorted) {
    if (base.endsWith(`-${t}`) || base.endsWith(`_${t}`)) return t;
  }
  return "";
}
