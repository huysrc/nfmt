import { FastifyInstance } from 'fastify';
import authRoutes from "./user/authRoutes";
import userRoutes from './user/userRoutes';
import userProfileRoutes from "./user/userProfileRoutes";

const routes = async (fastify: FastifyInstance) => {
    fastify.register(authRoutes, { prefix: '/auth' });
    fastify.register(userRoutes, { prefix: '/users' });
    fastify.register(userProfileRoutes, { prefix: '/users/profile' });
};

export default routes;
