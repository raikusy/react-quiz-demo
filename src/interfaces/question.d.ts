import { IAnswer } from "./answer";
import { IUserObject } from "./user";

export interface IQuestion {
  id: number;
  text: string;
  creatorId?: number;
  creator: IUserObject;
  answers?: Array<IAnswer>;
  createdAt: Date;
  deletedAt?: Date;
}