# Development Journey

## TingXie HERO Technical Assignment

This document captures my development journey while working on the technical
assignment.

Instead of documenting only the final result, I wanted to preserve the
preparation, learning process, engineering decisions, challenges, experiments,
and lessons that influenced the final implementation.

My approach throughout the assignment is:

    Prepare
        ↓
    Understand
        ↓
    Research
        ↓
    Plan
        ↓
    Implement
        ↓
    Verify
        ↓
    Reflect

---

# Day 1 — Project Preparation

**Date:** September 1, 2026

## Goal

Prepare the project workspace and supporting documentation before beginning
technical research and implementation.

The purpose of this day was not to start coding immediately, but to organize
the assignment so that the following development days could remain focused.

---

## Activities

- Prepared the local project workspace.
- Created the initial repository structure.
- Prepared supporting documentation.
- Created `PLAN.md`.
- Created `DEVLOG.md`.
- Created `DECISIONS.md`.
- Reviewed the assignment requirements.
- Identified the expected submission format.
- Defined an initial high-level development timeline.
- Prepared the tools that would be used during development.

---

## Initial Project Files

The repository was prepared with the following documentation structure:

    README.md
    PLAN.md
    DEVLOG.md
    DECISIONS.md

At this stage, these documents were intentionally lightweight and expected to
evolve alongside the implementation.

---

## Initial Thoughts

My strongest production experience is primarily with Laravel, MySQL,
JavaScript, and traditional web application development.

The assignment introduces several technologies that are relatively new to my
usual workflow, particularly Next.js, Supabase, and Gemini-based image
processing.

Instead of immediately generating an implementation using AI, I decided to
separate preparation, learning, architecture, implementation, and verification
into distinct stages.

---

## AI Development Strategy

Before implementation begins, I plan to use the tools with different roles:

### ChatGPT

Primary role:

- Requirement analysis
- Research assistance
- Architecture discussion
- Technical review
- Challenging assumptions
- Security and implementation review

### Codex

Primary role:

- Implementation
- Refactoring
- Repetitive development tasks
- Testing assistance
- Applying implementation decisions

### My Role

My responsibility remains:

- Understanding the requirements
- Making final engineering decisions
- Reviewing generated code
- Testing behavior
- Validating implementation
- Accepting or rejecting proposed solutions
- Taking responsibility for the final submission

---

## Development Timeline

### Day 1 — Preparation

Prepare repository, documentation, workspace, and development strategy.

### Day 2 — Research & Architecture

Learn the unfamiliar stack, review tutorials and official documentation,
and define the initial architecture.

### Day 3 — Foundation & Core Backend

Build the project foundation and prove the core backend and AI pipeline.

### Day 4 — End-to-End Product Flow

Connect the frontend experience with the backend pipeline and complete the
main student workflow.

### Day 5 — Stabilization & Submission

Focus on testing, security, documentation, deployment verification,
and final submission.

---

## End-of-Day Reflection

### Completed

- [x] Prepared development workspace
- [x] Prepared documentation structure
- [x] Created initial implementation plan
- [x] Defined AI-assisted development workflow
- [x] Reviewed assignment scope

### Technical Research Completed

None yet.

Technical research is intentionally scheduled for Day 2.

### Coding Completed

None yet.

### Next Priority

Begin focused research into:

- Next.js architecture
- Server/client boundaries
- Supabase integration
- Gemini image processing
- Structured AI responses
- Vercel deployment

---

# Day 2 — Research & Architecture

**Date:** September 2, 2026

## Goal

Build enough understanding of the unfamiliar technology stack to make informed
implementation decisions before writing significant application code.

---

## Questions I Want to Answer

### Next.js

- How is a modern Next.js application structured?
- How does the App Router work?
- What belongs in Server Components?
- What requires Client Components?
- How should Route Handlers be used?
- How should environment variables be handled?

### Supabase

- How should a Next.js application communicate with Supabase?
- What credentials are safe to expose?
- How should privileged operations be handled?
- How should image uploads be stored?
- What database structure fits the assignment?

### Gemini

- How does Gemini accept image input?
- Can the model return structured JSON?
- How should the grading prompt be structured?
- How should invalid AI responses be handled?
- Should Gemini communication happen server-side?

### Vercel

- How are environment variables configured?
- Are there serverless limitations relevant to image processing?
- How should production deployment influence the architecture?

---

## Learning Resources

### Next.js

#### Resource 1

**Title:**  
...

**Type:**  
YouTube / Official Documentation / Article

**Link:**  
...

**Why I used it:**

...

**Key takeaway:**

...

**Applied to:**

...

---

### Supabase

#### Resource 1

**Title:**  
...

**Type:**  
...

**Link:**  
...

**Why I used it:**

...

**Key takeaway:**

...

---

### Gemini

#### Resource 1

