# DayFlow V2.0 Roadmap

## P0 — Engineering foundation
- [x] Create repository structure and mobile-first React application shell.
- [x] Define PostgreSQL tables and repeatable base migration.
- [x] Implement task CRUD, validation, health check and batch synchronization API.
- [x] Add configurable OpenAI-compatible server-side model adapter; return an explicit unavailable response without credentials.
- [ ] Authentication, account recovery, authorization and per-user data isolation.
- [ ] Execute CI against a real Node 20 environment and verify production build/database migration.

## P1 — Core daily workspace
- [x] Initial four-tab shell: Plan, News, Tasks, Summary.
- [x] Task creation, completion, deletion, search and priority.
- [ ] Calendar/day/week planning and recurring task rules.
- [ ] Subtasks, reminders and notification preferences.
- [ ] News channels, feed ingestion, source attribution and real AI summaries.
- [ ] Daily, weekly and monthly reflection persistence.

## P2 — AI and long-horizon planning
- [ ] AI task proposal cards with explicit item-by-item user confirmation before writes.
- [ ] Long-term goal decomposition, milestones and progress tracking.
- [ ] Speech-to-text capture and task creation review.
- [ ] Configurable AI provider/model management and usage/error observability.

## P3 — Continuity and polish
- [ ] Achievement rules backed by real user activity.
- [ ] Android client using the same authenticated API.
- [ ] Import/export, backup and restore.
- [ ] Accessibility, performance, security review and production deployment.

## Delivery rule
A checked item means implementation exists in the repository, not necessarily that it has passed production testing. See the latest commit notes and CI checks for verification state.
