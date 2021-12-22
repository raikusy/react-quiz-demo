import { Container, Center, Loader } from "@mantine/core";
import Header from "../components/Header";
import QuestionCard from "../components/QuestionCard";
// import QuestionForm from "../components/QuestionForm";
import { useQuestions } from "../hooks/useGetQuestions";

const UserHome = () => {
  const { data, isLoading } = useQuestions();
  return (
    <Container>
      <Header />

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

export default UserHome;
