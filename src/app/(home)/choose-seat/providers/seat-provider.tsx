import { FlightSeat } from "@prisma/client";
import { createContext, FC, ReactNode, useState } from "react";

interface SeatProviderProps {
  children: ReactNode;
}

export type SeatContextType = {
  seat: FlightSeat | null;
  setSelectedSeat: (seat: FlightSeat) => void;
};

export const SeatContext = createContext<SeatContextType | null>(null);

const SeatProvider: FC<SeatProviderProps> = ({ children }) => {
  const [seat, setSeat] = useState<FlightSeat | null>(null);

  const setSelectedSeat = (seat: FlightSeat) => {
    setSeat(seat);
  };

  return (
    <SeatContext.Provider value={{ seat, setSelectedSeat }}>
      {children}
    </SeatContext.Provider>
  );
};

export default SeatProvider;
