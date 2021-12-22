import {
  belongsTo,
  createServer,
  hasMany,
  Model,
  RestSerializer,
} from "miragejs";
import { BelongsTo, HasMany } from "miragejs/-types";
import dayjs from "dayjs";
import { IUserObject } from "./interfaces/user";
import { IQuestion } from "./interfaces/question";
import { IAnswer } from "./interfaces/answer";

interface IUserModel extends Omit<IUserObject, "questions" | "answers"> {
  questions?: HasMany<"question">;
  answers?: HasMany<"answer">;
}

interface IQuestionModel extends Omit<IQuestion, "creator" | "answers"> {
  creator: BelongsTo<"user">;
  answers?: HasMany<"answer">;
}

interface IAnswerModel extends Omit<IAnswer, "question" | "submittedBy"> {
  question: BelongsTo<"question">;
  submittedBy: BelongsTo<"user">;
}

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,

    serializers: {
      question: RestSerializer.extend({
        include: ["answers", "creator"],
        embed: true,
      }),
      answer: RestSerializer.extend({
        include: ["submittedBy"],
        embed: true,
      }),
    },

    models: {
      user: Model.extend<Partial<IUserModel>>({
        questions: hasMany("question"),
        answers: hasMany("answer"),
      }),
      question: Model.extend<Partial<IQuestionModel>>({
        answers: hasMany("answer"),
        creator: belongsTo("user"),
      }),
      answer: Model.extend<Partial<IAnswerModel>>({
        question: belongsTo("question"),
        submittedBy: belongsTo("user"),
      }),
    },

    seeds(server) {
      const AdminSeed = server.create("user", {
        name: "Bob",
        username: "admin",
        password: "1234",
        role: "ADMIN",
      } as any);
      const UserSeed = server.create("user", {
        name: "Alice",
        username: "user",
        password: "1234",
        role: "USER",
      } as any);

      const QuestionSeed = server.create("question", {
        id: 1,
        text: "What is your name?",
        creatorId: AdminSeed?.id,
        creator: AdminSeed,
        answers: null,
        createdAt: dayjs().toJSON(),
        deletedAt: null,
      } as any);

      server.create("question", {
        id: 2,
        text: "How old are you?",
        creatorId: AdminSeed?.id,
        creator: AdminSeed,
        answers: null,
        createdAt: dayjs().toJSON(),
        deletedAt: null,
      } as any);

      server.create("answer", {
        id: 1,
        question: QuestionSeed,
        text: "Rakibul",
        submittedBy: UserSeed,
        submittedAt: dayjs().toJSON(),
        deletedAt: null,
        lastEdited: null,
        edited: false,
        editHistory: null,
      } as any);

      server.create("answer", {
        id: 2,
        question: QuestionSeed,
        text: "Hasan",
        submittedBy: UserSeed,
        submittedAt: dayjs().toJSON(),
        deletedAt: dayjs().toJSON(),
        lastEdited: null,
        edited: false,
        editHistory: null,
      } as any);
    },

    routes() {
      this.namespace = "api";

      this.post("/login", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.findBy("user", {
          username: attrs.username,
          password: attrs.password,
        } as any);
      });

      this.get("/question", (schema) => {
        return schema.all("question");
      });

      this.post("/question", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create("question", {
          ...attrs,
          createdAt: dayjs().toJSON(),
        });
      });

      this.put("/question/:id", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const id = request.params.id;
        const question = schema.find("question", id);
        question?.update({ ...question, attrs });
        return question;
      });

      this.delete("/question/:id", (schema, request) => {
        const id = request.params.id;
        const question = schema.find("question", id);
        question?.destroy();

        return {
          success: true,
        };
      });

      this.get("/question/:id/answer", (schema, request) => {
        // const id = request.params.id;
        return schema.all("answer")
      });

      this.post("/question/:id/answer", (schema, request) => {
        const id = request.params.id;
        const question = schema.find('question', id);
        const attrs = JSON.parse(request.requestBody);
        return schema.create("answer", {
          ...attrs,
          question,
          submittedAt: dayjs().toJSON(),
        });
      });

      this.put("/answer/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const answer = schema.find("answer", id);
        answer?.update({
          text: attrs?.text,
          edited: true,
          lastEdited: dayjs().toJSON(),
        });
        return answer;
      });

      this.delete("/answer/:id", (schema, request) => {
        const id = request.params.id;
        const answer = schema.find("answer", id);
        answer?.destroy();
        return {
          success: true,
        };
      });
    },
  });

  return server;
}
