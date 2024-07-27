import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./posts/slice";
import { authReducer } from "./auth/slice";
import { commentsReducer } from "./comments/slice";
import { tagsReducer } from "./tags/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
        comments: commentsReducer,
        tags: tagsReducer,
    },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
