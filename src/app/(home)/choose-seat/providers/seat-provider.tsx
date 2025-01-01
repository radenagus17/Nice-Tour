import { FlightSeat } from "@prisma/client";
import { createContext, FC, ReactNode, useState, useContext } from "react";

// Tipe untuk nilai context
export interface SeatContextType {
  selectedSeat: FlightSeat | null;
  selectSeat: (seat: FlightSeat) => void;
  clearSeat: () => void;
}

// Props untuk SeatProvider
interface SeatProviderProps {
  children: ReactNode;
}

// Membuat context dengan nilai default null
export const SeatContext = createContext<SeatContextType | null>(null);

// Hook custom untuk menggunakan SeatContext
export const useSeatContext = () => {
  const context = useContext(SeatContext);

  if (!context) {
    throw new Error("useSeatContext harus digunakan di dalam SeatProvider");
  }

  return context;
};

const SeatProvider: FC<SeatProviderProps> = ({ children }) => {
  const [selectedSeat, setSelectedSeat] = useState<FlightSeat | null>(null);

  const selectSeat = (seat: FlightSeat) => {
    setSelectedSeat(seat);
  };

  const clearSeat = () => {
    setSelectedSeat(null);
  };

  const contextValue: SeatContextType = {
    selectedSeat,
    selectSeat,
    clearSeat,
  };

  return (
    <SeatContext.Provider value={contextValue}>{children}</SeatContext.Provider>
  );
};

export default SeatProvider;
