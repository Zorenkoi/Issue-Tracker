import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import FilterIssuesStatus from "./FilterIssuesStatus";

const IssueActions = () => {
  return (
    <Flex justify={"between"}>
      <FilterIssuesStatus />

      <Button>
        <Link href="/issues/new">add new issues</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
