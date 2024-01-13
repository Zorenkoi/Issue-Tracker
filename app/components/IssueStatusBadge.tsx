import React from "react";
import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const obj: Record<
  Status,
  { label: string; color: "red" | "green" | "violet" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRES: { label: "In progres", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return <Badge color={obj[status].color}>{obj[status].label}</Badge>;
};

export default IssueStatusBadge;
