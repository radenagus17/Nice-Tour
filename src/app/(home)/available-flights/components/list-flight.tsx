"use client";
import React, { FC, useContext } from "react";
import FlightItem from "./flight-item";
import { FContext, FlightContext } from "../providers/flight-provider";
import LoadingListFlight from "./loading-list-flight";

interface ListFlightProps {}

const ListFlight: FC<ListFlightProps> = ({}) => {
  const { flights, isLoading } = useContext(FlightContext) as FContext;

  if (isLoading) return <LoadingListFlight />;

  return (
    <div className="flex flex-col w-full gap-6">
      {flights?.map((val) => (
        <FlightItem key={val.id} data={val} />
      ))}
      <p className="text-center text-sm text-[#A0A0AC] h-fit">
        You’ve reached the end of results.
      </p>
    </div>
  );
};

export default ListFlight;
