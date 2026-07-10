---
title: Advanced Prompting
slug: ai-art-resources-image-prompting-advanced-prompting
order: 5
group: Image Prompting
---

Here we’re going to talk about a more complicated method: Weighted Prompting. It’s a more advanced technique and can be complicated but helps tailor the results to your imagination.

---

# Weights

You might be wondering what all the funky numbers people put in prompts are. Simply put, they are weights telling the model “Hey! Pay more attention to me! I’m important!” But there’s a lot more to it than that.

> Weights are a way to say what you want more or less of in an image.

Before we dive in, weights are **mostly, but not entirely universal.** Weights are most common in **Stable Diffusion, but can be used most places except Flux models (which also don’t do negative prompts) and specific sites, like** **Midjourney/Niji****.**

Let’s use the example `(``1girl``:``1.5``)`. `1girl` is what we call a **term**, or what you want to increase or decrease in an image. `1.5` is the **factor**, a scale to control how much or little the change will be. Put together, it looks like `(``term``:``factor``)`.

So let’s review:

> T**erm****:** Term is what you want to put more emphasis on in your prompt. You aren’t limited to just one, but we’ll get to that.  
>   
> F**actor****:** Factor controls how much focus you’re putting on the term. It actually can scale between `0.01-100` but this type weights create deformity in your images. Universal recommended scale for weighting is `0.5-1.5`. **Keep your weights between this scale.** However, some models can handle up to `2` weights. The reason you want to keep your weights small is, so it doesn’t overload the model and break the prompt.

### What Does Weight Scale Mean?

Weights are how much attention you put on AI for that specific term at each step. They are absolute, this means increasing the value of one term will not reduce weights of other terms.  
**Note:** `1girl, brunette, garden` is not same with `(1girl:1.5), (brunette:1.5), (garden:1.5)`, they have different work weight and outputs will be different than each other.

Scale is based on percentage system, which is mean `1 = %100, 1.5 = %150`. This is why you can't go with values higher than `1.5`. AI can't handle this type of work weight for one term, because of their training.

## Different Types of Weighting

There are a few different ways to weight your prompts, but it depends on personal style.

Factor Weights

`(``term``:``factor``)`

`factor` can scale between `0.5-1.5` and this type can be used for both reducing and increasing weights. `[]` does not work with this system. Use only `()`, if you are going to specify value.  
`1girl``,` `(``long hair``:``1.2``)``,` `(``blue eyes``:``0.7``)`

Parentheses

`(``term``)`

Each `()` increases value of term by x1.1  
(term) = (term:1.1)  
((term)) = (term:1.21)  
(((term))) = (term:1.331)  
etc.

Brackets

`[``term``]`

Each `[]` reduces value of term by x1.1  
[term] = (term:0.9)  
[[term]] = (term:0.82)  
[[[term]]] = (term:0.75)  
etc.

---

# Weights in Prompting Using Different Models

When it comes to more advanced prompting, establishing logical categories and organizing the prompt matters. The order can even change depending on the base model you are using. This is especially true for sites such as ![](assets/ai-art-resources-image-prompting-advanced-prompting-31.webp)SeaArt, where there are many different options for models and advanced techniques.

Not all models use the same weights either, as you will see below.

Prompting General Stable Diffusion Models

The order for prompting generally goes like this:

1. View/Shot/Angle/Point of View

2. Subject (with details)

3. Style References (includes artist references)

4. Additional details (background, environment etc.)

5. Main Color Themes

6. Lighting/Shadow

7. Quality Terms `masterpiece, (best image:1.5)` etc.

- You don't have to use every category in your prompt.

- Categorize every term in your prompt. For example, "subject, facial details, body details, dress details" etc.

> **Wrong:** 1girl, ginger, blue eyes, smiling, red dress, wavy hair, thin  
> **Correct:** 1girl, smiling, blue eyes, ginger, wavy hair, thin, red dress  
> This will reduce wrong generations most of time.

Prompting Pony Models

Pony has a very specific way of prompting that is **exclusive to Pony models**. If you see a prompt prefix like `score_9, score_8_up, score_7_up` etc. they are score tags associated with the quality of images used in the training data for the model. A bigger number means better image quality and ends up yielding better and more stable results.  
  
Typically, one puts `score_6_up, score_5_up, score_4_up` in the negative tags, to boost higher quality by eliminating the lower quality images.

- `score_9`: Top 10% (highest quality)

- `score_8_up`: Top 20%

- `score_7_up`: Top 30%

- `score_6_up`: Top 40%

- `score_5_up`: Top 50%

- `score_4_up`: Top 60%

After putting the score tags, describe your prompt as normal.  
  
If you’re interested in learning more, visit <https://civitai.com/articles/4248/what-is-score9-and-how-to-use-it-in-pony-diffusion> to read about scores, what they are, and why they are important.

Prompting Illustrious Models

Before we start, it is important to know that Illustrious models are trained on [danbooru tags](https://danbooru.donmai.us/tags). Use them for the best results when prompting.  
  
Illustrious also has a specific prompting order. Remember, not all of these are required. Only fill out what you need.

```
1. Person

2. Character name
		Optional but helpful if you are trying to make a specific character -->

3. Ratings
		general = SFW
		questionable/borderline = SFW/NSFW mix
		explicit = NSFW

4. Artist

5. General tags
		Core prompt content

6. Score Tags
		masterpiece = 100%
		good quality = roughly 90%
		average quality = roughly 60%
		bad quality = roughly 20%
		worst quality = roughly 10%
```

Notes:

- Lowercase letters work better overall

- Mix of structured and natural language works best

- Good for IP characters (if looking for a specific character, check danbooru tags).

- Does NOT support numeric weights. Use parentheses only.

DALL·E Models

DALL·E Models do not support weights of any kind. Importance is determined by the prompting.

Prompting Midjourney Weights

Midjourney cannot handle the weights covered above (Factor Weights, parentheses, brackets). Instead, it has `--stylize`, `--chaos`, and `--weirdness` for **whole prompt parts**, not individual words. This means it is most effective to be selective in word choice to not overwhelm the model.

There are also other guides out there for prompting, such as <https://civitai.com/articles/1009/prompt-guidance-tags-to-avoid-and-useful-tags-to-include> and <https://civitai.com/articles/3160/prompt-notebook>, which you can use to learn from.  
  
I really recommend these guides because they are more in depth and have more experiences and perspectives and techniques.

> If you’re mixing LoRAs (ex. Pony and Illustrious trained LoRAs) be careful how you prompt! Don’t use the Pony method of prompting because Illustrious won’t understand it. Your best bet is to stick with [danbooru tags](https://danbooru.donmai.us/tags) and quality tags.

---

# Conclusion

- Weights are *not* universal.

- Prompting order is not universal.

- Weights are a way to say what you want more or less of in an image.

---

Back to previous section: Negative Prompting
