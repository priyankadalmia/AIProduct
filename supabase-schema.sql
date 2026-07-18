-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- Site settings (name, description, and other configurable fields)
create table site_settings (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value text not null,
  updated_at timestamptz default now()
);

-- Insert default settings
insert into site_settings (key, value) values
  ('site_name', 'BumpJournal'),
  ('site_tagline', 'Your Pregnancy Journey'),
  ('hero_title', 'Cherish Every Moment of Your Pregnancy Journey'),
  ('hero_description', 'A beautiful, private space to journal your pregnancy — track your baby''s growth, capture milestones, and create memories that last a lifetime.'),
  ('cta_text', 'Start Your Journal'),
  ('footer_text', 'BumpJournal — Cherishing every moment of your pregnancy journey');

-- Journal entries
create table journal_entries (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  body text not null,
  mood text not null,
  week integer not null,
  symptoms text[] default '{}',
  tags text[] default '{}',
  has_photo boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Insert sample journal entries
insert into journal_entries (title, body, mood, week, tags, has_photo, created_at) values
  ('Felt the baby kick during lunch!', 'Was sitting at my desk eating lunch and felt the strongest kick yet. My coworker noticed me smiling and I got to share the moment.', '😊', 24, '{kicks,work}', false, '2026-07-10T12:00:00Z'),
  ('Tired but grateful', 'Had trouble sleeping last night with the back pain, but woke up feeling thankful for this journey. Partner made me breakfast in bed.', '😴', 24, '{sleep,gratitude}', false, '2026-07-08T12:00:00Z'),
  ('Ultrasound day!', 'Got to see our little one today. Everything looks healthy and baby is growing right on track. The doctor said baby weighs about 1.3 lbs now.', '🥰', 23, '{ultrasound,checkup}', true, '2026-07-05T12:00:00Z'),
  ('Weird cravings continue', 'Pickles and peanut butter again. I know it sounds weird but it''s actually delicious. Also started nesting — organized the entire nursery closet.', '😋', 23, '{cravings,nesting}', false, '2026-07-02T12:00:00Z'),
  ('Gender reveal party!', 'We finally shared the news with family and friends. Everyone was so excited! The cake reveal was perfect.', '😊', 22, '{celebration,family}', true, '2026-06-28T12:00:00Z'),
  ('First Braxton Hicks', 'Had my first Braxton Hicks contractions today. Was a bit scared at first but after talking to the doctor, I feel better knowing it''s normal.', '😰', 22, '{symptoms,health}', false, '2026-06-25T12:00:00Z');

-- Milestones
create table milestones (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  icon text not null,
  week integer not null,
  completed boolean default false,
  sort_order integer not null,
  created_at timestamptz default now()
);

-- Insert default milestones
insert into milestones (title, description, icon, week, completed, sort_order) values
  ('Positive pregnancy test!', 'The moment everything changed — two pink lines!', '🎉', 4, true, 1),
  ('First prenatal appointment', 'Met the OB-GYN and heard reassuring words about the pregnancy.', '🏥', 6, true, 2),
  ('First heartbeat heard', 'The most beautiful sound — baby''s heart beating strong at 165 bpm.', '💓', 8, true, 3),
  ('Shared the news with family', 'Called our parents and saw the joy in their eyes over FaceTime.', '👨‍👩‍👧', 10, true, 4),
  ('End of first trimester', 'Made it through the toughest part! Energy is slowly coming back.', '🎊', 12, true, 5),
  ('Morning sickness fading', 'Finally able to eat breakfast without feeling nauseous!', '😮‍💨', 13, true, 6),
  ('First tiny flutters felt', 'Felt the first quickening — like tiny butterflies in my belly.', '🦋', 16, true, 7),
  ('Gender reveal', 'Found out we''re having a baby girl!', '💛', 18, true, 8),
  ('Anatomy scan — halfway there!', 'Everything looks perfect. Got to see her little face!', '📺', 20, true, 9),
  ('Baby can hear my voice', 'Started reading bedtime stories and singing to her.', '🎵', 22, true, 10),
  ('Viability milestone', 'Baby has reached viability — a huge milestone!', '⭐', 24, true, 11),
  ('Third trimester begins', 'The final stretch! Getting ready for her arrival.', '🏁', 27, false, 12),
  ('Glucose screening test', 'Routine glucose tolerance test to check for gestational diabetes.', '🧪', 28, false, 13),
  ('Nursery ready', 'Finish decorating and setting up the nursery.', '🎨', 30, false, 14),
  ('Baby shower', 'Celebration with friends and family.', '🎁', 32, false, 15),
  ('Hospital bag packed', 'Everything ready for the big day.', '🧳', 34, false, 16),
  ('Weekly checkups begin', 'Weekly prenatal visits start from now.', '📋', 36, false, 17),
  ('Full term!', 'Baby is considered full term and could arrive any day.', '🌟', 37, false, 18),
  ('Due date — meet our baby!', 'The day we''ve been waiting for!', '👶', 40, false, 19);

-- Enable Row Level Security (allow public read, restrict write)
alter table site_settings enable row level security;
alter table journal_entries enable row level security;
alter table milestones enable row level security;

-- Public read access
create policy "Public read site_settings" on site_settings for select using (true);
create policy "Public read journal_entries" on journal_entries for select using (true);
create policy "Public read milestones" on milestones for select using (true);

-- Public write access (for admin — in production, restrict to authenticated users)
create policy "Public write site_settings" on site_settings for all using (true) with check (true);
create policy "Public write journal_entries" on journal_entries for all using (true) with check (true);
create policy "Public write milestones" on milestones for all using (true) with check (true);
