# Engineering Decisions

## TingXie HERO Technical Assignment

This document records the engineering decisions that materially affect the
architecture, security, testing strategy, and scope of TingXie HERO.

It is intentionally kept smaller than the development log.

- `README.md` explains what the project is.
- `DEVLOG.md` records how the project evolved.
- `DECISIONS.md` explains why important technical choices were made.

Only decisions that affect the implementation or demonstrate a meaningful
trade-off are recorded here.

---

# ADR-001 — Use the Suggested Technology Stack

**Status:** Accepted  
**Proposed:** September 1, 2026  
**Accepted:** September 2, 2026

## Context

My strongest production experience is primarily with Laravel, MySQL,
JavaScript, and traditional server-rendered web applications.

The assignment suggests an architecture based around:

- Next.js
- Supabase
- Gemini
- Vercel

Using a familiar Laravel stack would reduce the initial learning curve, but it
would also move away from the ecosystem suggested by the assignment.

## Decision

Use the suggested stack as the primary implementation direction:

    Next.js
        ↓
    Application / Route Handlers
        ↓
    Supabase
        +
    Gemini
        ↓
    Vercel

## Reasoning

The suggested stack is capable of supporting the required workflow while also
reducing the amount of infrastructure that needs to be configured manually.

Using it also provides an opportunity to demonstrate how I approach an
unfamiliar technology stack without abandoning engineering judgment.

The decision was made after first building a basic mental model of Next.js,
Supabase, Gemini, and Vercel rather than immediately generating the
implementation.

## Trade-Off

The main cost is additional learning and implementation uncertainty compared
with using Laravel.

To reduce that risk, unfamiliar framework behavior is validated through
documentation, small implementations, testing, and manual verification.

---

# ADR-002 — Build the Highest-Risk Vertical Slice Before UI Polish

**Status:** Accepted  
**Proposed:** September 1, 2026  
**Accepted:** September 2, 2026

## Context

The assignment includes multiple student-facing screens:

    Dashboard
        ↓
    Syllabus
        ↓
    Camera
        ↓
    Grading
        ↓
    Results

Building the application in visual screen order would make the project appear
complete earlier.

However, the largest technical uncertainty is not the dashboard or syllabus.

It is the backend grading workflow:

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

## Decision

Validate the backend vertical slice before spending significant time on UI
polish.

## Reasoning

A polished interface has limited value if the primary grading workflow cannot
be completed reliably.

Validating infrastructure and external-service boundaries early reduces the
risk of discovering major integration problems close to the submission
deadline.

This decision influenced Day 3 work, where deployment, Supabase connectivity,
and automated integration testing were prioritized before the student-facing
screens.

## Trade-Off

Early versions of the application are visually incomplete.

This is acceptable because UI development can be built around a verified
backend workflow afterward.

---

# ADR-003 — Keep External AI Communication Server-Side

**Status:** Accepted  
**Proposed:** September 1, 2026  
**Accepted:** September 2, 2026

## Context

The application will use Gemini to process handwriting images.

Calling Gemini directly from the browser would create a simpler request path,
but it would also place AI-provider communication and credentials closer to the
client.

## Decision

Gemini communication will be performed through the Next.js server-side
application boundary.

Target flow:

    Browser
        ↓
    Next.js Backend
        ↓
    Gemini
        ↓
    Validated Application Response
        ↓
    Browser

## Reasoning

Keeping Gemini server-side provides:

- Protection for the Gemini API key.
- Centralized request validation.
- Centralized AI response validation.
- Consistent error handling.
- A stable application-specific API contract for the frontend.

The frontend should not need to understand Gemini-specific response formats or
credentials.

## Trade-Off

The Next.js backend becomes responsible for AI orchestration.

This adds some backend implementation but creates a clearer security and
application boundary.

---

# ADR-004 — Use Structured AI Output and Deterministic Application Scoring

**Status:** Accepted in principle  
**Proposed:** September 1, 2026  
**Reviewed:** September 3, 2026

## Context

The grading interface requires predictable information such as:

- Expected text.
- Recognized text.
- Correct/incorrect status.
- Correction feedback.
- Final score.

Allowing Gemini to return unrestricted natural language would make the
application contract difficult to validate and render consistently.

Similarly, asking a probabilistic model to calculate a score that can be
derived deterministically would introduce unnecessary uncertainty.

## Decision

Gemini should return structured grading information.

Conceptually:

    Gemini
        ↓
    Structured Character / Word Results
        ↓
    Application Validation
        ↓
    Deterministic Score Calculation
        ↓
    Normalized API Response

The application, rather than Gemini, will calculate the final score from the
validated grading result.

## Reasoning

This separates responsibilities:

    AI
      → recognition / comparison

    Application
      → validation / scoring / persistence

Structured output is easier to:

- Validate.
- Test.
- Persist.
- Render.
- Debug.

Deterministic score calculation can also be covered by unit tests without
calling Gemini.

## Trade-Off

The application needs additional schema validation and scoring logic.

The exact Gemini response schema remains subject to implementation validation
when Gemini integration is introduced.

