"use client";
import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteButton = ({ issueId }: { issueId: number }) => {
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const deleteIssue = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={isDeleting} color="red">
            Delete issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content>
          <AlertDialog.Title>Delete Confirmation</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure that you want to delete this issue?
          </AlertDialog.Description>

          <Flex gap={"4"} mt={"4"}>
            <AlertDialog.Cancel>
              <Button color="gray" variant="soft">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={deleteIssue}>
                Delete issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            issue couldnt be deleted
          </AlertDialog.Description>

          <Flex gap={"4"} mt={"4"}>
            <AlertDialog.Cancel>
              <Button
                onClick={() => setError(false)}
                color="gray"
                variant="soft"
              >
                Ok
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteButton;
