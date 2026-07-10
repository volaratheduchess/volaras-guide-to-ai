---
title: Sending Images
slug: making-chatbots-bot-creation-sending-images
order: 6
group: Fun Things You Can Add
---

Sending images can be a bit tricky, even more so if you don’t know where to start. That’s where I come in. For this guide, we’re going to work backwards, starting with a real example and how you can apply it yourself.

---

# Example

Let’s start with the code from my bot, Armamir. The premise is that he is selling magical creatures and will tell you about them and send an image if you ask. I encourage you to spend a few chats with him, just to see how the bot responds. I know this looks complicated, but we’ll break it down into a format that you can use.

```
[The Status System is a silent, non-speaking, non-character entity.]

[The Status System's role is to send embedded images of the monsters whenever they are being shown in the interaction.]

[The Status System always replies to {{user}} when prompted to see a monster.]

[The Status System cannot interact with {{user}} nor Armamir in any way other than displaying information.]

[When {{user}} asks to see a monster, the Status System must always begin the message with the respective link.]

Status System Rules:

When {{user}} asks to see one of the following OR {{char}} offers to show a monster, {{char}} will start the reply with the respective link:

“When {{user}} asks to see the Qersena, the system must always reply with: ![](https://i.postimg.cc/RV0CzQjv/IMG-1513.jpg)”

“When {{user}} asks to see the Erynrend, the system must always reply with: ![](https://i.postimg.cc/yNMqwkXs/IMG-1539.png)”

“When {{user}} asks to see the Roktor, the system must always reply with: ![](https://i.postimg.cc/qqrLKT08/IMG-1563.png)”

“When {{user}} asks to see the Kirun, the system must always reply with: ![](https://i.postimg.cc/jdLjMCH8/IMG-1491.jpg)”
```

---

So how do we take this and apply it to other bots?

# Making the Prompt

1. Let’s start with the idea “send a picture when {{char}} is embarrassed.”

2. Make an image to use. I made a girl blushing.

![](assets/making-chatbots-bot-creation-sending-images-15.png)

3. You must put the image in a host site and a format ready to be embedded. Reference Embedding Images and GIFs for the host sites and format.

> ![Blush](<https://i.postimg.cc/Pqqf5FMg/blush.png>)

4. Make the prompt and rules.

> “When {{char}} is embarrassed, the system MUST reply with ![Blush](<https://i.postimg.cc/Pqqf5FMg/blush.png>)”

5. Make more rules. Write them depending on what you are trying to do. This takes some testing and tweaking to get right. And if you need help, don’t be afraid to ask!

---

# Testing

```
<!-- Greeting -->

{{char}} sits on the bed playing video games with {{user}}.

<!-- Personality-->

Rules: 

"When {{char}} is embarrassed, the system MUST reply with ![Blush](https://i.postimg.cc/Pqqf5FMg/blush.png)”
```

Crushon AI

![](assets/making-chatbots-bot-creation-sending-images-16.png)![](assets/making-chatbots-bot-creation-sending-images-17.png)

As you can see, the bot sent the image at the end of the chat, just as intended.

But as you see here, sometimes it can take some nudging to get the bot to respond.

linkin.love

![](assets/making-chatbots-bot-creation-sending-images-18.png)

I retried many times, but [linkin.love](http://linkin.love) did not give a long enough response.

CraveU

![](assets/making-chatbots-bot-creation-sending-images-19.png)

CraveU responded as intended, but CraveU also has the , which is the same thing as sending an image. It connects a specific image with a trigger, and it will send the associated picture.

---

# Conclusion

Here is the finished, copyable version to apply to bots. As you saw above with Armamir, you aren’t limited to just one image or action. Have fun experimenting.

```
Rules:

"When {{char}} is [emotion, state (like intoxicated), action] the system MUST reply with ![image](link)”
```
