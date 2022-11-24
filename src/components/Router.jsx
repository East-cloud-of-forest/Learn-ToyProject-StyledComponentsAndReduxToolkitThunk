import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "../pages/Board";
import Main from "../pages/Main";
import Post from "../pages/Post";
import Header from "./Header";
import PostList from "./PostList";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" index element={<Main />} />
        <Route path="/board" element={<Board />}>
          <Route path="" index element={<PostList />} />
          <Route path=":id" element={<Post />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
