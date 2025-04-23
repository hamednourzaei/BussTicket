"use server";

import { Ticket, TicketSchema } from "./types";

export async function getTickets(): Promise<Ticket[]> {
  try {
    const res = await fetch("https://hamednourzaei.github.io/apiTicket/db.json");

    const tickets: unknown = await res.json();

    const parsedTickets = TicketSchema.array().safeParse(tickets);

    if (!parsedTickets.success) {
      throw new Error("Invalid ticket data");
    }

    return parsedTickets.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return [];
  }
}