# MALARIASCOPE

**Spatial Early-Warning and Geospatial Risk Intelligence System for Malaria** — the public AMMM 2026 research prototype accompanying:

> *MALARIASCOPE: Developing and Benchmarking a Climate-Informed Malaria Forecasting and Geospatial Risk Intelligence System for Force Health Protection in Papua, 2010–2026.*

MALARIASCOPE is a frontend-only React/Vite/TypeScript scientific research application. It presents verified aggregate study results, temporal benchmarking, spatial interpretation, transparent missing-data states, a research data explorer, print outputs, and a four-screen oral-presentation mode. It is not a clinical device or operational command system.

## Safety and scientific integrity

- **Research Prototype — Retrospective Geospatial Risk Intelligence — Not for Autonomous Clinical Decision-Making or Operational Deployment.**
- No military locations, troop positions, routes, identities, deployment schedules, mobility data, or classified information are included.
- Missing scientific data are shown as **Data not available** or **Dataset not connected**. The application does not synthesize, interpolate, or silently substitute missing observations.
- The eight-district, 48 district-year balanced forecasting panel is kept separate from the nine-district 2025 spatial assessment. Supiori was excluded from forecasting because its 2024 outcome was unavailable.
- The benchmark communicates the negative result directly: 2025 persistence MAE (10,426) was lower than random-forest MAE (12,690).

## Local setup

Prerequisites: Node.js 22 and npm.

```bash
npm install
npm run dev
```

Quality and production commands:

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm run preview
```

The core application needs no backend, credentials, or environment variables. See `.env.example` for the optional future public-tile setting.

## Architecture

- `src/types/` — strict research schemas.
- `src/lib/` — reusable fetch loaders, runtime validators, CSV parser, and data hooks.
- `src/features/map/` — GIS layers and explicit disconnected-data behavior.
- `src/features/charts/` — accessible, dependency-light scientific charts.
- `src/features/models/` — temporal model benchmarking.
- `src/features/spatial/` — Moran's I and spatial interpretation.
- `src/features/readiness/` — bounded force-health readiness prompts.
- `src/components/` — shell, error boundary, and shared UI.
- `src/pages/` — routed research modules and Presentation Mode.
- `public/data/` — replaceable JSON, CSV, and GeoJSON research assets.

## Research data and provenance

`public/data/research-summary.json` is the canonical connected aggregate dataset. `model-metrics.csv` and `district-results.csv` provide inspectable tabular counterparts. `metadata.json` records provenance and connection state.

The boundary and public-facility GeoJSON files intentionally contain empty feature collections because licensed geometry and verified facilities were not supplied. This is deliberate—not a mock dataset. Before enabling those layers, replace them with legitimate public or authorized GeoJSON and update metadata with source, version, license, acquisition date, and transformation history. Recommended boundary sources must permit public redistribution and require attribution where applicable.

### Replacing or extending data

1. Preserve the existing schema or update `src/types/research.ts` and validators in `src/lib/data.ts` together.
2. Put static research assets in `public/data/`.
3. Record provenance in `public/data/metadata.json`.
4. Never fill gaps with invented values. Keep absent fields empty and display an unavailable state.
5. Add automated assertions for every headline scientific value.
6. For any future mobility data, accept only de-identified, aggregated, authorized data and never publish operational detail.

## Routes

Deep links including `/risk-map`, `/forecasting`, `/model-benchmarking`, `/spatial-analysis`, and `/force-health` are supported by the catch-all rewrite in `vercel.json`. `/presentation` provides four AMMM-focused screens without application navigation.

## Deployment

### Vercel from GitHub

1. Push the repository to GitHub.
2. Import it in Vercel.
3. Keep the detected **Vite** preset, `npm run build`, and `dist` output.
4. Deploy. No environment variables or manual code changes are required.

`vercel.json` routes deep URLs to `index.html`. The GitHub Actions workflow runs install, type checking, linting, and production build on pushes and pull requests.

## Author

**Muhammad Sobri Maulana**  
RSAU Prof. Dr. Abdulrachman Saleh  
[muhammadsobrimaulana31@gmail.com](mailto:muhammadsobrimaulana31@gmail.com)

## License and use

Research prototype. Verify dataset licenses independently before redistribution. Outputs are educational research intelligence and are not clinical or operational recommendations.
