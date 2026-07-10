# Editing the guide's content

The site's text now lives in plain Markdown files under `content/`, one file per page.
`data.js` is generated from those files — you never need to touch it directly again.

## One-time setup

You need Node.js installed. Then, from inside the `site` folder:

```
npm install gray-matter marked
```

That installs the two small libraries `build.js` needs. You only do this once.

## Editing an existing page

1. Find its file. Pages are grouped by section:
   - `content/making-chatbots/*.md`
   - `content/ai-art-resources/*.md`

   Filenames match the page title (e.g. `writing-personality.md`).
2. Open it in any text editor. You'll see something like:

   ```
   ---
   title: Writing Personality
   slug: making-chatbots-bot-creation-writing-personality
   order: 2
   group: Bot Creation
   ---

   # METHOD 1: Organization

   It's always good to keep your personality organized...
   ```

   Everything between `---` and `---` is metadata (don't touch `slug` — see below).
   Everything after it is the actual page content, in Markdown:
   - `# Heading` / `## Subheading`
   - `**bold**`, `*italic*`
   - `- list item` for bullet lists
   - blank line between paragraphs
   - `![alt text](assets/filename.png)` for images
3. Save the file.
4. Rebuild: `node build.js` (run this from inside the `site` folder).
5. Open `index.html` in your browser to check it.

## Adding a brand new page

1. Copy an existing `.md` file in the section you want as a starting point.
2. Change the frontmatter:
   - `title` — the page title, shown in the nav and at the top of the page.
   - `slug` — a unique id for the page. Make one up in the same style as the others
     (lowercase, hyphens, no spaces), e.g. `making-chatbots-my-new-topic`. This just needs
     to not collide with any other page's slug.
   - `order` — controls where it sits among its siblings (lower numbers first).
   - `group` — optional. If set, the page is clustered under that label in the menu
     (like "Fun Things You Can Add"). Leave it out entirely for a standalone page.
   - `cover` — optional. A path to an image under `assets/` to show at the top of the page.
3. Write the content in Markdown below the frontmatter.
4. Run `node build.js`.

## Adding a new section (a third top-level category)

1. Make a new folder under `content/`, e.g. `content/my-new-section/`.
2. Add a `_index.md` inside it with `title`, `slug`, and `order` in the frontmatter, and
   a short intro in the body (this becomes the section's own landing page).
3. Add page `.md` files into that same folder, same as above.
4. Run `node build.js`.

## Important: don't change a `slug` on an existing page

Quizzes and each reader's "read" progress are both matched to a page by its `slug`. If you
change the slug of an existing page, its quiz (if it has one) will stop showing up, and
anyone who already marked it as read will lose that checkmark. Renaming the page `title` or
moving it to a different `group` is completely safe — just leave `slug` alone unless you're
adding a brand new page.

## Editing quizzes or the platform directory

- `content/quizzes.json` — one entry per quiz, keyed by the page `slug` it belongs to. Each
  has a `title` and a `questions` array (`q`, `options`, `answer` as a zero-based index into
  `options`, and `explain` shown after answering).
- `content/platforms.json` — the AI art platform directory cards (`title`, `href`, `cover`,
  `type`, `desc`).

Both are regular JSON — edit them directly, then run `node build.js` same as with pages.

## Images

Images already used in the guide live in `assets/`. To add a new one, drop the image file
into `assets/` and reference it from a page as `![alt text](assets/your-file.png)` (or set
it as that page's `cover:` in the frontmatter).

## If `node build.js` errors out

It'll tell you which file and what's wrong — almost always either a missing `title`/`slug`
in a file's frontmatter, or a `_index.md` missing from a section folder. Fix the file it
names and run the command again.
