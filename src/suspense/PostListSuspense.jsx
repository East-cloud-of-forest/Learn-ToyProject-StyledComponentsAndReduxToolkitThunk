import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetAllFirebase } from "../app/modules/Firebase/GetBoardDataSlice";
import PoseListLoading from "../components/PoseListLoading";
import PostList from "../components/PostList";

const PostListSuspense = () => {
  const dispatch = useDispatch();
  const { board, status } = useSelector((state) => ({
    board: state.board,
    status: state.board.status,
  }));
  const [forSuspenseSetDispatch, setForSuspenseSetDispatch] = useState(
    new Promise((res) => {
      res(Error);
    })
  );
  useEffect(() => {
    setForSuspenseSetDispatch(dispatch(asyncGetAllFirebase()));
  }, [dispatch]);

  const promise = useMemo(() => {
    return forSuspenseSetDispatch;
  }, [forSuspenseSetDispatch]);

  const getBoard = useCallback(() => {
    if (status === "loading") {
      throw promise;
    }
    return board;
  }, [status, promise, board]);

  return (
    <div>
      <Suspense fallback={<PoseListLoading />}>
        <PostList board={getBoard} />
      </Suspense>
    </div>
  );
};

export default PostListSuspense;
