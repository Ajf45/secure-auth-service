Secure Authentication Service (Node.js & PostgreSQL)

A backend authentication service built using Node.js, Express, and PostgreSQL, focusing on secure credential handling, clean architecture, and backend best practices.
This project demonstrates real-world backend development patterns including structured routing, middleware-based security, and database-backed authentication flows.

Features:

User registration and authentication
Secure password storage using hashing
Token-based authentication using JWT
Global request rate limiting to prevent abuse
Centralized audit logging for auth-related events
Clean separation of server bootstrap and application logic


Security Middleware:
Rate Limiting

To protect authentication endpoints from excessive or automated requests, rate limiting is applied globally at the middleware level.

📍 Implemented in: src/app.js

const rateLimit = require("express-rate-limit");

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                // limit each IP
  standardHeaders: true,
  legacyHeaders: false
}));

This ensures consistent protection across all routes before request handling.


Running Locally
1️⃣ Install Dependencies
npm install

2️⃣ Environment Configuration

Create a .env file:

PORT=3000
JWT_SECRET=your_secret_key
DATABASE_URL=postgresql://localhost:5432/auth_service

3️⃣ Start the Server
node src/server.js


The service will be available at:

http://localhost:3000

🧠 Key Engineering Focus Areas

Express middleware lifecycle management
Secure handling of authentication data
PostgreSQL-backed API design
Error-driven debugging and schema validation
Writing maintainable, production-style backend code

Author:

Raunak Jain
Graduate B.Tech CSE (Cybersecurity)
