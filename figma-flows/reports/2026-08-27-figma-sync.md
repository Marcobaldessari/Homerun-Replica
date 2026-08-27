# Figma-flow sync — 2026-08-27

**This is the bootstrap run.** There is no prior `snapshot.json` to compare against, so nothing below is reported as "new content" — this run's job was only to read every linked Figma flow and record its current set of screens as the baseline that future monthly runs will diff against.

## Summary

- 20 flows checked (all rows in `FIGMA_LINKS.md` that have a Figma URL)
- 3 rows skipped as known gaps (blank URL — see below)
- 406 total screens recorded across all 20 flows (`frameCount` sum)
- 3 flows need human review before their baseline can be trusted (see below)
- 0 `get_metadata` failures — every flow's board was reachable

## Baseline established (17 flows, clean)

| Flow | BM | Screens |
| --- | --- | --- |
| Request Creation | BM1 | 67 |
| Request Creation | BM2 | 70 |
| Dashboard | BM1 | 34 |
| Dashboard | BM2 | 58 |
| Chat | BM1 | 21 |
| Chat | BM2 | 15 |
| Write a review | BM1+BM2 | 12 |
| Settings - Entry point | BM1+BM2 | 2 |
| Settings - My profile | BM1+BM2 | 37 |
| Settings - Change Password | BM1+BM2 | 9 |
| Pro Pages | BM1+BM2 | 22 |
| Settings - Payment Preferences | BM2 | 15 |
| Settings - Data & Privacy | BM1+BM2 | 25 |
| Settings Others | BM1+BM2 | 5 |
| Notification page | BM1+BM2 | 4 |
| Settings - Register as Pro | BM1+BM2 | 4 |
| Download app banner | BM1+BM2 | 6 |

For each of these, `figma-flows/snapshot.json` now stores the filtered list of real-screen names (`topLevelFrameNames`) pulled from `get_metadata`, with connector arrows, decision diamonds, "Specs /" annotation nodes, and other flow-diagramming scaffolding excluded per the heuristic described in the storage plan.

## Needs review (3 flows — baseline captured, but ambiguous)

These three boards returned **0 top-level screens** because their actual screen mockups live nested one level deeper, inside a single large wrapper node, rather than as direct children of the board section that `get_metadata` reads:

- **Phone verification Flow** (BM1+BM2) — screens are nested inside a symbol named "Phone verification flow" (~5422×4339)
- **Rate the App** (BM1+BM2) — screens are nested inside a frame named "Rate the App flow" (~3676×8080), itself wrapping two large sub-flow symbols
- **Password Creation Flow** (BM1+BM2) — screens are nested inside a frame named "Password creation" (~2142×4625), wrapping two sub-flow symbols for mandatory-yes/no branches

The baseline for these three has been recorded as-is (`frameCount: 0`, empty `topLevelFrameNames`) so that future monthly runs diff consistently against the same structural shape rather than silently guessing at a deeper read. A human should decide whether the monthly check needs to call `get_metadata` one level deeper for these specific boards, or whether the wrapper's own dimensions/child-count should be tracked as a coarser signal instead. Until that's resolved, a real new-screen addition inside any of these three flows will **not** be caught by the monthly diff.

## Skipped (3 known gaps — blank Figma URL in FIGMA_LINKS.md)

- **Authentication** (BM1+BM2)
- **Authentication checks** (BM1+BM2)
- **Add Stripe card flow** (shared component)

These are tracked in `snapshot.json`'s `knownGaps` array with their Asana subtask gid, and are never treated as errors or findings.

## Errors

None. All 20 `get_metadata` calls against linked flows succeeded.

## Standing reminder (manual check, every run)

Detecting an entirely new Figma **file** not yet listed in `FIGMA_LINKS.md` isn't automatable with the Figma MCP tools available in this session — there's no tool that enumerates a project's file list. Periodically browse the Homerun Product Figma project folder by hand and compare against `FIGMA_LINKS.md`:

https://www.figma.com/files/1422521281944706177/folder/83214443
