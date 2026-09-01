# Engineering Decisions

## TingXie HERO Technical Assignment

This document records significant engineering decisions made during the
technical assignment.

The purpose is not to document every implementation detail.

Instead, this document preserves the reasoning behind decisions that materially
affect:

- Architecture
- Security
- Maintainability
- Development scope
- Data flow
- AI integration
- Deployment

---

# Decision Process

Architectural decisions may move through the following states:

### Proposed

An initial approach or hypothesis that still requires research or validation.

### Accepted

The approach has been sufficiently researched, understood, and selected for
implementation.

### Rejected

The approach was considered but intentionally not selected.

### Superseded

The decision was previously accepted but replaced after new information,
constraints, or implementation experience changed the reasoning.

---

# ADR-001 — Follow the Suggested Technology Stack

**Status:** Proposed  
**Proposed:** September 1, 2026  
**Reviewed:** TBD

## Context

My strongest production backend experience is primarily with Laravel, MySQL,
JavaScript, and traditional web application development.

The technical assignment suggests technologies centered around Next.js,
Supabase, Gemini, and Vercel.

I could potentially complete parts of the assignment faster using technologies
I already know well.

However, using the suggested stack may better align with the intended
architecture of the assignment while providing an opportunity to demonstrate
how I approach unfamiliar technologies.

---

## Options Considered

### Option A — Familiar Stack

Potential stack:

- Laravel
- MySQL
- Vue / JavaScript
- Traditional backend deployment

### Advantages

- Strong existing familiarity
- Faster initial implementation
- Familiar debugging workflow
- Existing knowledge of backend architecture

### Disadvantages

- Additional infrastructure decisions
- Moves away from the suggested ecosystem
- Less opportunity to understand the intended stack

---

### Option B — Suggested Stack

Potential stack:

- Next.js
- Supabase
- Gemini
- Vercel

### Advantages

- Closely aligned with the assignment
- Integrated deployment ecosystem
- Integrated database and storage services
- Opportunity to demonstrate adaptability
- Potentially less infrastructure setup

### Disadvantages

- Additional learning required
- Higher initial uncertainty
- Greater risk of incorrect assumptions when relying only on AI-generated code

---

## Initial Direction

Prefer **Option B — Suggested Stack**.

However, this decision remains **Proposed** until the basic architecture and
development model of the technologies are understood during Day 2 research.

---

## Questions to Validate

- Does Next.js provide the backend functionality required by the assignment?
- Can Supabase appropriately handle both database persistence and image storage?
- Can Gemini process the required image input?
- Can Gemini return sufficiently structured output?
- Can the complete architecture be deployed cleanly using Vercel?
- Are there limitations that materially affect the assignment?

---

## Final Decision

TBD after research.

---

## Reasoning

TBD.

---

## Consequences

TBD.

---

# ADR-002 — Build the Highest-Risk Vertical Slice Before UI Polish

**Status:** Proposed  
**Proposed:** September 1, 2026  
**Reviewed:** TBD

## Context

The assignment contains multiple screens and product requirements.

The available development time is limited.

One possible approach is to build the application in screen order:

    Dashboard
        ↓
    Syllabus
        ↓
    Camera
        ↓
    Backend
        ↓
    Gemini
        ↓
    Results

However, the highest technical uncertainty appears to be the image grading
pipeline.

---

## Options Considered

### Option A — Build the Product Screen-by-Screen

Advantages:

- Product appears visually complete earlier
- Easy to demonstrate frontend progress

Disadvantages:

- High-risk backend integration happens relatively late
- Major AI/integration problems may only appear near the deadline
- Significant UI work could become wasted effort

---

### Option B — Build a Vertical Slice First

Initial target:

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

Then build the user interface around the proven workflow.

Advantages:

- Highest-risk integration tested earlier
- Backend architecture validated early
- Reduced late-stage integration risk
- Easier to identify technical blockers

Disadvantages:

- Early application versions may look incomplete
- Less visible frontend progress initially

