import { Button, Textarea } from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IAnswer } from "../interfaces/answer";
import useEditAnswer from "../hooks/useEditAnswer";

interface IAnswerInput {
  text: string;
}

interface IAnswerEditProp {
  answer: IAnswer;
  toggleEditMode: () => void;
}

const schema = yup
  .object({
    text: yup
      .string()
      .required("Answer cannot be empty")
      .min(3, "Answer should be atleast 3 characters long"),
  })
  .required();

const AnswerEdit: React.FC<IAnswerEditProp> = ({ answer, toggleEditMode }) => {
  const { mutateAsync, isLoading } = useEditAnswer();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAnswerInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      text: answer?.text,
    },
  });

  const onSubmit: SubmitHandler<IAnswerInput> = async (values) => {
    await mutateAsync({
      ...values,
      id: answer?.id,
    });
    reset();
    toggleEditMode();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ position: "relative" }}>
      <Textarea
        disabled={isLoading}
        placeholder="Post a Answer"
        label="Type your Answer"
        required
        defaultValue={answer?.text}
        error={errors?.text?.message}
        sx={{ marginBottom: 16 }}
        {...register("text")}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button compact loading={isLoading} disabled={isLoading} type="submit">
          Update Answer
        </Button>
      </div>
    </form>
  );
};

export default AnswerEdit;
