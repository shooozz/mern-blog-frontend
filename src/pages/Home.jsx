import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchComments } from "../redux/slices/comments";

export const Home = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.data);
    const { posts, tags } = useSelector((state) => state.posts);
    const { comments } = useSelector((state) => state.comments);

    console.log(posts);

    const [tabValue, setTabValue] = React.useState(0);

    const isPostsLoading = posts.status === "loading";
    const isTagsLoading = tags.status === "loading";

    React.useEffect(() => {
        const sortBy = tabValue === 0 ? "createdAt" : "viewsCount";
        dispatch(fetchPosts({ sortBy }));
        dispatch(fetchTags());
        dispatch(fetchComments());
    }, [dispatch, tabValue]);
    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <>
            <Tabs
                style={{ marginBottom: 15 }}
                value={tabValue}
                aria-label="basic tabs example"
                onChange={handleChangeTab}
            >
                <Tab label="Новые" />
                <Tab label="Популярные" />
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {(isPostsLoading ? [...Array(5)] : posts.items).map(
                        (obj, index) =>
                            isPostsLoading ? (
                                <Post key={index} isLoading={true} />
                            ) : (
                                <Post
                                    key={obj._id}
                                    _id={obj._id}
                                    title={obj.title}
                                    imageUrl={
                                        obj.imageUrl
                                            ? `http://localhost:4444${obj.imageUrl}`
                                            : ""
                                    }
                                    user={obj.user}
                                    createdAt={obj.createdAt}
                                    viewsCount={obj.viewsCount}
                                    commentsCount={obj.comments.length}
                                    tags={obj.tags}
                                    isLoading={false}
                                    isEditable={userData?._id === obj.user._id}
                                />
                            )
                    )}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock items={tags.items} isLoading={isTagsLoading} />
                    <CommentsBlock items={comments.items} isLoading={false} />
                </Grid>
            </Grid>
        </>
    );
};
