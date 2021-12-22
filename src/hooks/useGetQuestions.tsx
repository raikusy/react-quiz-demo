import axios from "axios";
import constate from "constate";
import { useQuery } from "react-query";
import { IQuestion } from "../interfaces/question";

const useGetQuestions = () => {
  const fetchQuestionApi = async () => {
    const res = await axios.get<{ questions: Array<IQuestion> }>(
      "/api/question"
    );

    return res.data;
  };
  return useQuery("questions", fetchQuestionApi);
};

export const [QuestionsProvider, useQuestions] = constate(useGetQuestions);
