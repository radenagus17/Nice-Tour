import React, { FC } from "react";
import LoadingFlightItem from "./loading-flight-item";

interface LoadingListFlightProps {}

const LoadingListFlight: FC<LoadingListFlightProps> = ({}) => {
  return (
    <div className="flex flex-col w-full gap-6">
      <LoadingFlightItem />
      <LoadingFlightItem />
      <LoadingFlightItem />
    </div>
  );
};

export default LoadingListFlight;
