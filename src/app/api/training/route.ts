import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const training = await prisma.training.findMany();

  return NextResponse.json({ training });
}
