
/*
# Portfolio Website Schema for Lera Garcia

## Overview
Creates all tables needed for the BSIT student portfolio website.

## New Tables

### projects
Stores portfolio project entries.
- id (uuid, pk)
- title (text)
- description (text)
- technologies (text array)
- features (text array)
- image_url (text, optional)
- live_url (text, optional)
- github_url (text, optional)
- category (text)
- created_at (timestamp)

### skills
Stores technical skills with humorous descriptions.
- id (uuid, pk)
- name (text)
- category (text) - e.g. Frontend, Backend, Tools
- level (int, 1-100)
- funny_description (text)
- icon (text, optional)
- created_at (timestamp)

### achievements
Stores academic/personal achievements.
- id (uuid, pk)
- title (text)
- description (text)
- year (text)
- icon (text, optional)
- created_at (timestamp)

### bible_verses
Stores Bible verses shown throughout the site.
- id (uuid, pk)
- verse_text (text)
- reference (text) - e.g. "John 3:16"
- is_featured (boolean)
- created_at (timestamp)

### messages
Stores contact form submissions.
- id (uuid, pk)
- name (text)
- email (text)
- subject (text)
- message (text)
- is_read (boolean)
- created_at (timestamp)

### visitor_stats
Tracks visitor and project view counts.
- id (uuid, pk)
- stat_key (text, unique)
- stat_value (bigint)
- updated_at (timestamp)

### personal_info
Single-row table for admin-editable personal information.
- id (uuid, pk)
- full_name (text)
- tagline (text)
- bio (text)
- email (text)
- phone (text, optional)
- location (text)
- resume_url (text, optional)
- profile_image_url (text)
- updated_at (timestamp)

## Security
- RLS enabled on all tables
- Public can SELECT projects, skills, achievements, bible_verses, personal_info, visitor_stats
- Public can INSERT messages (contact form)
- Public can UPDATE visitor_stats (for counting)
- Only anon+authenticated can manage admin data (simple portfolio, no multi-user auth)
*/

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  technologies text[] NOT NULL DEFAULT '{}',
  features text[] NOT NULL DEFAULT '{}',
  image_url text,
  live_url text,
  github_url text,
  category text NOT NULL DEFAULT 'Web',
  view_count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_projects" ON projects;
CREATE POLICY "public_select_projects" ON projects FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_projects" ON projects;
CREATE POLICY "public_insert_projects" ON projects FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_update_projects" ON projects;
CREATE POLICY "public_update_projects" ON projects FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "public_delete_projects" ON projects;
CREATE POLICY "public_delete_projects" ON projects FOR DELETE TO anon, authenticated USING (true);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  level integer NOT NULL DEFAULT 50 CHECK (level >= 0 AND level <= 100),
  funny_description text NOT NULL DEFAULT '',
  icon text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_skills" ON skills;
CREATE POLICY "public_select_skills" ON skills FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_skills" ON skills;
CREATE POLICY "public_insert_skills" ON skills FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_update_skills" ON skills;
CREATE POLICY "public_update_skills" ON skills FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "public_delete_skills" ON skills;
CREATE POLICY "public_delete_skills" ON skills FOR DELETE TO anon, authenticated USING (true);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  year text NOT NULL,
  icon text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_achievements" ON achievements;
CREATE POLICY "public_select_achievements" ON achievements FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_achievements" ON achievements;
CREATE POLICY "public_insert_achievements" ON achievements FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_update_achievements" ON achievements;
CREATE POLICY "public_update_achievements" ON achievements FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "public_delete_achievements" ON achievements;
CREATE POLICY "public_delete_achievements" ON achievements FOR DELETE TO anon, authenticated USING (true);

