// components/Sort.tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function Sort() {
  const params = useSearchParams();
  const sort = params.get("sort");

  return <div>Сортировка: {sort}</div>;
}
