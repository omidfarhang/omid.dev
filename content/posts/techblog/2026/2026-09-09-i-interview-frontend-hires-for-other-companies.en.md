---
title: "I Interview Frontend Hires for Other Companies"
date: 2026-09-09T03:00:00+03:30
description: "How to hire frontend for a team that is not yours — intake with their lead, choosing the real level, and why I now weigh architecture mindset and AI workflow over syntax recall."
layout: single
author_profile: true
url: 2026/09/09/i-interview-frontend-hires-for-other-companies/
shortlink: https://g.omid.dev/3DivN1O
tags:
  - Engineering Leadership
  - Career
  - Frontend
  - Data & AI
categories:
  - TechBlog
seeAlso:
  - /2024/05/24/essential-skills-for-a-frontend-team-leader/
  - /2024/05/16/essential-skills-for-a-successful-senior-frontend-developer/
  - /2024/07/14/mentorship-in-tech-how-to-be-an-effective-mentor-and-mentee/
  - /2024/06/06/building-resilient-teams/
---

Partner companies ask me to hire their frontend developers.

Not "sit in on the final call." The work starts in a room with their CTO, someone from HR, and whoever currently leads the development team. I listen to what they think they need. Then I tell them who they can actually use, read the incoming resumes, choose who is worth an interview, and run the loop.

I follow the same path for my own team. The difference is who lives with the result. When I hire badly for myself, I absorb it — I mentor the person, or I carry the gap in the sprint. When I hire badly for a partner, they keep the person and I keep the reputation.

That asymmetry is useful. It makes the easiest failure obvious: agreeing with whoever is most enthusiastic in the room. A borrowed interviewer who only confirms the founder's favorite candidate has added a signature, not judgment.

This post is about the path I use when the hire is not (only) mine, and how the bar moves between a junior, a mid, and a senior developer.

## The interview is the last expensive sample

Most hiring advice starts at the interview. That is the wrong end of the process, and it is why so much of it reduces to question lists.

By the time a candidate joins a call, most of the decision has already been constrained. Someone wrote a title. Someone screened a stack of resumes against that title. If both of those steps were wrong, the interview is a careful measurement of the wrong thing.

The path has five steps, in this order:

```mermaid {caption="The hiring path: four steps happen before anyone is interviewed."}
flowchart LR
  intake["Intake with CTO, HR, lead"]
  translate["Translate: real need and level"]
  slate["Pick the slate"]
  loop["Interview against that need"]
  rec["Recommend with residual risk"]
  intake --> translate --> slate --> loop --> rec
```

1. **Intake.** Sit with the people who own the hire.
2. **Translate.** Decide who they can actually absorb, and at what level.
3. **Slate.** Read resumes against that decision, not against the job post.
4. **Interview.** Sample the translated need.
5. **Recommend.** Report signal and residual risk; the offer stays theirs.

I do not live in a partner's codebase. That is fine — the intake meeting and the lead's account of the work are enough context to judge who fits it. What I cannot do is skip that meeting and start reading resumes.

## The company is the first candidate

The first thing I evaluate is not a developer. It is the request.

A hiring request arrives as a title and a stack, usually written under pressure and often copied from a previous posting. It encodes what the team wishes were true about itself. The intake meeting is where you find out what is actually true: how large the team is, who already carries which part of the product, what has been on fire for the last quarter, who would be reviewing this person's code, and whether anyone has time to answer questions.

The most common mismatch I find is a level mismatch, in one direction. The company asks for the most senior person it can describe, because seniority sounds like safety.

Consider a familiar shape. A company asks for a senior frontend architect. During intake, the picture is a small team with a competent lead who already owns the architecture, a backlog of product panels waiting to be built, and no capacity problem in decision-making — the problem is throughput. They do not need someone to redesign the system. They need someone who can take the next panel end to end and ship it alongside the existing lead.

Hiring the architect they asked for creates two people who want to own architecture and nobody clearing the queue. The role is prestigious, the candidate is strong, and the hire still fails.

Translating that honestly is the part of the job that feels least like interviewing and matters most. It also has to be said out loud, in the intake meeting, before anyone is screened — not implied later by rejecting candidates.

## A level is a profile, not a title

To translate a request into a level, you need a definition of the level that does not depend on a job title. Titles are inflated and deflated by market and company size; they are not a measurement.

I level frontend developers across five dimensions:

- **Knowledge and skills** — what they can build, and how deeply they understand the tools they build with.
- **Impact and responsibility** — the size of the thing they can be handed, and what happens to it.
- **Teamwork and communication** — how work and context move between them and everyone else.
- **Approach and attitude** — how they respond to feedback, unfamiliarity, and pressure.
- **Leadership** — whether, and how, they raise the level of people around them.

A hire is a profile across all five, not a score on the first one. That is why "strong technically, we will figure out the rest" is such a reliable way to make a bad hire: it treats one dimension as the whole measurement.

Read at that resolution, the three levels stop being vague:

**Junior.** Core web fluency and a beginning grasp of the team's framework. Works on small, well-defined pieces with supervision. Asks questions instead of stalling, and takes feedback without treating it as a verdict. Impact is deliberately local. The leadership dimension is empty, and that is correct — nothing is wrong with a junior who does not lead.

