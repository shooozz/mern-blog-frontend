import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { Status } from "../types";
import { AuthSliceState } from "./types";

export const fetchAuth = createAsyncThunk(
    "auth/fetchUserData",
    async (params) => {
        const { data } = await axios.post("/auth/login", params);
        return data;
    }
);

export const fetchAuthMe = createAsyncThunk(
    "auth/fetchAuthMe",
    async (params) => {
        const { data } = await axios.get("/auth/me");
        return data;
    }
);

export const fetchRegister = createAsyncThunk(
    "auth/fetchRegister",
    async (params) => {
        const { data } = await axios.post("/auth/register", params);
        return data;
    }
);

const initialState: AuthSliceState = {
    data: null,
    status: Status.LOADING,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = Status.LOADING;
                state.data = null;
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.data = null;
                state.status = Status.ERROR;
            })
            .addCase(fetchAuthMe.pending, (state) => {
                state.status = Status.LOADING;
                state.data = null;
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.data = null;
                state.status = Status.ERROR;
            })
            .addCase(fetchRegister.pending, (state) => {
                state.status = Status.LOADING;
                state.data = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.data = null;
                state.status = Status.ERROR;
            });
    },
});

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
