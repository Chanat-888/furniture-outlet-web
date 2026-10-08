-- Accounts: profiles (one per auth user) and addresses (optional, needed at order time).
-- Email and sign-in methods stay in auth.users / auth.identities.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  -- null until signup step 2 is done
  username text check (char_length(btrim(username)) between 2 and 50),
  phone text check (phone ~ '^0[0-9]{8,9}$'),
  privacy_consent_at timestamptz,
  privacy_policy_version text,
  marketing_opt_in boolean not null default false,
  marketing_opt_in_at timestamptz,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  -- set when the user finishes (or leaves) the signup wizard
  onboarded_at timestamptz,
  created_at timestamptz not null default now()
);

-- Create the profile row as soon as Google sign-in creates the auth user.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  label text,
  address_line text not null,   -- house no., street, building
  subdistrict text not null,    -- แขวง/ตำบล
  district text not null,       -- เขต/อำเภอ
  province text not null,
  postcode text not null check (postcode ~ '^[0-9]{5}$'),
  note text,                    -- landmarks, delivery instructions
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index addresses_one_default_per_user
  on public.addresses (user_id) where is_default;

-- Row-level security: users only see and change their own rows.
alter table public.profiles enable row level security;
alter table public.addresses enable row level security;

create policy "profiles: read own" on public.profiles
  for select to authenticated using (id = (select auth.uid()));

create policy "profiles: update own" on public.profiles
  for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

create policy "addresses: read own" on public.addresses
  for select to authenticated using (user_id = (select auth.uid()));

create policy "addresses: insert own" on public.addresses
  for insert to authenticated with check (user_id = (select auth.uid()));

create policy "addresses: update own" on public.addresses
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "addresses: delete own" on public.addresses
  for delete to authenticated using (user_id = (select auth.uid()));

-- Table privileges (new tables are not auto-exposed). Anonymous users get nothing.
-- Profiles: users can read everything but update only these columns, so `role` is locked.
grant select on public.profiles to authenticated;
grant update (
  username, phone,
  privacy_consent_at, privacy_policy_version,
  marketing_opt_in, marketing_opt_in_at,
  onboarded_at
) on public.profiles to authenticated;

grant select, insert, update, delete on public.addresses to authenticated;
