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

    app/api/upload/route.ts

could provide an HTTP endpoint such as:

    /api/upload

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

Begin moving from framework research into implementation and validate the
foundation required for the highest-risk backend workflow.

The long-term target remains:

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

Rather than implementing the entire pipeline immediately, I decided to validate
each infrastructure dependency independently first.

---

## Starting Point

At the beginning of Day 3, the project had:

- A working Next.js application.
- TypeScript, Tailwind CSS, ESLint, and App Router configured.
- A GitHub repository.
- Initial architecture and planning documentation.
- Initial research into Supabase and Gemini.

However, the application had not yet connected to any external service.

The first implementation objective was therefore to prove that the application
could be deployed and communicate with Supabase before adding more complex
application behavior.

---

## Early Vercel Deployment

Before implementing the backend pipeline, I deployed the initial Next.js
application to Vercel.

I intentionally deployed early instead of waiting until the application was
complete.

The purpose was to validate:

- GitHub repository integration.
- Next.js framework detection.
- Production build compatibility.
- Basic Vercel deployment behavior.
- The deployment workflow that will eventually be used for the final
  submission.

The first attempt exposed a GitHub repository access/permission issue between
Vercel and the repository.

After correcting the repository access configuration, the deployment completed
successfully.

This was useful because deployment became a verified part of the development
workflow rather than an unknown risk left until the submission deadline.

---

## Supabase Project Setup

After validating deployment, I moved to Supabase.

My first goal was deliberately small:

> Prove that a Next.js server-side Route Handler can successfully communicate
> with the Supabase project.

I configured the local Supabase environment variables without committing their
values to the repository.

The project currently recognizes the Supabase project URL and publishable key.

The Supabase dependencies installed while following the Supabase project
connection guidance included:

    @supabase/supabase-js
    @supabase/ssr
    @supabase/server

During implementation, I learned that these packages have different
responsibilities.

`@supabase/supabase-js` provides the core JavaScript client used for Supabase
services.

`@supabase/ssr` is intended for server-side rendering scenarios involving
cookie-based authentication.

`@supabase/server` provides server-oriented utilities, particularly for
server-side authentication and request contexts.

Authentication is not part of the current implementation, so the initial
database connection only requires `@supabase/supabase-js`.

The additional packages remain installed because they were introduced while
following the Supabase project setup guidance, but the application does not
currently depend on them.

---

## Server-Side Supabase Client

A small server-side Supabase utility was introduced under:

    lib/supabase/server.ts

The utility creates the Supabase client using environment configuration.

Because authentication is not implemented yet, the current client is intentionally
minimal.

The important architectural boundary is:

    Browser
       ↓
    Next.js Route Handler
       ↓
    Server-side Supabase Client
       ↓
    Supabase

This helped validate one of the questions I had during Day 2:

> Where should Supabase access live?

For backend-controlled operations, I now have a working pattern where Supabase
communication can remain behind the Next.js server boundary instead of requiring
the browser to directly perform the operation.

---

## Supabase Health Endpoint

To verify the integration independently from future application features, I
created a temporary health endpoint:

    GET /api/health/supabase

The Route Handler performs a minimal query against the `submissions` table
without returning submission data.

Conceptually:

    GET /api/health/supabase
             ↓
    Next.js Route Handler
             ↓
    Supabase Client
             ↓
    submissions
             ↓
       { "ok": true }

The endpoint intentionally returns only a small health response.

Successful response:

    {
      "ok": true
    }

Failure response:

    {
      "ok": false
    }

Detailed Supabase errors remain in server logs instead of being returned to the
client.

---

## Manual Supabase Verification

I first verified the integration manually.

Running:

    npm run dev

and accessing:

    http://localhost:3000/api/health/supabase

returned:

    {
      "ok": true
    }

This confirmed that:

- Next.js could load the Supabase environment configuration.
- The Route Handler executed successfully.
- The Supabase client could communicate with the project.
- The `submissions` table could be reached using the current access policy.

At this point, the first external service integration in the application was
working.

---

## Introducing Automated Testing

After the Supabase connection worked manually, I decided to establish a testing
foundation before adding more backend features.

The motivation was simple:

> Every new feature should have an appropriate way to verify that existing
> behavior still works.

I did not want to postpone testing until the application became significantly
larger.

Two testing tools were introduced:

    Vitest
       ↓
    Unit-level application logic

    Playwright
       ↓
    Integration and end-to-end behavior

This creates the initial testing strategy:

    Pure application logic
             ↓
           Vitest

    Running application / API / external service
             ↓
          Playwright

    Complete browser workflow
             ↓
          Playwright E2E

---

## Vitest Setup

