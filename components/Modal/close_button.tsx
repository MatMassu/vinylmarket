"use client";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export function CloseButton() {
  const router = useRouter();
  return (
    <button className="relative text-3xl cursor-pointer" onClick={() => router.back()}>
      <X />
    </button>
  );
}
