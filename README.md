# Nimbus — Computer-Use Test App

A small, dependency-free web app for testing browser/computer-use agents
(e.g. Google's computer use). No build step, no frameworks — just static
HTML, CSS, and vanilla JavaScript.

## Run it

Any static file server works. From this folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

or with Node:

```bash
npx serve .
```

You can also just open `index.html` directly in a browser — there are no
network calls, so everything works from `file://` too.

## Pages

| Page          | File             | What's there to test                                   |
| ------------- | ---------------- | ------------------------------------------------------ |
| **Home**      | `index.html`     | Hero, nav, feature grid, email-capture form, CTAs      |
| **Store**     | `products.html`  | Product grid, search + category filter, add-to-cart, cart modal, checkout |
| **Dashboard** | `dashboard.html` | 4 switchable tabs, stat cards, bar chart, data table, settings form with toggles |
| **Tasks**     | `tasks.html`     | Add / complete / delete todos, All/Active/Completed filters, live counter |
| **Contact**   | `contact.html`   | Large form: text, email, select, radio, checkbox, textarea, inline validation, success state |

Shared across every page: top navigation with active-link highlighting, a
**dark-mode toggle** (🌙/☀️, persisted), a **cart badge**, mobile hamburger
menu, and **toast notifications**.

## Suggested tasks to give a computer-use agent

- "Go to the Store, search for *AI*, add the AI Assistant to the cart, then open the cart and check out."
- "Open the Dashboard and switch to the Analytics tab, then change the range to *Last 30 days*."
- "On the Tasks page, add a task called *Book flights*, mark *Prepare demo for Friday* as done, then filter to Completed."
- "Fill out the Contact form and send it."
- "Toggle dark mode."
- "Navigate from Home to each page using the top menu."

## Persistence

Cart contents, task list, and the theme choice are stored in `localStorage`,
so they survive reloads. Clear site data to reset.

## Structure

```
index.html  products.html  dashboard.html  tasks.html  contact.html
styles.css   — shared design system (CSS variables + dark theme)
app.js       — shared behaviour (theme, nav, toasts, cart badge, mobile menu)
```
