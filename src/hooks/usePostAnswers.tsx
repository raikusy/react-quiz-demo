import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IAnswer } from "../interfaces/answer";
// import { IQuestion } from "../interfaces/question";

const usePostAnswers = () => {
  const queryClient = useQueryClient();
  const postAnswerApi = async (data: Partial<IAnswer>) => {
    const res = await axios.post<IAnswer>(
      `/api/question/${data?.questionId}/answer`,
      data
    );

    return res.data;
  };

  return useMutation(postAnswerApi, {
    mutationKey: "answer",
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries("questions");
    },
  });
};

export default usePostAnswers;
