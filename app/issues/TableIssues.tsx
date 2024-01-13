import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { TextLink, IssueStatusBadge } from "../components";
import { Issue, Status } from "@prisma/client";

interface Props {
  searchParams: SearchParams;
  issues: Issue[];
}
export interface SearchParams {
  status: Status;
  sortBy: keyof Issue;
  page: string;
}

const TableIssues = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {arrHeaders.map((header) => {
            return (
              <Table.ColumnHeaderCell
                key={header.value}
                className={header.className}
              >
                <Link
                  href={{
                    query: { ...searchParams, sortBy: header.value },
                  }}
                >
                  {header.label}{" "}
                  {header.value === searchParams.sortBy && (
                    <ArrowUpIcon className="inline" />
                  )}
                </Link>
              </Table.ColumnHeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.map(({ id, createdAt, status, title }) => {
          return (
            <Table.Row key={id}>
              <Table.Cell>
                <TextLink href={`/issues/${id}`}>{title}</TextLink>

                <div className="block md:hidden">
                  <IssueStatusBadge status={status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

const arrHeaders: { label: string; value: keyof Issue; className?: string }[] =
  [
    { label: "Title", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

export const arrHeaderValues = arrHeaders.map((header) => header.value);

export default TableIssues;
