import { RootState } from "../store";

export const selectComments = (state: RootState) =>
    state.comments.comments.items;
export const selectCommentsStatus = (state: RootState) =>
    state.comments.comments.status;
