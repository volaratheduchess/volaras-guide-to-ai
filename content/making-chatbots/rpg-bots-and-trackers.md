---
title: RPG Bots and Trackers
slug: making-chatbots-bot-creation-rpg-bots-and-trackers
order: 5
group: Fun Things You Can Add
---

RPG Multiple Choice bots are easy to make, *if* you know how to do it. All it takes is a bit of coding it into the personality. I highly recommend opening each toggle to read both the responses—paying attention to how they vary—and the notes accompanying them.  
  
Remember, all these can be mixed and matched, tweaked and destroyed, reworked and Frankensteined to suit your needs. Explore! Push boundaries! Test the limits of what you can create.

# Rules

Writing rules in tells your bot what you want it to do, whether that’s move from location to location, fight a new monster in a battle arena, or use a skill against an enemy. These rules are the most important things for the RPG responses. See the different types of rules and RPG scenarios below. These are just a few, but there are as many as your mind can come up with. It’s only a matter of discovering how to make it and testing to ensure it works.

It’s important to note that not all models and not all sites will respond in the same way. Some models mess up the RPG trackers while others are built for it. Even the same base models across different sites will respond differently.

### **Helpful tip:**

> Make sure to put an example of the Multiple-Choice Options at the END of your Greeting. This helps your bot (and the model) repeat this behavior.  
>   
> And as you make have learned in , Scenario is permanent memory for world-level rules, and thus the perfect place for System Rules for trackers. *However*, some sites, such as CrushOn AI, require subscriptions to use the Scenario, so be sure to account for that.

---

# RPG Skills

Here is an example of a DnD style skills RPG, where {{user}} must use skills (that the AI randomly generates) to perform certain predetermined actions.

```
Rules:

[ALWAYS use a line break --- before presenting Multiple Choice options

*Skills:* Athletics; Acrobatics; Sleight of Hand; Stealth; Survival; Animal Handling; Insight; Medicine; Perception; Meditation; Knowledge; Investigation; Persuasion; Intimidation; Deception; Performance

ALWAYS end a response by presenting 2-4 options that require use of different skills after a scene using the following format:
   A) **[Choice (Skill)]**
   B) **[Choice (Skill)]**
   C) **[Choice (Skill)]**
   D) **[Choice (Skill)]**
   
---

A) **[<Action/Reaction_Prompt_for_the_User>. (<Associated_Skill>)]**

B) **[<Action/Reaction_Prompt_for_the_User>. (<Associated_Skill>)]**

C) **[<Action/Reaction_Prompt_for_the_User>. (<Associated_Skill>)]**

D) **[<Action/Reaction_Prompt_for_the_User>. (<Associated_Skill>)]**
]
```

## Real Examples

```
<!-- Greeting -->
{{user}}, you were sucked into a dungeon. You encounter a chimera. What do you do?

---

A) [Escape. (Athletics)]
B) [Fight. (Performance)]
C) [Lie. (Deception)]
D) [Convince. (Persuasion)]]

<!-- Personality-->
Scenario: {{user}} is in a dungeon and faces monsters. {{user}} must uses skills to evade or defeat monsters and make it out of the dungeon.

Rules:
[ALWAYS use a line break --- before presenting Multiple Choice options

Skills: Athletics; Acrobatics; Sleight of Hand; Stealth; Survival; Animal Handling; Insight; Medicine; Perception; Meditation; Knowledge; Investigation; Persuasion; Intimidation; Deception; Performance

ALWAYS end a response by presenting 2-4 options that require use of different skills after a scene using the following format:
A) [Choice (Skill)]   
B) [Choice (Skill)]   
C) [Choice (Skill)]   
D) [Choice (Skill)]
---
A) [Escape. (Athletics)]
B) [Fight. (Performance)]
C) [Lie. (Deception)]
D) [Convince. (Persuasion)]
]
```

CrushOn AI

![](assets/making-chatbots-bot-creation-rpg-bots-and-trackers-2.png)

As you can see, the bot wrote most of my actions and dialogue for me. This is because I simply answered “C.” instead of writing out my scene. Either way works.

linkin.love

![](assets/making-chatbots-bot-creation-rpg-bots-and-trackers-3.png)

This time I wrote more action this time and the bot responded accordingly. I mixed it up a bit and fought, even though I chose A: Run Away. The bot incorporated my action (punching it) in its response while driving the interaction forward by following the rule (A: Run Away).

CraveU

![](assets/making-chatbots-bot-creation-rpg-bots-and-trackers-4.png)

As you can see, the model broke the fourth-wall and made comments directly to the user, breaking character. These are things to be aware of when recommending models and posting to sites. This is why testing is important.

---

# Status Tracker

When a status befalls {{user}}, such as Poisoned, Stunned, or Burning, a status tracker is the perfect thing to use to keep track of how badly affected they are and how long the effect lasts.

```
You are running a Combat Tracker alongside the conversation.  
Maintain the following stats for the user’s character:  

- HP (Health Points) [0–100 by default]  
- Status Effects (active conditions: e.g., Poisoned, Stunned, Burning, Shielded)  

Rules:
[**ALWAYS** update HP after battles, traps, or healing.

If HP drops to 0, mark the character as unconscious (or dead, depending on the system).

Add or remove status effects based on events in the story.

Lower status effects by **[1-7 points] per response.**

Status effects should have clear short descriptions (e.g., "Poisoned: lose 5 HP per turn").

**ALWAYS** use a line break --- before presenting status effect updates.

**ALWAYS** end a response by presenting status effects after a scene using the following format:

---

[Combat Tracker Update]  
HP: -15 (hit by goblin’s spear)  
Status Effect Added: Poisoned (lose 5 HP per turn)  

Current Stats:  
HP: 85/100  
Status Effects: Poisoned

]
```

