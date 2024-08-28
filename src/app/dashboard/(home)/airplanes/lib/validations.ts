import { z } from "zod";

const ACCEPTED_IMAGE_TYPE = ["image/png", "image/jpeg", "image/jpg"];
const MAX_FILE_SIZE = 2000000; //2 MB

export const airplaneFormSchema = z.object({
  name: z
    .string({ required_error: "Nama pesawat tidak boleh kosong" })
    .min(4, { message: "Nama pesawat harus memiliki minimal 4 karakter" }),
  code: z
    .string({ required_error: "Kode pesawat tidak boleh kosong" })
    .regex(/^[A-Z]{3}-[0-9]{3}$/, "Format kode harus [XXX-111]"),
  image: z
    .any()
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPE.includes(file.type),
      "Image harus berekstensi jpg, jpeg, png"
    )
    .refine(
      (file: File) => file.size <= MAX_FILE_SIZE,
      "Image harus memiliki ukuran minimal 2mb"
    ),
});
