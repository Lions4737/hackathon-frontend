import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/forms/LoginForm";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignIn />} />
    </Routes>
  </Router>
);

export default App;
