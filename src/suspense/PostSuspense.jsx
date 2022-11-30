import { Suspense, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { asyncGetOneFirebase } from "../app/modules/Firebase/GetPostDataSlice";
import Post from "../components/Post";
import PostLoading from "../components/PostLoading";

const PostSuspense = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.data);
  const status = useSelector((state) => state.post.status);
  console.log(status);

  const promise = useMemo(() => {
    return dispatch(asyncGetOneFirebase(params.id));
  }, [dispatch, params]);

  const getPost = useCallback(() => {
    if (status === "loading") {
      throw promise;
    }
    return post;
  }, [status, promise, post]);

  return (
    <div>
      <Suspense fallback={<PostLoading />}>
        <Post getPost={getPost} params={params} />
      </Suspense>
    </div>
  );
};

export default PostSuspense;
