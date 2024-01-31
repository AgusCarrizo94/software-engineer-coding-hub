'use server'

import bcrypt from "bcrypt"
import * as z from "zod"

import { db } from "@/lib/db"
import { RegisterSchema } from "@/schemas"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { email, password, name } = validatedFields.data

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await db.user.findUnique({
        where: {
            email: email
        }
    })

    if (existingUser) return {error: "Email already in use"}

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    // TODO: Send verification token email

    return { succes: "User created!" };
}