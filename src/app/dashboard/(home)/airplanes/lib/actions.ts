"use server";

import type { ActionResult } from "@/app/dashboard/(auth)/login/form/actions";
import { airplaneFormSchema } from "./validations";
import { redirect } from "next/navigation";
import { deleteFile, uploadFile } from "@/lib/supabase";
import prisma from "../../../../../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAirplaneById(id: string) {
  try {
    const airplane = await prisma.airplane.findFirst({
      where: { id },
    });
    return airplane;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function saveAirplane(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  const values = airplaneFormSchema.safeParse({
    name: formData.get("name"),
    image: formData.get("image"),
    code: formData.get("code"),
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  const uploadedFile = await uploadFile(values.data.image);

  if (uploadedFile instanceof Error) {
    return {
      errorTitle: "Failed to upload file",
      errorDesc: ["Terjadi masalah pada koneksi, silahkan coba lagi"],
    };
  }

  try {
    const data = await prisma.airplane.create({
      data: {
        name: values.data.name,
        code: values.data.code,
        image: uploadedFile as string,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      errorTitle: "Failed to insert data",
      errorDesc: ["Terjadi masalah pada koneksi, silahkan coba lagi"],
    };
  }

  revalidatePath("/dashboard/airplanes");
  redirect("/dashboard/airplanes");
}

export async function updateAirplane(
  prevState: unknown,
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const image = formData.get("image") as File;

  let airplaneFormSchemaUpdate;

  if (image.size === 0) {
    airplaneFormSchemaUpdate = airplaneFormSchema.omit({ image: true });
  } else {
    airplaneFormSchemaUpdate = airplaneFormSchema;
  }

  const values = airplaneFormSchemaUpdate.safeParse({
    name: formData.get("name"),
    code: formData.get("code"),
    image: formData.get("image"),
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  let fileName;

  if (image.size > 0) {
    const uploadedFile = await uploadFile(image);

    if (uploadedFile instanceof Error) {
      return {
        errorTitle: "Failed to upload file",
        errorDesc: ["Terjadi masalah pada koneksi, silahkan coba lagi"],
      };
    }

    fileName = uploadedFile as string;
  } else {
    const airplane = await prisma.airplane.findFirst({
      where: {
        id,
      },
      select: {
        image: true,
      },
    });

    fileName = airplane?.image;
  }

  try {
    await prisma.airplane.update({
      where: {
        id,
      },
      data: {
        name: values.data.name,
        code: values.data.code,
        image: fileName,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      errorTitle: "Failed to update data",
      errorDesc: ["Terjadi masalah pada koneksi, silahkan coba lagi"],
    };
  }

  revalidatePath("/dashboard/airplanes");
  redirect("/dashboard/airplanes");
}

export async function deleteAirplane(
  id: string
): Promise<ActionResult | undefined> {
  const data = await prisma.airplane.findFirst({
    where: {
      id,
    },
  });

  if (!data) {
    return {
      errorTitle: "Data not found",
      errorDesc: [],
    };
  }

  const deletedFile = await deleteFile(data?.image);

  if (deletedFile instanceof Error) {
    return {
      errorTitle: "Failed to delete file",
      errorDesc: ["Terjadi masalah pada koneksi, silahkan coba lagi"],
    };
  }

  try {
    await prisma.airplane.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      errorTitle: "Failed to delete data",
      errorDesc: ["Terjadi masalah pada koneksi, silahkan coba lagi"],
    };
  }

  revalidatePath("/dashboard/airplanes");
}
