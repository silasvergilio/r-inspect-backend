# R-Inspect API Reference

This document provides a comprehensive reference for the R-Inspect API, including endpoints, authentication flow, and security mechanisms.

## Authentication Flow

R-Inspect implements a secure JWT-based authentication system with refresh tokens.

```mermaid
sequenceDiagram
    participant Client
    participant Auth as Authentication Service
    participant API as Protected API Endpoints
    participant DB as Database
    
    Client->>Auth: POST /users/login (username, password)
    Auth->>DB: Validate credentials
    DB-->>Auth: User exists & password valid
    Auth->>Auth: Generate access & refresh tokens
    Auth->>DB: Store tokens
    Auth-->>Client: Return tokens
    
    Client->>API: Request with Authorization header
    API->>API: Validate JWT
    API->>API: Check user role
    API-->>Client: Protected resource
    
    Note over Client,Auth: When access token expires
    Client->>Auth: POST /users/refresh-token
    Auth->>DB: Validate refresh token
    DB-->>Auth: Token valid
    Auth->>Auth: Generate new access token
    Auth-->>Client: Return new access token
```

### Authentication Endpoints

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|-------------|----------|
| `/users/login` | POST | Authenticate user | `{username, password}` | `{accessToken, refreshToken}` |
| `/users/refresh-token` | POST | Refresh access token | `{refreshToken}` | `{accessToken}` |
| `/users/logout` | POST | Invalidate refresh token | `{refreshToken}` | `{message}` |

## Security Mechanisms

### API Key Validation

All requests to the API must include an `x-api-key` header with a valid API key as configured in the environment variables. This is handled by the `validateApiKey` middleware.

```javascript
// Example API key validation
function validateApiKey(req, res, next) {
    const apiKeyHeader = req.headers['x-api-key'];
    if (!apiKeyHeader || apiKeyHeader !== process.env.API_KEY) {
        return res.status(403).json({ error: 'Invalid API key' });
    }
    next();
}
```

### Role-Based Access Control

The system implements role-based access control with two primary roles:

- **inspector**: Can view teams, view and update inspections
- **inspector_coordinator**: Has all inspector permissions plus administrative capabilities

Routes are protected using the `authorize` middleware:

```javascript
// Example of protected route
router.get("/endpoint", authorize(['inspector', 'inspector_coordinator']), async (req, res) => {
    // Only accessible to users with inspector or inspector_coordinator roles
});
```

## API Endpoints

### User Management

| Endpoint | Method | Description | Authorization |
|----------|--------|-------------|---------------|
| `/users` | GET | Get all users | inspector_coordinator |
| `/users/me` | GET | Get current user | Any authenticated user |
| `/users/:name` | DELETE | Delete a user | Any authenticated user |

### Team Management

| Endpoint | Method | Description | Authorization |
|----------|--------|-------------|---------------|
| `/teams` | GET | Get all teams | Public |
| `/teams/:teamNumber` | GET | Get a specific team | inspector, inspector_coordinator |

### Inspection Management

| Endpoint | Method | Description | Authorization |
|----------|--------|-------------|---------------|
| `/inspection` | GET | Get all inspections | inspector, inspector_coordinator |
| `/inspection/simplified` | GET | Get simplified inspections | Public |
| `/inspection/:teamNumber` | GET | Get inspection for a team | inspector, inspector_coordinator |
| `/inspection` | POST | Create an inspection | inspector_coordinator |
| `/inspection` | PATCH | Update an inspection | inspector, inspector_coordinator |

### Inspector Management

| Endpoint | Method | Description | Authorization |
|----------|--------|-------------|---------------|
| `/inspector` | POST | Create an inspector | inspector_coordinator |
| `/inspector` | GET | Get all inspectors | inspector, inspector_coordinator |
| `/inspector/:name` | DELETE | Delete an inspector | inspector_coordinator |

### Administrative Operations

| Endpoint | Method | Description | Authorization |
|----------|--------|-------------|---------------|
| `/admin/BulkCreateTeams` | POST | Import multiple teams | inspector_coordinator |
| `/admin/DeleteAllTeams` | DELETE | Delete all teams | inspector_coordinator |
| `/admin/CreateCleanSheetsForTeams` | POST | Initialize inspection sheets | inspector_coordinator |
| `/admin/DeleteAllInspections` | DELETE | Delete all inspections | inspector_coordinator |
| `/admin/user` | POST | Create a user | inspector_coordinator |
| `/admin/user` | PATCH | Update a user | inspector_coordinator |

## Request/Response Examples

### Authentication

**Login Request:**
```http
POST /users/login
Content-Type: application/json
x-api-key: your_api_key

{
  "username": "inspector1",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Inspections

**Get All Inspections Request:**
```http
GET /inspection
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
x-api-key: your_api_key
```

**Get All Inspections Response:**
```json
[
  {
    "teamNumber": 1234,
    "teamName": "Team Name",
    "status": "Not Started",
    "inspectorId": null,
    "sheet": null
  },
  {
    "teamNumber": 5678,
    "teamName": "Another Team",
    "status": "In Progress",
    "inspectorId": "60d21b4667d0d8992e610c85",
    "sheet": { /* sheet data */ }
  }
]
```

**Update Inspection Request:**
```http
PATCH /inspection
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
x-api-key: your_api_key

{
  "teamNumber": 1234,
  "teamName": "Team Name",
  "status": "In Progress",
  "inspectorId": "60d21b4667d0d8992e610c85",
  "sheet": { /* sheet data */ }
}
```

## Error Handling

The API uses standard HTTP status codes for error responses:

- **400** - Bad Request: Missing required fields or validation errors
- **401** - Unauthorized: Invalid or missing credentials
- **403** - Forbidden: Valid credentials but insufficient permissions
- **404** - Not Found: Resource not found
- **500** - Internal Server Error: Unexpected server error

Error responses include a message field explaining the error:

```json
{
  "message": "Error description",
  "status": 400
}
```

## Rate Limiting

The API currently does not implement rate limiting. Implementation considerations for future versions:

- Add rate limiting middleware using a package like `express-rate-limit`
- Configure different limits for authenticated vs unauthenticated requests
- Set appropriate limits based on endpoint sensitivity
- Implement response headers to communicate rate limit status
- Configure storage backend for tracking request counts (Redis recommended)

## API Versioning

Current API implementation has no explicit versioning. Future implementation options:

- URL path versioning (e.g., `/v1/resource`)
- Content negotiation via Accept header
- Custom header versioning
- Query parameter versioning

URL path versioning is recommended for its simplicity and client compatibility. 