Vitest was configured as the unit testing foundation.

The configuration includes support for:

- TypeScript.
- React.
- `jsdom`.
- TypeScript path resolution.

Unit tests are organized under:

    tests/unit/

A minimal smoke test was added first.

The smoke test does not test business behavior yet.

Its purpose is simply to prove that the test runner and configuration are
working before real grading and validation logic is introduced.

This means future deterministic logic such as:

- Image input validation.
- Grading response validation.
- Score calculation.
- Data transformation.

can be tested independently from Supabase or Gemini.

---

## Playwright Setup

Playwright was added for integration and end-to-end testing.

The configuration uses:

    http://localhost:3000

as the application base URL.

The test environment starts a production-like Next.js application using:

    npm run build
    npm run start

rather than relying only on the development server.

Tests are organized under:

    tests/e2e/

The initial Playwright configuration uses Chromium.

Additional browsers were intentionally not introduced yet because the immediate
goal is validating application behavior rather than building a large
cross-browser test matrix.

---

## Real Supabase Integration Test

The first meaningful automated integration test verifies the Supabase health
endpoint.

The test performs a real request to:

    GET /api/health/supabase

and verifies:

- The HTTP request succeeds.
- The response is JSON.
- The response contains exactly:

      {
        "ok": true
      }

Supabase is intentionally not mocked in this test.

Therefore, the test verifies the real integration:

    Playwright
        ↓
    Running Next.js Application
        ↓
    Route Handler
        ↓
    Supabase
        ↓
    Response

This is different from a unit test because the goal is specifically to detect
problems in the integration boundary.

---

## Verification Workflow

After introducing the testing foundation, I verified the project using:

    npm test
    npm run test:unit
    npm run test:e2e
    npm run lint
    npm run build

All checks passed.

This established a repeatable verification workflow that can be used as new
features are added.

The current development loop is now closer to:

    Implement
        ↓
    Review
        ↓
    Unit / Integration Test
        ↓
    Lint
        ↓
    Build
        ↓
    Manual Verification
        ↓
    Accept

---

## Reviewing AI-Generated Implementation

An important part of Day 3 was not only implementing features, but reviewing
the implementation proposed by AI.

While reviewing the Supabase setup, I noticed that the dependency list included:

    @supabase/server

even though the current Supabase client was created using:

    @supabase/supabase-js

Instead of immediately accepting or removing the dependency, I asked Codex to
inspect:

- When the dependency appeared.
- Whether application code imported it.
- What responsibility it provides.
- Whether it was required by the current implementation.

The review confirmed that:

- `@supabase/server` was already present before the testing work.
- The application source does not currently import it.
- The working Supabase client uses `@supabase/supabase-js`.
- It is not required for the current health endpoint.

I then revisited the Supabase project setup flow and confirmed that
`@supabase/server` had originally been installed while following Supabase's
own project connection instructions.

I decided to leave the dependency installed for now rather than spending more
time changing a working setup, while keeping the distinction documented.

This was a useful example of the AI-assisted workflow I wanted to follow:

    AI-assisted implementation
             ↓
    Inspect the result
             ↓
    Notice an unexpected detail
             ↓
    Question the assumption
             ↓
    Verify its origin and responsibility
             ↓
    Make the final decision myself

---

## Security Observations

The health endpoint uses the Supabase publishable key. The upload checkpoint
uses `SUPABASE_SECRET_KEY` only inside a server-side Route Handler because the
private Storage bucket and controlled database write must not be exposed to the
browser.

The secret key is not used by the health endpoint and is never exposed through
`NEXT_PUBLIC_*`. It is used only by the upload server utility.

The health endpoint:

- Does not return database records.
- Does not return credentials.
- Does not return detailed Supabase errors.
- Performs only a minimal connectivity query.
- Does not modify Row Level Security.

Authentication has deliberately not been introduced yet.

This also exposed an important architecture question for the next stage:

> Should submission creation and private image storage operate through
> publishable-key RLS policies, or should privileged backend operations use a
> server-only Supabase credential?

I decided not to answer this by opening broad RLS policies simply to make the
next feature work.

The upload checkpoint uses this interim assignment architecture:

    Browser
        -> Next.js upload Route Handler
        -> Server-only privileged Supabase client
        -> Private Storage and database

This is a proportional technical-assignment choice while authentication is not
implemented. It is not a universal production architecture recommendation.

The connected Supabase project currently reports RLS disabled for the
`lessons`, `submissions`, and `character_results` tables. This is a critical
security issue that must be resolved with deliberate policies before exposing
the application to real users. It was not changed automatically by this
checkpoint.

---

## Implementation Progress

### Completed

