import React from "react";

import { Post } from "../components/Post";
import AddComment from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
    const [user, setUser] = React.useState({});
    const [comment, setComment] = React.useState("");
    const [dataPost, setDataPost] = React.useState();
    const [dataComment, setDataComment] = React.useState();
    const [isLoadingPost, setIsLoadingPost] = React.useState(true);
    const { id } = useParams();

    React.useEffect(() => {
        axios
            .get(`/posts/${id}`)
            .then((res) => {
                setDataPost(res.data);
                setDataComment(res.data.comments);
                setIsLoadingPost(false);
            })
            .catch((err) => {
                console.log(err);
                alert("Error to get articles");
            });
    }, [id]);

    const addComment = async () => {
        try {
            const fields = {
                text: comment,
                user: user._id,
                postId: id,
            };
            await axios.post(`/comments`, fields);
            setComment("");
            window.location.reload();
        } catch (err) {
            console.log(err);
            alert("Error to create comment");
        }
    };

    React.useEffect(() => {
        axios.get("/auth/me").then((res) => {
            setUser(res.data);
        });
    }, []);

    if (isLoadingPost) {
        return <Post isLoading={isLoadingPost} isFullPost />;
    }

    return (
        <>
            {dataPost && (
                <Post
                    id={dataPost._id}
                    title={dataPost.title}
                    imageUrl={
                        dataPost.imageUrl
                            ? `http://localhost:4444${dataPost.imageUrl}`
                            : ""
                    }
                    user={dataPost.user}
                    createdAt={dataPost.createdAt}
                    viewsCount={dataPost.viewsCount}
                    commentsCount={dataComment.length}
                    tags={dataPost.tags}
                    isFullPost
                >
                    <ReactMarkdown children={dataPost.text} />
                </Post>
            )}
            <CommentsBlock
                items={dataComment.map((comment) => ({
                    user: {
                        fullName: comment.user.fullName,
                        avatarUrl: comment.user.avatarUrl,
                    },
                    text: comment.text,
                }))}
                isLoading={isLoadingPost}
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
