-- 장바구니 테이블 (Supabase > SQL Editor 에 그대로 붙여 넣고 Run)
-- 여러 번 실행해도 오류가 나지 않도록 작성했습니다.

create table if not exists public.cart_items (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null default auth.uid()
               references auth.users (id) on delete cascade,
  pixabay_id   bigint not null,          -- Pixabay 이미지 ID
  thumb_url    text   not null,          -- 미리보기 이미지 URL
  large_url    text   not null,          -- 원본(큰 이미지) URL
  page_url     text,                     -- Pixabay 상세 페이지
  tags         text,                     -- 이미지 태그
  photographer text,                     -- 올린 사람
  price        integer not null default 0 check (price = 0),  -- 항상 0원
  created_at   timestamptz not null default now(),
  unique (user_id, pixabay_id)           -- 같은 사진은 한 번만 담기
);

create index if not exists cart_items_user_created_idx
  on public.cart_items (user_id, created_at desc);

-- 행 단위 보안: 본인 장바구니만 보고, 담고, 지울 수 있음
alter table public.cart_items enable row level security;

drop policy if exists "cart_select_own" on public.cart_items;
create policy "cart_select_own" on public.cart_items
  for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "cart_insert_own" on public.cart_items;
create policy "cart_insert_own" on public.cart_items
  for insert to authenticated
  with check (user_id = (select auth.uid()));

drop policy if exists "cart_delete_own" on public.cart_items;
create policy "cart_delete_own" on public.cart_items
  for delete to authenticated
  using (user_id = (select auth.uid()));
