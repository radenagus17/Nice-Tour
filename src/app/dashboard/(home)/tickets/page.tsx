import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React, { type FC } from "react";
import { getTickets } from "./lib/data";
import { columns } from "./components/columns-tickets";

export const metadata: Metadata = {
  title: "Dashboard | Tickets",
};

const TicketsPage: FC = async ({}) => {
  const data = await getTickets();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 font-bold text-2xl">Tickets</div>
        <Button asChild>
          <Link href={"/dashboard/tickets/create"}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Data
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default TicketsPage;
