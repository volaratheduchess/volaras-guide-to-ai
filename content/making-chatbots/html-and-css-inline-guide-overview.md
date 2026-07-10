---
title: HTML and CSS Inline Guide — Overview
slug: making-chatbots-html-and-css-inline-guide
order: 7
group: HTML and CSS Inline Guide
---

To begin, this is my own guide on HTML, which is the fancy displays that some sites offer. Not all bot sites are compatible with HTML.

How to read the chart:
`#` = replace with a number
`CSS` = where inline code goes
`#000000` = HEX Code of your choice
`CAPS LOCK` = replace as applicable

Do not change anything except what is specified, including the quotation marks. Everything is necessary and a typo will break the code.

# HTML Tags

Here are the HTML tags, which create a framework for CSS Inline to add the visual elements. We'll get to those in a bit. These tags should **always be around everything they affect**. If you want a block of text to be italicized, all the text needs to be between the appropriate tag.

| Tag | Use Case | Example |
| --- | --- | --- |
| `<p>` | Paragraphs | `<p style="CSS">TEXT</p>` |
| `<b>` | Bold text | `<b>BOLD</b>` |
| `<i>` | Italics | `<i>ITALICS</i>` |
| `<u>` | Underline | `<u>UNDERLINE</u>` |
| `<small>` | Makes text small | `<small>SMALL TEXT</small>` |
| `<mark>` | Highlight (default yellow) | `<mark>HIGHLIGHT</mark>` |
| `<div>` | Containers for blocks and backgrounds. | `<div style="CSS">ANYTHING INSIDE THE CONTAINER</div>` |
| `<img>` | Embed images or Gifs | `<img src="IMAGE LINK" style="width: #px;">` |
| `<hr>` | Horizontal line break (does not need a closing tag) | `<hr style="CSS">` |
| `<ul><li>` | Unordered list (bullet point) | `<ul><li>ITEM1</li><li>ITEM2</li><li>ITEM3</li></ul>` |
| `<ol><li>` | Ordered list (numbers) | `<ol><li>ITEM1</li><li>ITEM2</li><li>ITEM3</li></ol>` |
| `<span>` | CSS Inline changes to a specific section | `TEXT<span style="CSS">TEXT AFFECTED</span>MORE TEXT OR NOT.` |
| `<details><summary>` | Collapsable content | `<details><summary>CLICK TO REVEAL</summary><p>TEXT</p></details>` |
| `<br>` | Makes a gap, much like hitting enter. | `<br>` |

# CSS Inline

CSS is the style. It adds visual information, and when paired with HTML tags, is a powerful tool. Make sure there is a semicolon (`;`) after every CSS entry. CSS inline properties go inside HTML tags, between the quotation marks (`"`).

| Property | What it does | Example |
| --- | --- | --- |
| `color` | Changes text color using HEX codes | `color: #000000;` |
| `background` | Sets the background color or gradient using HEX codes and by specifying the direction of the gradient (left, right, top, bottom, top left, bottom right, etc. Or angles like 45deg, 180deg, etc.) | `background: #000000;` or `background: linear-gradient(to DIRECTION, #000000, #000000);` |
| `background-image` | Sets an image as the background | `background-image: url('IMAGE LINK');` |
| `font-family` | Changes font style (not all fonts are compatible) | `font-family: Arial;` |
| `font-size` | Resizes text | `font-size: #px;` |
| `font-weight` | Bolds the text | `font-weight: bold;` |
| `text-align` | Aligns text (left/center/right) | `text-align: ALIGNMENT;` |
| `text-shadow` | Adds a shadow to the text | `text-shadow: #px;` |
| `padding` | Adds space inside an element, between the content and its border | `padding: #px;` |
| `margin` | Adds space outside an element, between it and the next element | `margin: #px;` or `margin: 0 auto;` |
| `width` | Controls the width of the box | `width: #px;` |
| `height` | Controls the height of the box | `height: #px;` |
| `max-width` / `max-height` | Sets the maximum size an element can grow to. If the content inside is smaller, it stays smaller. If the content is larger, it **stops growing** at that size — and depending on overflow, it'll either **clip** or **scroll**. | `max-width: #px;` `max-height: #px;` |
| `overflow` | Gives instructions on what to do when content doesn't fit inside its box. | `overflow: visible;` `overflow: hidden;` `overflow: scroll;` `overflow: auto;` |
| `border` | Adds a border. | `border: #px solid #000000;` |
| `box-shadow` | Adds glow or shadow around boxes (see `<div>`) | `box-shadow: 0 0 #px #000000;` |
| `border-radius` | Rounds corners of boxes (see `<div>`) | `border-radius: #px;` |
| `display` | How the element behaves on the page. See more below. | `display: flex;` `display: grid;` |

