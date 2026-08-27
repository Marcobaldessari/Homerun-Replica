# Figma-flow sync changelog

Tracks the monthly automated check that re-reads the Figma flows linked in `FIGMA_LINKS.md` and flags when Figma has gained screens the prototype doesn't know about yet. Newest entry on top.

## 2026-08-27 — Bootstrap: baseline established for 20 tracked flows

Read every Figma flow board listed in `FIGMA_LINKS.md` that has a URL (20 of the 23 rows — 3 are known gaps with no Figma link yet) and recorded the current screen list for each one in a new `figma-flows/snapshot.json`. This is the very first run, so there was nothing to compare against yet — the point was purely to capture "here's what Figma looks like today" as a starting line, not to find anything new.

**Why:** `PROTOTYPING.md` says this prototype's base state should always trace back to an actual Figma flow, but until now that link was only checked by a person, by hand, whenever they happened to build or revisit a flow. Nothing noticed if Figma moved ahead of what the prototype had already read in. This bootstrap is step one of closing that gap: before the monthly automated check can say "this flow gained a screen," it needs a trustworthy record of what each flow looked like the day the check started.

Three of the twenty flows (Phone verification, Rate the App, Password Creation) came back with zero screens recorded, not because they're empty, but because their screen mockups sit nested one level deeper in Figma's structure than the other flows — a quirk of how those specific boards were built, not a real absence of content. That's flagged clearly in this run's report rather than silently accepted, since it means the automated check won't currently catch new screens added inside those three flows until a person decides how to read them properly.

**What's next:** The recurring monthly check will run against this baseline going forward, comparing each flow's screen list to what's stored here and surfacing anything new. The three flows with the nested-screen quirk need a person to look at them and decide whether the check should read one level deeper, or track something else about those boards instead — until then, treat those three as blind spots.
