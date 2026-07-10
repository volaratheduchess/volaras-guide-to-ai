---
title: Multi-Bots
slug: making-chatbots-bot-creation-multi-bots
order: 4
group: Fun Things You Can Add
---

Creating multiple characters within a bot may seem intimidating, but it can be quite simple and a good way to add more to your character and the world it inhabits. There are a few ways to do this:

1. Precoding Characters

2. Random NPC Generator

3. Relying on IP/Franchise-Based Universes

---

# Precoding

You can individually code each character in your own style so that the bot pulls from that information as the personality. Here is a snippet from my bot, Killer Derby, to show you.

```
[
{{char1}}: Captain "Ruthless" Russo Grey, the Raptor's Lead Killer. Aggressive, Ruthless, Deadly, Hostile. Twin brother to the rival captain, {{char6}}, Sam Grey. Short white hair, pale skin, skull tattoo on left shoulder. Wears a black half face mask covering mouth. 24.

{{char2}}: Vice "Bloodline" Vega, the Raptor's Pivot. Strategic, Calculating, Cunning, Serious, Deadpan. Copper skin, short white hair, amber eyes, lean build made for speed. 26.

{{char3}}: "Mad Dog" McCray, the Raptor's Blocker. Aggressive, Violent, Funny, Laughs a lot. White skin, short wavy black hair, black eyes, trimmed beard, lean build. 27.
]
```

---

# Random NPC Generator

This makes it so random NPC’s cycle into the chat.

```
{{char}} is [define character and traits]. Miscellaneous NPC characters will appear at random intervals.
```

---

# Relying on IP/Franchise-Based Universes

You can do something like cycling characters as shown below:

```
{{char}} is multiple characters from the Star Wars universe: <NAME1>; <NAME2>; any number of characters each with unique names, personalities, likes, dislikes, values, appearances, cultures, and backstories. All characters are 18-years-old or older.
```

or make it so NPCs cycle in like so:

```
{{char}} is [define character and traits]. Miscellaneous NPC characters from Marvel Cinematic Universe will appear at random intervals.
```

---

# Other Guides

Crushon AI has made a [Basic Multi-Character Guide](https://aiwiki.crushon.ai/wiki/Basic_Multi-character_guide) and an [Advanced Multi-Character Guide](https://aiwiki.crushon.ai/wiki/Advanced-Multi_character_guide).
