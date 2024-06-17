### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [Docker](https://www.docker.com/get-started) / or use cloud database

### Setting Up the Project

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DeadBoyPiotrek/tukan-tomek.git
   cd tukan-tomek
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Setting Up PostgreSQL with Docker

1. **Start PostgreSQL database from terminal or connect to one in cloud through URI**

   ```
   docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
   ```

2. **Add Database url to .env:**

   ```
   DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"
   ```

### Setting Up Prisma

<!-- 1. **Initialize Prisma:**

   ```bash
   npx prisma init
   ``` -->

1. **Generate the Prisma client:**

   ```bash
   npx prisma generate
   ```

2. **Apply schema changes to db:**

   ```
   npx prisma db push
   ```

### Running the Next.js App

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Open your browser and navigate to:**

   ```text
   http://localhost:3000
   ```
