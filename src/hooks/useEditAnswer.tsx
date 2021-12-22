import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IAnswer } from "../interfaces/answer";

const useEditAnswer = () => {
  const queryClient = useQueryClient();
  const editAnswerApi = async (data: Partial<IAnswer>) => {
    const res = await axios.put<IAnswer>(`/api/answer/${data?.id}`, data);

    return res.data;
  };

  return useMutation(editAnswerApi, {
    mutationKey: "answer-edit",
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries("questions");
    },
  });
};

export default useEditAnswer;
