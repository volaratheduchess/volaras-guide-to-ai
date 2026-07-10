---
title: Language to Use
slug: making-chatbots-bot-creation-language-to-use
order: 3
group: Bot Creation
---

A greeting has one job most other parts of a bot don't: it has to work with zero context. `{{user}}` hasn't read a backstory, doesn't know the voice yet, and is deciding — often in the first sentence — whether to keep going. This page is a deep dive on the actual language choices that make that first message (and any message meant to grab attention) feel immersive instead of generic.

## Start mid-motion, not mid-description

The single biggest difference between a flat greeting and a gripping one is *when* it starts. Weak greetings tend to open by describing the character in a vacuum. Strong ones drop `{{user}}` into a moment already in progress.

- Weak: *"Kael is a tall, brooding warrior who has fought in many battles. He is standing in a tavern."*
- Stronger: *The blade doesn't leave his hand, even here. Kael's eyes cut to you the second the door groans open — a stranger, unarmed, and stupid enough to walk into this tavern alone.*

Notice the second version never says "brooding" or "warrior" — it demonstrates both through a specific, active moment, and it addresses `{{user}}` directly instead of narrating past them.

## Use concrete sensory detail, not mood words

"Mysterious," "cozy," "intense," "dangerous" — these are labels, not experiences. They tell `{{user}}` what to feel instead of making them feel it. Swap labels for one or two specific, sensory anchors:

| Instead of | Try |
| --- | --- |
| "The room is cozy." | "The fire's the only light, and it smells like woodsmoke and old paper." |
| "He seems dangerous." | "He's counted your exits before you have." |
| "It's a mysterious place." | "Nobody here can tell you how long the lanterns have been burning." |

One well-chosen concrete detail does more work than three abstract adjectives stacked together.

## Address `{{user}}` like they're already there

Second person, present tense, active voice — this is the single easiest lever to pull for immediacy. Compare:

- Distant: *"A woman was sitting at the bar when someone walked in."*
- Immediate: *"You've barely sat down when she slides into the seat next to you like she's been waiting."*

The second version puts `{{user}}` inside the scene instead of reporting on it from outside. If your greeting reads like a summary of what happened, rewrite it as what's happening *to `{{user}}`, right now.*

## Let voice do characterization

Word choice, sentence rhythm, and what a character *notices first* all reveal personality faster than a stated trait ever will. Build a small language toolkit per character:

- **Clipped, guarded characters** — short sentences, trailing off, deflecting with a question instead of an answer.
- **Warm, expressive characters** — longer sentences, more physical detail, direct emotional language ("God, it's good to see you").
- **Sharp, controlled characters** — precise word choice, dry understatement, rarely more words than necessary.
- **Chaotic, high-energy characters** — interruptions, tangents, exclamation-heavy, thoughts arriving faster than sentences can hold them.

Once you've picked a register, stay consistent — voice is what makes a character feel like the same person message to message, not just a personality description being narrated at `{{user}}`.

## Build in a hook, not just a hello

A greeting that ends at "hello, nice to meet you" gives `{{user}}` nothing to respond *to*. Give them something to react to, answer, or push back on:

- **An open question aimed at `{{user}}` specifically** — "You're not from around here. So why did you come?"
- **A small mystery or contradiction** — the character says one thing while clearly doing another.
- **An interruption already in progress** — `{{user}}` walks into a situation that was already happening before they arrived.
- **A direct challenge or dare** — gives `{{user}}` an obvious, low-effort way to respond in kind.

The goal is a greeting that's genuinely hard to just reply "hi" to.

## A worked example

**Before:**
> Hello! I'm Rowan, a 24-year-old bartender. I'm friendly and like to make people laugh. I work at a bar downtown. Nice to meet you!

**After:**
> *You've been staring at the menu for two full minutes.* "It's a menu, not a final exam," Rowan says, already sliding a glass toward you before you've ordered anything. "On the house. Consider it a bribe so you stop looking so lost at my bar."

Same character, same job, same friendliness — but the second version *shows* the humor and warmth through a specific action and a line of dialogue, opens mid-scene, and hands `{{user}}` an easy, natural way to respond.

## Common weak-language patterns to cut

- **Resume language** — listing age, job, and traits like a character sheet instead of demonstrating them in scene.
- **Telling the reaction instead of the trigger** — "he seemed nervous" instead of the actual detail (a repeated glance at the door, a too-quick answer) that would make a reader conclude "nervous" themselves.
- **Passive, reported action** — "the door was opened" instead of "the door swings open."
- **Over-explaining tone** — following a joke with "he said jokingly," or dialogue with a stated emotion that the words already convey.
- **Starting with backstory instead of scene** — save the history for when it's relevant; open on something happening, not something that already happened.

## Quick reference: language by mood

A short bank of openers to adapt, not copy verbatim — the goal is the *pattern*, not the exact words.

- **Tense / dangerous:** "Don't move. Not yet." · "You're being watched, and not for the first time tonight."
- **Warm / inviting:** "There you are — I was starting to think you'd changed your mind." · "Sit, sit. You look like you need this more than I do."
- **Playful / teasing:** "Well, look who decided to show up." · "I had a whole speech planned and you're early. Rude."
- **Mysterious / atmospheric:** "Nobody's supposed to know about this door." · "You weren't on the list. That's either very bad, or very interesting."
- **Urgent / high-stakes:** "We don't have time for introductions." · "Move. Explanations later."
