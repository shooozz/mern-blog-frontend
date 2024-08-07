import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { fetchPosts, selectPosts, selectPostsStatus } from "../redux";

const usePostsData = (tabValue: number) => {
    const dispatch = useAppDispatch();
    const posts = useSelector(selectPosts);
    const postsStatus = useSelector(selectPostsStatus);

    useEffect(() => {
        const sortBy = tabValue === 0 ? "createdAt" : "viewsCount";
        dispatch(fetchPosts({ sortBy }));
    }, [dispatch, tabValue]);

    return { posts, postsStatus };
};

export default usePostsData;
