---
title: "Essential Skills When Generation Is Cheap"
date: 2026-09-14T00:40:00+03:30
description: "The skill list did not get a new bubble called AI. The senior job changed: you own output you did not type, you review at a higher altitude, and you decide where generation does not belong."
layout: single
author_profile: true
url: 2026/09/14/essential-skills-when-generation-is-cheap/
shortlink: https://g.omid.dev/MUjJBI3
x_link: https://x.com/OmidFarhang/status/2099249951872254213
mastodon_link: https://mastodon.social/@omidfarhang/117265871687121500
bluesky_link: https://bsky.app/profile/omid.dev/post/3mvgkbvl56k2u
linkedin_link: https://lnkd.in/p/gKikjW56
tags:
  - Frontend
  - Career
  - Engineering Leadership
  - Data & AI

categories:
  - TechBlog
series:
  id: essential-skills
  title: "Essential Skills"
  order: 3
  label: "When Generation Is Cheap"
  role: part
seeAlso:
  - /2024/05/16/essential-skills-for-a-successful-senior-frontend-developer/
  - /2024/05/24/essential-skills-for-a-frontend-team-leader/
  - /2026/09/09/i-interview-frontend-hires-for-other-companies/
  - /2026/06/29/how-to-stretch-cursor-pro-with-a-split-ai-workflow/
---

The [senior frontend map](/2024/05/16/essential-skills-for-a-successful-senior-frontend-developer/) did not get a new section called "AI."

The tools did. The roadmaps did. Job posts did. None of that changed what senior means: you make decisions the team will live with, and you own the result. What changed is how cheap it became to produce something that *looks like* that work.

A first draft used to cost enough that it carried some thought. Now it does not. Fluent, compiling, plausible code is the default output of a short prompt. The scarce work moved up: deciding whether that draft should exist, whether it is *working-but-wrong*, and whether this was a place generation should have been invited at all.

This post is that craft bar. It is not how to split a quota across Cursor and a local model — that is a [workflow post](/2026/06/29/how-to-stretch-cursor-pro-with-a-split-ai-workflow/). It is not how I [sample this in an interview](/2026/09/09/i-interview-frontend-hires-for-other-companies/). It is what the job is, on this side of the table, once the first keystroke is no longer the expensive part.

## What you will meet

You will be asked about these names. Knowing them is the junior altitude. Where they sit in the work is the senior one.

- **In the editor:** Cursor, GitHub Copilot, Windsurf, Claude Code, Continue, Aider, Cline. Tab-complete versus an agent that opens files.
- **In the browser:** ChatGPT, Claude, Gemini, Perplexity. A chat that is not the repository.
- **Local:** Ollama and a small model for work that must not leave the machine.
- **In the repo:** MCP servers, project rules, `.cursorignore` / equivalent, a test command the agent is allowed to run.
- **Policy:** "not in this repo," "not on this vendor," "not on auth or CI." A lead who cannot name the rule does not have one.

The rest of this post is the altitude, not the shopping list. If you need a concrete split of research / plan / edit / review, use the [workflow post](/2026/06/29/how-to-stretch-cursor-pro-with-a-split-ai-workflow/).

## The draft is no longer evidence of thought

I used to be able to read a pull request and infer something about how the author had modeled the problem. Not always correctly, and not for every author, but often enough that "they wrote this" was a signal.

That signal is weaker now. A mid-looking change can arrive from a junior who has not yet understood it, or from a senior who has not yet read it. The prose of the code got cheaper than the judgment underneath it.

So I stopped treating authorship of the first draft as evidence. I treat the *second pass* as the work: can you explain the tradeoff, name what you refused, and defend the change as if a stranger had opened the PR — because in a sense, one did.

If the only story you have is "it worked," you did not finish. You generated.

## You shipped it

If it is in the repository, it is yours.

That sounds like etiquette. It is a production rule. Generated code that fails in the night does not page the model. It pages you. Review comments that say "the AI did that" are a way of asking the team to maintain something nobody owns.

The habit that survives is mechanical: read it, run it, test it. Those are three different answers. Skimming a diff that "looks like our style" is not one of them. Neither is a green pipeline you did not understand.

I defend generated code in review as my own work, because it is. If I cannot, it does not merge. That is the same ownership bar as the senior IC map. The tool did not lower it. It removed the alibi.

## Review at the working-but-wrong layer

Broken code got cheaper to avoid. Working-but-wrong became the default first draft.

A mid review still catches the crash, the missing null check, the test that was never run. A senior review assumes the happy path compiles and asks what the change did to the system: a name that lies, a boundary that leaked, a test that asserts the implementation, an empty state that only exists in the screenshot, an API field the model invented because it looked plausible.

That is the same altitude I already wanted from a senior review. Generation made it the *minimum*, because the obvious bugs are the ones the tool is best at not making.

