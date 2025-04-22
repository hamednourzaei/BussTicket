"use client"
import CardItem from "./CardItem";
import { Ticket } from "@/lib/types";

export default function CardList({ sort, tickets }: { sort: string; tickets: Ticket[] }) {
  // مرتب‌سازی تیکت‌ها بر اساس مقدار sort
  const sortedTickets = [...tickets].sort((a, b) => {
    if (sort === "price") {
      return a.price - b.price; // فرض بر این است که Ticket فیلد price دارد
    } else if (sort === "date") {
      return new Date(a.date).getTime() - new Date(b.date).getTime(); // فرض بر این است که Ticket فیلد date دارد
    }
    return 0; // بدون مرتب‌سازی
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
