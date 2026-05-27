# Migration: ai-positioning-quiz to dx-components

✅ **Migration complete** — May 2026

---

## What was done

1. Cloned `ucsdlib/dx-components` and created branch `ashton-ai-positioning-quiz`
2. Copied all project files into `MISC_Projects/ai-positioning-quiz/` (excluding `node_modules/`, `dist/`, `.git/`, `.history/`)
3. Ran `npm install` and `npm run build` — build passed with no errors
4. Committed and pushed to `origin/ashton-ai-positioning-quiz`
5. Deployed to Vercel via CLI (`vercel --prod`) — no GitHub integration needed

## Current state

- **Source:** `ucsdlib/dx-components`, branch `ashton-ai-positioning-quiz`
- **Live URL:** https://ai-positioning-quiz.vercel.app
- **Deploys:** Manual — run `vercel --prod` from `MISC_Projects/ai-positioning-quiz/` to push updates
- **Personal repo:** Can be archived when ready

## To redeploy

```bash
cd MISC_Projects/ai-positioning-quiz
vercel --prod
```
