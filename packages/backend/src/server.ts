import Fastify from "fastify";
import routes from "./routes";

require('dotenv').config();

const fastify = Fastify({
    logger: true,
});

// Register plugins
fastify.register(require('@fastify/cors'));
fastify.register(require('@fastify/jwt'), { secret: process.env.JWT_SECRET || 'DfGT2z4jHX3kJxRwHA4G' })
fastify.register(require('@fastify/helmet'));
fastify.register(require('@fastify/rate-limit'), { max: 100, timeWindow: 60000 })
fastify.register(require('./plugins/mongo-connector'), { uri: process.env.MONGODB_URI as string });

// Register Routes
fastify.register(routes);

// Error handles
fastify.setErrorHandler(function (error, request, reply) {
    if (error.statusCode === 429) {
        reply.code(429)
        error.message = 'You hit the rate limit! Slow down please!'
    }
    reply.send(error)
})
// fastify.setNotFoundHandler({
//     preHandler: fastify.rateLimit({
//         max: 4,
//         timeWindow: 500
//     })
// }, function (request, reply) {
//     reply.code(404).send({ hello: 'world' })
// })

// Start server
const start = async () => {
    try {
        let port = parseInt(process.env.PORT as string, 10);
        if (isNaN(port)) {
            port = 3001;
        }

        let address = process.env.ADDRESS as string;
        if (!address) {
            address = "127.0.0.1";
        }

        await fastify.listen({
            host: address,
            port: port
        });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start().catch(err => {
    fastify.log.error(err);
    process.exit(1);
});
