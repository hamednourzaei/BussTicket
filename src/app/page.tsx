"use client";

import Filters from "@/components/Card/Fillters";
import CardList from "@/components/Card/Card";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { getTickets } from "@/lib/getTickets";

const queryClient = new QueryClient();

export default function Home() {
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const { data: tickets = [], isLoading, error } = useQuery({
    queryKey: ["tickets", sort],
    queryFn: () => getTickets(sort),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Filters onSortChange={setSort} sort={sort} />
        {isLoading ? (
          <p>در حال بارگذاری...</p>
        ) : error ? (
          <p>خطایی رخ داد: {error.message}</p>
        ) : (
          <CardList sort={sort} tickets={tickets} />
        )}
      </div>
    </QueryClientProvider>
  );
}