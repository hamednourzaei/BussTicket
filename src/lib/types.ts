
import { z } from "zod";


export const TicketSchema = z.object({
  id: z.number(),
  companyTitle: z.string(),
  price: z.number(),
  vipText: z.string(),
  origin: z.object({
    city: z.string(),
    time: z.string(),
    date: z.string(),
  }),
  destination: z.object({
    city: z.string(),
    time: z.string(),
    date: z.string(),
  }),
  availableSeats: z.number(),
});

export type Ticket = z.infer<typeof TicketSchema>;
