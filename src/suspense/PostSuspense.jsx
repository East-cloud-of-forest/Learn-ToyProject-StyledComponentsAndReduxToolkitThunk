import { useState } from "react";
import { useEffect } from "react";
import { Suspense, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { asyncGetOneFirebase } from "../app/modules/Firebase/GetPostDataSlice";
import Post from "../components/Post";
import PostLoading from "../components/PostLoading";

const PostSuspense = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { post, status } = useSelector((state) => ({
    post: state.post.data,
    status: state.post.status,
  }));

  const [forSuspenseSetDispatch, setForSuspenseSetDispatch] = useState(
    new Promise((res) => {
      res(Error);
    })
  );
  useEffect(() => {
    setForSuspenseSetDispatch(dispatch(asyncGetOneFirebase(params.id)));
  }, [dispatch, params.id]);

  const promise = useMemo(() => {
    return forSuspenseSetDispatch;
  }, [forSuspenseSetDispatch]);

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
