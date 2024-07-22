import User, { IUser } from './../../models/user/UserModel';
import { IUserProfile } from "../../models/user/UserProfileModel";
import { UserRequestBody } from "./UserValidator";
import {
    createUserProfile,
    findUserProfileByIdAndDelete,
    findUserProfileByIdAndUpdate
} from "./profile/UserProfileService";
import { getUserProfileToUpdate } from "./profile/UserProfileValidator";

export const createNewUser = async (data: UserRequestBody) => {
    // Create new user profile and save to the database.
    const profileData : Partial<IUserProfile> = {
        avatarUrl: data.profile?.avatarUrl || '',
        firstName: data.profile?.firstName || '',
        lastName: data.profile?.lastName || '',
    };
    const profile = await createUserProfile(profileData);
    if (!profile) {
        return null;
    }

    if (!data) {
        return null;
    }

    // Create a new user link with the new profile.id
    try {
        const userData : Partial<IUser> = {
            username: data.username,
            email: data.email,
            password: data.password,
            roles: data.roles,
            _profileId: profile.id,
        };
        const user = new User(userData);
        await user.save();
        return user;
    } catch (err) {
        // Cannot create a new user, delete the unused profile.
        await findUserProfileByIdAndDelete(profile.id);
    }
}

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    return User.findOne({ email: email });
};

export const findUserByUsername = async (username: string): Promise<IUser | null> => {
    return User.findOne({ username: username });
};

export const findUserById = async (id: string): Promise<IUser | null> => {
    return User.findById(id);
};

export const findUserByIdAndUpdate = async (id: string, data: UserRequestBody): Promise<IUser | null> => {
    const userData : Partial<IUser> = {
        username: data.username,
        email: data.email,
        password: data.password,
        roles: data.roles,
    };
    const user = await User.findByIdAndUpdate(id, userData, { new: true }) as IUser;

    if (user && data.profile) {
        const profile = getUserProfileToUpdate(data.profile);
        if (profile) {
            await findUserProfileByIdAndUpdate(user._profileId.toString(), profile);
        }
    }

    return user;
};

export const findUserByIdAndDelete = async (id: string): Promise<IUser | null> => {
    const user = await User.findByIdAndDelete(id) as IUser;
    if (user) {
        await findUserProfileByIdAndDelete(user._profileId.toString());
    }
    return user;
};

export const isUniqueEmail = async (userId: string, email: string): Promise<boolean> => {
    const user = await findUserByEmail(email);
    return !user || user.id === userId;
};

export const isUniqueUsername = async (userId: string, username: string): Promise<boolean> => {
    const user = await findUserByEmail(username);
    return !user || user.id === userId;
};
