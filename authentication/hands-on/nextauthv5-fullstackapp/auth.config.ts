import type { NextAuthConfig } from "next-auth"

import Credentials from "next-auth/providers/credentials"

import { LoginSchema } from "@/schemas"

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)
      }
    })
  ],
} satisfies NextAuthConfig