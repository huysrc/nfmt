# Use the official Node.js image.
FROM node:latest

# Set the working directory. (/usr/frontend)
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory.
COPY package*.json ./

# Optional: If you have yarn.lock in the root directory and want to use it
# COPY ../../yarn.lock ./

# Install dependencies.
RUN yarn install

# Copy the rest of the application code and tsconfig.json to the working directory.
COPY . .

# Build the Next.js application.
RUN yarn build

# Expose the port the app runs on.
EXPOSE 3000

# Command to run the app.
CMD ["yarn", "start"]
