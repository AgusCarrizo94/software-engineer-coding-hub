import NextAuth from "next-auth"

import authConfig from "@/auth.config"

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  
})

// Optionally, don't invoke Middleware on some paths
// In this matcher you have to specified the routes you want to be able to execute the middleware.ts module. IS NOT FOR DEFINING PUBLIC NOR PRIVATE ROUTES!!!
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}