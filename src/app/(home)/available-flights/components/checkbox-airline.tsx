"use client";
import { Airplane } from "@prisma/client";
import React, { ChangeEvent, FC, useContext } from "react";
import {
  FContext,
  FilterActionKind,
  FlightContext,
} from "../providers/flight-provider";

interface CheckboxAirlineProps {
  data: Airplane;
}

const CheckboxAirline: FC<CheckboxAirlineProps> = ({ data }) => {
  const { dispatch } = useContext(FlightContext) as FContext;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    dispatch({
      type: isChecked
        ? FilterActionKind.ADD_PLANE
        : FilterActionKind.REMOVE_PLANE,
      payload: {
        planeId: value,
      },
    });
  };

  return (
    <label
      htmlFor={data.name}
      className="font-semibold flex items-center gap-[10px] text-white"
    >
      <input
        type="checkbox"
        name={data.name}
        id={data.name}
        onChange={handleChange}
        value={data.id}
        className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-[6px] checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
      />
      {data.name}
    </label>
  );
};

export default CheckboxAirline;
