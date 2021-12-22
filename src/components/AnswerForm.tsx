import { Button, Card, LoadingOverlay, Textarea } from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthService } from "../hooks/useAuthRoles";
import usePostAnswers from "../hooks/usePostAnswers";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IQuestion } from "../interfaces/question";

interface IAnswerInput {
  text: string;
}

interface IAnswerFormProp {
  question: IQuestion;
}

const schema = yup
  .object({
    text: yup
      .string()
      .required("Answer cannot be empty")
      .min(3, "Answer should be atleast 3 characters long"),
  })
  .required();

const AnswerForm: React.FC<IAnswerFormProp> = ({ question }) => {
  // const theme = useMantineTheme();
  const { mutateAsync, isLoading } = usePostAnswers();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAnswerInput>({
    resolver: yupResolver(schema),
  });

  const { user } = useAuthService();

  const onSubmit: SubmitHandler<IAnswerInput> = async (values) => {
    await mutateAsync({
      ...values,
      questionId: question?.id,
      submittedById: user?.id,
    });
    reset();
  };
  return (
    <Card radius="lg" padding="md">
      <form onSubmit={handleSubmit(onSubmit)} style={{ position: "relative" }}>
        <LoadingOverlay visible={isLoading} />
        <Textarea
          disabled={isLoading}
          placeholder="Post a Answer"
          label="Type your Answer"
          required
          error={errors?.text?.message}
          sx={{ marginBottom: 16 }}
          {...register("text")}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button loading={isLoading} disabled={isLoading} type="submit">
            Submit Answer
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AnswerForm;
