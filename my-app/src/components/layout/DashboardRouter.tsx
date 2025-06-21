// components/templates/dashboard/DashboardRouter.tsx
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "../templates/dashboard/Dashboard";
import HomePage from "../../pages/HomePage";
import PostPage from "../../pages/PostPage";
import ProfilePage from "../../pages/ProfilePage";
import MyPostsPage from "../../pages/MyPostPage";

const DashboardRouter = () => {
  const location = useLocation();

  return (
    <Dashboard>
      <Routes location={location}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-posts" element={<MyPostsPage />} />
      </Routes>
    </Dashboard>
  );
};

export default DashboardRouter;
