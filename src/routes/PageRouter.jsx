import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Notice from "../pages/Notice";
import Attendance from "../pages/Attendance";
import Mypage from "../pages/Mypage";
import StyleGuide from "../pages/StyleGuide";
import Login from "../pages/Login";
import Join from "../pages/Join";
import Layout from "../layout/Layout";
import MainContent from "../pages/MainContent";
import AddPost from "../pages/AddPost";
import PostDetail from "../pages/PostDetail";

import FindPassword from "../pages/FindPassword";
import AttendanceBoardWrite from "../components/Board/AttendanceBoardWrite";
import AttendanceBoardView from "../components/Board/AttendanceBoardView";
import EditMypage from "../pages/EditMypage";
import PostUpdate from "../components/PostComponents/PostUpdate";
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>,
    children: [
      {
        path: "main",
        element: <MainContent />,
      },
      {
        path: "notice",
        element: <Notice />,
      },
      {
        path: "attendance",
        element: <Attendance />,
      },
      {
        path: "attendance/write",
        element: <AttendanceBoardWrite />,
      },
      {
        path: "attendance/view",
        element: <AttendanceBoardView />,
      },
      {
        path: "mypage",
        element: <Mypage />,
      },
      {
        path: "editmypage",
        element: <EditMypage />,
      },
      {
        path: "styleguide",
        element: <StyleGuide />,
      },
      {
        path: "/notice/AddPost",
        element: <AddPost />,
      },
      {
        path: "/posts/:postId",
        element: <PostDetail />,
      },
      {
        path: "/posts/:postId/PostUpdate",
        element: <PostUpdate />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "/findpassword",
    element: <FindPassword />,
  },
]);
export default router;
