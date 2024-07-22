import { FastifyRequest } from 'fastify';
import { isUserProfileRequestBody, UserProfileRequestBody } from "./profile/UserProfileValidator";

export interface UserRequestBody {
    username: string;
    email: string;
    password: string;
    roles: string[];
    profile?: UserProfileRequestBody;
}

export const isUserRequestParamsContainId = (params: any): params is { id: string } =>
    (!params.id || typeof params.id === 'string');

export const isUserRequestBody = (body: any): body is UserRequestBody =>
    (!body.username || typeof body.username === 'string') &&
    (!body.email || typeof body.email === 'string') &&
    (!body.password || typeof body.password === 'string') &&
    (!body.roles || Array.isArray(body.roles) && body.roles.every((role: any) => typeof role === 'string')) &&
    (!body.profile || isUserProfileRequestBody(body.profile));

// export const isUserRequestBody2 = (body: any): body is UserRequestBody => {
//     const { username, email, password, roles } = body;
//     return (!username || typeof username === 'string' && validateUsername(username)) &&
//     (!email || typeof email === 'string' && validateEmail(email)) &&
//     (!password || typeof password === 'string' && validatePassword(password)) &&
//     (!roles || Array.isArray(roles) && validateRoles(roles));
// }
//
// export const validateRequestCreateUser = (request: FastifyRequest): boolean => {
//     if (!isUserRequestBody(request.body)) {
//         return false; // or throw an error
//     }
//
//     const { username, email, password } = request.body;
//     return (!username || validateUsername(username)) &&
//         (!!email && validateEmail(email)) &&
//         (!!password && validatePassword(password));
// };
//
// export const validateRequestUpdateUser = (request: FastifyRequest): boolean => {
//     if (!isUserRequestBody(request.body)) {
//         return false; // or throw an error
//     }
//
//     const { email, password, username, roles } = request.body;
//     return (!email || validateEmail(email)) &&
//         (!password || validatePassword(password)) &&
//         (!username || validateUsername(username)) &&
//         (!roles || validateRoles(roles));
// };

export const getUserRequestBody = (request: FastifyRequest) => {
    const body = request.body;
    if (!isUserRequestBody(body)) {
        return null; // or throw an error
    }

    const { email, password, username, roles } = body;
    if ((!email || validateEmail(email)) &&
        (!password || validatePassword(password)) &&
        (!username || validateUsername(username)) &&
        (!roles || validateRoles(roles))) {
        return body;
    }
};

// export const getUserRequestBodyToCreate = (request: FastifyRequest) => {
//     if (!isUserRequestBody(request.body)) {
//         return false; // or throw an error
//     }
//
//     const { username, email, password } = request.body;
//     if ((!username || validateUsername(username)) &&
//         (!!email && validateEmail(email)) &&
//         (!!password && validatePassword(password))) {
//         return request.body;
//     }
// };
//
// export const getUserRequestBodyToUpdate = (request: FastifyRequest) => {
//     if (!isUserRequestBody(request.body)) {
//         return null; // or throw an error
//     }
//
//     const { email, password, username, roles } = request.body;
//     if ((!email || validateEmail(email)) &&
//         (!password || validatePassword(password)) &&
//         (!username || validateUsername(username)) &&
//         (!roles || validateRoles(roles))) {
//         return request.body;
//     }
// };

export const validateUsername = (username: string): boolean => {
    // Usernames must be between 3 and 16 characters long.
    // Usernames can contain letters (both uppercase and lowercase), numbers, underscores (_), and hyphens (-).
    // Usernames cannot start or end with a hyphen or underscore.
    const usernameRegex = /^(?![-_])[a-zA-Z0-9-_]{3,16}(?<![-_])$/;
    return usernameRegex.test(username);
};

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    // Password must be at least 8 characters long,
    // including at least one uppercase letter,
    // one lowercase letter,
    // and one number.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
};

export const validateRoles = (roles: string[]): boolean => {
    if (!Array.isArray(roles)) {
        return false;
    }
    const validRoles = ['admin', 'user'];
    return roles.every(role => validRoles.includes(role));
};