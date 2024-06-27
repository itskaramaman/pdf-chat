import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return null;
    }

    return { user: session.user, userId: session.user.id };
  } catch (error: any) {
    console.log(error);
  }
};
