# Figma-flow sync changelog

Tracks the monthly automated check that re-reads the Figma flows linked in `FIGMA_LINKS.md` and flags when Figma has gained screens the prototype doesn't know about yet. Newest entry on top.

## 2026-08-27 — Recurring routine turned on, and the system documented

The monthly routine itself now exists: `figma-flow-monthly-sync`, a scheduled cloud agent, enabled and firing on the 1st of every month at 06:17 UTC. Before turning it on, we ran a throwaway one-off test to confirm a scheduled cloud run actually inherits this account's Figma and Asana connections — that was the one real unknown left in the plan, and it checked out cleanly. Also added `figma-flows/README.md`, which explains how the whole mechanism works (the monthly steps, the screen-detection heuristic, where output lands, current known limitations), plus a short pointer to it from `PROTOTYPING.md`.

**Why:** a monthly check nobody can find or explain isn't worth much on its own. The auth test needed to happen before "fully automated" was a real claim rather than an assumption baked into a plan. The README exists because until now, understanding this system meant piecing it together from this changelog and one bootstrap report — logs of *what happened*, not an explanation of *how it works* — which isn't something anyone should have to reconstruct from scratch later.

**What's next:** the first real (non-bootstrap) run fires 2026-09-01. Its report lands in `figma-flows/reports/`, and if it finds anything, an Asana comment shows up on the relevant subtask. Separately — and still not started — actual documentation of each flow (the Mermaid diagram + logic table `athena:flow-mapping` produces) doesn't exist yet for any of the 20 tracked flows; this system only tracks *whether* something changed, not *what* a flow does. See `figma-flows/README.md`'s "What this is not" for the distinction.

## 2026-08-27 — Bootstrap: baseline established for 20 tracked flows

Read every Figma flow board listed in `FIGMA_LINKS.md` that has a URL (20 of the 23 rows — 3 are known gaps with no Figma link yet) and recorded the current screen list for each one in a new `figma-flows/snapshot.json`. This is the very first run, so there was nothing to compare against yet — the point was purely to capture "here's what Figma looks like today" as a starting line, not to find anything new.

**Why:** `PROTOTYPING.md` says this prototype's base state should always trace back to an actual Figma flow, but until now that link was only checked by a person, by hand, whenever they happened to build or revisit a flow. Nothing noticed if Figma moved ahead of what the prototype had already read in. This bootstrap is step one of closing that gap: before the monthly automated check can say "this flow gained a screen," it needs a trustworthy record of what each flow looked like the day the check started.

Three of the twenty flows (Phone verification, Rate the App, Password Creation) came back with zero screens recorded, not because they're empty, but because their screen mockups sit nested one level deeper in Figma's structure than the other flows — a quirk of how those specific boards were built, not a real absence of content. That's flagged clearly in this run's report rather than silently accepted, since it means the automated check won't currently catch new screens added inside those three flows until a person decides how to read them properly.

**What's next:** The recurring monthly check will run against this baseline going forward, comparing each flow's screen list to what's stored here and surfacing anything new. The three flows with the nested-screen quirk need a person to look at them and decide whether the check should read one level deeper, or track something else about those boards instead — until then, treat those three as blind spots.
