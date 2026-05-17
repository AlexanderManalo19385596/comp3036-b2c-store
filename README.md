# TechStore — B2C Store Application

A full-stack B2C store application built as a continuation of the COMP3036 Full Stack Development assignment. This project is a Turborepo with:

- `apps/web`: customer-facing Next.js store app
- `apps/admin`: admin dashboard Next.js app
- `packages/db`: Prisma database package using SQLite

## Local Setup

Install dependencies:

```
pnpm install
```

Create local env files:

- `apps/web/.env`
- `apps/admin/.env`
- `packages/db/.env`

**`packages/db/.env`**
```
DATABASE_URL="file:./prisma/dev.db"
```

**`apps/web/.env`**
```
DATABASE_URL="file:/absolute/path/to/packages/db/prisma/dev.db"
E2E=true
```

**`apps/admin/.env`**
```
DATABASE_URL="file:/absolute/path/to/packages/db/prisma/dev.db"
JWT_SECRET="secret"
PASSWORD="123"
E2E=true
```

Prepare the database:

```
pnpm --filter @repo/db db:push
```

Run the apps:

```
pnpm dev
```

- Customer store: http://localhost:3001/store
- Admin dashboard: http://localhost:3002/store

## Demo Credentials

**Customer:**
- Email: `user@techstore.com`
- Password: `password123`

**Admin:**
- Email: `admin@techstore.com`
- Password: `admin123`

## Running Tests

Store tests:
```
cd tests/playwright
pnpm playwright test --grep "@s1"
```

## Features

1. Product listing with search and category filter
2. Shopping cart with localStorage persistence
3. Mock payment integration
4. Purchase history
5. User authentication (login/register)
6. Admin dashboard (product management + order viewing)

## Deployment

Coming in Iteration 2