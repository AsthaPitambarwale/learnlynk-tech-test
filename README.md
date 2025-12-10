# LearnLynk – Technical Test (Supabase + Next.js)

This repository contains the full implementation of the LearnLynk technical test:

✔ Supabase SQL Schema  
✔ RLS Policies  
✔ Edge Function (`create-task`)  
✔ Next.js Dashboard Page `/dashboard/today`  
✔ React Query Integration  
✔ Environment Configuration  
✔ Submission Notes + Assumptions  

## 1. Project Setup

Install dependencies:

    npm install

Create `.env.local`:

    NEXT_PUBLIC_SUPABASE_URL=your-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

## 2. Supabase Setup

Run migrations manually in Supabase SQL Editor:

- `supabase/migrations/001_schema.sql`
- `supabase/policies/leads_policies.sql`

## 3. Edge Function Deployment

Set environment secrets in:
Supabase Dashboard → Edge Functions → Secrets

    SUPABASE_URL=https://yourproject.supabase.co
    SUPABASE_SERVICE_ROLE_KEY=...

Deploy:

    supabase functions deploy create-task

## 4. Running the Project

    npm run dev

Open:  
http://localhost:3000/dashboard/today

## 5. Assumptions

- JWT token contains `role` and `sub` user id.
- Each application belongs to a lead.
- Tasks reference applications through `related_id`.
- Only valid task types allowed: call, email, review.
- Task must have `due_at > created_at`.

## 6. Folder Explanation

- `supabase/` → SQL + RLS + Edge Functions  
- `app/dashboard/today/` → Task UI Page  
- `src/lib/supabase.ts` → Supabase client  
- `index.ts` → Edge function source  
- `.gitignore` → Prevent secrets in Git  

## 7. Final Notes

This project follows:
- Clean architecture
- Consistent naming
- Proper constraints & indexes
- Clear RLS logic
- Validations in Edge Function
- React Query for state management

This is a complete and working submission.
