import { Flex, Card } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const DetailIssueLoadingPage = () => {
  return (
    <div>
      <Skeleton width={250} />

      <Flex gap="3" my="3">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>

      <Card className="mt-5">
        <Skeleton count={4} />
      </Card>
    </div>
  );
};

export default DetailIssueLoadingPage;
