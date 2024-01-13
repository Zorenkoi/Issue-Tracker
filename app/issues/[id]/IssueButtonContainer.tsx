"use client";
import { Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";

const IssueButtonContainer = ({ children }: PropsWithChildren) => {
  const { status } = useSession();

  if (status === "unauthenticated") return null;

  return (
    <Flex direction="column" gap={"4"}>
      {children}
    </Flex>
  );
};

export default IssueButtonContainer;
