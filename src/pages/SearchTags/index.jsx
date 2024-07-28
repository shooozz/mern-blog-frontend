import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Post } from "../../components";
import axios from "../../axios";

export const SearchTags = () => {
    const { name } = useParams();
    const userData = useSelector((state) => state.auth.data);
    const [filteredPosts, setFilteredPosts] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);

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
    }, [name]);

    return (
        <Grid container spacing={4}>
            <Grid xs={8} item>
                {(isLoading ? [...Array(5)] : filteredPosts).map((obj, index) =>
                    isLoading ? (
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
                            commentsCount={obj.commentsCount}
                            tags={obj.tags}
                            isLoading={false}
                            isEditable={userData?._id === obj.user._id}
                        />
                    )
                )}
            </Grid>
        </Grid>
    );
};
