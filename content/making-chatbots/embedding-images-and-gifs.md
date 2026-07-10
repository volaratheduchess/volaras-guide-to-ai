---
title: Embedding Images and GIFs
slug: making-chatbots-bot-creation-embedding-images-and-gifs
order: 3
group: Fun Things You Can Add
---

A lot of people want to know how to embed images inside their greetings and it’s surprisingly simple!

There are a lot more applications than just images in greetings, however I am going to keep it simple as that requires more technical knowledge beyond my abilities.

Here are two formats that are pretty much identical, aside from the interior words. I wasn’t able to understand it until I saw a specific format and explanation, so I figured I might not be alone.

---

```
![Placeholder](Image_Link)
```

```
![imagen](link_here)
```

Now to break this down!

# **The Exclamation Mark!**

I couldn’t tell you what it means or what its purpose is, but *you need it*. I don’t want to share false information, but my **assumption** is that it serves as part of the code that tells your bot that it’s an image that needs to be embedded. That’s how I understand it.

---

# **Placeholder/imagen**

These words in the brackets are known as “alternative text”. “Placeholder” is the name for your image, and text placed there will appear if the image failed to load or has a broken link.  
You technically don’t need to put anything here, but you **must have the brackets**. I suggest leaving the placeholder blank to save on tokens, but it can be useful for testing.  
Putting text inside the brackets allows for screen readers, a tool that reads the text onscreen for those with accessibility difficulties, to describe the image. However, this is only possible with a description inside the brackets. Writing alternative text makes your images more accessible.

---

# **Linking an Image**

You cannot insert the image directly into the code, so you need to upload it to a host site. There are a few places where you can upload your images.

> <https://postimages.org/><https://imgbb.com/>  
> <https://pixhost.to/>

## GIF Hosting

> <https://postimages.org/>  
> [https://gifyu.com/](https://gifyu.com/?random)  
> [https://jumpshare.com/](https://jumpshare.com/file-sharing/gif)

- Image files must be hosted online elsewhere. You can't use an image directly from a device (e.g. computer or phone). Make sure the image host allows the type of content featured within your images (e.g. [pixhost.to](http://pixhost.to/) or [imbb.com](https://imgbb.com/))

- The “Image\_link” ***MUST*** be a direct link to the image and ***MUST*** start with http (e.g. <http://website.com/image.jpg>).

---

# **Formatting Rules**

- The image code, `![Placeholder](Image_Link)`, must be placed on a new line by itself.

- There must be **no spaces** anywhere. The exclamation mark `!`, brackets `[]`, and parentheses `()` must have no spaces between them, like so: `![]()`

- Various image file types are confirmed to work with this (e.g. .jpg, .png, .gif, .webp).

- Animated images (.gif) and transparent images (.png) are supported, though it depends on the image host website.

  ---

# **Troubleshooting**

If the image is displaying as a blue box (or otherwise not showing up), one of the following has occurred:

- The AI has generated a random image link that looks correct but doesn't work.

- The image host has removed the file, resulting in a broken link (this is typically for violating the image host's TOS).

---

You can learn to make a GIF by going to
