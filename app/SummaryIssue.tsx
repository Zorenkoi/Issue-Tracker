import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  closed: number;
  inProgres: number;
}

const SummaryIssue = ({ open, closed, inProgres }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open issues", value: open, status: "OPEN" },
    { label: "Closed issues", value: closed, status: "CLOSED" },
    { label: "Issues in progress", value: inProgres, status: "IN_PROGRES" },
  ];
  return (
    <Flex gap={"3"}>
      {containers.map((container) => (
        <Card key={container.value}>
          <Flex direction={"column"}>
            <Link
              className="text-sm font-medium"
              href={`/issues?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size={"5"} className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default SummaryIssue;
