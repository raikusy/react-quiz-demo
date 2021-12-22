import { Center, Container, Loader } from "@mantine/core";
import Header from "../components/Header";
import QuestionCard from "../components/QuestionCard";
import QuestionForm from "../components/QuestionForm";

import { useQuestions } from "../hooks/useGetQuestions";

const AdminHome = () => {
  const { data, isLoading } = useQuestions();

  return (
    <Container>
      <Header />
      <QuestionForm />
      {isLoading && (
        <Center>
          <Loader variant="bars" />
        </Center>
      )}

      {data?.questions?.map((q) => (
        <QuestionCard key={q.id} question={q} />
      ))}
    </Container>
  );
};

export default AdminHome;
