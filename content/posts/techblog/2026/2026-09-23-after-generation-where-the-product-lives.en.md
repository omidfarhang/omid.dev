---
title: "After Generation: Where the Product Lives"
date: 2026-09-23T16:00:00+03:30
description: "Cheap generation gets you a demo. Pick the easy host to build on — a platform your users already use, a small box you run, or a runtime you rent."
layout: single
author_profile: true
url: 2026/09/23/after-generation-where-the-product-lives/
shortlink: https://g.omid.dev/YcRFC4Q
x_link: https://x.com/OmidFarhang/status/2102753812507206072
mastodon_link: https://mastodon.social/@omidfarhang/117320618855687746
bluesky_link: https://bsky.app/profile/omid.dev/post/3mw6ucdcnks2a
linkedin_link: https://lnkd.in/p/gFwHBKFV
tags:
  - Engineering Leadership
  - Software Architecture
  - Data & AI
categories:
  - TechBlog
seeAlso:
  - /2026/09/14/essential-skills-when-generation-is-cheap/
  - /2026/01/03/technical-founder-execution-playbook/
  - /2024/05/17/essential-skills-for-a-successful-senior-fullstack-developer/
  - /2024/06/20/choosing-the-right-tech-stack-for-your-project-a-comprehensive-guide/
---

A laptop that serves your app is a demo. It has not yet chosen a home.

[Generation](/2026/09/14/essential-skills-when-generation-is-cheap/) made the first half cheap. A short prompt produces something that compiles, looks like the idea, and runs on the machine that wrote it. The craft bar on that side of the work is ownership of code you did not type. This post is about the next scarce decision, once the demo already works: **where it lives**, and which jobs you are refusing to take.

The idea is real. The code exists. Then the same question shows up: now what? Production, as people have been told to fear it, means infrastructure, a database administrator, deploys, backups, a status page. Plenty of builders do not want that job. They want the product in front of someone else.

That refusal is legitimate. It is also a purchase. "No infrastructure" means paying a platform, a small deployable, or a vendor to hold a piece of the product. The skill is knowing which piece, and what you still keep.

## What you are actually buying

Four things move when you pick a home. Name them before you pick a logo.

- **Distribution.** Who already has the users, and do they meet your product inside a day they already have?
- **Control.** Where the data sits, who can read the schema, whether the domain is yours.
- **Ops tax.** Who gets paged when disk fills, TLS expires, or the process does not come back.
- **Exit.** What a move costs after the product has users: a rewrite, a backup restore, or an export that leaves pieces behind.

A choice that optimizes one of these and treats the others as free shows up later as a bill, a marketplace rejection, or a backup nobody has ever restored.

## Three homes that are all serious

```mermaid {caption="Placement is a refusal with an object. Every path still ends at a trust boundary you own."}
flowchart TD
  demo["Demo works"]
  refuse{"What do you refuse to own?"}
  hitch["Hitch to a host platform"]
  box["Batteries-included self-host"]
  rent["Rent hosted BaaS or PaaS"]
  own["You still own trust boundaries"]
  demo --> refuse
  refuse -->|"distribution and users"| hitch
  refuse -->|"machine ops only"| box
  refuse -->|"almost all runtime"| rent
  hitch --> own
  box --> own
  rent --> own
```

These are classes. The names below are representatives so you can recognize the shape. They are a vocabulary, not a ranking, and the product names will drift. The axes will not.

### Hitch to a platform that already has the users

A Shopify app, a Slack app, a Notion integration, a browser extension. A WordPress plugin sits in the same list, mostly because WordPress is popular and therefore easy to reach: hosting, accounts, and a database are often already there. The product is a behavior inside a product people already open.

What you buy: an install base, often their accounts, their update channel, and a publishing step that already exists. Hosting folklore — language versions, app review, embed rules — comes with the platform. You inherit it.

What you pay: you live inside someone else's policy. Review can reject you. An API can deprecate the hook you built on. Revenue share, branding limits, and a host that changes the rules are part of the rent, even when the rent is not a monthly invoice.

This is the right home when the users are already there and your product is a feature of their day. Here, the listing is the product. A custom domain would be a second, emptier place to send them.

### A box that includes the boring parts

PocketBase is the compact end of this home: authentication, a database, an admin UI, and a file API in one process you can put on a machine. Directus and self-hosted Appwrite are the same refusal — you still operate — with a database or a container stack beside the app. Budget those as a wider surface, not as the binary.

What you buy: a schema you can read, data on a disk you can point at, and a bill that looks like a small server. Data locality and a boring upgrade are the point.

What you pay: the machine is still yours. Disk, TLS, upgrades, backups, and "it is down" page you. A batteries-included box removes the DBA role. It keeps the operator. If you cannot say where last night's backup is, you have a demo with extra steps.

This is the right home when you want the data near you, the product on your domain, and the operational surface small enough that one person can hold it.

### Rent the runtime

Supabase, Firebase, Appwrite Cloud, or a platform that is git-push plus a database — Fly, Render, Railway, the Heroku-shaped hosts. You buy a managed runtime. Someone else patches the database, rotates disks, and publishes the status page.

What you pay: the shape of the bill as you grow, the parts of the API that do not export cleanly, and an outage you cannot SSH past. Lock-in is the price of the buttons you did not have to build.

This is the right home when the product has to stay up without you becoming the on-call rotation, and when leaving is a project you schedule.

