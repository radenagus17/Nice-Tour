import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";
import { columns } from "./components/columns-table";
import { getAirplanes } from "./lib/data";
import { Metadata } from "next";

interface AirplanesPageProps {}

export const metadata: Metadata = {
  title: "Dashboard | Airplanes",
};

const AirplanesPage: FC<AirplanesPageProps> = async ({}) => {
  const planes = await getAirplanes();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 font-bold text-2xl">Airplanes</div>
        <Button asChild>
          <Link href={"/dashboard/airplanes/create"}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Data
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={planes} />
    </>
  );
};

export default AirplanesPage;
