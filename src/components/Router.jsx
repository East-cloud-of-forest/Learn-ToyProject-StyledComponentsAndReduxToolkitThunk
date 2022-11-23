import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "../pages/Board";
import Main from "../pages/Main";
import Header from "./Header";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" index element={<Main />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
