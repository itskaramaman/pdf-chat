import NextAuth, { Session, Profile } from "next-auth";
import { googleProvider, githubProvider } from "@/utils/authOptions";
import { db } from "@/db";

export const authOptions = {
  providers: [googleProvider, githubProvider],
  callbacks: {
    async signIn({ profile }: { profile: Profile }) {
      console.log("profile", profile);
      try {
        const email = profile.email;
        if (!email) return false;

        const dbUser = await db.user.findFirst({
          where: { email },
        });

        if (!dbUser) {
          await db.user.create({ data: { email } });
        }

        return true;
      } catch (error: any) {
        console.log(error.message);
        return false;
      }
    },
    async session({ session }: { session: Session }) {
      const email = session.user?.email;
      if (!email) return session;

      const user = await db.user.findFirst({
        where: { email },
      });
      session.user.id = user?.id;

      return session;
    },
  },
  pages: {
    signIn: "/signIn",
    signOut: "/",
  },
};

// @ts-ignore
const auth = NextAuth(authOptions);

export { auth as GET, auth as POST };
