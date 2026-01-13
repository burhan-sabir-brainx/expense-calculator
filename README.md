# Expense Tracker (Full Stack)

A professional expense tracking application built with **React** (Frontend) and **NestJS** (Backend).

## Project Structure

- `frontend/`: React application with Redux Toolkit and Tailwind CSS.
- `backend/`: NestJS application providing a REST API for transaction management.

## Tech Stack

### Frontend

- **React 18**
- **Redux Toolkit** (using Async Thunks for API calls)
- **Tailwind CSS**
- **Axios** (for HTTP requests)

### Backend

- **NestJS** (Node.js Framework)
- **REST API**
- In-memory storage (can be easily swapped for a database like PostgreSQL or MongoDB)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Install root dependencies (concurrently):

```bash
npm install
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd frontend
npm install
```

### Running the Application

You need to run both the backend and the frontend.

#### Start Backend

```bash
cd backend
npm run start:dev
```

The backend will run on `http://localhost:3000`.

#### Start Frontend

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`.

## API Endpoints

- `GET /transactions` - Fetch all transactions
- `POST /transactions` - Create a new transaction
- `PATCH /transactions/:id` - Update a transaction
- `DELETE /transactions/:id` - Delete a transaction

## License

MIT License
