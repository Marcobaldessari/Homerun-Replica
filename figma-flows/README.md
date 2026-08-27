# Figma-flow coverage sync

This keeps the prototype honest against `FIGMA_LINKS.md`: once a month, an automated routine re-reads every linked Figma flow and flags anything Figma has that this repo doesn't know about yet. It exists because `PROTOTYPING.md` says the prototype's base state should always trace back to an actual Figma flow — until this, that link was only checked by a person, by hand, whenever they happened to touch a given flow.

## What's in this folder

- **`snapshot.json`** — the current baseline. One entry per `FIGMA_LINKS.md` row with a Figma URL: the flow's file/node identifiers, its Asana subtask gid, the list of real screen names last seen (`topLevelFrameNames`), and bookkeeping (`lastCheckedAt`, `reportedFindings`). This is machine state, not something to read for understanding a flow.
- **`reports/<date>-figma-sync.md`** — one file per run, never overwritten. What was checked, what (if anything) looked new, what was skipped, what errored.
- **`CHANGELOG.md`** — a plain-language running log of what this system found and why, written for a peer outside the process.
- **`mermaid/<flow-slug>.md`** — created lazily, only for a flow where a run has detected something new. Holds that flow's `athena:flow-mapping` read (a Mermaid flowchart + From/Condition/To logic table) as of the most recent escalation. Most flows won't have one of these yet — see "What this is not," below.

## How the monthly routine works

A scheduled cloud agent (**`figma-flow-monthly-sync`**, routine id `trig_015rJXrEKskMkR4DKz1r84c6`, manage it at `https://claude.ai/code/routines/trig_015rJXrEKskMkR4DKz1r84c6`) fires on the 1st of every month at 06:17 UTC. Each run:

1. Reads `FIGMA_LINKS.md` fresh (it's the source of truth for which flows/URLs are tracked) and `snapshot.json` (the baseline).
2. For each linked flow, does a cheap check first: pulls the flow board's child nodes from Figma and filters them down to real screens — excluding connector arrows, decision-diamond nodes, and "Specs /" annotation scaffolding — using name and dimension heuristics (see "Known limitations" below). Compares that filtered list against the stored baseline.
3. If nothing changed, it just updates `lastCheckedAt` and moves on — no noise.
4. If a flow gained a screen (or a brand-new row was added to `FIGMA_LINKS.md`), that's a finding: it gets written into that run's report, a comment gets posted on the flow's Asana subtask (never a new subtask, never touching `completed` — that's a human call), and it's recorded in `snapshot.json.reportedFindings` so it isn't re-flagged next month.
5. Any Figma file that's unreachable gets logged under "Errors" without failing the whole run; the report always closes with a reminder to manually skim the Figma project folder for entirely new *files* not yet in `FIGMA_LINKS.md` — no available tool can enumerate a Figma project's file list, so that one check stays manual.
6. Commits and pushes the result directly to `main` — no PR gate. That was a deliberate choice (full automation over a review step), made when this was set up.

## What this is not

This is a change-detector, not documentation. Reading `snapshot.json` won't tell you what a flow actually does. If you want the real diagram + logic table for a flow, run the `athena:flow-mapping` skill against it directly — that's exactly what `PROTOTYPING.md` step 1 already asks you to do before building anything.

## Known limitations

- **Three flows read as empty at bootstrap** (2026-08-27): Phone verification Flow, Rate the App, and Password Creation Flow all nest their real screen mockups one level deeper than a standard `get_metadata` call reaches, so their baseline is `frameCount: 0`. The monthly routine's prompt knows to try a deeper read for these three specifically and self-correct the baseline the first time it gets a real one — but until that happens, new screens added inside them won't be caught. See `reports/2026-08-27-figma-sync.md` for detail.
- **Entirely new Figma files** aren't auto-detected — see step 5 above.
- The screen-vs-scaffolding filter is a heuristic (name patterns + typical mobile-screen dimensions), not exact. It can occasionally miss an oddly-named or oddly-sized real screen, or double-count a renamed one as new. Findings are tagged `confirmed` vs `needs-review` for this reason — treat `needs-review` findings as a prompt to look, not a settled fact.
