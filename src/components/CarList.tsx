"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface Car {
  unique_id: number;
  mark_id: string;
  folder_id: string;
  price: number;
  images: { image: string[] };
  modification_id: string;
  complectation_name: string;
  body_type: string;
  drive: string;
  gearbox: string;
  engine_type: string;
  engine_volume: number;
  engine_power: string;
  year: number;
  color: string;
  run: number;
  owners_number: string;
  vin: string;
  state: string;
  extras: string;
}

interface ApiResponse {
  data: Car[];
  meta: {
    page: number;
    pageCount: number;
    total: number;
  };
}

const CarList = () => {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const page = searchParams.get("page") || "1";
  const sort = searchParams.get("sort") || "";
  const order = searchParams.get("order") || "";

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({ _limit: "12", _page: page });
    if (sort) params.set("_sort", "price");
    if (order) params.set("_order", order);
    fetch(`/api/cars?${params.toString()}`)
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        setCars(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Ошибка загрузки данных");
        setLoading(false);
      });
  }, [page, sort, order]);

  if (loading) {
    return <div className="col-span-full text-center text-gray-400">Загрузка автомобилей...</div>;
  }
  if (error) {
    return <div className="col-span-full text-center text-red-500">{error}</div>;
  }
  if (!cars.length) {
    return <div className="col-span-full text-center text-gray-400">Нет автомобилей</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cars.map((car, idx) => (
        <div
          key={car.unique_id ? car.unique_id : `${car.mark_id}-${car.folder_id}-${idx}`}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 p-4 flex flex-col gap-3 border border-gray-100 hover:border-blue-400 min-h-[420px]"
        >
          <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center mb-2">
            <Image
              src={car.images?.image?.[0] || "/no-image.png"}
              alt={car.mark_id + " " + car.folder_id}
              width={320}
              height={240}
              className="object-cover w-full h-full"
              style={{ width: "100%", height: "auto" }}
              priority={false}
            />
          </div>
          <div className="font-bold text-black text-lg truncate" title={car.mark_id + " " + car.folder_id}>
            {car.mark_id} {car.folder_id}
          </div>
          <div className="text-blue-600 font-bold text-xl flex items-center gap-2">
            {car.price.toLocaleString()} ₽
            {/* <span className="text-gray-400 font-normal text-base">от 27 129 ₽/мес</span> */}
          </div>
          <div className="text-sm text-[#2d3a4a] flex flex-wrap gap-x-3 gap-y-1 mt-1 items-center">
            <span className="flex items-center gap-1">
              {/* car icon */}
              <svg className="w-4 h-4 text-[#6b7a90]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13l2-5a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l2 5M5 13h14m-9 4h4m-7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm12 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
              {car.modification_id}
            </span>
            <span>{car.complectation_name}</span>
            <span>{car.body_type}</span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-[#2d3a4a] mt-1 items-center">
            <span className="flex items-center gap-1">
              {/* speedometer icon */}
              <svg className="w-4 h-4 text-[#6b7a90]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0 0a7 7 0 1 1 7-7m-7 7a7 7 0 0 1-7-7m7 7a7 7 0 0 0 7-7"/></svg>
              {car.run.toLocaleString()} км
            </span>
            <span className="flex items-center gap-1">
              {/* gearbox icon */}
              <svg className="w-4 h-4 text-[#6b7a90]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15A7.97 7.97 0 0 0 21 12c0-4.42-3.58-8-8-8S5 7.58 5 12c0 1.09.22 2.13.6 3.07"/></svg>
              {car.gearbox}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-[#2d3a4a] items-center">
            <span className="flex items-center gap-1">
              {/* fuel icon */}
              <svg className="w-4 h-4 text-[#6b7a90]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 17v1a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v10z"/><path strokeLinecap="round" strokeLinejoin="round" d="M17 7V5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-2"/></svg>
              {car.engine_type}
            </span>
            <span className="flex items-center gap-1">
              {/* color icon */}
              <svg className="w-4 h-4 text-[#6b7a90]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/></svg>
              {car.color}
            </span>
            <span className="flex items-center gap-1">
              {/* calendar icon */}
              <svg className="w-4 h-4 text-[#6b7a90]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M3 10h18"/></svg>
              {car.year}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <button className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-xl hover:bg-blue-100 transition" title="В избранное">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487c-1.281-1.273-3.36-1.273-4.64 0l-.222.221-.221-.22c-1.282-1.274-3.36-1.274-4.64 0-1.272 1.27-1.272 3.331 0 4.602l.221.221 4.64 4.601 4.64-4.6.221-.222c1.272-1.27 1.272-3.332 0-4.602z" />
              </svg>
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-xl hover:bg-blue-100 transition" title="Сравнить">
              {/* Весы (наклонённые, как на картинке пользователя) */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" className="w-7 h-7 text-black">
                <circle cx="32" cy="16" r="3"/>
                <rect x="29" y="19" width="6" height="30" rx="2"/>
                <rect x="26" y="49" width="12" height="5" rx="2"/>
                <line x1="32" y1="16" x2="54" y2="24" />
                <line x1="32" y1="16" x2="10" y2="32" />
                <path d="M54 24 L48 44 A6 6 0 0 0 60 44 Z"/>
                <path d="M10 32 L16 52 A6 6 0 0 0 4 52 Z"/>
              </svg>
            </button>
            <button className="flex-1 bg-blue-600 text-white rounded-xl px-4 py-3 font-bold hover:bg-blue-700 transition text-base" style={{minWidth:'120px'}}>
              КУПИТЬ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarList; 