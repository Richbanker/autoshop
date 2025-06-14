"use client";
import Sort from "@/components/Sort";
import CarList from "@/components/CarList";
import Pagination from "@/components/Pagination";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col gap-6 px-2 py-4 sm:px-4 sm:py-6">
      <div className="max-w-7xl w-full mx-auto flex flex-col gap-6">
        <Sort />
        <CarList />
        <Pagination />
      </div>
    </div>
  );
}
