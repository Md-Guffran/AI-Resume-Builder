# AI Resume Builder

A modern, full-stack resume builder app built with Next.js, Neon (PostgreSQL), and React. Users can create, edit, and manage resumes, track job applications, and analyze dashboard stats. Supports Google OAuth login and multiple professional resume templates.

---

## Features

- **User Authentication:** Google OAuth (with Neon users table)
- **Resume Builder:** Multiple templates (Modern, Minimal, Creative, Professional)
- **Job Tracker:** Track applications, interviews, offers, and rejections
- **Dashboard:** View stats (total resumes, applications, interviews, success rate)
- **Data Persistence:** All data stored in Neon (PostgreSQL)
- **PDF Export:** Download resumes as PDF
- **Responsive UI:** Built with React, Tailwind CSS, and Lucide icons

---

## Tech Stack

- [Next.js 14+ (App Router)](https://nextjs.org/)
- [React](https://react.dev/)
- [Neon (PostgreSQL)](https://neon.tech/)
- [@neondatabase/serverless](https://www.npmjs.com/package/@neondatabase/serverless) or [@vercel/postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [jsPDF](https://github.com/parallax/jsPDF)

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/ai-resume-builder.git
cd ai-resume-builder
```

### 2. Install Dependencies

```sh
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root:

```
DATABASE_URL=postgres://username:password@host:port/database
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Set Up the Database

- [Create a Neon project](https://neon.tech/)
- Run the migration scripts in your Neon SQL editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Resumes table
CREATE TABLE resumes (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  template TEXT NOT NULL,
  last_modified TIMESTAMP DEFAULT NOW(),
  status TEXT DEFAULT 'Draft'
);

-- Jobs table
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  location TEXT,
  salary TEXT,
  status TEXT,
  date_applied DATE DEFAULT CURRENT_DATE
);

-- Dashboard stats table
CREATE TABLE dashboard_stats (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  applications INT DEFAULT 0,
  interviews INT DEFAULT 0
);
```

### 5. Run the Development Server

```sh
pnpm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Folder Structure

```
app/
  api/                # API routes (jobs, resumes, auth, etc.)
  dashboard/          # Dashboard page
  tracker/            # Job tracker page
  ...
components/           # UI components and resume templates
lib/                  # Database client (e.g., lib/neon.ts)
public/               # Static assets
```

---

## Customization

- Add more resume templates in `components/resume-templates/`
- Extend the database schema as needed
- Integrate more authentication providers via NextAuth.js

---

## License

MIT

---

## Credits

- [Neon](https://neon.tech/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
