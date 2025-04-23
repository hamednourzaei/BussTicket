"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface FiltersProps {
  onSortChange: (sort: "asc" | "desc" | "none") => void;
  onTimeFilterChange: (time: "morning" | "noon" | "evening" | "night" | null) => void;
  sort: "asc" | "desc" | "none";
  timeFilter: string | null;
}

export default function Filters({ onSortChange, onTimeFilterChange, sort, timeFilter }: FiltersProps) {
  type TimeFilterValue = "morning" | "noon" | "evening" | "night" | "all";

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-4">
      <div className="flex gap-4">
        <button
          className={`px-10 py-4 text-lg rounded-lg ${
            sort === "asc" ? "bg-[#2d7be9] text-white" : "bg-[#6e6c6c] text-white"
          } hover:bg-[#2d7be9]`}
          onClick={() => onSortChange("asc")}
        >
          ارزان‌ترین
        </button>
        <button
          className={`px-10 py-4 text-lg rounded-lg ${
            sort === "desc" ? "bg-[#2d7be9] text-white" : "bg-[#6e6c6c] text-white"
          } hover:bg-[#2d7be9]`}
          onClick={() => onSortChange("desc")}
        >
          گران‌ترین
        </button>
      </div>

      <RadioGroup
        value={timeFilter || "all"}
        onValueChange={(value: TimeFilterValue) =>
          onTimeFilterChange(value === "all" ? null : value)
        }
        className="flex flex-wrap justify-center w-[90%] mt-5 gap-4"
      >
        <div className="flex items-center space-x-[10px]">
          <RadioGroupItem value="all" id="all" />
          <Label htmlFor="all" className="text-lg">
            همه
          </Label>
        </div>
        <div className="flex items-center space-x-[10px]">
          <RadioGroupItem value="morning" id="morning" />
          <Label htmlFor="morning" className="text-lg">
            صبح (۶ تا ۱۲)
          </Label>
        </div>
        <div className="flex items-center space-x-[10px]">
          <RadioGroupItem value="noon" id="noon" />
          <Label htmlFor="noon" className="text-lg">
            ظهر (۱۲ تا ۱۶)
          </Label>
        </div>
        <div className="flex items-center space-x-[10px]">
          <RadioGroupItem value="evening" id="evening" />
          <Label htmlFor="evening" className="text-lg">
            عصر (۱۶ تا ۲۰)
          </Label>
        </div>
        <div className="flex items-center space-x-[10px]">
          <RadioGroupItem value="night" id="night" />
          <Label htmlFor="night" className="text-lg">
            شب (۲۰ تا ۲۴)
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}