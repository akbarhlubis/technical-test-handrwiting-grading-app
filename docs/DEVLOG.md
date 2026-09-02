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

# Background

My primary production experience is with Laravel, MySQL, JavaScript, and traditional server-rendered web applications.

Because several technologies suggested for this assignment are outside my usual production stack, I decided not to immediately generate the entire application using AI.

Instead, I wanted to first understand the responsibilities of each technology, build a mental model of the architecture, and gradually move from research into implementation.

AI is used throughout this project as an engineering assistant, but I remain responsible for understanding, reviewing, testing, and accepting the final implementation.

---

# AI-Assisted Development Approach

I use different tools for different responsibilities.

## ChatGPT

Primarily used for:

- Requirement analysis
- Technical research assistance
- Architecture discussion
- Comparing unfamiliar concepts with technologies I already understand
- Planning
- Reviewing technical approaches
- Challenging assumptions
- Security and implementation review

## Codex

Primarily intended for:

- Implementation assistance
- Codebase exploration
- Refactoring
- Repetitive development tasks
- Testing assistance
- Applying implementation decisions

## My Responsibility

My responsibility throughout the project remains:

- Understanding the requirements
- Understanding the architecture
- Researching unfamiliar technologies
- Making final engineering decisions
- Reviewing generated code
- Testing application behavior
- Validating implementation
- Accepting or rejecting proposed solutions
- Taking responsibility for the final submission

The general principle is:

> AI-generated code or suggestions are treated as proposals, not automatically
> accepted solutions.

---

# Day 1 — Requirement Understanding & Initial Research

**Date:** September 1, 2026

## Goal

Understand the technical assignment, identify the main application workflow,
explore the proposed technology stack, and prepare a structured development
process before starting implementation.

---

## Activities

During the first day, I mainly focused on understanding rather than coding.

Activities included:

- Reviewing the technical assignment and expected deliverables.
- Reading introductory tutorials and technical references.
- Discussing the assignment requirements with ChatGPT.
- Breaking the requirements into smaller technical responsibilities.
- Exploring possible application architecture.
- Identifying the main end-to-end workflow.
- Preparing the local project workspace.
- Creating the GitHub repository.
- Preparing development documentation.
- Creating `README.md`.
- Creating `PLAN.md`.
- Creating `DEVLOG.md`.
- Creating `DECISIONS.md`.
- Defining an initial development timeline.
- Recording initial engineering hypotheses before implementation.

No significant application implementation was performed during this stage.

---

## Understanding the Assignment

After reviewing the requirements, I identified the primary student workflow as:

    Student
       ↓
    Select Lesson
       ↓
    Capture Handwriting
       ↓
    Submit Image
       ↓
    Backend Processing
       ↓
    AI-Assisted Grading
       ↓
    Store Result
       ↓
    Return Result
       ↓
    Display Score & Corrections

This became the initial vertical slice that I wanted to prove before spending
significant time polishing the interface.

At this stage, however, this was still an architectural hypothesis rather than
an implemented architecture.

---

## Initial Technology Understanding

I spent part of the day reading introductory material about the technologies
suggested for the assignment.

My initial mental model was:

    Next.js
       ↓
    Application UI + Backend Endpoints

    Supabase
       ↓
    PostgreSQL + Image Storage

    Gemini
       ↓
    Image Analysis + Grading Assistance

    Vercel
       ↓
    Application Deployment

This understanding was intentionally kept at a high level.

I expected some of these assumptions to change after deeper research and
implementation.

---

## Understanding Next.js Through Laravel

Because Laravel is the framework I am most familiar with in production, I
initially tried to understand Next.js by comparing its responsibilities with concepts I already know from Laravel.

This comparison is not intended to imply that Laravel and Next.js have the same architecture.

Laravel commonly follows an MVC-oriented structure, while modern Next.js with the App Router uses file-system routing and React's server/client component model.

The comparison was useful only as a learning bridge.

### My Initial Mental Mapping

| Laravel Concept | Next.js Concept | My Initial Understanding |
|---|---|---|
| `routes/web.php` | `app/.../page.tsx` | URL structure can be represented through the filesystem |
| `routes/api.php` | `app/api/.../route.ts` | Server-side HTTP endpoints can be implemented through Route Handlers |
| Controller | Route Handler / server-side logic | Handles server-side application operations, although the architecture is different |
| Blade View | React Component / `page.tsx` | Responsible for rendering the user interface |
| Blade Layout | `layout.tsx` | Provides shared UI structure across routes |
| `public/` | `public/` | Static assets |
| `.env` | `.env.local` | Environment-specific configuration |
| Middleware | Next.js middleware/proxy-related mechanisms | Request-level processing, depending on the use case |

