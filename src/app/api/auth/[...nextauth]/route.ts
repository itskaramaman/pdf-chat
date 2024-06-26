import NextAuth from "next-auth";
import { googleProvider, githubProvider } from "@/utils/authOptions";
import { Session } from "next-auth";

export const authOptions = {
  providers: [googleProvider, githubProvider],
  callbacks: {
    // async signIn({ profile }: { profile: Profile }) {
    //   return profile;
    // },
    async session({ session, token }: { session: Session; token: string }) {
      // console.log()
      return session;
    },
  },
  pages: {
    signIn: "/signIn",
    signOut: "/",
  },
};

const auth = NextAuth(authOptions);

export { auth as GET, auth as POST };
