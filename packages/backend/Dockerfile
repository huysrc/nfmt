# Use the official Node.js 22 image.
FROM node:22

# Set the working directory. (/usr/backend)
WORKDIR /usr/src/api

# Copy package.json and package-lock.json to the working directory.
COPY package*.json ./

# Optional: If you have yarn.lock in the root directory and want to use it
# COPY ../../yarn.lock ./

# Install dependencies.
RUN yarn install

# Copy the rest of the application code and tsconfig.json to the working directory.
COPY . .

# Build the TypeScript code.
RUN yarn build

# Expose the port the app runs on.
EXPOSE 6383

# Command to run the API.
#CMD ["node", "./dist/server.js"]
CMD ["yarn", "start"]