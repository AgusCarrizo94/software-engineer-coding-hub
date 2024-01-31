// File necessary for hot reload in Next.js
// The global variables are not affected by hot reloads

/* The flow is the following: 
        When the code is first initialiazed with "npm run dev" --> db = new PrismaClient() &&  globalThis.prisma = db
        When hot reload is executed (e.g saving a file), because global variables do not get affected by hot reloads --> db = globalThis.prisma
*/

import { PrismaClient } from "@prisma/client";

// Define types
declare global {
    var prisma: PrismaClient | undefined
}

// In production we only need to create one PrismaClient instance via its constructor. 
// But in development if we did not specified the below line assignment, everytime the hot reloads executes, a new PrismaClient instance will be created. This would trigger a multiple Prisma instances error.
export const db = globalThis.prisma || new PrismaClient()

// To solve this issue we check if we are not in production environment and assign the "db" value in the "globalThis.prisma" global variables. So whenever the hot reload get execute it, the "db" variable will be assigned to the "globalThis.prisma", which was assign at initialziation to a PrismaClient instance through its consctructor.
if (process.env.NODE_ENV !== "production") globalThis.prisma = db