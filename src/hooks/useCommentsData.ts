import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { fetchComments, selectComments } from "../redux";

const useCommentsData = () => {
    const dispatch = useAppDispatch();
    const comments = useSelector(selectComments);

    useEffect(() => {
        dispatch(fetchComments());
    }, [dispatch]);

    return comments;
};

export default useCommentsData;
