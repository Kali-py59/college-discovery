# College Discovery Platform

A full-stack college discovery and comparison platform built as part of an AI Software Engineer internship assignment.

## Tech Stack
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma

## Features
- College listing with search and filters
- College detail pages
- Side-by-side college comparison
- Authentication and saved colleges

## Getting Started

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Visit `http://localhost:3000`

## Environment Variables
Create a `.env` file with:
```
DATABASE_URL="your-postgresql-connection-string"
```