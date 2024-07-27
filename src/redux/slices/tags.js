import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
    const { data } = await axios.get("/tags");
    return data;
});

const initialState = {
    tags: {
        items: [],
        status: "loading",
    },
};

const tagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Получение тегов
            .addCase(fetchTags.pending, (state) => {
                state.tags.status = "loading";
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.tags.items = action.payload;
                state.tags.status = "loaded";
            })
            .addCase(fetchTags.rejected, (state) => {
                state.tags.items = [];
                state.tags.status = "error";
            });
    },
});

export const tagsReducer = tagsSlice.reducer;