---

# ADR-005 — Deploy Early Instead of Waiting for Feature Completion

**Status:** Accepted  
**Proposed:** September 3, 2026  
**Accepted:** September 3, 2026

## Context

The final assignment requires a working deployed application.

One approach would be to develop the application locally and deploy only when
the primary functionality is complete.

This would leave deployment behavior as an untested dependency until late in
the assignment.

## Decision

Deploy the initial Next.js application to Vercel before completing the backend
and frontend features.

## Reasoning

Early deployment validates:

- GitHub repository integration.
- Vercel repository permissions.
- Next.js framework detection.
- Production builds.
- The basic deployment workflow.

This decision immediately exposed a GitHub/Vercel repository access issue.

Resolving that issue early removed a deployment risk that otherwise could have
appeared near the submission deadline.

## Trade-Off

The first public deployment contains an incomplete application.

That is acceptable during development because its purpose is infrastructure
validation rather than final product demonstration.

---

# ADR-006 — Establish Automated Testing Before Expanding the Backend

**Status:** Accepted  
**Proposed:** September 3, 2026  
**Accepted:** September 3, 2026

## Context

After establishing the first working Supabase connection, the project was about
to introduce increasingly complex behavior:

- Storage.
- Image validation.
- Submission APIs.
- Gemini.
- Response validation.
- Score calculation.
- Persistence.

Continuing without a testing foundation would make regressions progressively
harder to detect.

## Decision

Introduce automated testing before expanding the backend pipeline.

The testing responsibilities are separated as follows:

    Deterministic application logic
                ↓
              Vitest

    Running application / API / external integration
                ↓
             Playwright

    Complete browser workflow
                ↓
          Playwright E2E

## Reasoning

Different behavior should be tested at the appropriate boundary.

For example:

    calculateScore()
        → Unit test

    POST /api/upload
        → Integration test

    Camera → Submit → Results
        → End-to-end test

The first integration test verifies the real connection:

    Playwright
        ↓
    Next.js Route Handler
        ↓
    Supabase

Supabase is intentionally not mocked for this connectivity test.

## Trade-Off

Testing introduces additional configuration and development time.

However, establishing it early makes future backend changes easier to verify and
reduces the risk of silently breaking previously working functionality.

The objective is not maximum test coverage.

The objective is confidence around important application behavior.

---

# ADR-007 — Keep AI-Generated Changes Reviewable

**Status:** Accepted  
**Proposed:** September 1, 2026  
**Validated:** September 3, 2026

## Context

AI tools are used throughout this assignment to accelerate research,
implementation, testing, and review.

However, automatically accepting generated code creates several risks:

- Unnecessary dependencies.
- Outdated framework patterns.
- Incorrect assumptions.
- Security mistakes.
- Code that works without being understood.

## Decision

Treat AI-generated implementations as proposals.

The development workflow is:

    Requirement
        ↓
    Research / Architecture
        ↓
    AI-Assisted Implementation
        ↓
    Inspect Changes
        ↓
    Question Assumptions
        ↓
    Test
        ↓
    Manual Verification
        ↓
    Accept / Reject / Refine

ChatGPT is primarily used for research, architecture discussion, and technical
review.

Codex is primarily used for codebase exploration, implementation assistance,
refactoring, and testing.

Final engineering responsibility remains with the developer.

## Evidence

During the Supabase integration, the dependency list contained:

    @supabase/server
    @supabase/ssr
    @supabase/supabase-js

The working server utility only imported:

    @supabase/supabase-js

Instead of assuming every installed dependency was required, the dependency
usage was inspected.

The investigation confirmed that `@supabase/server` was not required by the
current health endpoint and had been introduced earlier while following the
Supabase project connection setup.

The dependency was intentionally left installed for now, but only after its
role and current lack of usage were understood.

## Trade-Off

Reviewing generated implementation takes additional time.

That cost is acceptable because AI is being used to accelerate engineering,
not to remove responsibility for the resulting code.

---

# ADR-008 — Keep the Initial Supabase Integration Minimal

**Status:** Accepted  
**Proposed:** September 3, 2026  
**Accepted:** September 3, 2026

## Context

The application will eventually need Supabase for database persistence and
image storage.

However, introducing database writes, Storage, authentication, Gemini, and RLS
changes simultaneously would make failures harder to isolate.

## Decision

Validate Supabase incrementally.

The first milestone only proves:

    Next.js
        ↓
    Route Handler
        ↓
    Supabase Client
        ↓
    Database Connectivity

A temporary endpoint was introduced:

    GET /api/health/supabase

which performs a minimal query and returns only:

    { "ok": true }

or:

    { "ok": false }

## Reasoning

This isolates infrastructure connectivity from application behavior.

The successful health check proves that Next.js can communicate with Supabase
before Storage, submission persistence, or Gemini are introduced.

A real Playwright integration test now protects this boundary.

## Security Considerations

The current integration:

- Uses the publishable Supabase key.
- Does not use a service-role or secret key.
- Does not return database records from the health endpoint.
- Does not expose detailed Supabase errors to the client.
- Does not modify Row Level Security. The connected project must be checked
  separately because the current tables report RLS disabled.

