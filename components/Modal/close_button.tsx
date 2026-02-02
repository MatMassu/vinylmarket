"use client";
import { useRouter } from "next/navigation";

export function CloseButton() {
  const router = useRouter();
  return (
    <button className="relative text-3xl w-10 h-10 bg-white" onClick={() => router.back()}>
      x
    </button>
  );
}
