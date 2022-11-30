import { Suspense, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetAllFirebase } from "../app/modules/Firebase/GetBoardDataSlice";
import PoseListLoading from "../components/PoseListLoading";
import PostList from "../components/PostList";

const PostListSuspense = () => {
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
      <Suspense fallback={<PoseListLoading />}>
        <PostList board={getBoard} />
      </Suspense>
    </div>
  );
};

export default PostListSuspense;
