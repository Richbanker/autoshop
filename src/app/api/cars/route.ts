import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://testing-api.ru-rating.ru/cars";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const params = new URLSearchParams();

  // Проксируем только нужные параметры
  if (searchParams.has("_limit")) params.set("_limit", searchParams.get("_limit")!);
  if (searchParams.has("_page")) params.set("_page", searchParams.get("_page")!);
  if (searchParams.has("_sort")) params.set("_sort", searchParams.get("_sort")!);
  if (searchParams.has("_order")) params.set("_order", searchParams.get("_order")!);

  const url = `${API_URL}?${params.toString()}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 }, // кэшируем на 1 минуту
  });

  const data = await res.json();
  return NextResponse.json(data);
} 