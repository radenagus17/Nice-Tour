import { Button } from "@/components/ui/button";
import React, { FC } from "react";
import { useFormStatus } from "react-dom";
import { deleteAirplane } from "../lib/actions";
import { Trash } from "lucide-react";

interface DeleteAirplaneProps {
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

const DeleteAirplane: FC<DeleteAirplaneProps> = ({ id }) => {
  const deleteAirplaneWithId = deleteAirplane.bind(null, id);

  return (
    <form action={deleteAirplaneWithId}>
      <SubmitBtn />
    </form>
  );
};

export default DeleteAirplane;
