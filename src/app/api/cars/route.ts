import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://testing-api.ru-rating.ru/cars";

// Данные портфолио: выводятся только при недоступности внешнего API.
const demoCars = [
  ["Toyota", "Camry", 2021, 2490000, 48000, "Седан"],
  ["Kia", "Sportage", 2020, 2190000, 62000, "Кроссовер"],
  ["Hyundai", "Tucson", 2022, 2890000, 31000, "Кроссовер"],
  ["Volkswagen", "Polo", 2021, 1350000, 54000, "Седан"],
  ["Skoda", "Octavia", 2020, 1850000, 73000, "Лифтбек"],
  ["Mazda", "CX-5", 2022, 3190000, 27000, "Кроссовер"],
  ["Nissan", "Qashqai", 2019, 1790000, 88000, "Кроссовер"],
  ["Renault", "Duster", 2021, 1640000, 49000, "Внедорожник"],
  ["Ford", "Focus", 2018, 1190000, 96000, "Хэтчбек"],
  ["BMW", "320i", 2020, 3450000, 57000, "Седан"],
  ["Mercedes-Benz", "C 180", 2019, 3290000, 68000, "Седан"],
  ["Audi", "A4", 2021, 3750000, 42000, "Седан"],
  ["Lada", "Vesta", 2022, 1250000, 35000, "Седан"],
  ["Haval", "Jolion", 2023, 2390000, 22000, "Кроссовер"],
  ["Geely", "Coolray", 2022, 2250000, 39000, "Кроссовер"],
] as const;

function demoResponse(params: URLSearchParams) {
  const page = Math.max(1, Number(params.get("_page")) || 1);
  const limit = Math.min(50, Math.max(1, Number(params.get("_limit")) || 12));
  const cars = demoCars.map(([mark_id, folder_id, year, price, run, body_type], index) => ({
    unique_id: index + 1, mark_id, folder_id, year, price, run, body_type,
    images: { image: [] }, modification_id: "Демо", complectation_name: "Пример комплектации",
    drive: "Передний", gearbox: "Автомат", engine_type: "Бензин", color: "Не указан",
  }));
  if (params.get("_sort") === "price") {
    cars.sort((a, b) => params.get("_order") === "desc" ? b.price - a.price : a.price - b.price);
  }
  return NextResponse.json({
    data: cars.slice((page - 1) * limit, page * limit),
    meta: { page, pageCount: Math.ceil(cars.length / limit), total: cars.length },
    source: "demo",
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const params = new URLSearchParams();
  for (const key of ["_limit", "_page", "_sort", "_order"]) {
    const value = searchParams.get(key);
    if (value) params.set(key, value);
  }
  try {
    const res = await fetch(`${API_URL}?${params}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`Upstream HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data?.data) || !data?.meta) throw new Error("Invalid upstream response");
    return NextResponse.json({ ...data, source: "live" });
  } catch (error) {
    console.warn("Car feed unavailable; serving labelled demo catalog", error);
    return demoResponse(params);
  }
}
