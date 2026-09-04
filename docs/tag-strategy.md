# Tag strategy

Rules for choosing, introducing, and retagging post tags on omid.dev.

Tags are **stable discovery facets** (“what kind of post is this?”), not an index of every noun in the body. Mentions belong in the article and in search; they do not belong in the taxonomy.

Do **not** hard-code names of tags to keep or drop in this doc, in `AGENTS.md`, or in Cursor rules. Resolve candidates from the lists and tests below.

## How tags fit the rest of the site

| Layer | Job | Where it lives |
|-------|-----|----------------|
| **Category** | Section / audience shelf | Front matter `categories` (the site’s four sections) |
| **Series / reading paths** | Ordered journeys | Post `series` front matter; `content/posts/techblog/paths/` |
| **Tags** | Browseable topic facets | Front matter `tags`; `/tags/<slug>/`; homepage topic cards |

Homepage tech topic cards use curated lists in `hugo.yaml` (`homeTechTagsProfessional`, `homeTechTagsTechnical`, and the smaller `homeFeaturedTechTags*`). Spelling in front matter must match those strings exactly when a post should appear under a homepage topic.

## Resolve lists at tagging time

Every keep/drop decision uses **live data**, not a remembered allowlist.

### 1. Curated homepage tags

Read `hugo.yaml` params:

- `homeTechTagsProfessional`
- `homeTechTagsTechnical`
- `homeFeaturedTechTagsProfessional` / `homeFeaturedTechTagsTechnical` (subset used on some homepage cards)

A tag is **curated** if and only if it appears in those lists (exact spelling). Do not copy the lists into other docs.

### 2. Archive cluster (unique posts)

Count **unique posts** already using a candidate (language variants `.en` / `.fa` / `.de` of the same slug count as **one**). A name is a **cluster** when that count is roughly **≥ 3**. Use `scripts/tag-manager.py`:

```bash
python3 scripts/tag-manager.py                         # tags that already clear ≥ 3
python3 scripts/tag-manager.py count --eq 1            # singleton tags
python3 scripts/tag-manager.py count --eq 2            # tags with exactly 2 unique posts
python3 scripts/tag-manager.py count --curated         # homepage lists from hugo.yaml
python3 scripts/tag-manager.py count 'Exact Tag'       # specific candidates (quote names with spaces)
```

Reuse the **exact spelling** already in the archive (or the curated spelling when the name is on the homepage lists).

## Gate (every tag on every post)

A tag is allowed only if it passes **all** of the following:

