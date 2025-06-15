import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/forms/LoginForm";
import SignUp from "./components/forms/SignUpForm";
import Dashboard from "./components/templates/dashboard/Dashboard";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Dashboard />} />
    </Routes>
  </Router>
);

export default App;