Two practical consequences:

- **You review more, and you review differently.** Volume goes up. The useful comments move from syntax to shape. If your review style is still "I would have named this differently," you will drown and miss the thing that ships a lie.
- **You ask for the tradeoff in the PR, not in the prompt history.** Prompt logs are not an artifact the team can maintain. A two-line note — what you chose, what you refused — is.

If you cannot explain the change without reopening the chat, you do not own the change yet.

## Teaching when paste is plausible

The junior role exists so someone learns to model a problem before they ship it. Generation can quietly remove that, and still look like progress: the ticket closes, the screenshot is fine, the person cannot answer why the state lives where it lives.

A senior who grows people now has to design work the tool cannot complete *for* them.

That does not mean banning the tool. It means assigning the part that is the actual practice — "draw the state before you generate," "write the failing test first," "review this as if you did not write it" — and then sitting in the review long enough to find out whether they can. A plausible paste with no questions is not a good day. It is a skipped one.

The same applies to pairing. If you generate the solution in front of a junior and call it mentoring, you have demonstrated a shortcut. Show the refusal: the prompt you did not send, the file you opened yourself, the case where reading the code was faster than describing it.

[Mentorship](/2024/07/14/mentorship-in-tech-how-to-be-an-effective-mentor-and-mentee/) did not get cheaper. The counterfeit of it did.

## Where generation does not belong

A list of tools is not a boundary. A senior has a list of *places*. Mine looks like this:

```mermaid {caption="Generation is invited only after the draft is something you can explain, is not a privilege path, and is not faster to read yourself."}
flowchart TD
  draft["Generated draft"]
  explain{"Can you explain\nthe tradeoff?"}
  privilege{"Auth, secrets,\ndelivery privilege?"}
  faster{"Reading it yourself\nis faster?"}
  review["Review at working-but-wrong"]
  notHere["Not here"]
  ship["Own it in the repo"]
  draft --> explain
  explain -->|no| notHere
  explain -->|yes| privilege
  privilege -->|yes| notHere
  privilege -->|no| faster
  faster -->|yes| notHere
  faster -->|no| review --> ship
```

**Architecture you cannot explain.** If the model proposed a boundary and you cannot say what it costs, you are not designing. You are decorating a guess. Draw the seams first. Then, if you want, generate inside them.

**Security-sensitive paths.** Authz, session handling, anything that touches secrets, and the [privileged system that builds and delivers the frontend](/2026/08/15/the-frontend-is-a-privileged-system-now/). "Looks right" is how those ship a hole. Read them yourself. Treat generated changes there as untrusted the way you treat a dependency.

**UI that only looks right.** Screenshots do not have keyboard paths. Generated CSS will happily produce a layout that collapses for a different zoom, a different language, or a user who never uses a mouse. Empty, error, and forbidden states are where models are most confident and most wrong.

**The task where you are the faster reader.** Real mileage produces a list of these. Mine includes "find the existing pattern in this codebase" and "this is a one-line fix I can see." Sending that to a tool is not a workflow. It is procrastination with a subscription.

Boundaries are allowed to be team rules, not personal taste. Privacy, compliance, or a client contract can put the tool outside the repository, or off a class of work entirely. The skill is the same: you still verify, you still own the result, and you do not treat the ban as a personality.

## What this does to the rest of the series

On the [IC map](/2024/05/16/essential-skills-for-a-successful-senior-frontend-developer/), almost nothing is new and several things got louder. Platform fluency matters more, because the tool will happily speak fluent framework at you while being wrong about the browser. Quality-as-habit matters more, because a green generated test is not a strategy. Delivery matters more, because a plausible CI change is a privilege change. Collaboration matters more, because the volume of review went up and the altitude had to follow.

On the [team lead map](/2024/05/24/essential-skills-for-a-frontend-team-leader/), the new work is setting the *team* rule: what may be generated, what must be read, what the PR has to say, and where the answer is "not here." A lead who only has a personal workflow has a preference. A lead who can say how generated work gets reviewed — and who still takes the production corner case themselves — has a standard.

I have a hiring version of these altitudes. That post is about sampling someone else's judgment. This one is about practicing your own.

## The skill is still the same

Generation did not add a competency you can color in on a roadmap. It moved the expensive part of the work you were already supposed to be doing.

Own the output. Review at the layer where fluent code is wrong. Teach in a way the shortcut cannot replace. Keep a list of places the tool is not invited.

If you want the tooling, I wrote the [split workflow](/2026/06/29/how-to-stretch-cursor-pro-with-a-split-ai-workflow/). If you want the IC bar this sits on, start at the [senior frontend map](/2024/05/16/essential-skills-for-a-successful-senior-frontend-developer/). The series stops here; the [Engineering Leadership path](/posts/techblog/paths/engineering-leadership/) is where the failure modes get their own essays.
