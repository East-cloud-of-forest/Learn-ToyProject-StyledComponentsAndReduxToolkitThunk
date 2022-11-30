import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "../pages/Board";
import Main from "../pages/Main";
import Header from "./Header";
import Wtite from "../pages/Wtite";
import PostListSuspense from "../suspense/PostListSuspense";
import PostSuspense from "../suspense/PostSuspense";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" index element={<Main />} />
        <Route path="/board" element={<Board />}>
          <Route path="" index element={<PostListSuspense />} />
          <Route path=":id" element={<PostSuspense />} />
        </Route>
        <Route path="/write">
          <Route path="" element={<Wtite />} />
          <Route path=":id" element={<Wtite />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