- [x] Validated initial Vercel deployment
- [x] Connected the GitHub repository to Vercel
- [x] Verified production Next.js build on Vercel
- [x] Configured local Supabase environment variables
- [x] Established server-side Supabase connectivity
- [x] Added a Supabase health Route Handler
- [x] Manually verified the Supabase connection
- [x] Added Vitest testing foundation
- [x] Added Playwright testing foundation
- [x] Added a unit-test smoke check
- [x] Added a real Supabase integration test
- [x] Verified tests, lint, and production build
- [x] Reviewed unexpected Supabase dependency usage
- [x] Added a privileged server-side Supabase client for controlled uploads
- [x] Added `POST /api/upload` with server-side image and field validation
- [x] Added Storage-to-database cleanup behavior for failed submission inserts
- [x] Added Playwright validation coverage for the upload endpoint

### Still In Progress

- [ ] Finalize the minimum database schema and RLS strategy
- [ ] Complete a real upload happy-path test with a seeded lesson
- [ ] Configure and verify private image storage policies
- [ ] Review the server-side Storage/database security model before production
- [ ] Integrate Gemini
- [ ] Define and validate the structured grading response
- [ ] Calculate score in deterministic application logic
- [ ] Persist submission and grading results
- [ ] Return the normalized grading response

---

## Challenges

### Vercel Repository Access

The first Vercel deployment attempt could not access the GitHub repository.

Rather than continuing application development and leaving deployment until the
end, I resolved the repository integration early.

After the GitHub/Vercel access configuration was corrected, deployment
succeeded.

### Understanding Supabase Package Responsibilities

Following the Supabase connection flow introduced multiple Supabase packages.

Reviewing the implementation made it clear that installing a package and
actually requiring that package for the current architecture are different
questions.

The current integration only depends directly on the base Supabase JavaScript
client.

### Testing an External Dependency

The Supabase health check initially existed only as a manual verification.

Instead of leaving it that way, I added a Playwright integration test that
starts the application and verifies the real Supabase connection.

This gives the project an early regression check for an important external
dependency.

---

## Day 3 Reflection — Current Checkpoint

Day 3 marks the transition from learning the stack primarily through
documentation into validating it through working implementation.

The most important progress so far is not the number of application features.

It is that several previously theoretical assumptions are now verified:

    Next.js
       ↓
    Route Handler
       ↓
    Supabase

works in the actual application.

The application also now has a repeatable testing foundation before the
higher-risk grading pipeline is introduced.

One useful lesson from this stage was that AI assistance is most useful when its
output remains reviewable.

The `@supabase/server` dependency investigation was a small example: instead of
assuming that an installed dependency was necessary, I traced why it existed,
checked whether the code actually used it, and made the decision after
understanding its role.

### Current Checkpoint

    Next.js application           ✓
    GitHub repository             ✓
    Initial Vercel deployment     ✓
    Supabase connectivity         ✓
    Health endpoint               ✓
    Vitest foundation             ✓
    Playwright foundation         ✓
    Real integration test         ✓
    Lint                          ✓
    Production build              ✓

### Next Priority

The next implementation step is:

    Review schema and RLS
             ↓
    Configure private Storage
             ↓
    Implement submission upload
             ↓
    Test submission integration
             ↓
    Integrate Gemini

The goal remains to prove the complete backend vertical slice before spending
significant time on interface polish.

---
# Backend Vertical Slice Checkpoint — Upload to Grading

**Date:** September 5, 2026

## Implemented

- Added lesson lookup from `lessons.word_list` before Storage upload.
- Added server-only Gemini image grading with JSON structured output.
- Added normalization that preserves lesson order, ignores invented words, and
  rejects omitted or unusable expected-word results.
- Added deterministic application scoring with safe empty-list handling.
- Added persistence for `character_results` and `submissions.score`.
- Preserved the uploaded submission when Gemini is temporarily unavailable.
- Added Vitest coverage for normalization and score calculation.

## Verification Notes

The assignment's earlier Gemini model identifier was unavailable in the current
API environment. The existing health check and grading path therefore use the
currently verified `gemini-3.5-flash` model. The API key remains server-only.

The connected Supabase project has a seeded lesson, but a real happy-path test
is kept as a manual operation because it creates external records and depends
on subjective AI output. Read-only schema verification also reports RLS
disabled on the relevant public tables; this remains a production blocker and
was not changed automatically.

Manual grading exposed a real upstream `503 UNAVAILABLE` high-demand response
after the submission and image had already been saved. The grading module now
handles only that temporary availability class with three bounded attempts and
approximately one- and two-second backoff delays. Exhaustion returns a stable
retryable application error while preserving the existing submission.

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
