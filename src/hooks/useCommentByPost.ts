import { useState, useEffect } from "react";

// @ts-ignore
const useCommentsByPost = (post) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (post && post.comments) {
            setComments(post.comments);
        }
    }, [post]);

    return { comments, setComments };
};

export default useCommentsByPost;
