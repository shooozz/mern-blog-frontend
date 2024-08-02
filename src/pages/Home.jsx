import React from "react";
import { useSelector } from "react-redux";
import { fetchPosts } from "../redux/posts/slice";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsSideInfo";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchComments } from "../redux/comments/slice";
import { fetchTags } from "../redux/tags/slice";
import { useAppDispatch } from "../redux/store";
import { selectPosts, selectPostsStatus } from "../redux/posts/selector";
import { selectTags, selectTagsStatus } from "../redux/tags/selector";
import { selectComments } from "../redux/comments/selector";

import { format } from "date-fns";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { margin } from "@mui/system";

export const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const dispatch = useAppDispatch();
    const userData = useSelector((state) => state.auth.data);
    const posts = useSelector(selectPosts);
    const postsStatus = useSelector(selectPostsStatus);
    const tags = useSelector(selectTags);
    const tagsStatus = useSelector(selectTagsStatus);
    const comments = useSelector(selectComments);
    const [tabValue, setTabValue] = React.useState(0);

    const isPostsLoading = postsStatus === "loading";
    const isTagsLoading = tagsStatus === "loading";

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
            {isMobile ? (
                <>
                    <Tabs
                        style={{ marginBottom: 10, alignItems: "center" }}
                        value={tabValue}
                        aria-label="basic tabs example"
                        onChange={handleChangeTab}
                    >
                        <Tab
                            label="Новые"
                            sx={{ minWidth: 0, padding: "0px 12px" }}
                        />
                        <Tab
                            label="Популярные"
                            sx={{ minWidth: 0, padding: "0px 12px" }}
                        />
                        <TagsBlock items={tags} isLoading={isTagsLoading} />
                    </Tabs>
                    <Grid container spacing={2}>
                        <Grid xs={12} item>
                            {(isPostsLoading ? [...Array(5)] : posts).map(
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
                                            createdAt={format(
                                                new Date(obj.createdAt),
                                                "dd MMM yyyy HH:mm:ss"
                                            )}
                                            viewsCount={obj.viewsCount}
                                            commentsCount={obj.comments.length}
                                            tags={obj.tags}
                                            isLoading={false}
                                            isEditable={
                                                userData?._id === obj.user._id
                                            }
                                        />
                                    )
                            )}
                        </Grid>
                        <Grid xs={12} item>
                            <CommentsBlock items={comments} isLoading={false} />
                        </Grid>
                    </Grid>
                </>
            ) : (
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
                            {(isPostsLoading ? [...Array(5)] : posts).map(
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
                                            createdAt={format(
                                                new Date(obj.createdAt),
                                                "dd MMM yyyy HH:mm:ss"
                                            )}
                                            viewsCount={obj.viewsCount}
                                            commentsCount={obj.comments.length}
                                            tags={obj.tags}
                                            isLoading={false}
                                            isEditable={
                                                userData?._id === obj.user._id
                                            }
                                        />
                                    )
                            )}
                        </Grid>
                        <Grid xs={4} item>
                            <TagsBlock items={tags} isLoading={isTagsLoading} />
                            <CommentsBlock items={comments} isLoading={false} />
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
};
