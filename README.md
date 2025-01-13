# Newspaper Moderation Dashboard (Prototype)

This is a prototype of a **dashboard for moderators** that helps analyze and categorize comments from a database using AI. The project is built for a **university project** and utilizes modern web technologies such as **Next.js**, **Prisma**, and **Hugging Face** for AI-based text analysis.

## Tech Stack

- **Next.js**: A powerful React framework for building full-stack applications.
- **Prisma**: ORM for handling interactions with the database (comments are fetched and stored).
- **Hugging Face**: Used for analyzing comments through **Large Language Models (LLM)** for categorization (e.g., spam, toxic, constructive).
- **Tailwind CSS**: A utility-first CSS framework for fast styling.
- **React**: JavaScript library for building user interfaces.
- **Axios**: Used for making HTTP requests to the Hugging Face API.

## Features

- Fetches comments from a **Prisma-powered database**.
- Analyzes comments using **Hugging Face models** to categorize them as **spam**, **toxic**, or **constructive**.
- Allows the moderator to approve, reject, or forward comments directly within the dashboard.
- Includes a sidebar with filters to view comments by category or status.

## Setup & Installation

To run the project locally, follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/Sebi900/Ai-Dashboard.git
cd Ai-Dashboard
```

2. Install dependencies:
   Run the following command to install all required dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a .env file in the root directory and add your environment variables (e.g., Hugging Face API key and database connection URL). Example .env:

```env
DATABASE_URL="your_prisma_database_connection_url"
HUGGING_FACE_API_KEY="your_hugging_face_api_key"
```

4. Set up Prisma:
   To run Prisma locally, follow these steps:

Install Prisma CLI (if you don't have it already):

```bash
npm install prisma --save-dev
```

Generate Prisma client from your schema:

```bash
npx prisma generate
Run Prisma Migrations:
```

Run Prisma migrations to set up the database schema:

```bash
npx prisma migrate dev
```

5. Start Docker (if using Docker for the database):
   If you are using Docker to manage your database, ensure that you have Docker installed and running on your machine.

Start Docker container with your Prisma database setup. For example, if you're using a PostgreSQL database, use:

```bash
docker-compose up -d
```

Ensure you have a docker-compose.yml file with the necessary configurations for your database.

6. Run the development server:
   After setting up everything, you can start the application:

```bash
npm run dev
```

This will start the app in development mode. Visit http://localhost:3000 in your browser to see the dashboard in action.

Usage

On the dashboard, you can see a list of all comments, their categories (spam, toxic, constructive), and their status.
Use the sidebar to filter the comments by category (spam, toxic, constructive) or status (approved, rejected, pending).
You can also approve, reject, or forward the comments directly from the interface.
Tech Details
Prisma handles database interactions. Comments are stored in the database and fetched to be displayed in the dashboard.
Hugging Face API is used to categorize comments. It uses pre-trained models like BART and DistilBERT to analyze text and classify them into categories.
Next.js is used to build both the frontend and the backend, allowing the app to fetch data and render it dynamically.
Tailwind CSS provides utility classes for styling, ensuring a responsive and clean layout.

Contributing
If you'd like to contribute to the project, feel free to fork the repository and create a pull request. Contributions are welcome!
