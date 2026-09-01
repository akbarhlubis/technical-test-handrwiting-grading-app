# Development Plan

## Project

TingXie HERO — Technical Assignment

## Purpose

This document defines the development plan for the TingXie HERO technical
assignment.

The goal is to maintain a clear scope, prioritize the core end-to-end workflow,
and avoid unnecessary complexity within the available development time.

This plan is a living document. It may evolve as research and implementation
reveal new constraints or better approaches.

---

# 1. Development Timeline

## Day 1 — Project Preparation

**Date:** September 1, 2026

### Goal

Prepare the development environment, repository structure, documentation,
and working strategy before beginning technical research.

### Activities

- [x] Review the technical assignment
- [x] Identify the expected deliverables
- [x] Prepare project workspace
- [x] Prepare repository structure
- [x] Create `PLAN.md`
- [x] Create `DEVLOG.md`
- [x] Create `DECISIONS.md`
- [x] Define initial development timeline
- [x] Define AI-assisted development workflow

### Technical Research

Not started yet.

### Implementation

Not started yet.

### Expected Outcome

A clean project workspace and a clear development strategy for the following
days.

---

## Day 2 — Research & Architecture

**Date:** September 2, 2026

### Goal

Understand the unfamiliar parts of the technology stack before making
significant implementation decisions.

### Research Topics

#### Next.js

- [ ] Understand the App Router
- [ ] Understand Server Components
- [ ] Understand Client Components
- [ ] Understand Route Handlers
- [ ] Understand environment variable handling
- [ ] Understand recommended project structure

#### Supabase

- [ ] Understand Next.js integration
- [ ] Understand database access
- [ ] Understand Supabase Storage
- [ ] Understand public vs privileged credentials
- [ ] Understand server-side access patterns

#### Gemini

- [ ] Understand image/multimodal input
- [ ] Understand structured output
- [ ] Understand prompt design for grading
- [ ] Understand API key security
- [ ] Understand error handling

#### Vercel

- [ ] Understand Next.js deployment
- [ ] Understand production environment variables
- [ ] Identify serverless limitations relevant to the project

### Architecture Activities

- [ ] Define frontend/backend boundary
- [ ] Define initial database schema
- [ ] Define image upload flow
- [ ] Define Gemini processing flow
- [ ] Define grading response format
- [ ] Define persistence strategy
- [ ] Review proposed ADRs
- [ ] Accept/reject/update architectural decisions

### Expected Outcome

A sufficiently understood architecture to begin implementation without relying
blindly on AI-generated solutions.

---

## Day 3 — Foundation & Core Backend

**Date:** September 3, 2026

### Goal

Build the application foundation and prove the highest-risk technical workflow.

### Target Vertical Slice

    Image
        ↓
    Backend
        ↓
    Storage
        ↓
    Gemini
        ↓
    Structured Result
        ↓
    Database
        ↓
    API Response

### Project Foundation

- [ ] Initialize Next.js
- [ ] Configure Tailwind CSS
- [ ] Configure environment variables
- [ ] Create GitHub repository
- [ ] Connect project to Vercel
- [ ] Create Supabase project
- [ ] Connect application to Supabase

### Database & Storage

- [ ] Define database schema
- [ ] Create required tables
- [ ] Create Supabase Storage bucket
- [ ] Verify storage access
- [ ] Verify database access

### Backend

- [ ] Create image submission endpoint
- [ ] Validate incoming request
- [ ] Validate image type
- [ ] Validate image size
- [ ] Upload image to storage
- [ ] Integrate Gemini
- [ ] Request structured grading output
- [ ] Validate AI response
- [ ] Calculate score
- [ ] Persist submission
- [ ] Persist grading result
- [ ] Return normalized API response

### Expected Outcome

The backend can successfully process a handwriting submission from image input
through AI grading and return a usable result.

---

## Day 4 — End-to-End Product Flow

**Date:** September 4, 2026

### Goal

Connect the working backend pipeline to the complete student experience.

### Primary User Journey

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
    Submit
        ↓
    AI Processing
        ↓
    Score
        ↓
    Correction Feedback
        ↓
    Results

### Camera

- [ ] Request camera permission
- [ ] Display camera preview
- [ ] Capture image
- [ ] Preview captured image
- [ ] Allow retake
- [ ] Submit captured image

### Submission Experience

- [ ] Upload state
- [ ] Processing state
- [ ] Error state
- [ ] Successful grading response

### Results

- [ ] Display score
- [ ] Display grading result
- [ ] Highlight incorrect answers
- [ ] Display expected answer
- [ ] Implement red correction overlay
- [ ] Display results history

### Supporting Screens

- [ ] Dashboard
- [ ] Syllabus
- [ ] Lesson selection
- [ ] Results history

Hardcoded or mock content may be used where permitted and where additional
backend implementation would not meaningfully improve the assignment.

### Expected Outcome

A student can complete the main workflow from selecting a lesson through
receiving grading feedback.

