# WDV339 Spotify Search Application

## Project Overview

This is my Full Sail Project and Portfolio III Project that leverages the Spotify API for searching artists, tracks, and songs. The application uses JSON Web Tokens and OAuth 2.0 for authenticating users and granting access to the application.

**Base Project Features & Functionality includes:**

- User authentication using OAuth 2.0
- Express API using Axios
- MongoDB using Mongoose as a non-relational DB layer
- Vite React Frontend using TypeScript
- Spotify API usage to include a general search for
  - Artists
  - Tracks
  - Songs

## Prerequisites

- [Docker v4.24](https://docs.docker.com/desktop/release-notes/)
- [Docker Compose V2.20](https://docs.docker.com/compose/release-notes/)

### Used within the containers

#### Container Images

- [NodeJS V20.8.1 (LTS)](https://nodejs.org/en/blog/release/v18.18.0) - We are using the [alpine docker](https://github.com/nodejs/docker-node/blob/6c20762ebfb6ab35c874c4fe540a55ab8fd6c49d/20/alpine3.18/Dockerfile) version
- [MongoDB V.7.0](https://hub.docker.com/layers/library/mongo/7.0.0/images/sha256-86be2714cae3fbda498f608c67a15c3fd36e7261c5198c2edd8c963f8c4941b4?context=explore)

#### Technology

- [Express V4.18](https://expressjs.com/en/changelog/4x.html)
- [Axios V1.5.1](https://www.npmjs.com/package/axios)
- [Vite V4.5](https://www.npmjs.com/package/vite?activeTab=versions)
- [TypeScript V5.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html)

## Getting Started

I have created some scripts to facilitate ease of setup and use of the application. To get started, from the root directory, run

`./start.sh`

This will kick off the docker compose file which will install the application (Vite frontend and Express Backend), connect the database (MariaDB), build the react application (React), and start the servers.

## Links

The application runs locally on PORT 3001
[http://localhost:3001](http://localhost:3001)

## Contact

Steven Brown

Full Sail Student ID: #0004687540

[smbrown1@student.fullsail.edu](mailto:smbrown1@student.fullsail.edu)
