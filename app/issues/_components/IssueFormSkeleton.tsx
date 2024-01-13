import React from "react";
import { Skeleton } from "@/app/components";

const IssueFormSkeleton = () => {
  return (
    <div>
      <Skeleton height={"2rem"} />
      <Skeleton height={300} />
    </div>
  );
};

export default IssueFormSkeleton;
