"use client";

import Filters from "@/components/Card/Fillters";
import CardList from "@/components/Card/Card";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { getTickets } from "@/lib/getTickets";

const queryClient = new QueryClient();

export default function Home() {
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [timeFilter, setTimeFilter] = useState<"morning" | "noon" | "evening" | "night" | null>(null);

  const { data: tickets = [], isLoading, error } = useQuery({
    queryKey: ["tickets", sort, timeFilter],
    queryFn: () => getTickets(sort, timeFilter),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Filters
          onSortChange={setSort}
          sort={sort}
          onTimeFilterChange={setTimeFilter}
          timeFilter={timeFilter}
        />
        {isLoading ? (
          <p className="text-center py-4">در حال بارگذاری...</p>
        ) : error ? (
          <p className="text-center py-4 text-red-500">خطایی رخ داد: {error.message}</p>
        ) : tickets.length === 0 ? (
          <p className="text-center py-4">هیچ تیکتی برای این فیلتر یافت نشد.</p>
        ) : (
          <CardList sort={sort} tickets={tickets} />
        )}
      </div>
    </QueryClientProvider>
  );
}