**Mid.** Handles a medium-sized feature independently, in one stack they know well. Surfaces progress and blockers without being asked. Owns the work they are given, including the unglamorous parts of finishing it. Leadership shows up locally: answering a junior's question properly, suggesting a process fix.

**Senior.** Makes decisions the team will live with, and can explain the tradeoffs behind them. Owns outcomes rather than tasks — including risks they identified and mitigated. Works across the boundary with backend and design well enough to influence an interface, not just consume it. Leads reviews and technical discussions in a way that makes standards clearer, and actively grows other people.

Notice how much of the senior definition is not framework knowledge. That is the single most important thing to carry into the interview.

There is a ladder above this — specialists, principals, managers — but a hiring loop for a small or mid-sized frontend team is almost never actually choosing on that axis. This path stops at senior.

The other half of the translation is the **shape of the work**. A product frontend built as a single-page application and a marketing site built on a CMS both want "a frontend developer," and they want different profiles: reactive state, component interaction, and API integration in one case; templating, theming, SEO, and content workflows in the other. A strong senior from the wrong shape will look mediocre for six months. Deciding the shape is part of choosing the level, and it belongs in the intake meeting.

## The slate is already a hiring decision

Screening feels administrative. It is not. Choosing five resumes out of sixty is a stronger act of judgment than anything that happens in the interview, because everyone you did not pick is now unhireable by definition.

I read resumes against the translated level, looking for the same dimensions:

- **Owned outcomes, with scope.** What was theirs, how big it was, and what happened to it.
- **Honesty about the stack.** A clear account of what they actually worked in beats a longer list.
- **Trajectory.** Whether the work grew in scope over time, or repeated at the same size.

And I discount two things heavily. **Buzzword density**, because a list of technologies is a reading list, not experience. And **title inflation**, because a "senior" title from a three-person startup and one from a platform team are not the same measurement — which is the whole reason to level on dimensions instead of titles.

## Aim the interview; do not recite it

I keep a general question bank, organized by area. It is a scaffold, not a script. In the room, the actual questions come from two inputs: **the level I already chose**, and **what the candidate just said**.

The useful thing to teach is not the questions. It is the structure underneath them: each area of questioning is a **category**, and every category can be asked at more than one **altitude**.

Same category, different altitude:

| Category | Mid altitude | Senior altitude |
|---|---|---|
| **Past project scope** | Features they shipped | Systems, tradeoffs, and business impact |
| **Framework depth** | Correct level: do they use the stack well? | Wrong level — see below |
| **Architecture** | Can assemble a feature-shaped application | Boundaries, shared surfaces, debt taken on purpose |
| **Backend collaboration** | Consumes an interface as given | Influences its shape before it ships |
| **Performance** | Knows techniques | Has a process when the obvious techniques do not apply |
| **Testing** | Writes tests | Decides what deserves which kind of test |
| **Security** | Names risks, sometimes the backend's rather than their own | Reasons about browser and delivery risk specifically |
| **Code review** | Finds problems | Handles working-but-wrong code, and the person who wrote it |
| **AI in the workflow** | Uses it well on their own work, and verifies output | Decides how the team uses it, and where it does not belong |
| **Ownership** | Own tasks; helps when asked | Unblocks others; owns the outcome |
| **Success in the role** | Delivered what was assigned | Standards, incidents, and other people succeeding |

Two things follow from reading it this way.

**The opening category tells you the altitude.** Ask about the most complex thing they have built, then follow it: how large the team was, what exactly was theirs, what would break if they left. A junior answers in **tasks**. A mid answers in **features**. A senior answers in **systems** — including the tradeoff they chose and what it cost. You have not tested any specific knowledge yet, and you already know roughly where this conversation should live.

**Which categories you open is a decision, not a habit.** For a mid-level hire, framework depth is exactly the right category: this person will spend their days inside that framework, and how well they understand its behavior predicts their work. For a senior hire, the same category is close to useless. Reciting how the framework schedules rendering, or which state primitive suits which lifetime, is knowledge a strong mid also has. Asking a senior harder versions of mid questions measures preparation, not seniority.

For a senior, I open on architecture and runtime — the layer the framework sits on, where constraints exist that no framework API hides from you — and on ownership. The genre that separates them is the production corner case: the situation where the documented approach is not the answer, and someone has to reason about the system underneath.

## What I stopped testing

For years I interviewed much closer to the syntax. Did they remember the exact method signature, could they produce the right operator on the spot, did they know the language detail I had in mind. It felt rigorous. What it actually measured was recall.

I have almost entirely stopped asking that, and not only because recall was always a weak predictor. Syntax is now the cheapest thing in the room. Anything a developer can look up in seconds, or have generated correctly on the first attempt, tells you very little about what they will do to a codebase over a year.

What replaced it is mindset: how they think about code and structure. Whether they model a problem before typing. Whether they can say why the shape they chose is better than the obvious alternative, and what it costs. Whether they notice that a working change makes the next change harder. Those habits survive framework churn, and they are what the architecture and ownership categories are actually testing.

