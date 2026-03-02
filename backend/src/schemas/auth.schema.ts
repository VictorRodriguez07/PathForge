//Importación de la biblioteca Zod para la validación de esquemas.
import {z} from 'zod';

//Funcion que define el esquema de validación para el registro de usuarios. Define los campos esperados y las reglas de cada uno.
export const registerSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z
    .string()
    .min(8, "La contraseña debe tener mínimo 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
  name: z.string().min(1, "El nombre es requerido").max(255),
});

//Funcion que define el esquema de validación para el inicio de sesión de usuarios. Define los campos esperados y las reglas de cada uno.
export const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(1, "La contraseña es requerida"),
});

//Definición de tipos TypeScript a partir de los esquemas de validación definidos anteriormente. 
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;