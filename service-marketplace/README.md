# Service Marketplace Platform

A web application that connects service providers with customers for daily tasks like plumbing and AC fixing.

## Features

- Three different interfaces:
  - Administrator Interface: Manage users, services, and platform
  - Service Provider Interface: Offer services and manage bookings
  - Customer Interface: Browse and book services

## Tech Stack

- Frontend: html , css , js
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   cd frontend
   npm install
   ```

2. Create a .env file in the root directory with:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
