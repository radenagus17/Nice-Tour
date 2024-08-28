"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubmitFormButton from "../../components/submit-form-button";
import { Airplane, Flight } from "@prisma/client";
import { useFormState } from "react-dom";
import { saveFlight, updateFlight } from "../lib/actions";
import { ActionResult } from "@/app/dashboard/(auth)/login/form/actions";
import { dateFormat } from "@/lib/utils";

interface FormFlightProps {
  airplanes: Airplane[];
  type?: "ADD" | "EDIT";
  defaultValue?: Flight | null;
}

const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

const FormFlight: FC<FormFlightProps> = ({ airplanes, defaultValue, type }) => {
  const updateFlightWithId = (_state: ActionResult, formData: FormData) =>
    updateFlight(null, defaultValue?.id!!, formData);

  const [state, formAction] = useFormState(
    type === "EDIT" ? updateFlightWithId : saveFlight,
    initialFormState
  );

  return (
    <form action={formAction} className="px-1 space-y-6">
      {state?.errorTitle !== null && (
        <div className="mt-7 bg-red-500 p-4 rounded-lg text-white">
          <div className="font-bold mb-4">{state?.errorTitle}</div>

          <ul className="list-disc list-inside">
            {state?.errorDesc?.map((item, idx) => (
              <li key={idx + item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="planeId">Pilih Pesawat</Label>
          <Select name="planeId" defaultValue={defaultValue?.planeId}>
            <SelectTrigger id="planeId">
              <SelectValue placeholder="Pilih Pesawat" />
            </SelectTrigger>
            <SelectContent>
              {airplanes.map((airplane) => (
                <SelectItem key={airplane.id} value={airplane.id}>
                  {airplane.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Harga Tiket</Label>
          <Input
            type="number"
            min={0}
            placeholder="Harga Tiket..."
            name="price"
            id="price"
            defaultValue={defaultValue?.price}
            required
          />
          <span className="text-xs text-gray-500 italic text-pretty">
            Harga untuk kelas bussiness bertambah Rp. 500.000 & kelas first
            bertambah Rp. 750.000
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departureCity">Kota Keberangkatan</Label>
          <Input
            type="text"
            placeholder="Kota Keberangkatan..."
            name="departureCity"
            id="departureCity"
            defaultValue={defaultValue?.departureCity}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departureDate">Tanggal Keberangkatan</Label>
          <Input
            className="block"
            type="datetime-local"
            placeholder="Tanggal Keberangkatan..."
            name="departureDate"
            defaultValue={dateFormat(
              defaultValue?.departureDate!!,
              "YYYY-MM-DDTHH:MM"
            )}
            id="departureDate"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departureCityCode">Kode Kota</Label>
          <Input
            type="text"
            placeholder="Kode Kota..."
            name="departureCityCode"
            id="departureCityCode"
            defaultValue={defaultValue?.departureCityCode}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="destinationCity">Kota Tujuan</Label>
          <Input
            type="text"
            placeholder="Kota Tujuan..."
            name="destinationCity"
            id="destinationCity"
            defaultValue={defaultValue?.destinationCity}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="arrivalDate">Tanggal Tiba</Label>
          <Input
            className="block"
            type="datetime-local"
            placeholder="Tanggal Tiba..."
            name="arrivalDate"
            id="arrivalDate"
            defaultValue={dateFormat(
              defaultValue?.arrivalDate!!,
              "YYYY-MM-DDTHH:MM"
            )}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="destinationCityCode">Kode Kota</Label>
          <Input
            type="text"
            placeholder="Kode Kota..."
            name="destinationCityCode"
            id="destinationCityCode"
            defaultValue={defaultValue?.destinationCityCode}
            required
          />
        </div>
      </div>

      <SubmitFormButton />
    </form>
  );
};

export default FormFlight;
