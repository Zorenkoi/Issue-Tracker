import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./IssueChart";
import LatestIssues from "./LatestIssues";
import SummaryIssue from "./SummaryIssue";

const Home = async () => {
  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });
  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });
  const inProgres = await prisma.issue.count({
    where: {
      status: "IN_PROGRES",
    },
  });

  return (
    <Grid
      columns={{
        initial: "1",
        md: "2",
      }}
      gap={"5"}
    >
      <Flex direction={"column"} gap={"5"}>
        <SummaryIssue open={open} closed={closed} inProgres={inProgres} />
        <IssueChart open={open} closed={closed} inProgres={inProgres} />
      </Flex>

      <LatestIssues />
    </Grid>
  );
  return;
};

export default Home;

export const metadata: Metadata = {
  title: "Issue Tracker - DashBoard",
  description: "DashBoard - mega cool",
};
