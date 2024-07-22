import { FastifyInstance } from 'fastify';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../../controllers/user/UserController';

const userRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/', getUsers);
    fastify.get('/:id', getUser);
    fastify.post('/', createUser);
    fastify.put('/:id', updateUser);
    fastify.delete('/:id', deleteUser);
};

export default userRoutes;
