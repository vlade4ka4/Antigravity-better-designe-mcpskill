---
name: interface-review
description: Reviews a git branch, pull request, commit range, or uncommitted changes for interface problems introduced or regressed across accessibility, layout, writing, typography, color, and UI. User-invoked workflow: run when invoked via /interface-review or when asked to review a git diff/PR.
---

# Interface Review

Reviews git diffs, PRs, and branch changes for UI regressions and quality issues.

## Workflow
1. **Scope Resolution**: Resolve diff via `git merge-base origin/main HEAD` or uncommitted changes. See `./scope-resolution.md`.
2. **Blast Radius**: Trace up to 2 hops of consuming components for modified tokens or primitives.
3. **Inspect Deleted Lines**: Check `-` lines for removed a11y labels, focus rings, or responsive safeguards. See `./removed-signals.md`.
4. **Classify Findings**: Categorize each finding as `Introduced`, `Regression`, or `Pre-existing`.
5. **Verdict**: Block on any introduced or regression-triggered HIGH issue.
