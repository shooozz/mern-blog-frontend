import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { commentsReducer } from "./slices/comments";
import { tagsReducer } from "./slices/tags";

const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
        comments: commentsReducer,
        tags: tagsReducer,
    },
});

export default store;
