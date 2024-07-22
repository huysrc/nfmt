import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from "bcrypt";
import { isUserRequestBody } from "../UserValidator";
import { findUserByEmail } from "../UserService";

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        if (!isUserRequestBody(request.body)) {
            reply.status(400).send({ message: 'Invalid request body.' });
            return;
        }

        if (!request.body.email || !request.body.password) {
            reply.status(401).send({ message: 'Invalid email or password' });
            return;
        }

        const user = await findUserByEmail(request.body.email);
        if (!user || !(await user.comparePassword(request.body.password))) {
            reply.status(401).send({ message: 'Invalid email or password' });
            return;
        }

        reply.send({ message: 'Login successful', user });
    } catch (err) {
        reply.status(500).send({ error: 'Internal Server Error', details: err });
    }
};

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
    // const { email, password } = request.body;
    //
    // const hashedPassword = await bcrypt.hash(password, 10);
};

export const confirmEmail = async (request: FastifyRequest, reply: FastifyReply) => {
    // Logic for register
};

export const forgotPassword = async (request: FastifyRequest, reply: FastifyReply) => {
    // Logic for register
};
