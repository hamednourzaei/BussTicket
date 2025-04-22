"use client"
import CardItem from "./CardItem";
import { Ticket } from "@/lib/types";

export default function CardList({ sort, tickets }: { sort: string; tickets: Ticket[] }) {
  // مرتب‌سازی تیکت‌ها
  const sortedTickets = [...tickets].sort((a, b) => {
    if (sort === "price") {
      return a.price - b.price;
    } else if (sort === "date") {
      // استفاده از origin.date یا destination.date
      return new Date(a.origin.date).getTime() - new Date(b.origin.date).getTime();
    }
    return 0;
  });

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="flex flex-col w-[970px] gap-4">
        {sortedTickets.length > 0 ? (
          sortedTickets.map((ticket) => <CardItem key={ticket.id} ticket={ticket} />)
        ) : (
          <p>تیکتی برای نمایش وجود ندارد.</p>
        )}
      </div>
    </div>
  );
}
