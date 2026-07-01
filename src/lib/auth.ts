import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn:  "/login",
    newUser: "/signup",
    error:   "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.provider    = account.provider;
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string; provider?: string }).id       = token.sub;
        (session.user as { id?: string; provider?: string }).provider = token.provider as string;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/"))     return `${baseUrl}${url}`;
      return `${baseUrl}/home`;
    },
  },
};
