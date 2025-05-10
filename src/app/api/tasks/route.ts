import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const todos = await prisma.todo.findMany();

  return NextResponse.json({ todos });
}
