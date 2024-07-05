import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getSessionUser } from "@/utils/getSessionUsers";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const session = await getSessionUser();
    const userId = session?.userId;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const file = await db.file.findFirst({
      where: { id, userId: Number(userId) },
    });

    if (!file) {
      return NextResponse.json({ status: "PENDING" as const }, { status: 200 });
    }
    return NextResponse.json({ status: file.uploadStatus }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
