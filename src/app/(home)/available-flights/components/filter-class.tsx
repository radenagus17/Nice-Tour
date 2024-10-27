"use client";
import { TypeSeat } from "@prisma/client";
import React, { ChangeEvent, FC, useContext } from "react";
import {
  FContext,
  FilterActionKind,
  FlightContext,
} from "../providers/flight-provider";

interface FilterClassProps {}

const classOptions: TypeSeat[] = ["ECONOMY", "BUSINESS", "FIRST"];

const FilterClass: FC<FilterClassProps> = ({}) => {
  const { dispatch } = useContext(FlightContext) as FContext;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FilterActionKind.SET_SEAT,
      payload: {
        planeId: "",
        seat: e.target.value,
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Seat Class</p>
      {classOptions.map((val, i) => (
        <label
          key={val + i}
          htmlFor={val}
          className="font-semibold flex items-center gap-[10px] has-[:checked]:text-white"
        >
          <input
            type="radio"
            name="seat"
            id={val}
            value={val}
            onChange={handleChange}
            className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-full checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
          />
          {val}
        </label>
      ))}
    </div>
  );
};

export default FilterClass;
