# NomBuddy Backend

A backend service for NomBuddy - your companion app for food recommendations and dining experiences.

## Overview

NomBuddy Backend provides APIs for user management, restaurant data, recommendations, and dining preferences.

## Tech Stack

- **Runtime:** Node.js
- **Language:** JavaScript
- **Framework:** Express.js (or your chosen framework)
- **Database:** (Specify your DB: MongoDB, PostgreSQL, etc.)

## Getting Started

### Prerequisites

- Node.js v14+
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd nombuddy_be
npm install
```

### Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL=your_database_url
API_KEY=your_api_key
```

### Running the Server

```bash
npm start
```

The server will be available at `http://localhost:3000`

## API Endpoints

- `GET /api/restaurants` - Get restaurant list
- `POST /api/users` - Create user account
- `GET /api/recommendations` - Get personalized recommendations

## License

MIT License - see LICENSE file for details
