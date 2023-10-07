# Welcome GEMINI Team to NestJS GraphQL Project

This project provides a GraphQL API built with NestJS and Prisma. I followed the [guidelines indicated for backend development](https://geminisports.notion.site/geminisports/Sr-Full-Stack-Engineer-Technical-Evaluation-811e1b6bd8ca4f5cb893bec29e4531ab). I hope you like it.
Please, follow the step-by-step instructions below to run the application on your machine.

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
### 5. Run the API

Find the `.env.example` file and rename it to `.env`. Open it and assign a value to `API_PORT=` (I like to use 3333, you can choose any port that is not busy with processes on your machine). And then, run:

```bash
npm run start:dev
```

After running this command, you'll able to see on your terminal which PORT your API is running:
<img width="876" alt="Screenshot 2023-10-06 at 21 16 18" src="https://github.com/lucaspaulodev/nestjs-gql/assets/61305960/53fe9895-421b-4fe4-bec7-7cfd87aac414">

Use cmd/ctrl + click any of the links to check the GRAPHQL API DOCUMENTATION::
<img width="903" alt="Screenshot 2023-10-06 at 21 27 26" src="https://github.com/lucaspaulodev/nestjs-gql/assets/61305960/39ad7630-84b2-4186-91d8-b5376ae31d59">


### 6. Running tests:

To run and watch the tests of the application's service module methods, run the command:

```bash
npm run test:watch
```