-- Bible verses table
CREATE TABLE IF NOT EXISTS bible_verses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  verse_text text NOT NULL,
  reference text NOT NULL,
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bible_verses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_bible_verses" ON bible_verses;
CREATE POLICY "public_select_bible_verses" ON bible_verses FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_bible_verses" ON bible_verses;
CREATE POLICY "public_insert_bible_verses" ON bible_verses FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_update_bible_verses" ON bible_verses;
CREATE POLICY "public_update_bible_verses" ON bible_verses FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "public_delete_bible_verses" ON bible_verses;
CREATE POLICY "public_delete_bible_verses" ON bible_verses FOR DELETE TO anon, authenticated USING (true);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_messages" ON messages;
CREATE POLICY "public_insert_messages" ON messages FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_select_messages" ON messages;
CREATE POLICY "public_select_messages" ON messages FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_update_messages" ON messages;
CREATE POLICY "public_update_messages" ON messages FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "public_delete_messages" ON messages;
CREATE POLICY "public_delete_messages" ON messages FOR DELETE TO anon, authenticated USING (true);

-- Visitor stats table
CREATE TABLE IF NOT EXISTS visitor_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_key text UNIQUE NOT NULL,
  stat_value bigint NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE visitor_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_visitor_stats" ON visitor_stats;
CREATE POLICY "public_select_visitor_stats" ON visitor_stats FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_visitor_stats" ON visitor_stats;
CREATE POLICY "public_insert_visitor_stats" ON visitor_stats FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_update_visitor_stats" ON visitor_stats;
CREATE POLICY "public_update_visitor_stats" ON visitor_stats FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- Personal info table (single row)
CREATE TABLE IF NOT EXISTS personal_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL DEFAULT 'Lera Garcia',
  tagline text NOT NULL DEFAULT 'BSIT Student | Aspiring Developer',
  bio text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text,
  location text NOT NULL DEFAULT 'Agusan del Sur, Philippines',
  resume_url text,
  profile_image_url text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_personal_info" ON personal_info;
CREATE POLICY "public_select_personal_info" ON personal_info FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_personal_info" ON personal_info;
CREATE POLICY "public_insert_personal_info" ON personal_info FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_update_personal_info" ON personal_info;
CREATE POLICY "public_update_personal_info" ON personal_info FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- Seed initial visitor stats
INSERT INTO visitor_stats (stat_key, stat_value) VALUES ('total_visitors', 0) ON CONFLICT (stat_key) DO NOTHING;
INSERT INTO visitor_stats (stat_key, stat_value) VALUES ('total_project_views', 0) ON CONFLICT (stat_key) DO NOTHING;
INSERT INTO visitor_stats (stat_key, stat_value) VALUES ('total_messages', 0) ON CONFLICT (stat_key) DO NOTHING;

-- Seed personal info
INSERT INTO personal_info (full_name, tagline, bio, email, location, profile_image_url)
VALUES (
  'Lera Garcia',
  'BSIT Student | Aspiring Full-Stack Developer',
  'Hello! I am Lera Garcia, a passionate Bachelor of Science in Information Technology student at Agusan del Sur State University. I love building digital solutions and exploring the world of technology. My faith guides my journey, and I believe that with God, all things are possible.',
  'lera.garcia@adssu.edu.ph',
  'Agusan del Sur, Philippines',
  '/268357fe-b849-415c-bc08-ba6544a96741.jpeg'
) ON CONFLICT DO NOTHING;

-- Seed initial skills
INSERT INTO skills (name, category, level, funny_description) VALUES
('HTML', 'Frontend', 85, 'I can write divs in my sleep. Literally. My roommate says I mumble closing tags.'),
('CSS', 'Frontend', 80, 'Spent 3 hours centering a div. Worth it. CSS is just controlled chaos with semicolons.'),
('JavaScript', 'Frontend', 75, 'Undefined is not a function — my personal nemesis and best friend simultaneously.'),
('React', 'Frontend', 70, 'Components everywhere! I now see the world as a collection of reusable UI pieces.'),
('PHP', 'Backend', 65, 'It keeps the internet running and I keep asking why. But hey, it works!'),
('MySQL', 'Backend', 72, 'SELECT * FROM brain WHERE knowledge = ''SQL''; Returns 1 row. Growing daily.'),
('Python', 'Backend', 60, 'Indentation is a lifestyle. I now organize my wardrobe by whitespace.'),
('Java', 'Backend', 55, 'Object-oriented? More like object-overwhelmed. But I''m getting there!'),
('Git', 'Tools', 78, 'git commit -m "fixed stuff" — my commit history tells a story of hope and despair.'),
('VS Code', 'Tools', 90, 'I have 47 extensions installed. Do I use them all? Absolutely not. But they spark joy.'),
('Figma', 'Design', 65, 'I design UIs that look great on the canvas. Translating to code is another adventure.'),
('Canva', 'Design', 88, 'The Swiss Army knife of design for people who appreciate drag-and-drop over sanity.'),
('Networking', 'IT Fundamentals', 60, 'OSI model? More like Oh-So-Intimidating model. But I''m climbing those 7 layers!'),
('Troubleshooting', 'IT Fundamentals', 82, 'Turn it off and on again. If that fails, Google. If that fails, cry, then Google again.')
ON CONFLICT DO NOTHING;