## What to pick

Easy to host is not a product category. It only means that auth, a database, storage, or deployment have already been assembled for you.

Before choosing, name the vetoes: where the data is allowed to live, what must be exportable, which system is the source of truth, and whether another company's review process can block the product. Those constraints come before convenience.

Then walk this in order.

**Your users already work inside a platform.** They have a Shopify store, a Slack workspace, a Notion workspace, or a WordPress site. If your product is valuable because it appears inside that existing workflow, build there. The platform is not merely hosting; it is distribution, identity, and habit. Keep only the data and services that genuinely need to be yours.

**The platform was only easy to reach.** Your UI is the product, your domain matters, and nobody needs that directory or marketplace to discover you. Build an independent application instead. A popular host is not automatically the place your product belongs.

**You do not want to operate a database server.** Start with a managed runtime such as **Supabase** when managed Postgres, auth, storage, and exportable relational data fit the product. Consider **Convex** when reactive TypeScript state is central enough to justify its data model. Consider **Baserow Cloud** when structured record editing is most of the product, rather than a custom application interface.

**You will operate one small machine.** **PocketBase** fits when one deployable, SQLite-scale data, and a narrow operational surface are the goal. **Directus** fits when an existing SQL database is your system of record and you need an API and admin layer around it. Self-hosted **Appwrite** belongs here only when you accept that "self-hosted" means a larger container-based system, not a single binary.

The decision is not who hosts your code. It is which responsibilities remain yours, which ones you deliberately rent, and which ones you refuse to inherit.

## Names you will meet

The same picks, as a snapshot. Read a row for the home it belongs to. A cell goes stale the year that vendor ships the button it was missing.

| Tool | Home | Who already has the users | Where the data sits | Who owns the incident | What moves first |
| --- | --- | --- | --- | --- | --- |
| Shopify app | Hitch | Merchants on Shopify | In Shopify, plus a store of your own if the record is yours | Shopify for a host-wide outage. You for the app, support, and records you keep outside it. | The listing. Commerce data may stay behind. |
| PocketBase | Box | You bring them | SQLite on your machine | You | The data directory. Domain, secrets, and downtime still need a plan. |
| Directus | Box | You bring them | A SQL database you run | You, database included | The SQL, then metadata, files, and extensions. |
| Appwrite | Box or their cloud | You bring them | Your containers, or Appwrite Cloud | You, or the vendor for the cloud and you for the product | An export. The container stack is its own plan. |
| Baserow | Box or their cloud | You bring them | Postgres you run, or Baserow Cloud | You, or the vendor on their cloud and you for the records | The base. A UI you built on the API comes with you. |
| Supabase | Rented runtime | You bring them | Postgres on Supabase, unless you operate their stack yourself | Supabase for the platform. You for config, quotas, correctness, and the user who writes in. | A database dump. Auth, storage, functions, and secrets need their own plan. |
| Convex | Rented runtime | You bring them | Convex's database on their cloud, unless you run the backend | Convex for the cloud. You for functions and the failure the user sees. | An export that stays in Convex's shape. |

## Check the pick

The name from the section above still has to match this purchase. A veto from residency, a contract, or the system of record overrides the row.

| Question | Hitch to a host | A box you run | Rented runtime |
| --- | --- | --- | --- |
| Who already has the users? | The platform. That is the point. | You bring them. | You bring them. |
| Where does the record sit? | In the host, plus what you keep beside it. | On your machine. | With the vendor. |
| Who owns the incident? | The host for host-wide incidents. You for the integration, support, and any record you keep outside it. | You. | The vendor for the platform. You for config, quotas, application failures, and what you tell the user. |
| What moves first? | The habit of being installed there. Some records may not come with you. | The data you can point at, plus the cutover. | An export. Auth, files, and functions stay behind until you plan them. |
| What is the product? | A listing inside their product. | Your domain. | Your domain. |

The vetoes still apply under this table. An add-on that only decorates a page can live entirely in the host. The moment the record is yours — orders, documents, anything a user would be angry to lose — you have a second system whether you planned one or not.

## Placement keeps the trust boundary yours

[If it is in the repository, it is yours](/2026/09/14/essential-skills-when-generation-is-cheap/). Placement changes who runs the box. The person who answers for the product stays the same.

A generated client that embeds a secret is still a secret, on every one of these homes. An authorization check the model sketched is still your check. A backup you have never restored is a story. The host's uptime dashboard is their incident process; you still need a sentence for the user whose data is wrong, and a way to put it back.

The useful form of "I don't want to be a DBA" has an object. I will not run Postgres. I will not join that marketplace. I will not keep this class of data on a vendor I cannot export. "Someone else will handle production," with no someone and no production, is how a demo becomes an incident.

## Same kind of judgment

This is a decision about what you will live with after the demo stops being the only copy.

Languages and frameworks are a [different essay](/2024/06/20/choosing-the-right-tech-stack-for-your-project-a-comprehensive-guide/). Owning more of the slice later — CI, a real host, backups as a habit — is already on the [fullstack map](/2024/05/17/essential-skills-for-a-successful-senior-fullstack-developer/), including the small-product platforms. When the hard part is whether anyone will find the thing, start from [distribution as a founder problem](/2026/01/03/technical-founder-execution-playbook/).

The [Engineering Leadership path](/posts/techblog/paths/engineering-leadership/) is where this sits: beside the craft of owning generated code.
