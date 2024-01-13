import { Text } from "@radix-ui/themes";
import React, { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  isShowed: any;
  children: ReactNode;
}

const ErrorMessage = ({ isShowed, children }: Props) => {
  if (!isShowed) return null;

  return (
    <Text color="red" as="p">
      {children}
    </Text>
  );
};

export default ErrorMessage;
