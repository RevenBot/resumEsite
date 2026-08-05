# ResumeSite Agent Notes

A Vite 4 + React 18 portfolio SPA using Three.js, React Three Fiber, PrimeReact, Wouter, and Zustand. Keep guidance concrete and repo-specific.

## Commands

- `npm install` then `npm run dev` to start the Vite dev server.
- `npm run build` produces the `dist` bundle.
- `npm run preview` serves the `dist` bundle locally.
- `npm run lint` runs ESLint on `js` and `jsx` files with max 10 warnings.
- `npm run deploy` runs `predeploy` (build) then `gh-pages -d dist`.

## Build

- Vite builds into `dist` via `vite build`.
- No test script exists; CI does not run tests.
- Vite is configured in `vite.config.js` with only `@vitejs/plugin-react` and `assetsInclude: ["**/*.hdr"]`.

## Lint

- ESLint config is `.eslintrc.cjs` with `root: true`, browser env, and ES2020.
- Extends `eslint:recommended`, `plugin:react/recommended`, `plugin:react/jsx-runtime`, `plugin:react-hooks/recommended`, `plugin:@react-three/recommended`.
- Rules: `react/prop-types` off, `react/no-unknown-property` off, `react-refresh/only-export-components` warns with `allowConstantExport: true`.
- `dist` and `.eslintrc.cjs` are ignored.

## Entrypoints

- `index.html` loads `src/main.jsx` and sets the initial theme at `/themes/lara-dark-purple/theme.css`.
- `src/main.jsx` mounts the app into `#root`, wraps `<App />` with `PrimeReactProvider`, and imports `i18n.js`, `index.css`, primeicons, and primeflex.

## Routing

- Routing is handled in `src/App.jsx` with `wouter` (`Switch` and `Route`).
- `/` renders `HomePage`.
- Dynamic pages come from `src/components/Frames/index.jsx`, each mounted at `/page/${item.relativeUrl}`.
- Static routes: `/test/` and `/test/:id` render `Test`; `/old/` renders `Background`.
- Unmatched routes render `404: No such page!`.

## State

- State lives in Zustand stores under `src/context/<name>/store.js`.
- `src/context/mode/store.js` exports `useStore` using `persist` with key `"mode"`, default `caosMode: true`, and actions `switchMode` and `updateMode`.
- The overlay (`src/components/Overlay/Overlay.jsx`) renders `ThemeSwitcher`, `Terminal`, and `Footer`.

## i18n

- `src/i18n.js` uses `i18next`, `react-i18next`, `i18next-http-backend`, and `i18next-browser-languagedetector`.
- `fallbackLng` is `["en", "it", "es", "dev"]`.
- Translation files are loaded from `public/locales/{en,es,it}/`.
- Page metadata in `src/components/Pages/index.jsx` maps `stringLocalize` values to the same namespace keys.

## Assets

- Vite treats `**/*.hdr` files as assets via `assetsInclude`.
- PrimeReact themes are served from `public/themes/`; the default is `lara-dark-purple/theme.css`.
- `primeicons` and `primeflex` CSS are imported from `node_modules` in `main.jsx`.
- The homepage 3D scene is in `src/components/HomePage/index.jsx`, using `Canvas`, `PresentationControls`, and custom scene components.

## Deploy

- `package.json` declares `homepage: "https://RevenBot.github.io"`.
- Deploy to GitHub Pages with `npm run deploy`, which builds `dist` and pushes it with `gh-pages -d dist`.
- CI in `.github/workflows/main.yml` runs `npm i`, `npm run build`, and `npm run lint` on every push.
- Docker build uses Node 20 to build, then `nginx:alpine` to serve `dist` with `nginx.conf` providing a single-page fallback via `try_files $uri /index.html`.
