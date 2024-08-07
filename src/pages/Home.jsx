import React from "react";

import { useMediaQuery, Tabs, Tab, Grid } from "@mui/material";

import { Post, TagsBlock, CommentsBlock } from "../components";

import { format } from "date-fns";
import { useTheme } from "@emotion/react";

import usePostsData from "../hooks/usePostsData";
import useTagsData from "../hooks/useTagsData";
import useCommentsData from "../hooks/useCommentsData";
import useUserData from "../hooks/useUserData";

export const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [tabValue, setTabValue] = React.useState(0);

    const { posts, postsStatus } = usePostsData(tabValue);
    const { tags, tagsStatus } = useTagsData();
    const comments = useCommentsData();
    const userData = useUserData();
    const isPostsLoading = postsStatus === "loading";
    const isTagsLoading = tagsStatus === "loading";

    const handleChangeTab = (_, newValue) => {
        setTabValue(newValue);
    };

    return (
        <>
            {isMobile ? (
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
            ) : (
                <Tabs
                    style={{ marginBottom: 15 }}
                    value={tabValue}
                    aria-label="basic tabs example"
                    onChange={handleChangeTab}
                >
                    <Tab label="Новые" />
                    <Tab label="Популярные" />
                </Tabs>
            )}
            <Grid container spacing={isMobile ? 2 : 4}>
                <Grid xs={isMobile ? 12 : 8} item>
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
                                    isEditable={userData?._id === obj.user._id}
                                />
                            )
                    )}
                </Grid>
                <Grid xs={isMobile ? 12 : 4} item>
                    {isMobile ? (
                        <CommentsBlock items={comments} isLoading={false} />
                    ) : (
                        <>
                            <TagsBlock items={tags} isLoading={isTagsLoading} />
                            <CommentsBlock items={comments} isLoading={false} />
                        </>
                    )}
                </Grid>
            </Grid>
        </>
    );
};
