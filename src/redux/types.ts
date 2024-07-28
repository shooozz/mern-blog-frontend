export enum Status {
    LOADING = "loading",
    SUCCESS = "loaded",
    ERROR = "error",
}

export type Comment = {
    _id: string;
    text: string;
    user: {
        _id: string;
        fullName: string;
        avatarUrl?: string;
    };
    postId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type User = {
    _id: string;
    fullName: string;
    email: string;
    passwordHash?: string;
    avatarUrl?: string;
    createdAt?: string;
    updatedAt?: string;
    __v: number;
};
