import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/forms/LoginForm";
import SignUp from "./components/forms/SignUpForm";
import PrivateRoute from "./components/PrivateRoute";
import DashboardRouter from "./components/layout/DashboardRouter";

const App = () => (
  <Router>
    <Routes>
      {/* 認証不要 */}
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* 認証が必要なすべてのページはここで包む */}
      <Route
        path="*"
        element={
          <PrivateRoute>
            <DashboardRouter />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
);

export default App;
