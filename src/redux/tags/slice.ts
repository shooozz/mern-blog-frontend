import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
    const { data } = await axios.get("/tags");
    return data;
});

const initialState = {
    items: [],
    status: "loading",
};

const tagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Получение тегов
            .addCase(fetchTags.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = "loaded";
            })
            .addCase(fetchTags.rejected, (state) => {
                state.items = [];
                state.status = "error";
            });
    },
});

export const tagsReducer = tagsSlice.reducer;
