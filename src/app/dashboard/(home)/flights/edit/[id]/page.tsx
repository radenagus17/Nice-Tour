import React, { FC } from "react";
import FormFlight from "../../components/form-flight";
import { getAirplanes } from "../../../airplanes/lib/data";
import { getFlightById } from "../../lib/data";

type Params = {
  id: string;
};

interface EditFlightPageProps {
  params: Params;
}

const EditFlightPage: FC<EditFlightPageProps> = async ({ params }) => {
  const { id } = params;
  const flight = await getFlightById(id);
  const airplanes = await getAirplanes();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 font-bold text-2xl">Tambah Data Flights</div>
      </div>
      <FormFlight type="EDIT" airplanes={airplanes} defaultValue={flight} />
    </>
  );
};

export default EditFlightPage;
