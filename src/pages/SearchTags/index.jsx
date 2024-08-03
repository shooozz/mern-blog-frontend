import { Grid, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CommentsBlock, Post, TagsBlock } from "../../components";
import axios from "../../axios";

import { format } from "date-fns";
import { selectTags, selectTagsStatus } from "../../redux/tags/selector";
import { useAppDispatch } from "../../redux/store";
import { fetchTags } from "../../redux/tags/slice";
import { useTheme } from "@emotion/react";

export const SearchTags = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const dispatch = useAppDispatch();
    const { name } = useParams();
    const userData = useSelector((state) => state.auth.data);
    const [filteredPosts, setFilteredPosts] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);
    const tags = useSelector(selectTags);
    const tagsStatus = useSelector(selectTagsStatus);

    const isTagsLoading = tagsStatus === "loading";

    React.useEffect(() => {
        axios
            .get(`/tags/${name}`)
            .then((res) => {
                setFilteredPosts(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                alert("Error to get articles");
            });
    }, [name, tags]);

    React.useEffect(() => {
        dispatch(fetchTags());
    }, [dispatch]);

    return (
        <>
            {isMobile ? (
                <Grid container spacing={0}>
                    <Grid xs={12} item>
                        <TagsBlock items={tags} isLoading={isTagsLoading} />
                    </Grid>
                    <Grid xs={12} item>
                        {(isLoading ? [...Array(5)] : filteredPosts).map(
                            (obj, index) =>
                                isLoading ? (
                                    <Post key={index} isLoading={true} />
                                ) : (
                                    <Post
                                        key={obj._id}
                                        _id={obj._id}
                                        title={obj.title}
                                        imageUrl={
                                            obj.imageUrl
                                                ? `https://backend-blog-gules.vercel.app/${obj.imageUrl}`
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
                </Grid>
            ) : (
                <Grid container spacing={4}>
                    <Grid xs={8} item>
                        {(isLoading ? [...Array(5)] : filteredPosts).map(
                            (obj, index) =>
                                isLoading ? (
                                    <Post key={index} isLoading={true} />
                                ) : (
                                    <Post
                                        key={obj._id}
                                        _id={obj._id}
                                        title={obj.title}
                                        imageUrl={
                                            obj.imageUrl
                                                ? `https://backend-blog-gules.vercel.app/${obj.imageUrl}`
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
                </Grid>
            )}
        </>
    );
};
