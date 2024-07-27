import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async ({ sortBy = "createdAt", sortOrder = "desc" } = {}) => {
        const { data } = await axios.get(
            `/posts?sortBy=${sortBy}&sortOrder=${sortOrder}`
        );
        return data;
    }
);

export const fetchRemovePost = createAsyncThunk(
    "posts/fetchRemovePost",
    async (id) => {
        await axios.delete(`/posts/${id}`);
    }
);

const initialState = {
    posts: {
        items: [],
        status: "loading",
    },
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Получение статей
            .addCase(fetchPosts.pending, (state) => {
                state.posts.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts.items = action.payload;
                state.posts.status = "loaded";
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.posts.items = [];
                state.posts.status = "error";
            })
            // Удаление статьи
            .addCase(fetchRemovePost.pending, (state, action) => {
                state.posts.items = state.posts.items.filter(
                    (obj) => obj._id !== action.meta.arg
                );
            })
            .addCase(fetchRemovePost.rejected, (state) => {
                state.posts.status = "error";
            });
    },
});

export const postsReducer = postsSlice.reducer;
