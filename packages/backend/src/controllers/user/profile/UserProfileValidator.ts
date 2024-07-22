import { FastifyRequest } from 'fastify';
import { IUserProfile } from "../../../models/user/UserProfileModel";

export interface UserProfileRequestBody {
    avatarUrl: string;
    firstName: string;
    lastName: string;
}

export const isUserProfileRequestBody = (body: any): body is UserProfileRequestBody =>
    (!body.avatarUrl || typeof body.avatarUrl === 'string') &&
    (!body.firstName || typeof body.firstName === 'string') &&
    (!body.lastName || typeof body.lastName === 'string');

export const getUserProfileToUpdate = (body: UserProfileRequestBody) => {
    if (body.avatarUrl ||
        body.firstName ||
        body.lastName) {
        const userProfile : Partial<IUserProfile> = {
            avatarUrl: body.avatarUrl,
            firstName: body.firstName,
            lastName: body.lastName,
        };
        return userProfile;
    }
    return null;
}

export const getUserProfileRequestBody = (request: FastifyRequest) => {
    const body = request.body;
    if (!isUserProfileRequestBody(body)) {
        return null; // or throw an error
    }

    const { avatarUrl, firstName, lastName } = body;
    if ((!avatarUrl || validateAvatarUrl(avatarUrl)) &&
        (!firstName || validateFirstname(firstName)) &&
        (!lastName || validateLastname(lastName))) {
        return body;
    }
};

export const validateAvatarUrl = (avatarUrl: string): boolean => {
    // Avatar URL must be a valid URL and end with .jpg, .jpeg, .png, or .gif.
    const urlRegex = /^(https?:\/\/.*\.(?:jpg|jpeg|png|gif))$/;
    return urlRegex.test(avatarUrl);
};

export const validateFirstname = (firstname: string): boolean => {
    // Firstname must be between 1 and 50 characters long.
    // Firstname can only contain letters (both uppercase and lowercase) and spaces.
    const firstnameRegex = /^[a-zA-Z\s]{1,50}$/;
    return firstnameRegex.test(firstname);
};

export const validateLastname = (lastname: string): boolean => {
    // Lastname must be between 1 and 50 characters long.
    // Lastname can only contain letters (both uppercase and lowercase) and spaces.
    const lastnameRegex = /^[a-zA-Z\s]{1,50}$/;
    return lastnameRegex.test(lastname);
};
