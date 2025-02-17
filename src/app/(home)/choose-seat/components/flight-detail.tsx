/* eslint-disable @next/next/no-img-element */
"use client";
import useCheckoutData from "@/hooks/useCheckoutData";
import { getUrlFile } from "@/lib/supabase";
import {
  Checkout,
  CHECKOUT_KEY,
  dateFormat,
  rupiahFormat,
  SEAT_VALUES,
  SeatValuesType,
} from "@/lib/utils";
import { Airplane, Flight, FlightSeat } from "@prisma/client";
import React, { FC, useContext, useMemo } from "react";
import { SeatContext, SeatContextType } from "../providers/seat-provider";
import { toast } from "sonner";
import { Session } from "lucia";
import { useRouter } from "next/navigation";

type FligtProps = Flight & { seats: FlightSeat[]; plane: Airplane };

interface FlightDetailProps {
  flight: FligtProps;
  session: Session | null;
}

const FlightDetail: FC<FlightDetailProps> = ({ flight, session }) => {
  const data = useCheckoutData();
  const { selectedSeat } = useContext(SeatContext) as SeatContextType;

  const { replace, push } = useRouter();

  const cacheSelectedSeat = useMemo(() => {
    return SEAT_VALUES[(data.data?.seat as SeatValuesType) ?? "ECONOMY"];
  }, [data.data?.seat]);

  const continueCheckout = () => {
    const validateBeforeCheckout = () => {
      if (selectedSeat === null) {
        toast.warning("Please select seat to continue");
        return false;
      }

      if (session === null) {
        replace("/sign-in");
        return false;
      }

      return true;
    };

    if (!validateBeforeCheckout()) {
      return;
    }

    const checkoutData: Checkout = {
      id: data.data?.id,
      seat: data.data?.seat,
      flightDetail: flight,
      seatDetail: selectedSeat!,
    };

    sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(checkoutData));
    push("/checkout");
  };

  return (
    <div className="flex flex-col items-center gap-[30px] mt-[61px] pb-[30px]">
      <h1 className="font-bold text-[32px] leading-[48px] text-center">
        {flight.departureCity} to {flight.destinationCity}
      </h1>
      <div className="flex flex-col items-center gap-[30px] w-[335px]">
        <div className="flex flex-col gap-[10px] w-full">
          <div className="flex justify-center shrink-0">
            <img
              src="../assets/images/icons/plane-dotted-curve.svg"
              alt="icon"
            />
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-[2px] text-center">
              <p className="font-bold text-lg">
                {dateFormat(flight.departureDate, "HH:mm")}
              </p>
              <p className="text-sm text-flysha-off-purple">
                {flight.departureCityCode}
              </p>
            </div>
            <div className="flex flex-col gap-[2px] text-center">
              <p className="font-bold text-lg">
                {dateFormat(flight.arrivalDate, "HH:mm")}
              </p>
              <p className="text-sm text-flysha-off-purple">
                {flight.destinationCityCode}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex shrink-0 w-full h-[130px] rounded-[14px] overflow-hidden">
            <img
              src={getUrlFile(flight.plane.image)}
              className="w-full h-full object-cover"
              alt="image"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-[2px]">
              <p className="font-bold text-lg">{flight.plane.name}</p>
              <p className="text-sm text-flysha-grey">
                {flight.plane.code} • {cacheSelectedSeat.label}
              </p>
            </div>
            <div className="flex h-fit">
              <img
                src="../assets/images/icons/Star.svg"
                className="w-5 h-5"
                alt="star"
              />
              <img
                src="../assets/images/icons/Star.svg"
                className="w-5 h-5"
                alt="star"
              />
              <img
                src="../assets/images/icons/Star.svg"
                className="w-5 h-5"
                alt="star"
              />
              <img
                src="../assets/images/icons/Star.svg"
                className="w-5 h-5"
                alt="star"
              />
              <img
                src="../assets/images/icons/Star.svg"
                className="w-5 h-5"
                alt="star"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] w-full">
          <div className="flex justify-between">
            <span>Date</span>
            <span className="font-semibold">
              {dateFormat(flight.departureDate)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Seat Choosen</span>
            <span className="font-semibold">{selectedSeat?.seatNumber}</span>
          </div>
          <div className="flex justify-between">
            <span>Passenger</span>
            <span className="font-semibold">1 Person</span>
          </div>
          <div className="flex justify-between">
            <span>Seat Price</span>
            <span className="font-semibold">
              {rupiahFormat(flight.price + cacheSelectedSeat.additionalPrice)}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={continueCheckout}
          className="font-bold text-flysha-black bg-flysha-light-purple rounded-full h-12 w-full transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF] flex justify-center items-center"
        >
          Continue to Book
        </button>
      </div>
    </div>
  );
};

export default FlightDetail;
