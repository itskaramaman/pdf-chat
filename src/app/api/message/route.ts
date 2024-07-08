import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getSessionUser } from "@/utils/getSessionUsers";

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionUser();
    const userId = session?.userId;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const reqBody = await request.json();

    const { fileId, message } = reqBody;

    const file = await db.file.findFirst({
      where: { id: fileId, userId: Number(userId) },
    });

    if (!file) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    await db.message.create({
      data: {
        text: message,
        userId: Number(userId),
        fileId: fileId,
        isUserMessage: true,
      },
    });

    // 


    return NextResponse.json({ message: "" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
