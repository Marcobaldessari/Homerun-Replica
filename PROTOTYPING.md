# What this repo is

This is the **consumer** app — `Homerun-Replica-Consumer` — a living foundation for testing feature ideas as working, tappable code instead of static Figma screens. It mirrors the flows already designed in the team's Figma files — the base state here should always trace back to an actual Figma flow, not an invented one — and it's meant to keep growing as new prototypes get built on top of it, rather than being thrown away after each one.

There's a sibling repo, `Homerun-Replica-Pro`, for the professional/service-provider side of the product (dashboard, leads, quotes, chat) — a separate app, not a screen inside this one. Don't build Pro-side flows here; point at that repo instead.

# How a new prototype should get built here

1. **Read the Figma flow first.** Look up the flow's file in `FIGMA_LINKS.md`, then use the Athena `flow-mapping` skill against it (the frames-and-arrows diagram, including any decision diamonds) to get a structured Mermaid flowchart + From/Condition/To logic table. Build from that structured read, not from a guess at what the arrows mean or a screenshot alone. If the row's URL is still blank, ask for it rather than guessing which file it is.
2. **Match what's already here.** Read `src/components` directly (start from `App.tsx` → `NavigationApp.tsx` for routing) before adding new screens or components — extend or recombine what's already in the app rather than introducing a parallel pattern for something that's already solved here. There is no separate screen/component registry doc: `SCREEN_DOCUMENTATION.md` and `ai/schemas/components.md` were removed because both were written once and never updated as the app grew, so they drifted stale and became actively misleading rather than useful — the code is the only source of truth now.
3. **Keep the diff scoped to the flow being tested.** This repo is a prototyping sandbox, not a production app — build the smallest version that makes the flow real and tappable, and say plainly what's out of scope rather than quietly polishing unrelated corners.

If you're driving this from outside the repo (e.g. from an Athena session elsewhere), the Athena `prototype` skill handles finding/cloning this repo and branching per feature — see that skill for the checkout and branch conventions. `robot.md` still governs tone, guardrails, and the rest of the AI context for anyone working directly in this repo.

# Open work: BM1 consumer flow coverage

The Homerun Product Figma project (consumer + pro files) was audited against this repo's actual code to see which BM1 consumer flows are built vs. still missing. Full backlog, status, and evidence live as subtasks on the Asana card: https://app.asana.com/1/30127310007086/task/1217791116437550

Built: request creation, dashboard/home, chat, write a review, settings entry point, settings > my profile, settings > change password.

Partial (screen/entry point exists but the core action is a no-op): phone verification, authentication (only inline steps in the request funnel, no standalone login/session), password creation.

Not yet started: pro pages (viewing a pro's profile), authentication checks (no app-wide signed-in gate), rate the app, download app banner, settings > data & privacy, settings > others (suggest a friend / support / contact us), notification page, register as pro, and the Stripe/payment flow (existing `CheckoutPage`/`CreditCardForm`/`PaymentInfoCard` are orphaned pre-Figma-rebuild code, not wired to anything).

Check the Asana card before starting new work in these areas — it has the up-to-date status per flow.

# Keeping FIGMA_LINKS.md honest

A monthly automated routine re-reads every flow linked in `FIGMA_LINKS.md` and flags when Figma has gained a screen this repo doesn't know about yet — see `figma-flows/README.md` for how it works and where its output lands.
