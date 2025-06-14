import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserList } from "./components/UserList";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<UserList />} />
    </Routes>
  </Router>
);

export default App;
