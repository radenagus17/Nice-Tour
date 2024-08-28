import { Metadata } from "next";
import React, { FC } from "react";
import FormFlight from "../components/form-flight";
import { getAirplanes } from "../../airplanes/lib/data";

// interface CreateFlightPageProps {

// }

export const metadata: Metadata = {
  title: "Dashbaord | Create Flight",
};

const CreateFlightPage: FC = async ({}) => {
  const airplanes = await getAirplanes();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 font-bold text-2xl">Tambah Data Flights</div>
      </div>
      <FormFlight type="ADD" airplanes={airplanes} />
    </>
  );
};

export default CreateFlightPage;