---

## Day 5 — Stabilization & Submission

**Date:** September 5, 2026

### Goal

Stop expanding scope and focus on reliability, security, documentation,
deployment, and submission quality.

### Functional Testing

- [ ] Test complete user journey
- [ ] Test image capture
- [ ] Test upload
- [ ] Test AI processing
- [ ] Test database persistence
- [ ] Test score calculation
- [ ] Test correction feedback
- [ ] Test results history

### Error Testing

- [ ] Camera permission denied
- [ ] Invalid image
- [ ] Upload failure
- [ ] Gemini failure
- [ ] Invalid AI response
- [ ] Database failure

### Security Review

- [ ] No secrets committed to Git
- [ ] Gemini API key remains server-side
- [ ] Privileged Supabase credentials remain server-side
- [ ] `.env*` files ignored
- [ ] Upload validation implemented
- [ ] Sensitive errors not returned to client

### Production Verification

- [ ] Production deployment works
- [ ] Production environment variables configured
- [ ] Mobile layout tested
- [ ] Main workflow tested on deployed version
- [ ] No critical console errors

### Documentation

- [ ] Complete README
- [ ] Update PLAN
- [ ] Complete DEVLOG
- [ ] Complete DECISIONS
- [ ] Add architecture overview
- [ ] Add setup instructions
- [ ] Add known limitations
- [ ] Add live deployment URL

### Submission

- [ ] Verify GitHub repository
- [ ] Verify commit history
- [ ] Verify live deployment URL
- [ ] Prepare submission email
- [ ] Submit before deadline

---

# 2. Core Objective

The primary objective is not to maximize the number of implemented features.

The objective is to deliver a reliable end-to-end vertical slice:

    Student
        ↓
    Select Lesson
        ↓
    Capture Handwriting
        ↓
    Upload Image
        ↓
    Backend Processing
        ↓
    AI Grading
        ↓
    Persist Result
        ↓
    Return Result
        ↓
    Display Score
        ↓
    Display Correction Feedback

---

# 3. Development Principles

Throughout the assignment:

1. Understand before implementing.
2. Research unfamiliar technology before making important decisions.
3. Build the highest-risk vertical slice early.
4. Prioritize functionality before visual polish.
5. Use AI to accelerate engineering rather than replace engineering judgment.
6. Treat AI-generated code as a proposal.
7. Review critical generated changes.
8. Verify important framework assumptions against documentation.
9. Test critical paths end-to-end.
10. Keep the architecture proportional to the assignment.
11. Document important decisions and trade-offs.
12. Avoid unnecessary scope expansion.

---

# 4. Proposed Technology Stack

> Note: Architectural decisions remain subject to validation during Day 2
> research.

## Frontend

- Next.js
- React
- Tailwind CSS

## Backend

- Next.js server-side APIs / Route Handlers

## Database & Storage

- Supabase
- PostgreSQL
- Supabase Storage

## AI

- Gemini multimodal capabilities

## Deployment

- Vercel

---

# 5. Development Tooling Strategy

## ChatGPT

Primary responsibilities:

- Requirement analysis
- Research assistance
- Architecture discussion
- Planning
- Reviewing proposed approaches
- Security review
- Challenging assumptions
- Post-implementation review

## Codex

Primary responsibilities:

- Implementation
- Refactoring
- Repetitive development work
- Testing assistance
- Applying defined engineering decisions
- Codebase exploration

## Documentation & Learning Resources

Used for:

- Understanding unfamiliar technologies
- Verifying framework conventions
- Validating AI suggestions
- Learning ecosystem mental models

Priority:

1. Official documentation
2. Technical documentation
3. High-quality tutorials
4. YouTube learning resources
5. AI-generated explanation

---

# 6. Definition of Done

A feature is considered complete when:

1. The intended behavior works.
2. Critical behavior has been manually verified.
3. It works in the deployed environment when applicable.
4. Relevant error scenarios have been considered.
5. Sensitive credentials are not exposed.
6. Important generated code has been reviewed.
7. Significant architectural decisions are understood.
8. Relevant documentation has been updated.

---

# 7. Scope Control

## Must Have

- Working image submission
- Backend processing
- Image storage
- Gemini grading
- Structured grading result
- Database persistence
- Score calculation
- Result display
- Correction feedback
- Red correction overlay
- Main student workflow
- Working deployment

## Should Have

- Dashboard
- Syllabus
- Results history
- Loading states
- Error states
- Responsive interface

## Nice to Have

Only after the core workflow is stable:

- PWA improvements
- Additional animations
- Additional automated tests
- Accessibility improvements
- Additional UI polish

---

# 8. Explicitly Avoid Scope Creep

Unless the core requirements are already stable:

- Complex authentication
- Custom CMS
- Custom machine learning models
- Advanced OCR systems
- Advanced handwriting recognition
- Complex real-time infrastructure
- Premature abstractions
- Premature optimization
- Features outside the assignment