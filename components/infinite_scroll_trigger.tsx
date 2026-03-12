"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function InfiniteScrollTrigger() {
  const ref = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const page = Number(searchParams.get("page") ?? 1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let triggered = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !triggered) {
          triggered = true;
          const params = new URLSearchParams(searchParams);
          params.set("page", String(page + 1));
          replace(`${pathname}?${params.toString()}`, { scroll: false });
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [page, searchParams, pathname, replace]);

  return <div ref={ref} />;
}
