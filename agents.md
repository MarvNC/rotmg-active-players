# Agents

Refer to @docs/spec.md for the project specification and @docs/design.md ALWAYS when creating components.

## Primary Roles

- **Frontend Agent**: Owns UI composition, responsive behavior, accessibility, and performance.
- **Data Pipeline Agent**: Owns scraping, CSV append logic, and `daily.json` aggregation.
- **Ops Agent**: Owns GitHub Actions, release asset flow, and deployment wiring.
- **QA Agent**: Owns test coverage for data transforms and regression checks on key metrics.

## Operating Rules

- Keep commits scoped and atomic (one intent per commit).
- Favor deterministic scripts and explicit error handling.
- Treat CSV inputs as untrusted; validate every parsed row.
- If one source is down during scraping, continue with the other source.
- Keep frontend runtime fully static: no external runtime API or font fetches.
