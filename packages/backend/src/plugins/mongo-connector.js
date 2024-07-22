const fp = require('fastify-plugin');
const mongoose = require('mongoose');

async function mongoConnector(fastify, options) {
    const uri = options?.uri ?? process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('`uri` parameter is mandatory');
    }

    fastify.addHook('onClose', (fastify, done) => {
        if (mongoose.connection) {
            mongoose.connection.close()
                .then(() => done())
                .catch(err => {
                    fastify.log.error('Error closing mongoose connection:', err);
                    done(err);
                });
        }
    });

    mongoose.connection.on('connected', () => {
        fastify.log.info('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
        fastify.log.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        fastify.log.warn('MongoDB disconnected. Attempting to reconnect...');
        setTimeout(() => mongoose.connect(uri), 5000); // Attempt to reconnect after 5 seconds
    });

    if (!fastify.mongoose) {
        fastify.decorate('mongoose', {});
    }

    const name = options?.name;
    if (name) {
        if (fastify.mongoose[name]) {
            throw new Error('Connection name already registered: ' + name);
        }
        fastify.mongoose[name] = mongoose;
    } else {
        if (Object.keys(fastify.mongoose).length > 0) {
            throw new Error('A default connection already registered. Please provide a name for the new connection.');
        }
        fastify.mongoose = mongoose;
    }

    try {
        await mongoose.connect(uri);
        await mongoose.connection.db.admin().command({ ping: 1 });
        fastify.log.info("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        fastify.log.error(err, 'Error connecting to MongoDB');
        throw new Error('Failed to connect to MongoDB');
    }
}

module.exports = fp(mongoConnector, {
    fastify: '>=1.0.0',
    name: 'mongo-connector'
});
