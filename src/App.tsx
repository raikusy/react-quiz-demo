import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuthRoles";
import { QuestionsProvider } from "./hooks/useGetQuestions";
import LoginRoute from "./routes/LoginRoute";
import RoleBasedRoute from "./routes/RoleBasedRoute";

function App() {
  return (
    <AuthProvider>
      <QuestionsProvider>
        <div
          style={{ minHeight: "100vh", backgroundColor: "rgb(248, 249, 250)" }}
        >
          <Routes>
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/" element={<RoleBasedRoute />} />
          </Routes>
        </div>
      </QuestionsProvider>
    </AuthProvider>
  );
}

export default App;