## Trade-Off

The health endpoint is temporary infrastructure rather than a product feature.

It may be removed before final submission once the real submission pipeline
provides sufficient integration coverage.

---

# Open Architecture Decision — Submission Storage and Database Security

**Status:** Accepted for upload checkpoint; production hardening pending
**Opened:** September 3, 2026

## Context

The next backend milestone introduces:

    Image Submission
        ↓
    Supabase Storage
        ↓
    Database Persistence

The application currently has no authentication.

This creates an important security decision around how the Next.js backend
should access private Storage and database operations.

## Questions

The implementation must determine:

- Should submission images use a private Storage bucket?
- Which operations should be permitted through RLS?
- Should the browser communicate with Supabase directly at all?
- Should privileged writes exist only behind Next.js Route Handlers?
- Is a server-only Supabase credential appropriate for those operations?
- How should failed uploads and partial submissions be handled?

## Decision

For the upload checkpoint, submission writes use this path:

    Browser
        -> Next.js POST /api/upload
        -> Server-only Supabase client using SUPABASE_SECRET_KEY
        -> Private Storage and submissions database row

The browser does not write directly to the private Storage bucket or database.
The application generates the submission UUID before uploading, uses it in the
Storage path, and reuses it for the database row. If the database insert fails,
the uploaded object is removed on a best-effort basis.

This is a proportional choice for the technical assignment while authentication
is not implemented. It is not a universal recommendation for production
systems; production access would require a complete authentication, ownership,
RLS, and abuse-prevention design.

## Security Status

The connected Supabase project currently reports Row Level Security disabled on
`public.lessons`, `public.submissions`, and `public.character_results`. This is
a critical issue because exposed tables can be read or modified by clients with
the publishable key. This checkpoint does not automatically enable RLS or add
policies, because enabling RLS without matching policies can break the current
application and policy ownership must be reviewed explicitly.

Before production use, enable RLS and define policies that match the eventual
authentication and ownership model. The server-only secret key must remain
outside browser-exposed environment variables.

## Current Direction

Do not weaken Row Level Security or introduce broad anonymous policies simply
to make the upload flow work.

The final approach will be selected after reviewing the required Storage and
database access patterns.

---

# ADR-009 — Complete Server-Side Grading Vertical Slice

**Status:** Accepted for the technical-assignment backend checkpoint

The upload Route Handler now loads `lessons.word_list`, sends the uploaded
image to the server-side Gemini client using structured JSON output, ignores
invented words, rejects omitted or unusable expected-word results, calculates
the score in application code, and persists `character_results` plus
`submissions.score`.

The model is currently `gemini-3.5-flash` because the previously specified
model identifier was unavailable in the configured Gemini API environment. The
provider boundary and response contract remain explicit so the model can be
changed without moving credentials into the browser.

If grading fails after the upload row is created, the submission is preserved
and the client receives a non-sensitive `503` response with the submission ID.
This supports retry/recovery without orphaning the uploaded image from the
submission record.

Temporary provider availability failures are retried in the same grading
attempt with bounded backoff: up to three total calls, waiting approximately
one second and then two seconds with small jitter. Exhausted retries map to a
typed retryable application error; malformed output and other failures are not
retried.

---

# Current Decision Summary

## Camera Capture Note

The camera checkpoint uses native `getUserMedia` instead of a third-party
camera library to keep the browser permission, MediaStream lifecycle, and
intrinsic-resolution capture behavior explicit and proportional to the
assignment. The alignment overlay is visual-only and is not drawn into the
captured canvas image.

The grading result screen consumes the backend score directly rather than
recomputing it in the browser. Red correction annotations are intentionally
UI-level placement because the backend currently returns no OCR coordinates;
the captured image itself remains unchanged.

The installable PWA foundation uses Next.js-native manifest and viewport
metadata with local PNG icons. A service worker and offline caching are
deliberately excluded because they are outside the current assignment scope
and the grading workflow depends on live services.

| ID | Decision | Status |
|---|---|---|
| ADR-001 | Use the Suggested Technology Stack | Accepted |
| ADR-002 | Build Highest-Risk Vertical Slice Before UI Polish | Accepted |
| ADR-003 | Keep Gemini Communication Server-Side | Accepted |
| ADR-004 | Structured AI Output + Deterministic Scoring | Accepted in principle |
| ADR-005 | Deploy Early | Accepted |
| ADR-006 | Establish Automated Testing Early | Accepted |
| ADR-007 | Keep AI-Generated Changes Reviewable | Accepted |
| ADR-008 | Keep Initial Supabase Integration Minimal | Accepted |
| ADR-009 | Complete Server-Side Grading Vertical Slice | Accepted for checkpoint; production hardening pending |

---

## Guiding Principle

The architecture should remain proportional to the assignment.

The goal is not to demonstrate the largest possible system.

The goal is to demonstrate a complete, understandable, testable, and secure
solution to the core handwriting grading workflow.
