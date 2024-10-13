import React, { FC } from "react";
import { getAirplanes } from "../../lib/data";
import CheckboxAirline from "./checkbox-airline";

interface FilterAirlineProps {}

const FilterAirline: FC<FilterAirlineProps> = async ({}) => {
  const airlines = await getAirplanes();

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Airlines</p>
      {airlines.map((val, i) => (
        <CheckboxAirline data={val} key={val.name + i} />
      ))}
    </div>
  );
};

export default FilterAirline;
