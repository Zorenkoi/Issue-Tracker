import AuthConfig from "@/app/configs/AuthConfig";
import { issuePatchSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getServerSession(AuthConfig);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = issuePatchSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  if (!issue) {
    return NextResponse.json({ error: "invalid issue" }, { status: 404 });
  }

  const { title, description, assignedToUserId } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "invalid assignedToUserId" },
        { status: 400 }
      );
    }
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: Number(params.id) },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getServerSession(AuthConfig);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "issue doesn't exist" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "issue was deleted" }, { status: 200 });
}
