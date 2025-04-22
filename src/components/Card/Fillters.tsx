
"use client";

interface FiltersProps {
  onSortChange: (sort: "asc" | "desc") => void;
  sort: string;
}

export default function Filters({ onSortChange, sort }: FiltersProps) {
  return (
    <div className="flex  justify-center gap-[10px] ">
      <button
        className={`px-[40px] py-[20] text-[20px]  rounded-lg ${sort === "asc" ? "bg-[#2d7be9] text-[#2b2b2b]" : "bg-[#6e6c6c]"}`}
        onClick={() => onSortChange("asc")}
      >
        ارزان‌ترین
      </button>
      <button
        className={`px-[40px] py-[20] text-[20px] rounded-lg ${sort === "desc" ? "bg-[#2d7be9] text-white" : "bg-[#6e6c6c]"}`}
        onClick={() => onSortChange("desc")}
      >
        گران‌ترین
      </button>
    </div>
  );
}