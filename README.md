# TingXie HERO

Technical assignment for the Back-End Developer recruitment process.

> Status: In Development  
> Development Period: September 1–5, 2026

## Overview

TingXie HERO is a student-focused Chinese handwriting practice and grading application.

The intended workflow is:

    Select Lesson
        ↓
    Capture Handwriting
        ↓
    Submit Image
        ↓
    AI-Assisted Grading
        ↓
    Store Result
        ↓
    Display Score & Correction Feedback

The application is being developed as a Progressive Web App using a small
end-to-end vertical slice rather than attempting to implement a complete LMS.

## Technology Stack

Currently used:

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- Vitest
- Playwright
- Vercel

Planned for the grading pipeline:

- Gemini

## Current Architecture

Current verified backend foundation:

    Client
       ↓
    Next.js Route Handler
       ↓
    Server-Side Application Logic
       ↓
    Supabase

Target grading workflow:

    Camera Capture
       ↓
    Next.js Backend
       ↓
    Supabase Storage
       ↓
    Gemini
       ↓
    Structured Grading Result
       ↓
    Application Validation
       ↓
    Supabase Database
       ↓
    Result & Correction UI

The target architecture may still evolve as implementation exposes actual
constraints.

## Current Progress

### Day 1 — Requirement Understanding & Preparation

- [x] Reviewed technical assignment
- [x] Identified core student workflow
- [x] Researched initial architecture
- [x] Prepared repository and development documentation
- [x] Defined development priorities

### Day 2 — Next.js Initialization & Research

- [x] Initialized Next.js application
- [x] Used current `create-next-app` recommended defaults
- [x] Configured TypeScript, ESLint, Tailwind CSS, and App Router
- [x] Studied Next.js routing and server/client boundaries
- [x] Performed initial Supabase research
- [x] Performed initial Gemini research

### Day 3 — Backend Foundation

- [x] Completed initial Vercel deployment
- [x] Connected Next.js to Supabase
- [x] Added server-side Supabase client
- [x] Added Supabase health endpoint
- [x] Verified real Supabase connectivity
- [x] Added Vitest testing foundation
- [x] Added Playwright testing foundation
- [x] Added real Supabase integration test
- [x] Verified lint and production build
- [ ] Finalize database schema and RLS strategy
- [ ] Configure handwriting image storage
- [ ] Implement submission API
- [ ] Integrate Gemini grading
- [ ] Complete backend vertical slice

### Day 4 — Product Flow

- [ ] Camera capture
- [ ] Dashboard
- [ ] Syllabus
- [ ] Submission workflow
- [ ] Grading result
- [ ] Correction feedback
- [ ] Results history

### Day 5 — Stabilization & Submission

- [ ] End-to-end testing
- [ ] Security review
- [ ] PWA verification
- [ ] Deployment verification
- [ ] Documentation cleanup
- [ ] Final submission

## Testing

The project currently uses:

- **Vitest** for unit-level application logic.
- **Playwright** for integration and end-to-end testing.

Available commands:

```bash
npm test
npm run test:unit
npm run test:e2e
npm run lint
npm run build