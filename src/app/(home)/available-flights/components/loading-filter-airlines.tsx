import { Skeleton } from "@/components/ui/skeleton";
import React, { FC } from "react";

interface LoadingFilterAirlinesProps {}

const LoadingFilterAirlines: FC<LoadingFilterAirlinesProps> = ({}) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Airlines</p>
      {[0, 1, 2].map((val) => (
        <label
          key={val}
          className="font-semibold flex items-center gap-[10px] text-white"
        >
          <Skeleton className="w-[25px] h-[25px] bg-white rounded" />
          <Skeleton className="w-[159px] h-5 rounded bg-white" />
        </label>
      ))}
    </div>
  );
};

export default LoadingFilterAirlines;
