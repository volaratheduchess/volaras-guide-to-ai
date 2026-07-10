---
title: Bot Creation — Overview
slug: making-chatbots-bot-creation
order: 0
group: Bot Creation
---

Remember, any advice given here is simply that: advice. They’re things I have learned that work for me and work for others. They’re meant to teach and guide, not dictate. Use your creative juices and make your bots your own!

# Building a Bot, Step by Step

There are many bot sites out there, but they all have similar setups at the core. But before I begin in earnest, I want to make one thing known:

> {{user}} is a standard notation that allows the AI to customize the words to the username or profile card based on who is using it. The same thing applies when you write “{{char}}”. It will automatically insert the character’s name.

## **Name**

I think this is pretty self explanatory, but I’ll go over it anyway. This is where you name your character. You can also put other things in, for example their job or race (ex. Joshua the Centaur.) If you’re worried about it affecting the chat, don’t. I’ll talk more on that later in the Personality section, but for now just know that there is some flexibility.

---

## **Introduction**

This **does not** affect your bot in any way. It’s just a little description that allows people to know a bit about your character. This is helpful for discovering bots and knowing a bit about the interaction expected, especially if the character’s definition is private. Think of it as an “About Me” section. **This is what grabs {{user}}’s attention, so make it interesting!**Some sites

---

## **Greeting**

The greeting is the first time users interact with the bot, so it’s sets up the whole future conversation.

- **DO NOT WRITE FROM {{user}}’s PERSPECTIVE!** Seriously. Don’t. Most people steer away from bots that speak for them because it takes away the freedom of their choice. Writing from {{user}}’s perspective or even dictating their actions or words will make the bot more likely to speak for them. So, try not to write for {{user}}. There are, of course, creative liberties allowed so don’t let this hinder them but be aware that it may affect the chat.

- The way the greeting is written is important and will affect the rest of the bot. If there are lots of typos, the bot is more likely to make spelling errors. Conversely, if you write {{char}}’s speech with a country accent, it will speak in a country accent throughout the interaction. If you want a specific format, such as *actions inside asterisks to make them italics* (\* action \* without the space) then you must do that here in the greeting.

### **Greeting Example**

> Yuzu knocks on the door, leaning against the frame with a confident smirk. As the door opens, she takes in the sight of {{user}}, who is visibly surprised to see her. Well, well, look who finally showed up, She purrs, her tail flicking lazily behind her. My place is a disaster right now, thanks to those noisy renovations. So I figured, why not grace you with my presence for a while?

---

## **Personality**

This is a **very** big topic, so I’m going to break it down. There are a lot of different ways to write personalities. Tons. I will go over a basic and flexible approach here and will give some more suggestions in the page below.

- Keep in mind that the personality section isn’t *just* for personality. This is where all the information that you want your bot to remember goes. Personality, appearance, speech, background, world building, habits, quirks, and more all go here. Keep in mind that you don’t need to include all of this information. It’s just helpful in fleshing out your character.

- **How you write the personality matters!** Writing in the correct perspective here solidifies that the bot is supposed to talk only for itself. It is recommended that you write in third person. It makes the role clear to the bot and keeps it easy to understand.

> Example of wrong perspective: {{char}} is my best friend.  
> Example of good perspective: {{char}}'s best friend is {{user}}.

- **Never write about {{user}}’s thoughts, feelings, or actions.** I try to not mention {{user}} at all, unless it’s an established relationship or {{char}} is remembering something {{user}} did in the past. Adding people, whether is {{user}} or other {{char}}s can confuse the bot. Try to focus solely on the {{char}} unless it has intention, like if you are referring to a relationship or some event or another character is necessary.

- **Word choice matters.** Certain words are stronger than others, for example ALWAYS and NEVER. Positive prompts are generally stronger than negative prompts. Vague terms like ''usually, could, might, sometimes'' are not recommended, as AI doesn't know how often ''Sometimes'' is, and as such, the action tied to it might never happen. Ensure that you use the correct wording if you want to get the desired result. Furthermore, the way you describe the character's appearance matters as well. If you write it poetically, it will be reflected in bots’ responses. If the appearance is written in a bland way, bot will follow suit.

- **Don’t assume {{user}}’s gender!** Even if your bot isn’t written to be sexually flexible, {{user}}’s have the ability to interact regardless of that. Try to use gender neutral terms such as “they”, “them”, “you” and especially “{{user}}” to allow anyone to interact. Even if you make a strictly heterosexual or homosexual bot, using neutral terms allows for more people to engage with your creation.

- **Keep things organized.** Following a logical order helps the bot keep things clear and understandable. Try not to mix scenario with personality, appearance with background, and so on. That’s where templates like this come in handy

```
Name:

Age:

Appearance:

Background:

Personality Traits:

Interaction Style:

Scenario:
```

You can add various other sections there. Such as relationships, occupation, behavior, actions, likes & dislikes and many, many more. More sections can help make your bot more interesting and detailed, though be careful not to overload the bot with too much information. Whatever is written in this section counts towards your bot’s permanent memory token count.

---

## **Scenario and Example Messages**

Some creators prefer to leave these sections blank because it takes up your token count. What the Scenario actually is, however, is the rock upon which all the rules of the world are written. Yes, it is exactly as dramatic as that sounds.  
  
If you define *“Frogs have prehensile tails and live in space,*” the AI will always return to that unless you drag it in a different direction. (Imagine a horse drawn carriage in an Old Western flick riding toward a cliff and you have to pull the reins ridiculously hard in a different direction.) Use the scenario for the fundamental, unchanging truths of the world. Using scenario to your benefit can elevate the bot experience.

```
Time Period:
Genre:
Content Rating:
Narrative Tone:
```

---

# **Tokens**

You may see people putting tags about their token count. **Tokens are not the same as character count.** Tokens refer to bots’ memory. A bot can only hold so much information before it begins to forget things, so making sure your tokens are reasonable helps. Once tokens exceed bots’ memory, the bot will forget something from the conversation in order to save the new information. *This is why a bot forgets old information in conversations.*

- **Permanent Memory** permanently locks certain number of tokens. Personality, scenario and example messages are all saved in permanent memory. This means that bot will never forget this information. Unused memory will be used during chat, and that’s called temporary memory.

- **Temporary Memory:** This is the memory that bot will eventually forget, as the name suggests. Bots’ responses, your responses, as well as greeting are all temporary memory.

- **For Crushon AI:** The various chat models available have different token memory counts. The memory of the 8k model is 8000, and memory of the 16k model is 16000 tokens.** What this means is, that the higher your token count, the greater the number of tokens you are taking away from the chat memory. The reverse applies as well: the smaller the bot’s token count, the greater the memory in conversation.

- **The more tokens your character has, the worse it will perform.** It won't do what you want it to do as much or will forget information. There are a variety of recommendations. Crushon AI says a character typically has **500-1000** tokens. I have heard people recommend staying under **1500** and others recommend staying under **3000**, so the range can vary. Remember, the personality, scenario, and example messages all contribute to token count. **The greeting is temporary memory, so it does not count towards tokens.**

> To check how many tokens your character has, copy the entire personality, scenario and example messages into this site: [Token Counter](https://platform.openai.com/tokenizer).

---

# Other Guides

Crushon AI has made a [Basic Single Character Guide](https://aiwiki.crushon.ai/wiki/Basic_Single_character_guide) and an [Advanced Single Character Guide](https://aiwiki.crushon.ai/wiki/Advanced_Single_character_guide).
