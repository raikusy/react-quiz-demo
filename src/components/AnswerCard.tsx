import { Button, Card, Group, Text, useMantineTheme } from "@mantine/core";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useAuthService } from "../hooks/useAuthRoles";
import { IAnswer } from "../interfaces/answer";
import AnswerEdit from "./AnswerEdit";

interface IAnswerCardProp {
  ans: IAnswer;
}

const AnswerCard: React.FC<IAnswerCardProp> = ({ ans }) => {
  const theme = useMantineTheme();
  const { user } = useAuthService();
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };
  return (
    <Card
      withBorder
      key={ans?.id}
      padding="md"
      sx={{
        margin: theme.spacing.xs,
        backgroundColor: theme.colors.gray[0],
      }}
    >
      <Group position="apart" style={{ marginBottom: theme.spacing.xs }}>
        <Text color="blue">
          Answered by:{" "}
          <Text component="strong" color="blue">
            {ans?.submittedBy?.name}
          </Text>
        </Text>
        {user?.id === ans?.submittedBy?.id && !editMode && (
          <Button
            variant="outline"
            size="xs"
            color="orange"
            compact
            uppercase
            onClick={toggleEditMode}
          >
            Edit
          </Button>
        )}
      </Group>
      {editMode ? (
        <AnswerEdit answer={ans} toggleEditMode={toggleEditMode} />
      ) : (
        <Text>{ans.text}</Text>
      )}

      <Text size="xs">{dayjs(ans.submittedAt)?.toNow(true)} ago</Text>
    </Card>
  );
};

export default AnswerCard;