**Title:**  
...

**Type:**  
...

**Link:**  
...

**Why I used it:**

...

**Key takeaway:**

...

---

## Initial Architecture

After completing the initial research, the expected application flow is:

    Student
       ↓
    Next.js UI
       ↓
    Camera Capture
       ↓
    Backend Route Handler
       ↓
    Supabase Storage
       ↓
    Gemini Processing
       ↓
    Structured Grading Result
       ↓
    Supabase Database
       ↓
    Backend Response
       ↓
    Result & Correction UI

---

## Research Findings

### Finding 1

...

### Finding 2

...

### Finding 3

...

---

## Decisions Influenced by Research

### Decision 1

...

**Reason:**

...

**Related ADR:**

ADR-...

---

## Things I Still Do Not Fully Understand

- ...
- ...
- ...

These items will be researched just-in-time when they become relevant during
implementation.

---

## End-of-Day Reflection

### What I Learned

...

### What Changed From My Initial Assumptions

...

### Architecture Decisions Made

- ...
- ...

### Coding Completed

...

### Next Priority

Begin implementation of the project foundation and core backend pipeline.

---

# Day 3 — Foundation & Core Backend

**Date:** September 3, 2026

## Goal

Turn the architecture into a working application foundation and prove the
highest-risk technical workflow.

Primary target:

    Image
      ↓
    Backend
      ↓
    Storage
      ↓
    Gemini
      ↓
    Database
      ↓
    JSON Response

---

## Challenge 1 — [Title]

### Problem

...

### Initial Thought

...

### Research

...

### Decision

...

### AI Assistance

**ChatGPT:**

...

**Codex:**

...

### Implementation

...

### Verification

...

### Result

- [ ] Working
- [ ] Partial
- [ ] Rejected / replaced

### Lesson

...

---

## End-of-Day Reflection

### Completed

- [ ] Project foundation
- [ ] Supabase integration
- [ ] Storage
- [ ] Backend endpoint
- [ ] Gemini integration
- [ ] Structured response
- [ ] Database persistence
- [ ] End-to-end backend test

### Biggest Challenge

...

### Biggest Lesson

...

### Next Priority

Connect the working backend pipeline to the complete student workflow.

---

# Day 4 — End-to-End Product Flow

**Date:** September 4, 2026

## Goal

Complete the primary student experience around the working backend pipeline.

---

## Target Flow

    Dashboard
       ↓
    Syllabus
       ↓
    Lesson
       ↓
    Camera
       ↓
    Capture
       ↓
    Upload
       ↓
    AI Grading
       ↓
    Score
       ↓
    Correction Feedback
       ↓
    Results

---

## Development Focus

- [ ] Camera interface
- [ ] Image capture
- [ ] Upload interaction
- [ ] Loading state
- [ ] Grading response
- [ ] Score display
- [ ] Incorrect answer feedback
- [ ] Red correction overlay
- [ ] Dashboard
- [ ] Syllabus
- [ ] Results history
- [ ] Mobile usability

---

## Challenges

...

---

## End-of-Day Reflection

### Completed

...

### Remaining Problems

...

### Features Intentionally Not Implemented

...

### Why

...

### Next Priority

Stop expanding scope and stabilize the application for submission.

---

# Day 5 — Stabilization & Submission

**Date:** September 5, 2026

## Goal

Prioritize quality over additional features.

No major functionality should be introduced unless required to fix the core
workflow.

---

## Final Review

### Core Workflow

- [ ] Dashboard works
- [ ] Syllabus works
- [ ] Camera works
- [ ] Image submission works
- [ ] Gemini processing works
- [ ] Results are persisted
- [ ] Score is displayed
- [ ] Correction overlay works
- [ ] Results history works

### Production

- [ ] Vercel deployment verified
- [ ] Production environment variables verified
- [ ] Mobile test completed
- [ ] Error states tested

### Security

- [ ] Gemini key is server-side
- [ ] No secret committed to repository
- [ ] Supabase privileged credentials protected
- [ ] Upload validation reviewed
- [ ] Error responses reviewed

### Documentation

- [ ] README finalized
- [ ] PLAN updated
- [ ] DEVLOG finalized
- [ ] DECISIONS finalized
- [ ] Known limitations documented
- [ ] Live deployment URL added
- [ ] Setup instructions verified

### Submission

- [ ] GitHub repository checked
- [ ] Commit history checked
- [ ] Production URL checked
- [ ] Submission email prepared
- [ ] Submitted before deadline

---

# Final Reflection

## What I Learned

...

## What Was Most Challenging

...

## What Changed Between Day 1 and Day 5

...

## How AI Accelerated Development

...

## Where Human Review Was Important

...

## AI Suggestions I Rejected or Modified

...

## What I Would Improve With More Time

...

## What I Would Change for a Production System

...

## Final Takeaway

...