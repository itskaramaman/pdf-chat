import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getSessionUser } from "@/utils/getSessionUsers";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSessionUser();
    const userId = session?.userId;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const file = await db.file.findFirst({
      where: { id, userId: Number(userId) },
    });

    if (!file) {
      return NextResponse.json(
        { message: "File not associated with user" },
        { status: 404 }
      );
    }

    await db.file.delete({ where: { id: file.id } });
    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
