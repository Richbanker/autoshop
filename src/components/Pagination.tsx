"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Meta {
  page: number;
  pageCount: number;
  total: number;
}

const Pagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const sort = searchParams.get("sort") || "";
  const order = searchParams.get("order") || "";
  const [meta, setMeta] = useState<Meta | null>(null);

  useEffect(() => {
    const params = new URLSearchParams({ _limit: "12", _page: String(page) });
    if (sort) params.set("_sort", "price");
    if (order) params.set("_order", order);
    fetch(`/api/cars?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setMeta(data.meta))
      .catch(() => setMeta(null));
  }, [page, sort, order]);

  if (!meta) return null;
  if (meta.pageCount <= 1) return null;

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`/?${params.toString()}`);
  };

  // Показываем максимум 12 страниц
  const maxPages = 12;
  const pages: (number | string)[] = (() => {
    const arr: (number | string)[] = [];
    if (meta.pageCount <= maxPages) {
      for (let i = 1; i <= meta.pageCount; i++) arr.push(i);
    } else {
      for (let i = 1; i <= maxPages; i++) arr.push(i);
      arr.push('...');
    }
    return arr;
  })();

  return (
    <div className="flex flex-nowrap overflow-x-auto justify-center gap-2 mt-4 pb-2 scrollbar-thin scrollbar-thumb-gray-300">
      <button
        className="w-9 h-9 flex items-center justify-center rounded-full border text-xl font-bold bg-gray-200 text-gray-400 disabled:opacity-60 disabled:bg-gray-200"
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
        aria-label="Назад"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      {pages.map((p, idx) =>
        typeof p === 'number' ? (
          <button
            key={p}
            className={`w-9 h-9 flex items-center justify-center rounded-full border text-base font-bold transition-all duration-150
              ${p === page ? "bg-blue-600 text-white border-blue-600" : "bg-white text-blue-600 border-blue-400 hover:bg-blue-50"}
            `}
            onClick={() => goToPage(p)}
            disabled={p === page}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        ) : (
          <span key={"dots-" + idx} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 text-base">...</span>
        )
      )}
      <button
        className="w-9 h-9 flex items-center justify-center rounded-full border text-xl font-bold bg-gray-200 text-gray-400 disabled:opacity-60 disabled:bg-gray-200"
        onClick={() => goToPage(page + 1)}
        disabled={page >= meta.pageCount}
        aria-label="Вперёд"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
};

export default Pagination; 