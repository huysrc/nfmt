import { FastifyInstance } from 'fastify';
import { getUserProfile, updateUserProfile } from '../../controllers/user/profile/UserProfileController';

const userProfileRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/:id', getUserProfile);
    fastify.put('/:id', updateUserProfile);
};

export default userProfileRoutes;