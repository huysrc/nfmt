# My Project

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Using Docker](#using-docker)
- [Seeding the Database](#seeding-the-database)
- [Scripts](#scripts)

## Introduction

This project is a monorepo containing both the frontend (`app`) and backend (`api`) services. The frontend is built using Next.js, while the backend is built using Express and Mongoose.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Yarn](https://yarnpkg.com/) (version 1.22 or higher)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-repo/my-project.git
    cd my-project
    ```

2. **Install dependencies:**

    ```bash
    yarn install
    ```

## Running the Application
### Running Locally with Yarn
To run the frontend (app) and backend (api) locally:

1. **Start the backend (api):**

    Open a new terminal window/tab and run:
    ```bash
    cd packages/api
    yarn dev
    ```
    This will start the backend server on port 5000.

2. **Start the frontend (app):**

    Open another terminal window/tab and run:
    ```bash
    cd packages/app
    yarn dev
    ```
    This will start the Next.js frontend on port 3000.

## Using Docker

To run the entire application stack using Docker and Docker Compose:

1. **Build and start the containers:**

    ```bash
    docker-compose up --build
    ```
    This command will build the Docker images and start the containers for the api, app, and mongo services.

2. **Stop the containers:**

    ```bash
    docker-compose down
    ```

## Seeding the Database
To seed the database with initial data, you can run the seed scripts:

1. **Seed the database:**

    ```bash
    yarn seed
    ```
    This command will run the seed scripts located in the scripts/seed.ts file.

## Scripts
There are several utility scripts available in the scripts directory. Here is how you can use them:

### Setup
To set up the project (install dependencies):
    
    yarn setup

### Build
To build the project (compile TypeScript):

    yarn build

### Deploy
To deploy the project:

    yarn deploy

### Seed
To seed the database with initial data:

    yarn seed

## Additional Information
- Linting: To lint the codebase using ESLint:

    ```bash
    yarn lint
    ```

- Testing: (If you have tests configured) To run tests:

    ```bash
    yarn test
    ```

For more detailed documentation on each package, please refer to the README files located in the packages/api and packages/app directories.



### Tổng kết

File `README.md` trên cung cấp hướng dẫn chi tiết về cách cài đặt, chạy và sử dụng dự án, bao gồm việc sử dụng Yarn, Docker, seed database và các scripts tiện ích. Bạn có thể điều chỉnh thêm các thông tin cụ thể cho dự án của mình nếu cần thiết.
