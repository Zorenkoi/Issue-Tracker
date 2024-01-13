"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import { BarChart, ResponsiveContainer, XAxis, Bar } from "recharts";

interface Props {
  open: number;
  closed: number;
  inProgres: number;
}

const IssueChart = ({ open, closed, inProgres }: Props) => {
  const data = [
    { label: "Open issues", value: open },
    { label: "Closed issues", value: closed },
    { label: "Issues in progress", value: inProgres },
  ];

  return (
    <Card>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data}>
          <XAxis dataKey={"label"} />
          <XAxis />
          <Bar dataKey={"value"} barSize={60} fill="#3e63dd" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
