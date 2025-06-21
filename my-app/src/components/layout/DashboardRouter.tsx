// components/templates/dashboard/DashboardRouter.tsx
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "../templates/dashboard/Dashboard";
import HomePage from "../../pages/HomePage";
import PostPage from "../../pages/PostPage";
import ProfilePage from "../../pages/ProfilePage";
import UserPostsPage from "../../pages/UserPostsPage";

const DashboardRouter = () => {
  const location = useLocation();

  return (
    <Dashboard>
      <Routes location={location}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/users/:userId" element={<UserPostsPage />} />
      </Routes>
    </Dashboard>
  );
};

export default DashboardRouter;
