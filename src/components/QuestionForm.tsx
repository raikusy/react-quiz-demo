import {
  Button,
  Card,
  LoadingOverlay,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthService } from "../hooks/useAuthRoles";
import usePostQuestions from "../hooks/usePostQuestions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IQuestionInput {
  text: string;
}

const schema = yup
  .object({
    text: yup
      .string()
      .required("Question cannot be empty")
      .min(10, "Question should be atleast 10 characters long"),
  })
  .required();

const QuestionForm = () => {
  const theme = useMantineTheme();
  const { mutateAsync, isLoading } = usePostQuestions();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IQuestionInput>({
    resolver: yupResolver(schema),
  });

  const { user } = useAuthService();

  const onSubmit: SubmitHandler<IQuestionInput> = async (values) => {
    await mutateAsync({ ...values, creatorId: user?.id });
    reset();
  };
  return (
    <Card radius="lg" shadow="md" sx={{ marginBottom: theme.spacing.lg }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ position: "relative" }}>
        <LoadingOverlay visible={isLoading} />
        <Textarea
          disabled={isLoading}
          placeholder="Write your question..."
          label="Post a question"
          required
          error={errors?.text?.message}
          sx={{ marginBottom: 16 }}
          {...register("text")}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button loading={isLoading} disabled={isLoading} type="submit">
            Post Question
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default QuestionForm;
