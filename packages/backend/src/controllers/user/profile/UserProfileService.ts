import UserProfile, { IUserProfile } from "../../../models/user/UserProfileModel";
import { UserProfileRequestBody } from "./UserProfileValidator";

export const createUserProfile = async (data: UserProfileRequestBody | IUserProfile | Partial<IUserProfile>) => {
    const profile = new UserProfile(data);
    await profile.save();
    return profile;
}

export const findUserProfileById = async (id: string): Promise<IUserProfile | null> => {
    return UserProfile.findById(id);
};

export const findUserProfileByIdAndUpdate = async (id: string, data: UserProfileRequestBody | IUserProfile | Partial<IUserProfile>) => {
    return UserProfile.findByIdAndUpdate(id, data, { new: true });
};

export const findUserProfileByIdAndDelete = async (id: string) => {
    return UserProfile.findByIdAndDelete(id);
};
