# Template Discovery

An interactive React application for browsing and discovering workflow templates. It allows you to:

• Search templates with fuzzy matching  
• Filter by use-case, category, popularity, setup-time and complexity  
• Inspect the full step-by-step recipe for any template in a modal

Built with **Vite + React 19 + TypeScript** and styled with **Tailwind CSS** & **Headless UI**.

---

## Quick-start

1. **Clone & install**

   ```bash
   git clone git@github.com:YOUR_USERNAME/template-discovery.git
   cd template-discovery
   npm install    # or pnpm install / yarn install
   ```

2. **Run the dev server**

   ```bash
   npm run dev
   ```

   Vite will print a local URL (typically <http://localhost:5173>) – open it in the browser to start exploring templates.

---

## Other npm scripts

| Command           | Purpose                                  |
| ----------------- | ---------------------------------------- |
| `npm run build`   | Generate a production build into `dist/` |
| `npm run preview` | Serve the build locally for QA           |
| `npm run lint`    | ESLint + TypeScript checks               |

---

## Project structure

```tree
├── src
│   ├── components   # Presentational & composite React components
│   ├── hooks        # Re-usable hooks (data loading, etc.)
│   ├── data         # JSON dataset with all templates
│   └── index.css    # Tailwind layer directives
├── public           # Files copied verbatim to the build
├── tailwind.config.js
├── vite.config.ts
└── …
```

### Data set

`src/data/templates.large.json` (≈1.7 MB) is loaded client-side. The custom hook `useTemplates` fakes a network request with a one-second delay so that Suspense states can be demonstrated without the need for a real API.

If you prefer to point the UI at a real endpoint, swap out the implementation inside `src/hooks/useTemplates.ts`.

---

## Browser support

Modern evergreen browsers. No effort has been spent on IE11 or other legacy engines.

---

## License

MIT © 2025 Alex Lewis
