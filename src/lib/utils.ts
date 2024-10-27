import { FlightSeat, TypeSeat } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export const CHECKOUT_KEY = "CHECKOUT_KEY";

export const SEAT_VALUES = {
  ECONOMY: {
    label: "Economy",
    additionalPrice: 0,
  },
  BUSINESS: {
    label: "Business",
    additionalPrice: 500000,
  },
  FIRST: {
    label: "First",
    additionalPrice: 750000,
  },
};

export type SeatValuesType = keyof typeof SEAT_VALUES;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSeatPerClass(flightId: string) {
  const SEAT_CLASS: TypeSeat[] = ["BUSINESS", "ECONOMY", "FIRST"];
  const SEAT_CODE = ["A", "B", "C", "D"];

  const seats: { seatNumber: string; type: TypeSeat; flightId: string }[] = [];

  for (const className of SEAT_CLASS) {
    for (const seat of SEAT_CODE) {
      for (let i = 1; i <= 5; i++) {
        seats.push({
          seatNumber: seat + i,
          type: className as TypeSeat,
          flightId,
        });
      }
    }
  }

  return seats;
}

export function dateFormat(date: Date, format = "DD MMM YYYY HH:mm"): string {
  if (!date) return "";

  const dateFormat = dayjs(date).format(format);

  return dateFormat;
}

export function rupiahFormat(price: number): string {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function mappingSeats(seats: FlightSeat[]): {
  economy: number;
  business: number;
  first: number;
  totalSeatEconomy: number;
  totalSeatBusiness: number;
  totalSeatFirst: number;
} {
  const totalSeatEconomy = seats.filter(
    (seat) => seat.type === "ECONOMY"
  ).length;
  const totalSeatBusiness = seats.filter(
    (seat) => seat.type === "BUSINESS"
  ).length;
  const totalSeatFirst = seats.filter((seat) => seat.type === "FIRST").length;

  const economy = seats.filter(
    (seat) => seat.type === "ECONOMY" && seat.isBooked
  ).length;
  const business = seats.filter(
    (seat) => seat.type === "BUSINESS" && seat.isBooked
  ).length;
  const first = seats.filter(
    (seat) => seat.type === "FIRST" && seat.isBooked
  ).length;

  return {
    economy,
    business,
    first,

    totalSeatEconomy,
    totalSeatBusiness,
    totalSeatFirst,
  };
}

export const objectToParams = (obj: { [key: string]: unknown }) => {
  const queryParams = Object.keys(obj)
    .map((key) => {
      if (obj[key] !== null) {
        return `${key}=${obj[key]}`;
      }

      return "";
    })
    .filter((key) => key !== "")
    .join("&");

  return queryParams;
};
