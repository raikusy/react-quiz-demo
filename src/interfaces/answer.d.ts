import { IQuestion } from "./question";
import { IUserObject } from "./user";

export interface IAnswer {
  id: number;
  questionId?: number;
  question: IQuestion;
  text: string;
  submittedById?: number;
  submittedBy: IUserObject;
  submittedAt: Date;
  deletedAt?: Date;
  lastEdited?: Date;
  edited: boolean;
  editHistory?: Array<{ text: string; date: Date }>;
}