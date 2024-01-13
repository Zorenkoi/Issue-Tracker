import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const GET = async (request: NextRequest) => {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
};
