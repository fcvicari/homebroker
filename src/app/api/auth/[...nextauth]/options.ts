import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const userCredential = {
          password: credentials?.password,
          email: credentials?.email,
        };

        const resp = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/singin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userCredential),
          cache: "no-store",
        });

        if (!resp.ok) {
          const error = await resp.json();

          throw new Error(error.message);
        }

        const user = await resp.json();

        if (resp.ok && user) {
          return user;
        }
      },
    }),
  ],
  session: {
    maxAge: 60 * 60, // 1 hora
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.user) {
        token.id = session.user.id ?? token.id;
        token.email = session.user.email ?? token.email;
        token.image = session.user.image ?? token.image;
        token.name = session.user.name ?? token.name;
        token.wallet = session.user.wallet ?? token.wallet;
        token.accessToken = session.user.accessToken ?? token.accessToken;
      }

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.wallet = user.wallet;
        token.accessToken = user.accessToken;
      }      

      const jwtReturn = {
        ...token,
        ...user,
      };

      return jwtReturn;
    },

    async session({ session, token }) {

      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        image: token.image as string,
        wallet: token.wallet as string,
        accessToken: token.accessToken as string,
      };

      return session;
    },
  },
};
