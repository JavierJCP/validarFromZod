import z from "zod";
import { Plan } from "../types/plan";

export const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres",
    })
    .max(200, {
      message: "El nombre no puede tener más de 200 caracteres",
    }),
  email: z.string().email({
    message: "El email no es válido",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
  confirmPassword: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
  edad: z.string().refine((value) => parseInt(value) >= 18, {
    message: "Debe ser mayor de 18 años",
  }),
  plan: z.nativeEnum(Plan, {
    errorMap: () => ({
      message: "El plan seleccionado no es válido",
    }),
  }),
});

export const validateForm = (data: Record<string, unknown>) => {
  return formSchema.safeParse(data);
};
