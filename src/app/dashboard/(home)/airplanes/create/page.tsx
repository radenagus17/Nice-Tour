import React, { type FC } from "react";
import FormAirplane from "../components/form-airplane";
import { Metadata } from "next";

// interface pageProps {

// }

export const metadata: Metadata = {
  title: "Dashbaord | Create Airplane",
};

const CreateAirplanePage: FC = ({}) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 font-bold text-2xl">Tambah Data Airplane</div>
      </div>
      <FormAirplane type="ADD" defaultValues={null} />
    </>
  );
};

export default CreateAirplanePage;
