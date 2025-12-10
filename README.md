# LearnLynk – Technical Test

A complete implementation of all 5 sections:
- SQL Schema
- RLS Policies
- Supabase Edge Function
- Next.js dashboard page
- Stripe Checkout explanation

## Setup

1. Install dependencies:
```
npm install
```
2. Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```
3. Run dev server:
```
npm run dev
```
## Folder Breakdown
- supabase/migrations → SQL schema
- supabase/policies → RLS
- supabase/functions → Edge Functions
- app/dashboard/today → Tasks page
- src/lib/supabase.ts → Client setup
