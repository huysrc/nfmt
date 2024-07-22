import { ApiRedirect, ApiResponse } from "@api/ApiResponse";

export interface UserProfile {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

export type UserProfileResponse = ApiResponse<{
    user: UserProfile
}> | ApiRedirect