The important difference I started to recognize was that Next.js does not
simply reproduce Laravel's MVC structure.

For example, in a traditional Laravel application I am used to thinking about:

    Request
       ↓
    Route
       ↓
    Controller
       ↓
    Model / Service
       ↓
    Blade / JSON Response

My initial understanding of the Next.js App Router was closer to:

    URL
       ↓
    Filesystem Route
       ↓
    Page / Layout
       ↓
    Server or Client Component

and for an API/backend operation:

    Client
       ↓
    Route Handler
       ↓
    Server-Side Logic
       ↓
    Database / External Service
       ↓
    Response

This comparison helped me stop looking for a direct equivalent of
`routes/web.php` or a traditional controller for every page.

Instead, I started thinking in terms of route segments, pages, layouts, components, and server-side boundaries.

---

## Initial Questions About Next.js

At this stage I still had several questions:

- How should application logic be organized when there is no traditional
  Laravel-style controller structure?
- When should a component run on the server?
- When is `"use client"` actually necessary?
- Where should Supabase access live?
- Where should Gemini communication live?
- How should Route Handlers be structured?
- How much business logic should exist inside a Route Handler?
- What project structure is appropriate without overengineering the assignment?

I intentionally left these questions open rather than asking AI to immediately generate an architecture that I did not yet understand.

---

## Initial Architecture Discussion

With assistance from ChatGPT, I explored an initial architecture:

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

The architecture was recorded as an initial direction, not as a final decision.

Important decisions were documented separately in `DECISIONS.md` so they could
later be accepted, rejected, or changed based on research.

---

## Repository & Documentation Preparation

Before application implementation, I prepared the repository with:

    README.md
    PLAN.md
    DEVLOG.md
    DECISIONS.md

Each document has a different purpose:

### `README.md`

A concise entry point for the repository and eventually the final submission.

### `PLAN.md`

Tracks development priorities, timeline, scope, and definition of done.

### `DEVLOG.md`

Records the actual learning and development journey.

### `DECISIONS.md`

Records significant engineering decisions, alternatives, and trade-offs.

The initial documentation was committed and pushed to GitHub before application
implementation began.

---

## Use of AI on Day 1

ChatGPT was mainly used to:

- Break down the technical assignment.
- Discuss possible architecture.
- Compare unfamiliar concepts with my Laravel experience.
- Identify the highest-risk technical areas.
- Structure the development plan.
- Define the initial development workflow.
- Help prepare the initial documentation.

No significant application implementation was generated during this stage.

---

## End-of-Day Reflection

### Completed

- [x] Reviewed assignment requirements
- [x] Read introductory tutorials and references
- [x] Discussed initial architecture
- [x] Identified the core application workflow
- [x] Started building a Next.js mental model
- [x] Compared Next.js concepts with familiar Laravel concepts
- [x] Prepared local workspace
- [x] Created project documentation
- [x] Created GitHub repository
- [x] Committed and pushed initial documentation

### Coding Completed

No application implementation yet.

### Main Learning

The biggest learning from the first day was that I should not try to force the Laravel MVC model directly onto Next.js.

Laravel provided a useful reference point, but Next.js requires thinking more
in terms of:

    Filesystem Routing
        +
    React Components
        +
    Server / Client Boundaries
        +
    Route Handlers

rather than:

    Route
        +
    Controller
        +
    Model
        +
    View

### Next Priority

Initialize the actual Next.js application and continue validating the mental
model against the framework itself.

---

# Day 2 — Next.js Initialization & Continued Research

**Date:** September 2, 2026

## Goal

Initialize the application using the current Next.js setup and continue building an understanding of the technologies required for the assignment.

---

## Next.js Project Initialization

I initialized Next.js directly inside the existing Git repository rather than
creating another nested project directory.

The project was initialized using:

    npx create-next-app@latest .

The current `create-next-app` CLI offered recommended defaults.

I chose to stay close to those defaults rather than customizing the framework before I had a reason to do so.

The generated setup included:

