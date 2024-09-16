"use client";

import { Flight, FlightSeat, Ticket, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import ColumnRouteFlight from "../../flights/components/column-route-flight";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

type TicketType = Ticket & {
  flight: Flight;
  customer: User;
  seat: FlightSeat;
};

export const columns: ColumnDef<TicketType>[] = [
  {
    accessorKey: "customerId",
    header: "Nama Penumpang",
    cell: ({ row }) => {
      const ticket = row.original;

      return ticket.customer.name;
    },
  },
  {
    accessorKey: "flightId",
    header: "Detail Penumpang",
    cell: ({ row }) => {
      const ticket = row.original;

      return <ColumnRouteFlight flight={ticket.flight} />;
    },
  },
  {
    accessorKey: "seatId",
    header: "Nomor Kursi",
    cell: ({ row }) => {
      const ticket = row.original;

      return <Badge>{ticket.seat.seatNumber}</Badge>;
    },
  },
  {
    id: "status_transaction",
    header: "Status Transaksi",
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <div className="space-y-1">
          <Badge
            className={clsx({
              "bg-green-500": ticket.status === "SUCCESS",
              "bg-yellow-500": ticket.status === "PENDING",
              "bg-red-500": ticket.status === "FAILED",
            })}
          >
            {ticket.status}
          </Badge>
        </div>
      );
    },
  },
];
