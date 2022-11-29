import { Suspense, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetAllFirebase } from "../app/modules/Firebase/GetBoardDataSlice";
import PostListComponent from "../components/PostListComponent";

const PostList = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const status = useSelector((state) => state.board.status);

  const promise = useMemo(() => {
    return dispatch(asyncGetAllFirebase());
  }, [dispatch]);

  const getBoard = useCallback(() => {
    if (status === "loading") {
      throw promise;
    }
    return board;
  }, [status, promise, board]);

  return (
    <div>
      <Suspense fallback={<p>로딩중</p>}>
        <PostListComponent board={getBoard} />
      </Suspense>
    </div>
  );
};

export default PostList;
