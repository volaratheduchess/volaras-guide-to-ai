---
title: Image Prompting — Overview
slug: ai-art-resources-image-prompting
order: 1
group: Image Prompting
---

Before we begin, let’s go over some terminology you may hear. Some of these you won’t see unless you do a more advanced form of prompting.

# Keywords

### **Prompt**

> What it is: The text you give to the AI to tell it what to create.  
> Example: "A futuristic city at night, neon lights, cyberpunk style"  
> Why it matters: Good prompts = better images.

### **Model**

> What it is: The AI brain that generates the images.  
> Example: Stable Diffusion 1.5, SDXL, DreamShaper, Realistic Vision  
> Why it matters: Different models give different styles/results.

### Checkpoint (.ckpt/.safetensors)

> What it is: A saved version of a model — it's the actual file you load.  
> Why it matters: You’ll download these from places like Civitai to try new looks/styles.

### LoRA (Low-Rank Adaptation)

> What it is: A small, lightweight add-on to a model that teaches it a new style or subject.  
> Example: A LoRA that adds “anime eyes” or “Van Gogh painting style”  
> Why it matters: Lets you customize without retraining the full model.

### **Sampler**

> What it is: The method the AI uses to “denoise” and generate the image.  
> Example: Euler a, DPM++ 2M Karras, Heun  
> Why it matters: Different samplers can make images faster, smoother, or more detailed.

### **Steps**

> What it is: How many rounds of refinement the model goes through.  
> Example: 20–30 steps is common.  
> Why it matters: More steps = more detail (to a point), but also slower.

### **CFG (Classifier-Free Guidance) Scale**

> What it is: A number that tells the AI how strongly to follow your prompt.  
> Example: 7.0–12.0 is typical  
> Why it matters: Too low = loose results; too high = rigid/weird results

### **Seed**

> What it is: A number that controls the random starting point.  
> Why it matters: Use the same seed and you’ll get the same image again (good for tweaking).

### **Resolution**

> What it is: The size of the image (in pixels).  
> Example: 512×512, 1024×1024  
> Why it matters: Bigger = more detail, but slower/more resource-hungry.

### **Negative Prompt**

> What it is: Tells the model what to avoid.  
> Example: "blurry, ugly, extra limbs"  
> Why it matters: Helps clean up or improve image quality.

### **Tensor**

Tensor is both an image generation platform, but I am referring to is just a multi-dimensional array of numbers. It’s the language that AI models use to understand and process data. AI models (like Stable Diffusion, GPT, etc.) need to handle tons of numbers—pixels, words, weights, etc. Tensors let them do that efficiently and consistently.

### Stable Diffusion

Stable Diffusion is an AI that turns text into images by starting with random noise and gradually shaping it into art using your prompt as a guide.

---

## Let’s break it down:

1. Start with random noise.

> Imagine a TV screen full of static — just a cloud of random pixels.

2. Remove the noise step by step.

> The model learns how to "de-noise" that random image — slowly shaping it into something meaningful based on your prompt.

3. Text guides the image.

> The AI uses a special text-understanding part (like a brain) to know what you want. It connects words to visual concepts:  
>   
> "fox" → a small orange animal  
> "spacesuit" → something white and bulky  
> "Mars" → red landscape  
>   
> It combines these ideas into a coherent image as it removes the noise.

---

If you didn't get that, it's okay! Another way to think about it is **Tensor** is used by:

> Researchers, programmers, and AI models (like Stable Diffusion!)  
> It's like the *ingredients* the chef uses.

**Stable Diffusion** is used by:

> Artists, developers, hobbyists, and anyone making the art.  
> It's like the *chef*  who makes dishes.

---

# Prompting

There are countless ways to generate images, from prompting to using models and LoRAs to personally training a model. The success of the method you use depends heavily on how you prompt.

Models are trained with different prompting styles, hence why some prompting methods, such as using natural language, structured prompting, weighted prompting, and more, work better with different sites.

I won’t get into which sites work best with what types of prompting. I’ll leave that up to your experimentation and preferences, but I *will* get into what the different types of prompting are and how they change.

I advise you work your way through each section, so you don’t miss any resources. Each section builds upon the former.
