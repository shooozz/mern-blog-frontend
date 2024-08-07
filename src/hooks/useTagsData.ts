import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { fetchTags, selectTags, selectTagsStatus } from "../redux";

const useTagsData = () => {
    const dispatch = useAppDispatch();
    const tags = useSelector(selectTags);
    const tagsStatus = useSelector(selectTagsStatus);

    useEffect(() => {
        dispatch(fetchTags());
    }, [dispatch]);

    return { tags, tagsStatus };
};

export default useTagsData;
