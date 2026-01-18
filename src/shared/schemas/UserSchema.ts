import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  is_agent: z.boolean().default(false),
  phone_number: z
    .string()
    .length(10, { message: "El número debe tener exactamente 10 dígitos" })
    .regex(/^\d+$/, { message: "Solo se permiten números" })
    .or(z.literal('')), // Permite que esté vacío si es opcional
  real_state_agency: z.string().optional(),
});

export type UserFormData = z.infer<typeof UserSchema>;
