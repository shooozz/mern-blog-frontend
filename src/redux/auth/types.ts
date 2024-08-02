export type authMe = {
    _id: string;
    fullName: string;
    email: string;
    passwordHash: string;
    avatarUrl?: string;
    createdAt?: string;
    updatedAt?: string;
    __v: number;
    token: string;
};

export interface AuthSliceState {
    data: authMe | null;
    status: "loading" | "loaded" | "error";
}
