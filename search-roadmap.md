# Search Roadmap — Notes for Later

*Penned 2026-07-02, after discussing embedding-based semantic search. Decision: not now. Here's the thinking and the plan, so future-us doesn't re-litigate it from scratch.*

## The problem we discussed

Vocabulary mismatch. Users search in their own words — "proof I own this land," "land papers," "NEPA bill as proof of address" — and the current search (GROQ text match + fuzzy "did you mean" fallback) only finds checklists whose titles/content share words with the query. "Proof I own this land" will never match "Certificate of Occupancy" on keywords alone.

Embeddings (sentence-transformer vectors + cosine similarity) solve exactly this. The diagnosis is right; the timing is early.

## Why we're not doing embeddings yet

- **The corpus is ~90 documents** (~79 checklists, ~13 blog posts). Embeddings shine when a corpus is too large to curate by hand. At this size, hand-curation beats them.
- **General embedding models are weakest where we're strongest.** They're trained on standard English; Nigerian phrasings, Pidgin, and Lagos document slang ("C of O", "NEPA bill") are exactly where they'll miss — and exactly what we know cold.
- **Real costs it would add:** an external embedding API dependency (per-search cost + latency + key management), an index that must stay in sync with Sanity edits, and a quality ceiling set by the model's grasp of local phrasing.

## What to do instead (cheap, this-week-sized, not yet done)

1. **`searchKeywords` alias field on the checklist schema.** Hidden array field in Sanity, included in the GROQ search query. The C of O checklist gets: "land papers", "proof of land ownership", "C of O", "title document". An hour of setup, an afternoon of filling in aliases. When a real user search fails, adding an alias is a ten-second fix.
2. **Instrument search.** Log queries — especially ones that return zero results *even after* the fuzzy fallback. Converts the whole debate from theory to data. After a few weeks we'll know whether failures are vocabulary mismatch (aliases fix it), typos (fuzzy already covers it), or genuinely missing checklists (the /contribute page feeds us those).

## When to revisit embeddings (trigger conditions)

Any one of these makes it the right tool at the right time:

- Corpus grows past a few hundred items.
- Search logs show vocabulary-mismatch failures that keep slipping through even with aliases.
- We expand beyond Lagos, where we no longer personally know all the phrasings.

## Implementation notes for when we do it

- At this corpus size, no vector DB needed — a JSON file of precomputed embeddings is enough; embed the query at search time and rank by cosine similarity.
- **Sanity has a native Embeddings Index API** — check it first; it plugs into the CMS we already use instead of standing beside it.
- Keep keyword search in the mix (hybrid): exact matches on titles/aliases should always outrank semantic near-misses.
