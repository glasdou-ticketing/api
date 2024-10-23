<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Backend Application - Ticketing System

This is the backend application for the company's ticketing system, built with NestJS. It provides a RESTful API for the frontend application and handles all business logic, data management, and security features.

## Installation

1. Clone the repository
2. Copy the `.env.template` file to `.env` and fill in the required environment variables
3. Run `pnpm install` to install the dependencies
4. Run `docker compose up -d` to start the database
5. Run `pnpm prisma generate` to generate the Prisma client
6. Run `pnpm prisma migrate dev` to apply the migrations
7. Run `pnpm start:dev` to start the development server
