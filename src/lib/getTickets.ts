"use server";

import { Ticket, TicketSchema } from "./types";

function parseTime(timeStr: string): number | null {
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
}

export async function getTickets(
  sort: "asc" | "desc",
  timeFilter: "morning" | "noon" | "evening" | "night" | null
): Promise<Ticket[]> {
  try {
    const res = await fetch("https://hamednourzaei.github.io/apiTicket/db.json");

    const tickets: unknown = await res.json();

    const parsedTickets = TicketSchema.array().safeParse(tickets);

    if (!parsedTickets.success) {
      throw new Error("Invalid ticket data");
    }

    let filteredTickets = parsedTickets.data;

    if (timeFilter) {
      filteredTickets = filteredTickets.filter((ticket) => {
        const hour = parseTime(ticket.origin.time);
        if (hour === null) return false; 
        if (timeFilter === "morning" && hour >= 6 && hour < 12) return true;
        if (timeFilter === "noon" && hour >= 12 && hour < 16) return true;
        if (timeFilter === "evening" && hour >= 16 && hour < 20) return true;
        if (timeFilter === "night" && hour >= 20 && hour <= 23) return true;
        return false;
      });
    }

    console.log(`Filtered tickets for ${timeFilter || "all"}:`, filteredTickets.length);

    return filteredTickets.sort((a, b) =>
      sort === "desc" ? b.price - a.price : a.price - b.price
    );
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return [];
  }
}