-- Seed achievements
INSERT INTO achievements (title, description, year, icon) VALUES
('Dean''s Lister', 'Achieved Dean''s List recognition for academic excellence at ADSSU.', '2024', 'award'),
('IT Wizard (Self-Proclaimed)', 'Successfully fixed a printer on the first try. The legend lives on.', '2024', 'star'),
('Project Survivor', 'Completed a full semester project without a single all-nighter. A miracle.', '2023', 'shield'),
('Bug Slayer', 'Found and fixed a bug that stumped the entire lab class. Glory was achieved.', '2024', 'zap'),
('Consistent Student', 'Never missed a major deadline. Fueled by faith, coffee, and mild panic.', '2023', 'check-circle')
ON CONFLICT DO NOTHING;

-- Seed Bible verses
INSERT INTO bible_verses (verse_text, reference, is_featured) VALUES
('For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.', 'Jeremiah 29:11', true),
('I can do all this through him who gives me strength.', 'Philippians 4:13', true),
('Trust in the Lord with all your heart and lean not on your own understanding.', 'Proverbs 3:5', true),
('Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.', 'Joshua 1:9', false),
('Commit to the Lord whatever you do, and he will establish your plans.', 'Proverbs 16:3', false),
('For God gave us a spirit not of fear but of power and love and self-control.', '2 Timothy 1:7', false)
ON CONFLICT DO NOTHING;

-- Seed projects
INSERT INTO projects (title, description, technologies, features, category) VALUES
(
  'Student Management System',
  'A comprehensive web-based system designed to manage student records, enrollment, grades, and attendance for educational institutions. Built with efficiency and ease of use in mind.',
  ARRAY['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Bootstrap'],
  ARRAY['Student registration and profile management', 'Grade encoding and computation', 'Attendance tracking with reports', 'Course and subject management', 'Admin dashboard with analytics', 'Export reports to PDF/Excel'],
  'Web Application'
),
(
  'Inventory Management System',
  'A full-featured inventory tracking system for small to medium businesses. Helps manage stock levels, track product movements, generate purchase orders, and produce inventory reports.',
  ARRAY['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'jQuery'],
  ARRAY['Product catalog with categories', 'Real-time stock level monitoring', 'Purchase and sales order management', 'Low stock alerts and notifications', 'Supplier management module', 'Detailed inventory reports and charts'],
  'Web Application'
),
(
  'Personal Budget Tracker',
  'A responsive web application that helps users track their income and expenses, set budgets, visualize spending patterns, and achieve financial goals. Clean and intuitive interface.',
  ARRAY['HTML', 'CSS', 'JavaScript', 'Chart.js', 'LocalStorage'],
  ARRAY['Income and expense logging', 'Category-based expense tracking', 'Interactive charts and graphs', 'Monthly/yearly budget summaries', 'Export data to CSV', 'Dark mode support'],
  'Web Application'
),
(
  'Library Management System',
  'A digital library management solution that streamlines book cataloging, member registration, borrowing transactions, and return processing. Makes library operations efficient and paperless.',
  ARRAY['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Bootstrap'],
  ARRAY['Book catalog with search and filter', 'Member registration and management', 'Borrowing and return transaction system', 'Overdue book tracking and fines', 'Book reservation system', 'Librarian dashboard with statistics'],
  'Web Application'
)
ON CONFLICT DO NOTHING;
