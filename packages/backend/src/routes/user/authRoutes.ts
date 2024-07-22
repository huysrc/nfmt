import { FastifyInstance } from 'fastify';
import { login, register, confirmEmail, forgotPassword } from '../../controllers/user/auth/AuthController';

const authRoutes = async (fastify: FastifyInstance) => {
    fastify.post('/login', login);
    fastify.post('/register', register);
    fastify.get('/confirm-email/:token', confirmEmail);
    fastify.post('/forgot-password', forgotPassword);
};

export default authRoutes;
