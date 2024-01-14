import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

import { issueSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import AuthConfig from "@/app/configs/AuthConfig";

export async function POST(request: NextRequest) {
  const session = getServerSession(AuthConfig);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

export const GET = async (request: NextRequest) => {
  const issues = await prisma.issue.findMany();

  return NextResponse.json(issues);
};

export const dynamic = "force-dynamic";
