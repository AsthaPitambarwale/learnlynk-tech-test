-- LEADS TABLE
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  owner_id uuid not null,
  name text,
  stage text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index leads_owner_idx on public.leads(owner_id);
create index leads_stage_idx on public.leads(stage);
create index leads_created_idx on public.leads(created_at);


-- APPLICATIONS TABLE
create table public.applications (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  lead_id uuid not null references public.leads(id) on delete cascade,
  program text,
  status text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index applications_lead_idx on public.applications(lead_id);


-- TASKS TABLE
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  related_id uuid not null references public.applications(id) on delete cascade,
  title text,
  type text not null,
  status text default 'pending',
  due_at timestamptz not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  
  constraint valid_task_type check (type in ('call', 'email', 'review')),
  constraint due_after_creation check (due_at >= created_at)
);

create index tasks_due_idx on public.tasks(due_at);
