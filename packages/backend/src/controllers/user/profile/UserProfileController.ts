import { FastifyRequest, FastifyReply } from 'fastify';
import { getUserProfileRequestBody } from "./UserProfileValidator";
import { findUserProfileById, findUserProfileByIdAndUpdate } from "./UserProfileService";

const isRequestParamsContainUserProfileId = (params: any): params is { id: string } =>
    (!params.id || typeof params.id === 'string');

export const getUserProfile = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        if (!isRequestParamsContainUserProfileId(request.params)) {
            reply.status(400).send({message: 'Invalid ID'});
            return;
        }

        const userProfile = await findUserProfileById(request.params.id);
        if (userProfile) {
            reply.status(200).send(userProfile);
        } else {
            reply.status(404).send({message: 'No user profile found.'});
        }
    } catch (err) {
        reply.status(500).send({error: 'Internal Server Error', details: err});
    }
};

export const updateUserProfile = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        if (!isRequestParamsContainUserProfileId(request.params)) {
            reply.status(400).send({message: 'Invalid ID'});
            return;
        }

        const data = getUserProfileRequestBody(request);
        if (!data) {
            reply.status(400).send({message: 'Invalid data'});
            return;
        }

        const userProfile = await findUserProfileByIdAndUpdate(request.params.id, data);
        if (userProfile) {
            reply.status(200).send(userProfile);
        } else {
            reply.status(404).send({message: 'No user profile found.'});
        }
    } catch (err) {
        reply.status(500).send({error: 'Internal Server Error', details: err});
    }
};
