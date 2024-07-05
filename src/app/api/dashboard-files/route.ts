import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getSessionUser } from "@/utils/getSessionUsers";

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionUser();
    const userId = session?.userId;

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    const files = await db.file.findMany({
      where: { userId: Number(userId) },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ files }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
