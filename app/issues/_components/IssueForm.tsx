"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = handleSubmit(async (data: IssueFormData) => {
    setSubmitting(true);

    try {
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }

      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError("unexpected error");
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <div className="space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>

        <ErrorMessage isShowed={errors.title}>
          {errors.title?.message}
        </ErrorMessage>

        <Controller
          control={control}
          name="description"
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage isShowed={errors.description}>
          {errors.description?.message}
        </ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue ? "Edit issue" : "Submit new issue"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
