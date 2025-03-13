# R-Inspect Backend

A robust inspection management system for robotics tournaments, designed to streamline the robot inspection process.

![R-Inspect Logo](https://via.placeholder.com/200x100?text=R-Inspect)

## Overview

R-Inspect is a specialized web application for managing robot inspections during robotics tournaments. It facilitates the workflow for inspectors and tournament coordinators by digitizing the inspection process, tracking team statuses, and centralizing inspection data.

### Key Features

- **Team Management**: Import and manage team data for tournaments
- **Inspection Tracking**: Track inspection status across all teams
- **Role-Based Access**: Separate interfaces for inspectors and coordinators
- **Secure API**: JWT authentication and API key validation
- **Not dependent on FIRST API**: Operate during the tournament without relying on FIRST API

## Documentation

For comprehensive documentation about R-Inspect, please refer to our [Documentation Table of Contents](./docs/table-of-conent.md) which provides easy navigation to all guides and references.

## System Architecture

R-Inspect is built on a modern Node.js stack with the following key technologies:

- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT-based authentication with refresh tokens
- **API Documentation**: Swagger/OpenAPI
- **Security**: Role-based access control and API key validation

### Component Structure

```
r-inspect-backend/
├── routes/              # API endpoints
├── model/               # Database models
├── services/            # Business logic services
├── middlewares/         # Express middlewares
├── docs/                # Documentation
├── db/                  # Database connection and utilities
└── app.js               # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- MongoDB 4.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-organization/r-inspect-backend.git
   cd r-inspect-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=8080
   MONGODB_URI=mongodb://localhost:27017/r-inspect
   JWT_SECRET=your_jwt_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   API_KEY=your_api_key
   ADMIN_SECRET_KEY=your_admin_secret_key
   FRONTEND_URL=http://localhost:3000
   FIRST_API_BASE_URL=https://frc-api.firstinspires.org/v3.0
   FIRST_API_AUTH_TOKEN=your_first_api_token
   FIRST_API_TIMEOUT=10000
   ```

4. Generate Swagger documentation:
   ```bash
   npm run swagger-autogen
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

The API documentation is available at `/doc` when the server is running. You can access it by visiting `http://localhost:8080/doc` in your browser.

### API Security

All API endpoints are secured with:

1. **API Key Validation**: Every request must include the `x-api-key` header.
2. **JWT Authentication**: Protected routes require a valid JWT token in the `Authorization` header.
3. **Role-Based Authorization**: Certain endpoints are restricted based on user roles.

### Key Endpoints

- `/users` - User management and authentication
- `/teams` - Team data management
- `/inspection` - Inspection management
- `/inspector` - Inspector management
- `/admin` - Administrative operations

## Tournament Setup Process

Setting up R-Inspect for a tournament involves several key steps:

1. **System Cleanup** (if necessary)
2. **Team Data Preparation**
3. **Team Import**
4. **Inspection Sheet Creation**

For detailed setup instructions, see [Tournament Setup Guide](./docs/setup.md).

## Development

### Running in Development Mode

```bash
npm run dev
```

This will start the server with nodemon for automatic reloading and generate the latest Swagger documentation.

### Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot reloading
- `npm run swagger-autogen` - Generate Swagger documentation

## Deployment

### Production Setup

1. Build the application:
   ```bash
   npm install --production
   ```

2. Set environment variables in your production environment
   
3. Start the server:
   ```bash
   npm start
   ```

## Using R-Inspect in Your Competition

If you're interested in using R-Inspect for your robotics competition, we've created a detailed guide to help you get started. This includes setup instructions, hardware requirements, and best practices.

For more information, see our [Competition Implementation Guide](./docs/competition-guide.md).

**Note:** Currently, the frontend repository needed to run the complete application is closed-source. However, it can be deployed to your cloud instance if needed. Please contact the maintainers for assistance.

## Contributing to R-Inspect

We welcome contributions to the R-Inspect project! Whether you're fixing bugs, improving documentation, or adding new features, your help is appreciated.

For guidelines on how to contribute, see our [Contribution Guide](./docs/contribution-guide.md).

## Support and Maintainers

If you have questions or need assistance, feel free to contact the project maintainers:

- [Matheus Dubin](https://github.com/MatheusD)
- [Amanda Wilmsen](https://github.com/amandacwilmsen)
- [Silas Vergilio](https://github.com/silasvergilio)

See all [contributors to this project](https://github.com/silasvergilio/r-inspect-backend/graphs/contributors).

## License

[MIT](LICENSE)
