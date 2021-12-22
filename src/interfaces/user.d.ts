import { IAnswer } from "./answer";
import { IQuestion } from "./question";

export interface IUserObject {
  id: number;
  name: string;
  username: string;
  password: string;
  questions?: Array<IQuestion>
  answers?: Array<IAnswer>
  role: "ADMIN" | "USER";
}