import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchComments = createAsyncThunk("/comments", async () => {
    const { data } = await axios.get(`/comments`);
    return data;
});

export const fetchRemoveComments = createAsyncThunk(
    "posts/fetchRemovePost",
    async (id) => {
        await axios.delete(`/comments/${id}`);
    }
);

const initialState = {
    comments: {
        items: [],
        status: "loading",
    },
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Получение комментариев
            .addCase(fetchComments.pending, (state) => {
                state.comments.status = "loading";
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.comments.items = action.payload;
                state.comments.status = "loaded";
            })
            .addCase(fetchComments.rejected, (state) => {
                state.comments.items = [];
                state.comments.status = "error";
            });
    },
});

export const commentsReducer = commentsSlice.reducer;
