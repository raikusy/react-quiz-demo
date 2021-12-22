import { Card, Divider, Group, Text, useMantineTheme } from "@mantine/core";
import dayjs from "dayjs";
import React from "react";
import { IQuestion } from "../interfaces/question";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAuthService } from "../hooks/useAuthRoles";
import AnswerForm from "./AnswerForm";
import AnswerCard from "./AnswerCard";

dayjs.extend(relativeTime);

interface IQuestionCardProps {
  question: IQuestion;
}

const QuestionCard: React.FC<IQuestionCardProps> = ({ question }) => {
  const theme = useMantineTheme();
  const { user } = useAuthService();
  return (
    <Card
      padding="lg"
      radius="lg"
      shadow="md"
      sx={{ marginBottom: theme.spacing.lg }}
    >
      <Group position="apart" style={{ marginBottom: theme.spacing.xs }}>
        <Text size="xl" weight={700}>
          Q: {question.text}
        </Text>
        <Text size="xs">{dayjs(question.createdAt)?.toNow(true)} ago</Text>
      </Group>

      <Divider
        my="sm"
        label={
          question?.answers?.length
            ? `${question?.answers?.length} answers posted`
            : "No answer posted yet!"
        }
        labelPosition="center"
      />

      {question?.answers?.map((ans) => (
        <Card.Section key={ans.id}>
          <AnswerCard ans={ans} />
        </Card.Section>
      ))}
      {user?.role === "USER" && (
        <Card.Section>
          <AnswerForm question={question} />
        </Card.Section>
      )}
    </Card>
  );
};

export default QuestionCard;
