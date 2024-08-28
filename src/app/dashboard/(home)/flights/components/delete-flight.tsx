import { Button } from "@/components/ui/button";
import React, { FC } from "react";
import { useFormStatus } from "react-dom";
import { Trash } from "lucide-react";
import { deleteFlight } from "../lib/actions";

interface DeleteFlightProps {
  id: string;
}

const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-full" size={"sm"} variant={"destructive"}>
          <Trash className="h-4 w-4 mr-2" />
          loading...
        </Button>
      ) : (
        <Button size={"sm"} variant={"destructive"} type="submit">
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
      )}
    </>
  );
};

const DeleteFlight: FC<DeleteFlightProps> = ({ id }) => {
  const deleteFlightWithId = deleteFlight.bind(null, id);

  return (
    <form action={deleteFlightWithId}>
      <SubmitBtn />
    </form>
  );
};

export default DeleteFlight;
