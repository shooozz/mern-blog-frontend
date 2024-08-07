import { useEffect } from "react";
import { useAppDispatch } from "../redux/store";
import { fetchPostById, selectCurrentPost, selectPostsStatus } from "../redux";
import { useSelector } from "react-redux";

const usePost = (id: string) => {
    const dispatch = useAppDispatch();
    const post = useSelector(selectCurrentPost);
    const isLoading = useSelector(selectPostsStatus) === "loading";

    useEffect(() => {
        if (id) {
            // @ts-ignore
            dispatch(fetchPostById(id));
        }
    }, [dispatch, id]);

    return { post, isLoading };
};

export default usePost;
