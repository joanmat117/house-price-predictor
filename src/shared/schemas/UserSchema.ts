import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido' }),
  is_agent: z.boolean().default(false),
  phone_number: z.string().optional().or(z.literal('')),
  real_state_agency: z.string().optional().or(z.literal('')),
});

export type UserFormData = z.infer<typeof UserSchema>;