## Real Examples

```
<!-- Greeting -->

{{user}}, you were sucked into a dungeon. After encountering a chimera, you were poisoned.
---
[Combat Tracker Update]
HP: -15 (hit by goblin’s spear)
Status Effect Added: Poisoned (lose 5 HP per turn)

Current Stats:
HP: 85/100
Status Effects: Poisoned]

<!-- Personality-->

Scenario: {{user}} is in a dungeon and faces monsters. {{user}} must uses skills to evade or defeat monsters and make it out of the dungeon.

You are running a Combat Tracker alongside the conversation. Maintain the following stats for the user’s character:

HP (Health Points) [0–100 by default]  
Status Effects (active conditions: e.g., Poisoned, Stunned, Burning, Shielded)  

Rules:
[**ALWAYS** update HP after battles, traps, or healing.

If HP drops to 0, mark the character as unconscious (or dead, depending on the system).

Add or remove status effects based on events in the story.

Lower status effects by [1-7 points] per response.

Status effects should have clear short descriptions (e.g., "Poisoned: lose 5 HP per turn").

**ALWAYS** use a line break --- before presenting status effect updates.

**ALWAYS** end a response by presenting status effects after a scene using the following format:
---
[Combat Tracker Update]

HP: -15 (hit by goblin’s spear)

Status Effect Added: Poisoned (lose 5 HP per turn)  

Current Stats:

HP: 85/100

Status Effects: Poisoned
]
```

CrushOn AI

![](assets/making-chatbots-bot-creation-rpg-bots-and-trackers-5.png)![](assets/making-chatbots-bot-creation-rpg-bots-and-trackers-6.png)

More advanced trackers, such as this one, depend heavily on a good model. Sometimes it takes some experimenting and toggling between to get a good response, and even then, it may not be perfect. Other times, it takes a few messages plus editing for the format to stick.

linkin.love

![](assets/making-chatbots-bot-creation-rpg-bots-and-trackers-7.png)

And sometimes you get random additions in your responses. In such cases, editing the response to the proper format and data usually works best. Doing this for a few replies typically cements the format.

CraveU

![](assets/making-chatbots-bot-creation-rpg-bots-and-trackers-8.png)

As you can see, the response is good and projects the plot forward. It is detailed and follows the instructions.

---

# Emotion Tracker

```
Rules:

[ Track the level of [emotion] in {{char}}.

**ALWAYS** use a line break --- before presenting status effect updates.

**ALWAYS** end a response by presenting status effects after a scene using the following format:

---

[Emotion: percent]

]
```

## Real Examples

```
<!-- Greeting -->

{{char}} sits on the bed playing video games with {{user}}.
---
[Love: 0%]

<!-- Personality-->

Scenario: {{char}} is {{user}}'s childhood friend.

Rules:

[ Track the level of love in {{char}}.

**ALWAYS** use a line break --- before presenting status effect updates.

**ALWAYS** end a response by presenting status effects after a scene using the following format:

---

[Emotion: percent]

]
```

CrushOn AI

![](assets/making-chatbots-bot-creation-rpg-bots-and-trackers-9.png)

I think this was a pretty good response. The simple, straightforward nature of the tracker makes it easier for the bot to handle.

linkin.love

![](assets/making-chatbots-bot-creation-rpg-bots-and-trackers-10.png)

This is a very natural and human response to such a situation. If you wanted a more natural progression like here, you could code it in.

CraveU

![](assets/making-chatbots-bot-creation-rpg-bots-and-trackers-11.png)

The format is weird and the response is simple, but it does follow the rules of the prompt.

---

# Thought Tracker

```
Rules:

[**ALWAYS** use a line break --- before presenting thought updates.

**ALWAYS** end a response by presenting thoughts after a scene using the following format:

---

Thought's (Char's current thoughts):

]
```

## Real Examples (TBC)

```
<!-- Greeting-->

"{{user}}, you need to do your homework or you won't graduate college!"

---

Thought's: (I am so angry, but I just want them to do well.)

<!-- Personality-->

Rules:

[ALWAYS use a line break --- before presenting thought updates.

ALWAYS end a response by presenting thoughts after a scene using the following format:

---

Thought's (Char's current thoughts):

]
```

CrushOn AI

![](assets/making-chatbots-bot-creation-rpg-bots-and-trackers-12.png)

As before, it responds quite well and stays in the proper format. Simple trackers like this are much more consistent than bulkier ones.

linkin.love

![](assets/making-chatbots-bot-creation-rpg-bots-and-trackers-13.png)

The format got a little messed up, but with some testing and edits, it can be fixed.

CraveU

![](assets/making-chatbots-bot-creation-rpg-bots-and-trackers-14.png)

This one took a wildly different approach, but still adhered to the rules and format.

---

# Other Guides

Crushon AI has made a [Tracker Guide](https://aiwiki.crushon.ai/wiki/Tracker_Guide).
