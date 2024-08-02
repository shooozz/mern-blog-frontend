import { RootState } from "../store";

export const selectTags = (state: RootState) => state.tags.items;
export const selectTagsStatus = (state: RootState) => state.tags.status;