1. **Subject test** — The post is *about* this topic, not merely mentioning it.  
   For **curated homepage tags only**, substantial dedicated treatment may satisfy this (see below).  
   For **named entities with a cluster**, dedicated procedure/treatment may satisfy this (see [Named entities](#named-entities-tools-apps-libraries-ides-oses)).
2. **Browse test** — Someone opening `/tags/<Tag>/` would reasonably expect this post there.
3. **Reuse first** — Prefer an existing tag, especially curated homepage tags (exact spelling).
4. **Introduction bar** — A *new* tag is allowed only if:
   - no existing tag covers the subject well, **and**
   - you expect (or already have) roughly **≥ 3 unique posts** under it, **or**
   - you are deliberately adding it to the homepage curated lists in `hugo.yaml`.
5. **Budget** — Aim for **2–4 tags**; hard cap **5**. Needing more usually means entity-indexing, not subjects.

If a candidate fails (1) or (2), skip it. If it passes (1)–(2) but fails (3)–(4), fold into a broader existing tag — prefer a **curated parent**, else the existing tag with the larger cluster.

### Curated tags: substantial-treatment exception

Homepage curated tags (from `hugo.yaml` as above) are discovery shelves you want to keep useful. They get a slightly softer subject bar than non-curated tags:

- **Allowed** when the post has **substantial dedicated treatment** of that topic — typically its own section with real explanation, patterns, or guidance — even if the umbrella subject is broader.
- **Not allowed** for name-drops, comparison-table rows, one-liners, or “also mentions X.”
- This exception **does not** apply to tags that are **not** on those curated lists. Non-curated names use the named-entity cluster rule or primary-subject + introduction bar.

Goal: keep curated indexes populated with posts readers of that shelf would actually want, without reopening noun-index spam.

### Named entities (tools, apps, libraries, IDEs, OSes)

A well-known named product — tool, app, library, IDE, distro, OS — may be a tag even when it is **not** curated, if it is already a real browse facet in the archive.

Keep it when **all** of these hold:

1. **Well-known named entity** — People would browse `/tags/<Name>/` for that product, not for a one-off noun in the body.
2. **Dedicated treatment** — The post is about that entity, or it gets real procedure/config (commands, paths, gotchas), not a mention or a roundup row.
3. **Cluster** — Roughly **≥ 3 unique posts** already use that tag (count as above). This post may count toward the three if you are establishing a cluster you will actually grow; do not invent a singleton you cannot defend.
4. **Browse test** — This post belongs on that entity’s tag page.
5. **Budget** — Entity tags count toward 2–4 (max 5). If over cap, keep the curated parent (when one exists) plus the entity tags with the strongest cluster **and** the most dedicated treatment here.

**Fold near-duplicates**, don’t stack them: if two names are flavors of the same environment or synonyms that would list almost the same posts, keep the spelling that is curated or already has the larger cluster. Distinct products with distinct procedures and their own clusters may both stay, budget permitting.

**Do not keep** an entity tag when it is only named in a survey, a comparison table, or “also works on X,” or when the archive has no cluster and you have no plan for one.

This is how a how-to whose *subject* is a shell setup can still keep IDE and OS tags: those environments have dedicated procedure **and** an existing cluster. It is not a license to tag every proper noun.

### Platform-shaped how-tos

When install steps, package managers, paths, or failure modes diverge by environment (or the post is primarily *for* that environment), treat those environment names as named entities above.

Additionally:

- If a **curated parent** exists for that family (read `homeTechTags*`; typical case is the OS-family shelf), keep it so the homepage card stays populated.
- Prefer the primary target(s) with distinct procedures; extra variants belong in the body.
- Portable guidance that only *mentions* environments → curated parent / broader subject only.

## Norms

- **One level of specificity.** Prefer one clear facet over a stack of near-synonyms unless the finer tags already have a cluster **or** are curated and clear substantial treatment.
- **Named entities** follow the cluster rule above — not a hard-coded product list.
- **No synonym stacks** on one post. If two tags would collect largely the same posts, keep the curated one or the larger cluster.
- **Same English tag strings** across `.en`, `.fa`, and `.de` variants of a post.
- **Do not duplicate the category** as a tag (the section name as a tag is useless).
- **Format labels are not subjects.** If a word would still make sense on a post about a completely different topic (article type, genre, recency, “this is news/a review”), it is not a tag. Rely on category, date, and real topic tags.
- **Case and spelling.** Prefer the curated homepage form when one exists. When merging duplicates, keep the curated or majority spelling and retag the rest.

## Mental model when tagging

1. Write one sentence for the subject of the post.
2. Map that sentence to an existing facet — usually a curated parent from `hugo.yaml`.
3. Check whether any **curated** homepage tags get substantial dedicated sections — those may be added for indexing.
4. List named entities (tools, apps, libraries, IDEs, OSes) that get dedicated treatment. Count unique posts for each. Keep those that clear well-known + cluster + browse; fold near-duplicates; stay inside the budget.
5. If the post is **platform-shaped**, include the curated parent when one exists.
6. Ask whether introducing a *new* finer tag helps discovery across the archive (introduction bar), or whether the body/title is enough.

Tags behave like **sub-categories of each category**: they say what flavor of TechBlog (or other section) the post is.

## Worked examples

These show **how to apply the tests**, not a keep/drop roster. Always re-count the archive and re-read `hugo.yaml`; do not copy the illustrative sets onto other posts.

### Survey / roundup (many products named)

Post: *Next-Generation Databases: NewSQL, Distributed SQL, and Beyond*  
Subject: next-generation databases for enterprise apps.

Process: the subject maps to a curated parent. Named products and near-synonym piles in the roundup stay in the body unless a given name independently clears curated-or-(cluster + dedicated treatment). In a survey they usually do not.

### Multi-technique survey with curated sections

Post: *Real-Time Data in Frontend Applications: WebSockets, SSE, and Beyond*  
Subject: patterns for live/real-time data in frontend apps.

Process: keep the curated umbrella that matches the subject. Keep other **curated** names that have a substantial dedicated section (for homepage and `/tags/` indexing). Named transports, clients, and servers that are **not** curated stay in the body unless they already have a cluster **and** dedicated treatment here.

### Platform-shaped how-to (distros / IDEs)

Post: *Install and Configure Oh My Zsh and use it in VS Code or Cursor*  
Subject: set up Oh My Zsh and the integrated terminal on Linux, with distinct package-manager paths and IDE terminal setup.

Process:

1. Keep the **curated parent** for that OS family (from `homeTechTags*`).
2. For each distro/OS with its own install path, and each IDE with its own integrated-terminal section: count unique posts. Keep names that are well-known, already clustered, and dedicated here.
3. Fold distro *flavors* of the same family into the sibling with the larger cluster (same package manager / same docs family). Distinct IDEs with their own clusters and distinct steps may both stay.
4. Drop the shell/framework name if it has no cluster. Stay at ≤ 5.

Contrast: a portable shell/dotfiles overview that *mentions* several distros or editors but does not fork steps → curated parent (and maybe an ops/CLI facet) only.

### Short news / wire clip

Post: *UK telecom giant Virgin Media monitoring customers’ file sharing*  
Subject: ISP deep packet inspection of customer traffic.

Process: map to curated (or clustered) **topic** facets such as the security/privacy shelves if they fit. Do not tag the company, the country, the activity nouns, or format/genre labels.

## Preferred starting set (TechBlog)

Prefer **curated homepage tags** from `hugo.yaml` (`homeTechTags*`) before inventing new ones. Match spelling exactly.

Other high-value facets may exist outside that list (including section-specific Health / Electronics / Cozy Corner tags, and named-entity clusters). They still must pass the gate. Do not grow the set casually.

When a post should appear on a homepage topic card, at least one of its tags must be an exact curated string from `hugo.yaml`.

## Retagging playbook

Do not try to perfect the whole archive in one pass. Work top-down:

1. **Treat curated homepage tags as the primary discovery list** for TechBlog. Merge singletons up into a curated parent or an existing cluster.
2. **Retag evergreen / recent TechBlog first** (highest discovery value).
3. **Merge product and synonym singletons** (count < 3 unique posts) into a curated parent or a clustered sibling; keep well-known named entities that already have a cluster.
4. **Legacy news wire last** — map to real subjects; drop format/genre labels.
5. Keep language variants in sync: same tag list on `.en` / `.fa` / `.de` for the same post.
6. After a deliberate retag batch, spot-check homepage topic cards and a few `/tags/...` pages.

While legacy posts still carry old tags, **do not “fix” them opportunistically** unless you are deliberately retagging. New and edited evergreen posts should follow this document.

## Checklist (new or retagged post)

- [ ] One-sentence subject written
- [ ] Curated list read from `hugo.yaml` (not from memory)
- [ ] Cluster counts checked for non-curated named entities
- [ ] Every tag passes subject + browse tests (curated: substantial-treatment OK; named entity: dedicated treatment + cluster OK)
- [ ] Prefer existing / curated tags; new tags clear the introduction bar
- [ ] 2–4 tags typical, ≤ 5 hard cap
- [ ] Near-duplicates folded; distinct clustered products may both stay inside budget
- [ ] Platform-shaped posts keep the curated parent when one exists
- [ ] No format/genre labels
- [ ] Same tags across language variants
- [ ] Homepage card spelling exact if the post should appear there
