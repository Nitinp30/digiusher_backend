# AWS Instance Filter - Backend

## Overview

This is the backend for the AWS Instance Filter application. It provides APIs to fetch and filter AWS instance data from an external API, processes the data, and stores it in a MongoDB database.

## Features

- Fetches AWS instance data from an external API.
- Stores and manages instance data in MongoDB.
- Provides API endpoints to filter instances based on CPU, RAM.
- Groups instances with the same CPU and RAM into a single response object.

## Tech Stack

- **Node.js** (Backend runtime)
- **Express.js** (Framework for building REST APIs)
- **MongoDB & Mongoose** (Database and ODM for data storage)
- **Axios** (For fetching external API data)
- **TypeScript** (For type safety)

## Installation

### Prerequisites

- Node.js installed
- MongoDB instance running

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/aws-instance-filter-backend.git
   cd aws-instance-filter-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables: Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=mongodb://localhost:27017/aws_instances
   PORT=5020
   ALLOW_ORIGIN=http://localhost:3000(frontend url)
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
5. The server will run on `http://localhost:5020/`.

## Project Structure

```
backend/
│-- src/
│   │-- config/         # Handles Database
│   │-- controllers/    # Handles request logic
│   │-- models/         # Mongoose models for database
│   │-- routes/         # API routes
│   │-- seeders/        # Seed script for AWS data
│   │-- server.ts       # Main server file
│-- package.json       # Project dependencies
│-- tsconfig.json      # TypeScript configuration
│-- README.md          # Documentation
```

## API Endpoints

### Get Filtered AWS Instances

- **Endpoint:** `GET /api/products/filter`
- **Parameters:**
  - `minCPU`: Minimum CPU cores
  - `maxCPU`: Maximum CPU cores
  - `minRAM`: Minimum RAM (GiB)
  - `maxRAM`: Maximum RAM (GiB)
- **Example Request:**
  ```ts
  axios.get("http://localhost:5020/api/products/filter", {
    params: {
      minCPU: 2,
      maxCPU: 8,
      minRAM: 4,
      maxRAM: 16,
    },
  });
  ```

## Seeder File Usage

The `seeder.ts` file fetches AWS instance data and saves it to MongoDB. To run the seeder:

```bash
npm run seed
```

- **Response:**
  ```json
  {
    "message": "Inserted 100 records into MongoDB"
  }
  ```

## Future Improvements

- Optimize data fetching and storage mechanisms.
- Implement advanced filtering and sorting.
- Add support for multiple cloud providers.
