"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { useFilterStore } from "@/store/useFilterStore"; // استور جدید

interface FiltersProps {
  uniqueCompanies: string[];
}

export default function Filters({ uniqueCompanies }: FiltersProps) {
  const {
    sort,
    timeFilter,
    selectedCompanies,
    setSort,
    setTimeFilter,
    toggleCompany,
  } = useFilterStore(); // استفاده از استور

  return (
    <div className="flex flex-col items-center gap-[24px] p-[16px] max-w-[1024px] mx-auto">
      <div className="flex gap-[16px] flex-wrap justify-center">
        <Button
          className={`px-[24px] py-[12px] text-[18px] rounded-[12px] transition-colors duration-[300ms] ${
            sort === "asc"
              ? "bg-[#3182ce] text-[white]"
              : "bg-[#e2e8f0] text-[#2d3748]"
          }`}
          onClick={() => setSort("asc")}
        >
          ارزان‌ترین
        </Button>
        <Button
          className={`px-[24px] py-[12px] text-[18px] rounded-[12px] transition-colors duration-[300ms] ${
            sort === "desc"
              ? "bg-[#3182ce] text-[white]"
              : "bg-[#e2e8f0] text-[#2d3748]"
          }`}
          onClick={() => setSort("desc")}
        >
          گران‌ترین
        </Button>
      </div>

      <div className="w-[full] max-w-[320px]">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-[full] flex justify-between bg-[white] border border-[#d1d5db] text-[#4a5568] py-[12px] rounded-[12px] cursor-pointer hover:border-[#3182ce]"
            >
              {timeFilter ? `زمان: ${timeFilter}` : "انتخاب زمان"}
              <ChevronDown className="ml-[8px] h-[16px] w-[28px] opacity-[0.5]" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[full] p-[8px] max-h-[240px] overflow-auto bg-[white] shadow-[0px_4px_6px_rgba(0,_0,_0,_0.1)] rounded-[12px] flex flex-col gap-[8px]">
            {[
              { label: "همه", value: "all" },
              { label: "صبح (۶ تا ۱۲)", value: "morning" },
              { label: "ظهر (۱۲ تا ۱۶)", value: "noon" },
              { label: "عصر (۱۶ تا ۲۰)", value: "evening" },
              { label: "شب (۲۰ تا ۲۴)", value: "night" },
            ].map(({ label, value }) => (
              <div
                key={value}
                onClick={() =>
                  setTimeFilter(
                    value as
                      | "all"
                      | "morning"
                      | "noon"
                      | "evening"
                      | "night"
                      | null
                  )
                }
                className={`flex justify-between items-center p-[8px] rounded-[8px] cursor-pointer transition-colors duration-[200ms] hover:bg-[#e2f0ff] ${
                  timeFilter === value ? "bg-[#c6f0ff]" : ""
                }`}
              >
                <span className="text-[#4a5568]">{label}</span>
                {timeFilter === value && (
                  <Check className="w-[16px] h-[16px] text-[#3182ce]" />
                )}
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-[full] max-w-[320px]">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-[full] gap-[10px] flex justify-between bg-[white] border border-[#d1d5db] text-[#4a5568] py-[12px] rounded-[12px] cursor-pointer hover:border-[#3182ce]"
            >
              {selectedCompanies.length > 0
                ? `${selectedCompanies.length} شرکت انتخاب شده`
                : "انتخاب شرکت‌ها"}
              <ChevronDown className="h-[16px] w-[40px] opacity-[0.5]" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[full] p-[8px] max-h-[240px] overflow-auto bg-[white] shadow-[0px_4px_6px_rgba(0,_0,_0,_0.1)] rounded-[12px]">
            {uniqueCompanies.map((company) => (
              <div
                key={company}
                onClick={() => toggleCompany(company)}
                className={`flex justify-between items-center p-[8px] rounded-[8px] cursor-pointer transition-colors duration-[200ms] hover:bg-[#e2f0ff] ${
                  selectedCompanies.includes(company) ? "bg-[#c6f0ff]" : ""
                }`}
              >
                <span className="text-[#4a5568]">{company}</span>
                {selectedCompanies.includes(company) && (
                  <Check className="w-[16px] h-[16px] text-[#3182ce]" />
                )}
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
