import React, { useEffect, useState } from "react";
import { Post } from "../components/Post";
import AddComment from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { selectCurrentPost, selectPostsStatus } from "../redux/posts/selector";
import { fetchPostById } from "../redux/posts/slice";
import axios from "../axios";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { format } from "date-fns";

export const FullPost = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const post = useSelector(selectCurrentPost);
    const isLoading = useSelector(selectPostsStatus) === "loading";
    const [user, setUser] = useState({});
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (id) {
            dispatch(fetchPostById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        axios.get("/auth/me").then((res) => {
            setUser(res.data);
        });
    }, []);

    const addComment = async () => {
        try {
            const fields = {
                text: comment,
                user: user._id,
                postId: id,
            };
            await axios.post(`/comments`, fields);
            setComment("");
            // Instead of reloading the page, update the comments state directly
            const newComment = {
                text: comment,
                user: { fullName: user.fullName, avatarUrl: user.avatarUrl },
            };
            if (post && post.comments) {
                post.comments.push(newComment);
            }
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

    console.log(post);

    return (
        <>
            <Post
                id={post._id}
                title={post.title}
                imageUrl={
                    post.imageUrl
                        ? `https://backend-blog-gules.vercel.app/${post.imageUrl}`
                        : ""
                }
                user={post.user}
                createdAt={format(
                    new Date(post.createdAt),
                    "dd MMM yyyy HH:mm:ss"
                )}
                viewsCount={post.viewsCount}
                commentsCount={post.comments ? post.comments.length : 0}
                tags={post.tags}
                isFullPost
            >
                <ReactMarkdown>{post.text}</ReactMarkdown>
            </Post>
            <CommentsBlock
                items={
                    post.comments
                        ? post.comments.map((comment, index) => ({
                              user: {
                                  fullName: comment.user?.fullName || "Unknown",
                                  avatarUrl: comment.user?.avatarUrl || "",
                              },
                              text: comment.text,
                              key: index,
                          }))
                        : []
                }
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
