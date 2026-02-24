# The Ancient Lens — Content Studio

A dark-themed cinematic dashboard for managing YouTube Shorts content for **The Ancient Lens**, a history channel focused on daily life reconstruction of ancient civilizations.

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Google Gemini API** (gemini-1.5-flash)
- **localStorage** for data persistence

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Get a Gemini API Key (Free)

1. Go to [Google AI Studio](https://aistudio.google.com)
2. Click **"Get API Key"**
3. Click **"Create API Key"**
4. Copy the key and paste it into your `.env.local` file

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Dashboard with stats and filterable grid of YouTube Shorts
- Add/edit shorts with title, civilization, status, scheduled date, script, and image prompts
- AI-powered script and image prompt generation via Google Gemini
- One-click copy for scripts and image prompts
- Detail view for each short with scene-by-scene image prompt display
- Pre-loaded with 5 sample shorts
- Dark cinematic theme with gold accent colors

## Civilizations

- Egypt
- Rome
- Greece
- Mesopotamia
- Persia

## Project Structure

```
/app
  /api/generate/route.ts   — Gemini API route
  /short/[id]/page.tsx     — Short detail page
  layout.tsx               — Root layout
  page.tsx                 — Dashboard
/components
  ShortCard.tsx            — Short card for the grid
  AddShortModal.tsx        — Modal for adding/editing shorts
  GenerateButton.tsx       — AI generation trigger button
  StatusBadge.tsx          — Status indicator badge
  CivilizationBadge.tsx   — Civilization color badge
  Toast.tsx                — Toast notification
/lib
  gemini.ts                — Gemini API client and prompt builders
  storage.ts               — localStorage persistence layer
  types.ts                 — TypeScript interfaces and constants
```
