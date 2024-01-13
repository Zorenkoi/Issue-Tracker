import { Link as RadixLink } from "@radix-ui/themes";
import NextLink from "next/link";
import React from "react";

const TextLink = ({ children, href }: { children: string; href: string }) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default TextLink;
