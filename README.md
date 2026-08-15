# Beyond the Graph: The X-Y Files

Next.js + TypeScript e-portfolio for Group 1 Pre-Calculus. It uses Supabase for the database, storage, and authenticated application data.

## Local setup

1. Copy `.env.example` to `.env.local` and set the Supabase URL, anon key, service-role key, and a strong `ACCESS_CODE_SECRET`.
2. In a new Supabase project, run [`supabase/schema.sql`](supabase/schema.sql) in the SQL Editor.
3. Create the five members as Supabase Auth users, then insert matching `profiles` records with their real email addresses and roles. The SQL deliberately does not invent email addresses.
4. Install and run: `npm install && npm run dev`.

## Deployment

1. Push this folder to a private GitHub repository.
2. Import the repository into Vercel.
3. Add every `.env.example` variable in Vercel Project Settings (never commit `.env.local`).
4. Deploy, then verify the database connection, access-code route, topic creation, storage policy, and one real post in production.

## Security notes

The server route checks the shared code with a timing-safe comparison and stores only an HTTP-only session marker. For full authenticated writes, connect Supabase Auth to the login flow and enforce the included RLS policies. The service-role key is server-only; do not prefix it with `NEXT_PUBLIC_`.
