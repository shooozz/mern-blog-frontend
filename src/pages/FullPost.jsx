import React from "react";
import { useParams } from "react-router-dom";

import { Post, CommentsBlock, AddComment } from "../components";

import axios from "../axios";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import useUserData from "../hooks/useUserData";
import usePost from "../hooks/usePostById";
import useCommentsByPost from "../hooks/useCommentByPost";

export const FullPost = () => {
    const { id } = useParams();
    const { post, isLoading } = usePost(id);
    const user = useUserData();
    const [comment, setComment] = React.useState("");
    const { comments, setComments } = useCommentsByPost(post);

    const addComment = async () => {
        try {
            const fields = {
                text: comment,
                user: user._id,
                postId: id,
            };
            await axios.post(`/comments`, fields);
            setComment("");

            const newComment = {
                text: comment,
                user: { fullName: user.fullName, avatarUrl: user.avatarUrl },
            };

            setComments((prevComments) => [...prevComments, newComment]);
        } catch (err) {
            console.log(err);
            alert("Error to create comment");
        }
    };

    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost />;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <>
            <Post
                id={post._id}
                title={post.title}
                imageUrl={
                    post.imageUrl ? `http://localhost:4444${post.imageUrl}` : ""
                }
                user={post.user}
                createdAt={format(
                    new Date(post.createdAt),
                    "dd MMM yyyy HH:mm:ss"
                )}
                viewsCount={post.viewsCount}
                commentsCount={comments.length}
                tags={post.tags}
                isFullPost
            >
                <ReactMarkdown>{post.text}</ReactMarkdown>
            </Post>
            <CommentsBlock
                items={comments.map((comment, index) => ({
                    user: {
                        fullName: comment.user?.fullName || "Unknown",
                        avatarUrl: comment.user?.avatarUrl || "",
                    },
                    text: comment.text,
                    key: index,
                }))}
                isLoading={isLoading}
            >
                <AddComment
                    addComment={addComment}
                    comment={comment}
                    setComment={setComment}
                    user={user}
                />
            </CommentsBlock>
        </>
    );
};
