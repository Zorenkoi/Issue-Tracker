"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";

import { Skeleton } from "@/app/components";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (error) return null;
  if (isLoading) return <Skeleton />;

  const signUser = (userId: string) => {
    if (userId === "null") {
      axios
        .patch(`/api/issues/${issue.id}`, { assignedToUserId: null })
        .catch(() => toast.error("issue couldn't be unssigned"));
    } else {
      axios
        .patch(`/api/issues/${issue.id}`, { assignedToUserId: userId })
        .catch(() => toast.error("issue couldn't be assigned"));
    }
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "null"}
        onValueChange={signUser}
      >
        <Select.Trigger placeholder="Assignee..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Users</Select.Label>
            <Select.Item value={"null"}>Unsign</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("/api/users");
      return res.data;
    },
    staleTime: 60 * 1000,
    retry: 3,
  });
};

export default AssigneeSelect;
