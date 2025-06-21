import { Routes, Route, useLocation } from "react-router-dom";
import DashboardLayout from "../templates/dashboard/Dashboard";
import HomePage from "../../pages/HomePage";
import PostPage from "../../pages/PostPage";
import ProfilePage from "../../pages/ProfilePage";
import UserPostsPage from "../../pages/UserPostsPage";
import { useState } from "react";

const DashboardRouter = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <DashboardLayout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
      <Routes location={location}>
        <Route
          path="/home"
          element={
            <HomePage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          }
        />
        <Route
          path="/posts/:postId"
          element={
            <PostPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          }
        />
        <Route
          path="/users/:userId"
          element={
            <UserPostsPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRouter;
