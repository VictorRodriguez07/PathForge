//archivo que se encarga de crear una instancia del cliente de prisma y exportarla de forma global para evitar múltiples instancias en desarrollo y producción
import { PrismaClient } from "../generated/prisma";


//Se definte la variable global para almacenar la instancia de prisma, esto es necesario para evitar múltiples instancias en desarrollo, ya que prisma no maneja bien múltiples conexiones; además, se asigna un alias a globalThis para evitar problemas de tipado con TypeScript
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// se exporta la instancia de prisma, si ya existe una instancia global se utiliza esa, de lo contrario se crea una nueva instancia
export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();


  // si el stage no es prod, se asigna la instancia de prisma a la variable global.
if (process.env["STAGE"] !== "prod") {
  globalForPrisma.prisma = prisma;
}