# Copyable CSS Elements

Remember, these must go inside an HTML tag pair.

## Dropdown

> Collapsable content box

```
<details><summary>Click to reveal</summary>
<p>This content is hidden until you click the summary.</p></details>
```

Explanation

- `<details>` — the container that can be expanded or collapsed.
- `<summary>` — the visible "title" or trigger. Clicking it toggles the content.
- `<p>` — everything else inside. The collapsable content.

## Grid

> Lets you arrange things in rows OR columns.

```
display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;
```

Explanation

- `display: grid;`
- `grid-template-columns: repeat(2, 1fr);` — 2 columns, 1 row
- `gap: 20px;` — spacing between elements

## Flexbox

> Lets you align and space items easily in rows AND columns.

```
display: flex; justify-content: center; align-items: center; gap: 10px;
```

Explanation

- `display: flex;`
- `justify-content: center;` — horizontal alignment
- `align-items: center;` — vertical alignment
- `gap: 10px;` — space between items

## Three Horizontal Boxes

```
<div style="display:flex; justify-content:space-around; align-items:center; background:#222; padding:10px; border-radius:15px;">
<div style="background:#444; color:white; padding:20px; border-radius:10px;">TEXT 1</div>
<div style="background:#555; color:white; padding:20px; border-radius:10px;">TEXT 2</div>
<div style="background:#666; color:white; padding:20px; border-radius:10px;">TEXT 3</div>
</div>
```

## Overflow

> Gives instructions on what to do when content doesn't fit inside its box.

```
overflow: visible;
overflow: hidden;
overflow: scroll;
overflow: auto;
```

Explanation

- `overflow: visible;` — default, shows outside the box
- `overflow: hidden;` — cuts off anything that sticks out
- `overflow: scroll;` — always shows a scrollbar
- `overflow: auto;` — shows a scrollbar only when needed

> If the content goes beyond 200px in height, a scrollbar appears. You can also control each axis — putting one, not both, makes it so only that direction is scrollable.

```
overflow-x: auto;
overflow-y: auto;
```

Explanation

- `overflow-x: scroll;` — horizontal scroll
- `overflow-y: auto;` — scrolls vertically if needed

### Horizontal Image Scroll

```
<div style="display:flex; overflow-x:auto; gap:10px;">
<div style="display:inline-block; width:200px; height:200px; flex-shrink:0;">
<img src="URL GOES HERE" style="width:100%; height:100%; object-fit:cover; border-radius:5px;">
</div>
<div style="display:inline-block; width:200px; height:200px; flex-shrink:0;">
<img src="URL GOES HERE" style="width:100%; height:100%; object-fit:cover; border-radius:5px;">
</div>
</div>
```

## Animation

### Pulse

> Makes the text glow and fade.

```
<p style="animation:pulse 2s infinite; display:inline-block; margin-left:5px;">TEXT</p>
```

### Typing

> Makes it look like the text is typing.

```
<p style="animation:typing 2s infinite; display:inline-block;">TEXT</p>
```

### Spin

> Makes the text rotate.

```
<p style="animation:spin 3s infinite linear; display:inline-block; margin-left:5px;">TEXT</p>
```
