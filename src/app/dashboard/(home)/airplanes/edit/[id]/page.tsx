import React, { FC } from "react";
import FormAirplane from "../../components/form-airplane";
import { getAirplaneById } from "../../lib/actions";

type ParamsProps = {
  id: string;
};

interface EditAirplanePageProps {
  params: ParamsProps;
}

const EditAirplanePage: FC<EditAirplanePageProps> = async ({ params }) => {
  // console.log(params.id);

  const data = await getAirplaneById(params.id);

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 font-bold text-2xl">Edit Data Airplane</div>
      </div>
      <FormAirplane type="EDIT" defaultValues={data} />
    </>
  );
};

export default EditAirplanePage;
