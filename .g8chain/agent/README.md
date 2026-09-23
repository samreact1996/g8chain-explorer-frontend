# G8Chain Explorer Agent Pack

This folder is the handoff package for a coding agent working on the G8Chain explorer redesign.

## Read order


1. `RULES.md`
2. `PROJECT_CONTEXT.md`
3. `ARCHITECTURE.md`
4. `DESIGN_BRIEF.md`
5. `WORKFLOW.md`
6. `INTEGRATION_STATE.md`
7. `ACCEPTANCE_CRITERIA.md`
8. `ENV.local.example`

## How to use

Copy this folder into the project as `agent/`, or provide the files to the coding agent as project context.

Do not replace an existing upstream `AGENTS.md` or other repository-owned instruction file. These files are project-specific handoff instructions; upstream repository rules still apply.

## Immediate agent instruction

The agent should first perform a source audit and create `docs/G8CHAIN-SOURCE-MAP.md`. It should not begin a large UI rewrite before that audit is complete.
