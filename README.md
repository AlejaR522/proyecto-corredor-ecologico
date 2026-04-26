This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# CORREDOR ECOLOGICO

CORREDOR ECOLOGICO is a job board web platform designed to connect people with employment opportunities inside the community. The system allows users to explore vacancies, apply to available positions, and interact with a modern recruitment platform.

It also includes an administration panel where job offers, candidates, and internal processes can be managed efficiently.

---

## Overview

This project was developed as a digital employment solution focused on improving access to work opportunities within a specific community.

The platform provides two main access levels:

- Administrator
- User

Users can search and apply for jobs, while administrators manage vacancies and candidate applications.

---

## Main Features

### User Functions

Users can:

- Register an account
- Log in securely
- Explore available vacancies
- Apply to job opportunities
- Manage their profile information

### Admin Functions

Administrators can:

- Access an admin dashboard
- Publish new job vacancies
- Edit or remove job offers
- Review candidates
- Manage applications
- Organize platform content

---

## Technologies Used

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API Routes
- Server-side rendering features

### Database

- Relational database integration

### Other Tools

- Prisma ORM
- ESLint
- PostCSS

---

## Project Structure

```sh
CORREDOR-ECOLOGICO/
 __ actions/
├── app/
│   ├── (admin)/
│   │   └── dashboard/
│   │
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   │
│   ├── api/
│   │   └── auth/
│   │
│   ├── candidates/
│   ├── jobs/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── auth/
│   ├── dashboard/
│   ├── jobs/
│   ├── landing/
│   └── ui/
│
├── hooks/
├── lib/
├── prisma/
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

### Installation
# Requirements
- Node.js installed
- npm or bun package manager

### Steps
# Clone repository
```sh
git clone https://github.com/AlejaR522/proyecto-corredor-ecologico.git
cd corredor-ecologico
```
### Install dependencies
```sh
npm install
```

### Configure environment variables
```sh
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### Run development server
```sh
npm run dev
```

# Open browser
```sh
http://localhost:3000
```

### How It Works
- Administrators publish job opportunities.
- Users create accounts and log in.
- Users review available vacancies.
- Users submit applications.
- Administrators evaluate candidates.
- Recruitment processes continue internally.

### Purpose of the Project

This project was created as an academic and practical solution for digital recruitment management.

# It demonstrates:

- Full-stack development with Next.js
- Authentication systems
- Admin dashboard design
- Database integration
- Job board workflow
- Modern responsive UI

## Deployment

This application can be deployed on platforms such as:

- Vercel
- Railway
- Render
- Netlify

### Author

Developed by Alejandra Ruiz