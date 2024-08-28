"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const SubmitFormButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          loading...
        </Button>
      ) : (
        <Button className="w-full" type="submit">
          Submit
        </Button>
      )}
    </>
  );
};

export default SubmitFormButton;
