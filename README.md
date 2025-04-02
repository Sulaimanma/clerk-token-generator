# Clerk Token Generator

A simple Express.js API service that generates Clerk sign-in tokens.

## Description

This service provides an API endpoint to generate sign-in tokens using Clerk's authentication service. It can be used to programmatically create tokens for user authentication in applications that use Clerk for identity management.

## Installation

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
```

```bash
cd clerk-token-generator
```

```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory based on the provided `.env.example`:

```bash
cp .env.example .env
```

Then, add your Clerk Secret Key and set the port (optional):

```
CLERK_SECRET_KEY=your_clerk_secret_key_here
PORT=3000
```

## Usage

### Starting the Server

Start the server in development mode with hot reload:

```bash
npm run dev
```

Or in production mode:

```bash
npm start
```

### API Endpoints

#### Health Check

```
GET /health
```

Returns the server status and current timestamp.

**Example Response:**
```json
{
  "status": "ok",
  "message": "Server is running",
  "timestamp": "2023-05-01T12:00:00.000Z"
}
```

#### Generate Token

```
POST /generate-token
```

Generates a sign-in token for a specified user.

**Request Body:**
```json
{
  "user_id": "user_12345",
  "expires_in_seconds": 3600
}
```

The `expires_in_seconds` parameter is optional.

**Example Response:**
```json
{
  "id": "sit_12345",
  "object": "sign_in_token",
  "status": "active",
  "token": "clerk_token_value",
  "created_at": 1620000000,
  "expires_at": 1620003600,
  "url": "https://your-clerk-frontend-api.clerk.accounts.dev/v1/sign-in-tokens/verification?token=clerk_token_value"
}
```

## Development

To contribute to the development of this service:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

This project is licensed under the ISC License - see the package.json file for details.
