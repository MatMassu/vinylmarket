type getProductImagesProps = {
  id: number;
  slug: string;
  element: string;
};

export function getProductImages({ id, slug, element }: getProductImagesProps) {
  const base = "https://kccbcw6rqngvsspk.public.blob.vercel-storage.com";

  return {
    cart: `${base}/cart/${id}_${slug}_${element}_cart.webp`,
    grid: `${base}/grid/${id}_${slug}_${element}_grid.webp`,
    modal: `${base}/modal/${id}_${slug}_${element}_modal.webp`,
  };
}