---

## Initial Direction

Prefer **Option B — Vertical Slice First**.

---

## Questions to Validate

- Is the AI pipeline actually the highest-risk technical component?
- Are there frontend requirements that must influence the backend architecture?
- Can the pipeline be tested independently before implementing the complete UI?

---

## Final Decision

TBD.

---

# ADR-003 — Keep Gemini Communication Server-Side

**Status:** Proposed  
**Proposed:** September 1, 2026  
**Reviewed:** TBD

## Context

The application needs to send handwriting images to Gemini for processing.

One important architectural question is whether the frontend should communicate
with Gemini directly or whether Gemini should be accessed through the
application backend.

---

## Options Considered

### Option A — Browser → Gemini

Potential flow:

    Browser
        ↓
    Gemini API

Advantages:

- Simpler architecture
- Fewer backend components

Potential concerns:

- API credential exposure
- Frontend coupled directly to AI provider
- Limited centralized validation
- Limited centralized error handling

---

### Option B — Browser → Backend → Gemini

Potential flow:

    Browser
        ↓
    Application Backend
        ↓
    Gemini API

Advantages:

- API credentials can remain server-side
- Centralized request validation
- Centralized AI response validation
- Easier error handling
- Frontend receives normalized application-specific responses

Disadvantages:

- Additional backend implementation
- Backend becomes responsible for AI orchestration

---

## Initial Direction

Prefer **Option B — Server-Side Gemini Communication**.

---

## Questions to Validate

During Day 2 research:

- What does Gemini documentation recommend for API key handling?
- How should secrets be handled in Next.js?
- Which Next.js server-side mechanism best fits this use case?
- Are there relevant Vercel serverless constraints?
- Should images be sent to Gemini before or after storage?

---

## Final Decision

TBD after research.

---

# ADR-004 — Store Submitted Images Before AI Processing

**Status:** Proposed  
**Proposed:** September 1, 2026  
**Reviewed:** TBD

## Context

The application needs to process a captured handwriting image.

An open question is whether the image should first be persisted to storage or
sent directly to Gemini.

---

## Option A — Process First, Store Later

Potential flow:

    Camera
        ↓
    Backend
        ↓
    Gemini
        ↓
    Result
        ↓
    Storage

### Advantages

- Potentially faster path to AI processing
- Storage failure does not block initial grading

### Disadvantages

- Harder to associate original submission with processing failures
- Less reliable audit/debugging trail

---

## Option B — Store First, Process Second

Potential flow:

    Camera
        ↓
    Backend
        ↓
    Storage
        ↓
    Gemini
        ↓
    Result

### Advantages

- Original submission exists before processing
- Easier debugging
- Submission can potentially be reprocessed
- Clear relationship between stored submission and result

### Disadvantages

- Additional storage operation before grading
- Storage failure blocks AI processing

---

## Initial Direction

Prefer **Option B — Store First**.

---

## Questions to Validate

- Does Gemini require raw image bytes, uploaded file references, or another format?
- Would storing first materially increase implementation complexity?
- What information should be persisted for each submission?
- Should failed grading attempts remain recorded?

---

## Final Decision

TBD.

---

# ADR-005 — Use Structured AI Output Instead of Parsing Natural Language

**Status:** Proposed  
**Proposed:** September 1, 2026  
**Reviewed:** TBD

## Context

The frontend needs predictable grading data.

A natural-language Gemini response would be difficult to reliably transform
into scores, individual word results, and correction overlays.

---

## Option A — Natural-Language Response

Example concept:

    "The student got two words correct and one incorrect..."

Advantages:

- Simple prompting
- Human-readable

Disadvantages:

- Difficult to parse reliably
- Output may vary
- Frontend logic becomes fragile

---

## Option B — Structured Response

Example conceptual structure:

    {
      "score": ...,
      "results": [
        {
          "expected": "...",
          "recognized": "...",
          "correct": true
        }
      ]
    }

Advantages:

