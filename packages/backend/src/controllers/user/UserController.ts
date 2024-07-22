import { FastifyRequest, FastifyReply } from 'fastify';
import User from "../../models/user/UserModel";
import {
    createNewUser,
    findUserByEmail,
    findUserById,
    findUserByIdAndDelete,
    findUserByIdAndUpdate,
    findUserByUsername,
    isUniqueEmail,
    isUniqueUsername
} from './UserService';
import {
    getUserRequestBody,
    isUserRequestParamsContainId
} from './UserValidator';

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
        const users = await User.find();
        reply.send(users);
    } catch (err) {
        reply.status(500).send({error: 'Internal Server Error', details: err});
    }
}

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        if (!isUserRequestParamsContainId(request.params)) {
            reply.status(400).send({message: 'Invalid ID'});
            return;
        }

        const user = await findUserById(request.params.id);
        if (user) {
            reply.status(200).send(user);
        } else {
            reply.status(404).send({message: 'No user found'});
        }
    } catch (err) {
        reply.status(500).send({error: 'Internal Server Error', details: err});
    }
};

export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const data = getUserRequestBody(request);
        if (!data) {
            reply.status(400).send({message: 'Invalid data'});
            return;
        }

        if (!data.email) {
            reply.status(400).send({message: 'Invalid email'});
            return;
        }

        if (!data.password) {
            reply.status(400).send({message: 'Invalid password'});
            return;
        }

        if (await findUserByEmail(data.email)) {
            reply.status(400).send({message: 'The email is used'});
            return;
        }

        if (data.username && await findUserByUsername(data.username)) {
            reply.status(400).send({message: 'The username is used'});
            return;
        }

        const user = await createNewUser(data);
        if (user) {
            reply.status(201).send(user);
        } else {
            reply.status(500).send({message: 'Cannot create new user'});
        }
    } catch (err) {
        reply.status(500).send({error: 'Internal Server Error', details: err});
    }
};

export const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        if (!isUserRequestParamsContainId(request.params)) {
            reply.status(400).send({message: 'Invalid ID'});
            return;
        }

        const data = getUserRequestBody(request);
        if (!data) {
            reply.status(400).send({message: 'Invalid data'});
            return;
        }

        const userId = request.params.id;
        if (data.email && await isUniqueEmail(userId, data.email)) {
            reply.status(400).send({message: 'The email is used by another user'});
            return;
        }

        if (data.username && await isUniqueUsername(userId, data.username)) {
            reply.status(400).send({message: 'The username is used by another user'});
            return;
        }

        const user = await findUserByIdAndUpdate(userId, data);
        if (user) {
            reply.status(200).send(user);
        } else {
            reply.status(404).send({message: 'No user found'});
        }
    } catch (err) {
        reply.status(500).send({error: 'Internal Server Error', details: err});
    }
};

export const deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        if (!isUserRequestParamsContainId(request.params)) {
            reply.status(400).send({message: 'Invalid ID'});
            return;
        }

        const user = await findUserByIdAndDelete(request.params.id); //User.findByIdAndDelete(id);
        if (user) {
            reply.status(200).send({message: 'User deleted successfully'});
        } else {
            reply.status(404).send({message: 'No user found'});
        }
    } catch (err) {
        reply.status(500).send({error: 'Internal Server Error', details: err});
    }
};
