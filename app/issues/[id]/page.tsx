import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";

import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import IssueDetails from "./IssueDetails";
import AssigneeSelect from "./AssigneeSelect";
import IssueButtonContainer from "./IssueButtonContainer";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const DetailIssuePage = async ({ params }: Props) => {
  const issue = await fetchIssue(Number(params.id));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="2">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>

      <Box>
        <IssueButtonContainer>
          <AssigneeSelect issue={issue} />
          <EditButton issueId={issue.id} />
          <DeleteButton issueId={issue.id} />
        </IssueButtonContainer>
      </Box>
    </Grid>
  );
};

export default DetailIssuePage;

export const generateMetadata = async ({ params }: Props) => {
  const issue = await fetchIssue(Number(params.id));

  return {
    title: "Issue Tracker - " + issue?.title,
    description: "Detail issue" + issue?.id,
  };
};