- Predictable application contract
- Easier validation
- Easier database persistence
- Easier frontend rendering
- Easier score calculation

Disadvantages:

- Requires schema definition
- Invalid model output must still be handled

---

## Initial Direction

Prefer **Option B — Structured AI Output**.

---

## Questions to Validate

- Does the current Gemini API support structured output?
- Can a response schema be defined?
- How should malformed responses be handled?
- Should score calculation come from Gemini or application logic?

---

## Final Decision

TBD after Gemini research.

---

# ADR-006 — Calculate Final Score in Application Logic

**Status:** Proposed  
**Proposed:** September 1, 2026  
**Reviewed:** TBD

## Context

Gemini can potentially return both individual grading results and a final score.

However, allowing the model to calculate the score introduces unnecessary
non-determinism if the score can be derived from structured grading results.

---

## Option A — Gemini Calculates Score

Advantages:

- Less application logic

Disadvantages:

- Score calculation delegated to probabilistic model
- Potential inconsistency
- Harder to independently verify

---

## Option B — Application Calculates Score

Concept:

    Gemini
        ↓
    Individual Grading Results
        ↓
    Application Logic
        ↓
    Deterministic Score

Advantages:

- Deterministic
- Easy to test
- Easy to explain
- AI is responsible only for recognition/grading

Disadvantages:

- Small amount of additional application logic

---

## Initial Direction

Prefer **Option B — Application Calculates Score**.

---

## Final Decision

TBD after validating the grading requirements.

---

# ADR-007 — Scope Features by Assignment Value

**Status:** Proposed  
**Proposed:** September 1, 2026  
**Reviewed:** TBD

## Context

The development window is limited.

Attempting to implement every possible feature creates a risk that the core
workflow becomes unstable or incomplete.

---

## Decision Principle

Prioritize work using three levels.

### Must Have

Required for demonstrating the primary technical workflow.

### Should Have

Important for demonstrating a coherent product experience.

### Nice to Have

Implemented only when the core workflow is stable.

---

## Initial Priority

### Must Have

- Image capture/submission
- Backend API
- Storage
- AI grading
- Structured result
- Database persistence
- Score calculation
- Result display
- Correction feedback
- Red correction overlay
- Production deployment

### Should Have

- Dashboard
- Syllabus
- Results history
- Loading states
- Error handling
- Responsive interface

### Nice to Have

- Additional UI polish
- Additional animations
- Additional automated tests
- PWA improvements
- Additional accessibility work

---

## Final Decision

TBD after complete requirement review.

---

# ADR Template

Use this section when a new significant decision appears during development.

## ADR-XXX — [Decision Title]

**Status:** Proposed / Accepted / Rejected / Superseded  
**Proposed:** YYYY-MM-DD  
**Reviewed:** YYYY-MM-DD

### Context

What problem required an engineering decision?

...

### Options Considered

#### Option A — [Name]

Advantages:

- ...

Disadvantages:

- ...

#### Option B — [Name]

Advantages:

- ...

Disadvantages:

- ...

### Initial Direction

...

### Research / Evidence

...

### Final Decision

...

### Reasoning

...

### Trade-Off

...

### Consequences

...

---

# Decision Index

| ID | Decision | Status | Proposed | Reviewed |
|---|---|---|---|---|
| ADR-001 | Follow the Suggested Technology Stack | Proposed | Sep 1 | TBD |
| ADR-002 | Build the Highest-Risk Vertical Slice Before UI Polish | Proposed | Sep 1 | TBD |
| ADR-003 | Keep Gemini Communication Server-Side | Proposed | Sep 1 | TBD |
| ADR-004 | Store Submitted Images Before AI Processing | Proposed | Sep 1 | TBD |
| ADR-005 | Use Structured AI Output | Proposed | Sep 1 | TBD |
| ADR-006 | Calculate Final Score in Application Logic | Proposed | Sep 1 | TBD |
| ADR-007 | Scope Features by Assignment Value | Proposed | Sep 1 | TBD |