## How they work with AI is now its own category

The second thing that changed is that AI use became a category I weigh seriously, at every level.

Not whether they use it. Everyone says yes, and the answer carries no information. What I listen for is **where it sits in their work**.

The weak version is a chat window beside the editor. They hit a problem, describe it to an assistant, and paste the answer back. That is a faster search engine. It works, it is common, and — as I have argued about [research workspaces](/2026/08/29/one-ai-chat-is-not-a-research-workspace/) — a single conversation is not a place where real work accumulates.

The strong version has AI operating **inside the codebase**, with the developer still accountable for the result. In practice that means agents making multi-file changes against the project's actual conventions, context given deliberately rather than dumped, and generated code treated as a draft that has to survive review and tests like anyone else's. It also means tooling the repository itself so those conventions are available to the agent instead of re-explained every session — which is [what MCP support and similar integrations changed for real teams](/2026/05/27/angular-mcp-ai-workflows-real-teams/).

Four things I listen for:

- **Verification.** How do they know the generated code is correct? Reading it, running it, and testing it are different answers, and "it worked" is not one of them.
- **Context discipline.** What they deliberately give the agent — conventions, the failing test, the constraint — and what they keep out.
- **Boundaries.** Where the tool has been unreliable in their experience, and what they do instead. Someone with real mileage has a list. It usually includes the tasks where reading the code themselves is simply faster.
- **Accountability.** Whether they defend generated code in review as their own work, because it is.

The false yes in this category is easy to spot once you are listening for it: fluent tool names, subscription opinions, and no verification story at all. That is someone who has outsourced judgment rather than accelerated it, and it produces code the team cannot maintain — often faster than before.

The altitudes differ as much as anywhere else. For a **junior**, the risk is generating code they cannot read, which quietly removes the learning the role exists for; I want evidence they can work without it. For a **mid**, I want it used well on feature-sized work, with review discipline intact. For a **senior**, the bar is setting the rules: what goes in the repository, how the team uses these tools, where the standard is "not here," and how generated work gets reviewed. That is the leadership dimension applied to tooling — and it is closer to a [deliberate workflow decision](/2026/06/29/how-to-stretch-cursor-pro-with-a-split-ai-workflow/) than to a preference.

## The two ways the loop fails

**The false yes.** A candidate who is fluent, prepared, pleasant, and answering in the wrong category at the wrong altitude. Nothing they say is wrong. They handle the mid-level material cleanly and never move above it, and the loop reads that fluency as strength. This is the expensive failure for a small partner team, because there is no bench to absorb it: the person arrives, the queue does not move, and the lead ends up doing the work twice.

**Trivia-seniority.** The mirror image, and the interviewer's fault rather than the candidate's. You want to test a senior, so you ask harder framework questions. What you have built is a quiz, and quizzes reward study. The candidate who spent last weekend reading release notes outperforms the one who has spent three years owning a system, because the second person answers the question you asked instead of the one you meant.

Both failures have the same inverse: the candidate who does not perform. Less framework-fluent in the moment, slower and more careful in a live exercise, and clearly reasoning at the system layer with real ownership behind it. If your loop only rewards polish, that person leaves the process and someone else hires them.

## The recommendation stays theirs

When I hire for my own team, this step is a decision. When I hire for a partner, it is a report — and the difference matters, because a borrowed interviewer who hands over a bare yes has quietly taken a decision that is not theirs to take.

So the recommendation says three things: **this candidate against the level we agreed in intake**, the **signal** I actually observed, and the **residual risk** the company would be accepting.

Residual risk is level-shaped:

- For a **junior**, the risk is almost always mentorship load. A junior hire is a commitment of senior attention. If nobody has that time, the honest recommendation is that the level is wrong, no matter how promising the candidate is.
- For a **mid**, the risk is the ownership gap — whether they can take a feature-sized piece and finish it, or will need it broken into steps by someone else.
- For a **senior**, the risk is theater: whether what I saw was judgment or performance, and how confident I am in telling them apart from one conversation.

Naming that uncertainty is what makes the opinion worth having. "Yes, hire them" is a signature. "Yes at mid, not at senior, and here is the specific thing I could not verify" is judgment they can act on — including by deciding differently than I would.

## Most bad hires are decided before the interview

If there is one thing to take from how I do this, it is that the loop is the last and least of it.

The hires that went wrong were mostly decided earlier: in an intake meeting where nobody translated the request, or in a screening pass that filtered for a title. By the time you are choosing between two finalists, your real options were set weeks ago.

And the process does not end at the offer. A junior hired with no mentorship capacity, or a senior hired into a team with no room for them to own anything, becomes a retention problem rather than a hiring one. Getting the level right is what makes [mentorship](/2024/07/14/mentorship-in-tech-how-to-be-an-effective-mentor-and-mentee/) possible instead of theoretical, and what lets a team [absorb the next bad quarter](/2024/06/06/building-resilient-teams/) without leaning on the same two people.

Interviewing well is a useful skill. Knowing what you are interviewing for is the job.
