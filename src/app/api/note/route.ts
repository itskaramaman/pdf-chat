import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getSessionUser } from "@/utils/getSessionUsers";

export async function POST(request: NextRequest) {
  try {
    const { value, fileId } = await request.json();
    if (value.trim() === "") {
      return NextResponse.json({}, { status: 200 });
    }

    // check user is authorized
    const session = await getSessionUser();
    const userId = session?.userId;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // check if file owner and note taking user is same
    const file = await db.file.findFirst({
      where: { id: fileId, userId: Number(userId) },
    });
    if (!file) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // check if note already exists
    const note = await db.note.findFirst({
      where: { fileId, userId: Number(userId) },
    });

    if (!note) {
      await db.note.create({
        data: { content: value, fileId, userId: Number(userId) },
      });
    } else {
      await db.note.update({
        data: { content: value },
        where: { id: note.id },
      });
    }

    return NextResponse.json({ note }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const fileId = request.nextUrl.searchParams.get("fileId") || "";
    const note = await db.note.findFirst({ where: { fileId } });

    console.log(note);

    if (!note) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ content: note.content }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
