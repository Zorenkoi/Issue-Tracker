"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  countItems: number;
  currentPage: number;
  countItemsForPage: number;
}

const Pagination = ({ countItems, countItemsForPage, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const countPages = Math.ceil(countItems / countItemsForPage);

  if (countPages <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(page));

    router.push(`?${params.toString()}`);
  };

  return (
    <Flex gap={"4"} align={"center"}>
      <Text size={"2"}>
        Page {currentPage} of {countPages}
      </Text>

      <Button
        onClick={() => changePage(1)}
        disabled={currentPage === 1}
        color="gray"
        variant="soft"
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        color="gray"
        variant="soft"
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === countPages}
        color="gray"
        variant="soft"
      >
        <ChevronRightIcon />
      </Button>
      <Button
        onClick={() => changePage(countPages)}
        disabled={currentPage === countPages}
        color="gray"
        variant="soft"
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
