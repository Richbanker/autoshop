import { useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  { value: '', label: 'Сортировка по умолчанию' },
  { value: 'asc', label: 'Цена по возрастанию' },
  { value: 'desc', label: 'Цена по убыванию' },
];

const Sort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const order = searchParams.get("order") || "";
  const isDefault = !order;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (!value) {
      params.delete("sort");
      params.delete("order");
    } else {
      params.set("sort", "price");
      params.set("order", value);
    }
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("sort");
    params.delete("order");
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  const currentLabel = sortOptions.find(opt => opt.value === order)?.label || sortOptions[0].label;

  return (
    <div className="w-full bg-[#f6f9fc] rounded-2xl p-4 flex items-center justify-start shadow-sm border border-[#e6eef7]">
      <div className="relative flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 min-w-[260px]">
        {/* Флаг */}
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 21V5a2 2 0 0 1 2-2h7.5a1.5 1.5 0 0 1 0 3H8m0 0v13" />
        </svg>
        {/* Текст выбранной сортировки */}
        <span className="text-gray-400 select-none pr-6">{currentLabel}</span>
        {/* Выпадающий select поверх текста */}
        <select
          className="absolute left-7 top-0 w-[calc(100%-44px)] h-full opacity-0 cursor-pointer"
          value={order}
          onChange={handleChange}
          aria-label="Сортировка"
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {/* Крестик */}
        {!isDefault && (
          <button onClick={handleReset} className="ml-2 p-1 rounded hover:bg-gray-100 transition absolute right-2 top-1/2 -translate-y-1/2" title="Сбросить сортировку">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sort; 