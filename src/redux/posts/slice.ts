import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { FetchPostsParams, Post, PostsState } from "./types";
import { Status } from "../types";

export const fetchPosts = createAsyncThunk<Post[], FetchPostsParams>(
    "posts/fetchPosts",
    async ({ sortBy = "createdAt", sortOrder = "desc" } = {}) => {
        const { data } = await axios.get(
            `/posts?sortBy=${sortBy}&sortOrder=${sortOrder}`
        );
        return data;
    }
);

export const fetchPostById = createAsyncThunk<Post, FetchPostsParams>(
    "posts/fetchPostById",
    async (postId) => {
        const { data } = await axios.get(`/posts/${postId}`);
        return data;
    }
);

export const fetchRemovePost = createAsyncThunk<void, string>(
    "posts/fetchRemovePost",
    async (id) => {
        await axios.delete(`/posts/${id}`);
    }
);

const initialState: PostsState = {
    items: [],
    currentPost: null,
    status: Status.LOADING,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Получение статей
            .addCase(fetchPosts.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.items = [];
                state.status = Status.ERROR;
            })
            // Получение одной статьи
            .addCase(fetchPostById.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.currentPost = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchPostById.rejected, (state) => {
                state.currentPost = null;
                state.status = Status.ERROR;
            })
            // Удаление статьи
            .addCase(fetchRemovePost.pending, (state, action) => {
                state.items = state.items.filter(
                    (obj) => obj._id !== action.meta.arg
                );
            })
            .addCase(fetchRemovePost.rejected, (state) => {
                state.status = Status.ERROR;
            });
    },
});

export const postsReducer = postsSlice.reducer;
