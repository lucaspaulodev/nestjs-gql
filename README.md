# Welcome GEMINI Team to NestJS GraphQL Project

![NestJS Logo](https://nestjs.com/img/logo_text.svg)

This project provides a GraphQL API built with NestJS and Prisma as requested on this link: https://geminisports.notion.site/geminisports/Sr-Full-Stack-Engineer-Technical-Evaluation-811e1b6bd8ca4f5cb893bec29e4531ab. 

## Getting Started

To run this project on your local machine, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/lucaspaulodev/nestjs-gql.git
cd nestjs-gql
```

### 2. Install Dependencies

Make sure you have Node.js and npm installed on your machine. Then, run the following command to install project dependencies:

```bash
npm install
```

### 3. Set Up Docker

This project uses Docker for running the database. Ensure you have Docker installed on your machine. Run the following command to start the PostgreSQL database using Docker Compose:

```bash
docker compose up
```

### 4. Run Prisma Migrations

Prisma is used for database management. Run the Prisma migrations to create the database tables:

```bash
npx prisma migrate dev
```

### 5. Seed the Database (Optional)

If you want to populate the database with sample data, you can run the seed script:

```bash
npm run seed
```