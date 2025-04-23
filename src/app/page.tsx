"use client";

import Filters from "@/components/Card/Fillters";
import CardList from "@/components/Card/Card";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { getTickets } from "@/lib/getTickets";
import "./globals.css"
const queryClient = new QueryClient();

export default function Home() {
  const [sort, setSort] = useState<"asc" | "desc" | "none">("none");
  const [timeFilter, setTimeFilter] = useState<"morning" | "noon" | "evening" | "night" | "all" | null>(null);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const { data: rawTickets = [], isLoading, error } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });

  const uniqueCompanies = useMemo(() => {
    const companies = rawTickets.map(ticket => ticket.companyTitle);
    return Array.from(new Set(companies));
  }, [rawTickets]);

  const parseTime = (timeStr: string): number | null => {
    try {
      const normalizedTime = timeStr.replace(/[\u06F0-\u06F9]/g, (d) =>
        String.fromCharCode(d.charCodeAt(0) - 0x06f0 + 0x0030)
      );
      const [hour] = normalizedTime.split(":").map(Number);
      if (isNaN(hour) || hour < 0 || hour > 23) return null;
      return hour;
    } catch (error) {
      console.error(`Error parsing time: ${timeStr}`, error);
      return null;
    }
  };

  const filteredTickets = useMemo(() => {
    let result = [...rawTickets];

    if (timeFilter) {
      result = result.filter((ticket) => {
        const hour = parseTime(ticket.origin.time);
        if (hour === null) return false;
        if (timeFilter === "morning" && hour >= 6 && hour < 12) return true;
        if (timeFilter === "noon" && hour >= 12 && hour < 16) return true;
        if (timeFilter === "evening" && hour >= 16 && hour < 20) return true;
        if (timeFilter === "night" && hour >= 20 && hour <= 23) return true;
        if (timeFilter === "all") return true;
        return false;
      });
    }

    if (selectedCompanies.length > 0) {
      result = result.filter(ticket => selectedCompanies.includes(ticket.companyTitle));
    }

    if (sort === "asc") {
      return result.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      return result.sort((a, b) => b.price - a.price);
    }
    return result;
  }, [rawTickets, sort, timeFilter, selectedCompanies]);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <div>
          <Filters
            onSortChange={setSort}
            sort={sort}
            onTimeFilterChange={setTimeFilter}
            timeFilter={timeFilter}
            uniqueCompanies={uniqueCompanies}
            selectedCompanies={selectedCompanies}
            onCompanyFilterChange={setSelectedCompanies}
          />
          {isLoading ? (
            <CardList sort={sort} tickets={[]} isLoading={true} />
          ) : error ? (
            <p className="text-center py-4 text-red-500">خطایی رخ داد: {error.message}</p>
          ) : filteredTickets.length === 0 ? (
            <p className="text-center py-4">هیچ تیکتی برای این فیلتر یافت نشد.</p>
          ) : (
            <CardList sort={sort} tickets={filteredTickets} isLoading={false} />
          )}
        </div>
      </QueryClientProvider>
    </div>
  );
}
