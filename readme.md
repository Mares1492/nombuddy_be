A backend service for NomBuddy - A universal contactless ordering system prototype
It is a practical part of my Bachelor of Computer Science [THESIS](https://www.etera.ee/zoom/206899/view?page=1)


## Overview

NomBuddy Backend provides APIs for user management, restaurant data, recommendations, and dining preferences.

## Tech Stack

- **Runtime:** Node.js
- **Language:** Typescript
- **Framework:** Fastify, Prisma
- **Database:** PostgreSQL

## Getting Started

### Prerequisites

- Node.js v14+
- npm

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
- `GET /api/recommendations` - Get personalized recommendations | not implemented

## License

MIT License

## Extra content
### DB model
<img width="735" height="955" alt="image" src="https://github.com/user-attachments/assets/574486b1-e357-4c11-9de1-722763daf2a7" />

### Some endpoint examples
<img width="1083" height="1134" alt="image" src="https://github.com/user-attachments/assets/a5d01a7b-3083-4b42-91ce-2ddaf0e1c5ce" />
