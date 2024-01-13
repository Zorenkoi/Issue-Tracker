"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { log } from "console";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; status: Status | "_" }[] = [
  { label: "All", status: "_" },
  { label: "Open", status: "OPEN" },
  { label: "Closed", status: "CLOSED" },
  { label: "In progres", status: "IN_PROGRES" },
];

const FilterIssuesStatus = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "_"}
      onValueChange={(status) => {
        const params = new URLSearchParams();

        if (status !== "_") params.append("status", status);

        const sortBy = searchParams.get("sortBy");
        if (sortBy) params.append("sortBy", sortBy);

        if (params.size === 0) {
          router.push(`/issues`);
        } else {
          router.push(`/issues?${params}`);
        }
      }}
    >
      <Select.Trigger placeholder="Filter by issue status..." />
      <Select.Content>
        {statuses.map(({ label, status }) => {
          return (
            <Select.Item key={status} value={status}>
              {label}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};

export default FilterIssuesStatus;
