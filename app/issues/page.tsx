import { Pagination } from "@/app/components";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import TableIssues, { SearchParams, arrHeaderValues } from "./TableIssues";

interface Props {
  searchParams: SearchParams;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = arrHeaderValues.includes(searchParams.sortBy)
    ? { [searchParams.sortBy]: "asc" }
    : undefined;

  const currentPage = parseInt(searchParams.page) || 1;
  const countIssuesForPage = 7;
  const countIssues = await prisma.issue.count({ where: { status } });

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
    skip: (currentPage - 1) * countIssuesForPage,
    take: countIssuesForPage,
  });

  return (
    <Flex direction={"column"} gap={"3"}>
      <IssueActions />
      <TableIssues issues={issues} searchParams={searchParams} />
      <Pagination
        currentPage={currentPage}
        countItems={countIssues}
        countItemsForPage={countIssuesForPage}
      />
    </Flex>
  );
};

export default IssuesPage;
