@AGENTS.md

# BumpJournal — Pregnancy Journaling App

## Overview
A pregnancy journaling web app where users can document their pregnancy journey, track weekly progress, log moods/symptoms, and celebrate milestones.

## Tech Stack
- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Node**: v22 (installed at `~/.local/node/bin/node`)
- **Package Manager**: npm

## Project Structure
```
src/
├── app/
│   ├── page.tsx              # Landing page (hero, features, testimonials, CTA)
│   ├── layout.tsx            # Root layout with Navbar + Footer
│   ├── globals.css           # Tailwind + pink/blue theme CSS variables
│   ├── dashboard/page.tsx    # Week tracker, progress bar, recent entries, symptoms
│   ├── journal/page.tsx      # Journal entries list with search, trimester & mood filters
│   ├── journal/new/page.tsx  # New entry form (mood picker, symptoms, photo upload)
│   ├── weekly-guide/page.tsx # 40-week selector with baby development & body changes
│   ├── milestones/page.tsx   # Timeline of pregnancy milestones
│   ├── login/page.tsx        # Login form with Google OAuth option
│   └── signup/page.tsx       # Signup form with due date field
├── components/
│   ├── navbar.tsx            # Sticky responsive navbar with hamburger menu
│   └── theme-toggle.tsx      # Pink/blue color theme switcher (localStorage)
```

## Theme System
- Two color themes: **pink** (default) and **blue**
- Controlled via `data-theme` attribute on `<html>`
- Theme preference saved to `localStorage` key `bj-theme`
- All colors use CSS custom properties mapped through Tailwind's `@theme inline`

## Dev Server
```bash
npm run dev
```
Runs on `http://localhost:3000`. The `.claude/launch.json` is configured for the preview browser.

## Current State
- All pages are **static/demo** with hardcoded sample data
- No backend, database, or authentication implemented yet
- No tests written yet

## Key Design Decisions
- Mobile-first responsive design with Tailwind breakpoints
- Soft, warm color palette appropriate for pregnancy/parenting
- Card-based UI with rounded corners and subtle borders
- Emoji-based mood picker and milestone icons
- Week 24 used as the demo "current week" throughout