- TypeScript
- ESLint
- Tailwind CSS
- App Router
- `AGENTS.md`
- No `src/` directory
- React Compiler disabled

---

## Why I Followed the Framework Defaults

Initially, I considered using a `src/` directory because it provides a familiar
way to separate application source code from configuration files.

However, the current Next.js recommended setup did not require it.

Since this is a limited-scope technical assignment and I am still learning the framework conventions, I decided not to introduce additional structure simply because it felt familiar.

The principle I wanted to follow was:

> Start with the framework's conventions and introduce additional structure
> only when the application creates a real need for it.

---

## Generated Project Structure

After initialization, I started examining the generated structure.

My initial focus was on:

    app/
    ├── globals.css
    ├── layout.tsx
    └── page.tsx

along with:

    public/
    package.json
    next.config.ts
    postcss.config.mjs
    tsconfig.json
    AGENTS.md

Instead of immediately creating many folders, services, repositories, or other
abstractions, I wanted to understand the default structure first.

---

## Refining My Next.js Mental Model

Seeing the actual project helped make the routing model clearer.

For example:

    app/page.tsx

represents:

    /

A nested structure such as:

    app/syllabus/page.tsx

would represent:

    /syllabus

and:

    app/results/page.tsx

would represent:

    /results

This is different from how I normally define routes explicitly in Laravel.

### Laravel

For example, I am accustomed to something conceptually similar to:

    Route::get('/results', [ResultController::class, 'index']);

The route definition and the controller implementation are separate concepts.

### Next.js App Router

My current understanding is closer to:

    app/
    └── results/
        └── page.tsx

where the filesystem itself participates in defining the route.

This helped clarify what "file-system routing" actually means rather than only
reading the term in documentation.

---

## Page Rendering vs Backend Endpoints

Another mental distinction I started making was between application pages and backend endpoints.

### Page

Conceptually:

    app/results/page.tsx

represents UI for:

    /results

### Route Handler

Conceptually:

    app/api/submissions/route.ts

could provide an HTTP endpoint such as:

    /api/submissions

This started to give me a Laravel-oriented mental bridge:

    Laravel routes/web.php
        ↕
    Next.js page routes

and:

    Laravel routes/api.php + Controller
        ↕
    Next.js Route Handler

Again, these are not architectural equivalents, but the comparison helped me
understand the responsibility of each part.

---

## Server and Client Components

One concept that is more different from my usual Laravel workflow is the Server Component and Client Component boundary.

In Laravel with Blade, I am accustomed to most server-side rendering happening before HTML reaches the browser, while JavaScript is added where browser interaction is needed.

My early understanding of Next.js is that components can also have different execution responsibilities.

For this assignment, I expect browser-specific functionality such as:

- Camera access
- `getUserMedia`
- Interactive capture controls
- Some user interactions

to require client-side behavior.

Meanwhile, operations involving:

- Secret API credentials
- Gemini
- Privileged database operations
- Backend validation

should remain on the server side.

This distinction is especially important for the handwriting submission flow.

I still need to validate the exact implementation patterns as development
continues.

---

## Tailwind CSS

Tailwind CSS was installed automatically as part of the recommended Next.js
setup.

I intentionally did not install or configure Tailwind separately after
initializing the application.

This avoided introducing configuration from potentially outdated tutorials when
the framework already provided a current setup.

---

## Supabase Research

I also spent some time reading introductory information about Supabase.

My initial understanding is that it can provide two important responsibilities
for this assignment:

    Supabase
       │
       ├── PostgreSQL
       │      ↓
       │   Submission / grading data
       │
       └── Storage
              ↓
           Captured handwriting images

Questions I still need to validate include:

- How should Next.js connect to Supabase?
- Which credentials can safely exist in the browser?
- Which operations should remain server-side?
- How should the storage bucket be configured?
- Should captured images be public or private?
- What is the simplest appropriate database schema?

No Supabase integration was implemented on this day.

---

## Gemini Research

I also did some initial reading around Gemini and multimodal/image processing.

The main idea I wanted to validate was whether Gemini could receive the captured handwriting image and return grading information that the application could consume.

The conceptual flow was:

    Image
       ↓
    Gemini
       ↓
    Recognition / Comparison
       ↓
    Structured Result

Important open questions included:

- How should image data be provided to Gemini?
- Can the response follow a predictable schema?
- How should malformed model output be handled?
- Should Gemini determine only correctness or also calculate the score?
- How should the API key be protected?

