"use client"
import CardItem from "./CardItem";
import { Ticket } from "@/lib/types";

export default function CardList({ sort, tickets }: { sort: string; tickets: Ticket[] }) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="flex flex-col w-[970px] gap-4">
        {tickets.length > 0 ? (
          tickets.map((ticket) => <CardItem key={ticket.id} ticket={ticket} />)
        ) : (
          <p>تیکتی برای نمایش وجود ندارد.</p>
        )}
      </div>
    </div>
  );
}