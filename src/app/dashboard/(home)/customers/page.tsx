import { DataTable } from "@/components/ui/data-table";
import { Metadata } from "next";
import React, { type FC } from "react";
import { columns } from "./components/columns-cutomer";
import { getCustomers } from "./lib/data";

export const metadata: Metadata = {
  title: "Dashboard | Customers",
};

const CustomersPage: FC = async ({}) => {
  const data = await getCustomers();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 font-bold text-2xl">Customers</div>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default CustomersPage;
