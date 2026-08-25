# What this repo is

This is a living foundation for testing feature ideas as working, tappable code instead of static Figma screens. It mirrors the flows already designed in the team's Figma files — the base state here should always trace back to an actual Figma flow, not an invented one — and it's meant to keep growing as new prototypes get built on top of it, rather than being thrown away after each one.

# How a new prototype should get built here

1. **Read the Figma flow first.** Before writing any screen or logic for a new feature, use the Athena `flow-mapping` skill against the relevant Figma flow (the frames-and-arrows diagram, including any decision diamonds) to get a structured Mermaid flowchart + From/Condition/To logic table. Build from that structured read, not from a guess at what the arrows mean or a screenshot alone.
2. **Match what's already here.** Check `SCREEN_DOCUMENTATION.md` and `ai/schemas/components.md` for existing screens and components before adding new ones — extend or recombine what's already in the app rather than introducing a parallel pattern for something that's already solved here.
3. **Keep the diff scoped to the flow being tested.** This repo is a prototyping sandbox, not a production app — build the smallest version that makes the flow real and tappable, and say plainly what's out of scope rather than quietly polishing unrelated corners.

If you're driving this from outside the repo (e.g. from an Athena session elsewhere), the Athena `prototype` skill handles finding/cloning this repo and branching per feature — see that skill for the checkout and branch conventions. `robot.md` still governs tone, guardrails, and the rest of the AI context for anyone working directly in this repo.
