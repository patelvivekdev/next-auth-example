import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import type { Provider } from "next-auth/providers"
import type { NextAuthConfig } from "next-auth"

const providers: Provider[] = [
  GitHub
]

export const config = {
  providers,
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name
      return token
    },
  },
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthConfig

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})


export const { handlers, auth, signIn, signOut } = NextAuth(config)
