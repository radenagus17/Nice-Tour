"use client";

import { ActionResult } from "@/app/dashboard/(auth)/login/form/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { type FC } from "react";
import { useFormState } from "react-dom";
import { saveAirplane, updateAirplane } from "../lib/actions";
import { type Airplane } from "@prisma/client";
import SubmitFormButton from "../../components/submit-form-button";

interface FormAirplaneProps {
  type?: "ADD" | "EDIT";
  defaultValues: Airplane | null;
}

const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

const FormAirplane: FC<FormAirplaneProps> = ({ type, defaultValues }) => {
  const updateAirplaneWithId = (_state: ActionResult, formData: FormData) =>
    updateAirplane(null, defaultValues?.id!!, formData);

  const [state, formAction] = useFormState(
    type === "ADD" ? saveAirplane : updateAirplaneWithId,
    initialFormState
  );

  // console.log(state);

  return (
    <form action={formAction} className="px-1 w-[40%] space-y-4">
      {state?.errorTitle !== null && (
        <div className="mt-7 bg-red-500 p-4 rounded-lg text-white">
          <div className="font-bold mb-4">{state.errorTitle}</div>

          <ul className="list-disc list-inside">
            {state.errorDesc?.map((item, idx) => (
              <li key={idx + item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="code">Kode Pesawat</Label>
        <Input
          placeholder="Kode Pesawat..."
          name="code"
          id="code"
          required
          defaultValue={defaultValues?.code}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="code">Nama Pesawat</Label>
        <Input
          placeholder="Nama Pesawat..."
          name="name"
          id="name"
          required
          defaultValue={defaultValues?.name}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Upload Foto</Label>
        <Input
          type="file"
          placeholder="Upload foto..."
          name="image"
          id="image"
          required
          // defaultValue={defaultValues?.image}
        />
      </div>
      <SubmitFormButton />
    </form>
  );
};

export default FormAirplane;