No Gemini integration was implemented on this day.

---

## Current Architecture Hypothesis

At the end of Day 2, my working architecture remained:

    Student
       ↓
    Next.js UI
       ↓
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
    Supabase PostgreSQL
       ↓
    Backend Response
       ↓
    Result & Correction UI

This architecture is still subject to change as implementation exposes actual
constraints.

---

## Implementation Progress

### Completed

- [x] Initialized Next.js application
- [x] Used recommended Next.js defaults
- [x] TypeScript configured by `create-next-app`
- [x] ESLint configured
- [x] Tailwind CSS configured
- [x] App Router enabled
- [x] Examined the initial project structure
- [x] Continued building the Next.js mental model

### Research

- [x] Initial Next.js exploration
- [x] Initial Supabase reading
- [x] Initial Gemini reading

### Not Yet Implemented

- [ ] Supabase integration
- [ ] Database schema
- [ ] Image storage
- [ ] Backend submission endpoint
- [ ] Gemini integration
- [ ] Structured grading response
- [ ] Database persistence
- [ ] Camera workflow
- [ ] Results workflow

---

## End-of-Day Reflection

Day 2 moved the project from planning into an actual application foundation.

The most useful part was seeing the generated Next.js structure and comparing
it with the Laravel development model I already understand.

Instead of thinking:

    Where is routes/web.php?
    Where is the Controller?
    Where is the Blade view?

I started thinking:

    What route segment is this?
    Is this a page or an API endpoint?
    Does this logic belong on the server or client?
    Does this require a Route Handler?
    Where should external services be accessed?

I still do not consider myself fully comfortable with the Next.js model.

However, I now have enough of a mental framework to continue learning through
implementation rather than delaying development until I understand the entire
framework.

### Next Priority

Start implementing the highest-risk technical workflow:

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

---

# Day 3 — Core Backend Implementation

**Date:** September 3, 2026

## Goal

Begin implementing and validating the highest-risk technical workflow.

Primary target:

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

---

## Current Status

Not started yet.

---

## Implementation Priorities

- [ ] Validate the Supabase integration approach
- [ ] Define the minimum database schema
- [ ] Configure image storage
- [ ] Create the backend submission endpoint
- [ ] Validate image input
- [ ] Integrate Gemini
- [ ] Define the structured grading response
- [ ] Validate the AI response
- [ ] Calculate the score in application logic
- [ ] Persist the submission and result
- [ ] Return a normalized API response

---

## Challenges

To be documented as they occur.

---

## Decisions

To be documented based on actual implementation findings.

---

## End-of-Day Reflection

To be completed at the end of Day 3 based on actual progress.

---

# Day 4 — End-to-End Product Flow

**Date:** September 4, 2026

## Goal

Connect the core backend workflow to the student-facing experience.

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
- [ ] Camera permission handling
- [ ] Image capture
- [ ] Image preview
- [ ] Retake functionality
- [ ] Upload interaction
- [ ] Loading state
- [ ] Error state
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

To be documented based on actual development.

---

## End-of-Day Reflection

To be completed at the end of Day 4.

---

# Day 5 — Stabilization & Submission

**Date:** September 5, 2026

## Goal

Prioritize reliability, security, documentation, and deployment quality over adding new features.

No major functionality should be introduced unless required to complete or fix the core workflow.

---

## Final Review

### Core Workflow

- [ ] Dashboard works
- [ ] Syllabus works
- [ ] Camera works
- [ ] Image submission works
- [ ] Gemini processing works
- [ ] Results are persisted
- [ ] Score is calculated
- [ ] Score is displayed
- [ ] Correction overlay works
- [ ] Results history works

### Production

- [ ] Vercel deployment verified
- [ ] Production environment variables verified
- [ ] Main workflow tested in production
- [ ] Mobile behavior tested
- [ ] Error states tested
- [ ] No critical console errors

### Security

- [ ] Gemini API key remains server-side
- [ ] No secrets committed to repository
- [ ] Privileged Supabase credentials protected
- [ ] Environment files ignored
- [ ] Upload validation reviewed
- [ ] AI response validation reviewed
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

To be completed after the implementation is stabilized.

## What I Learned

...

## What Was Most Challenging

...

## How My Understanding Changed

...

## How My Laravel Experience Helped

...

## Where the Laravel Mental Model Did Not Apply

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