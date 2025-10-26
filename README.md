# Anant WebApp

## Getting Started

Spin up services:

```bash
docker compose -f ./docker/docker-compose.yml up -d
```

Install dependencies

```bash
pnpm install
```

Migrate prisma

```bash
pnpm prisma migrate dev
```

Run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
