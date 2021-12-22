import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IQuestion } from "../interfaces/question";

const usePostQuestions = () => {
  const queryClient = useQueryClient();
  const postQuestionApi = async (data: Partial<IQuestion>) => {
    const res = await axios.post<IQuestion>("/api/question", data);

    return res.data;
  };

  return useMutation(postQuestionApi, {
    mutationKey: "question",
    onSuccess: () => {
      queryClient.invalidateQueries("questions");
    },
  });
};

export default usePostQuestions;
