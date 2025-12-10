alter table public.leads enable row level security;

-- READ
create policy "counselors read own or team leads"
on public.leads
for select
using (
  auth.jwt()->>'role' = 'admin'
  OR owner_id = auth.uid()
  OR owner_id in (
      select user_id
      from user_teams ut
      where ut.team_id in (
          select team_id 
          from user_teams
          where user_id = auth.uid()
      )
  )
);

-- INSERT
create policy "insert leads allowed"
on public.leads
for insert
with check (
  auth.jwt()->>'role' = 'admin'
  OR owner_id = auth.uid()
);
