# Migration: ai-positioning-quiz to dx-components

Move this project from the personal repo into `MISC_Projects/ai-positioning-quiz/` inside [ucsdlib/dx-components](https://github.com/ucsdlib/dx-components).

The target folder is currently empty (just a README). No monorepo or shared config to worry about -- the project drops in as a self-contained subfolder, same as other projects in that repo.

---

## 1. Clone dx-components and create a branch

```bash
git clone https://github.com/ucsdlib/dx-components.git
cd dx-components
git checkout -b add-ai-positioning-quiz
```

---

## 2. Copy project files

From the root of this repo (`ai-positioning-quiz/`), copy everything into the new location -- excluding generated and local-only files:

```bash
rsync -av --exclude='node_modules' \
          --exclude='dist' \
          --exclude='.git' \
          --exclude='.history' \
          ../ai-positioning-quiz/ \
          MISC_Projects/ai-positioning-quiz/
```

Or manually copy these files and folders:

```
src/
public/
.claude/
index.html
package.json
package-lock.json
vite.config.js
jsconfig.json
components.json
tailwind.config.js        (if present)
.gitignore
CLAUDE.md
DESIGN.md
MIGRATE.md
UCSD_DX_AI_Quiz_PRD.md
handoff.json
```

Do **not** copy: `node_modules/`, `dist/`, `.git/`, `.history/`

---

## 3. Install dependencies and verify the build

```bash
cd MISC_Projects/ai-positioning-quiz
npm install
npm run build
```

Build output should land in `dist/` with no errors.

---

## 4. Commit and push

```bash
cd ../..   # back to dx-components root
git add MISC_Projects/ai-positioning-quiz
git commit -m "Add AI positioning quiz to MISC_Projects"
git push origin add-ai-positioning-quiz
```

Open a PR into `main` on ucsdlib/dx-components, or push directly to main if you have access.

---

## 5. Update Vercel

The existing Vercel project is connected to the personal repo. Reconnect it to the new location:

1. Go to the Vercel project dashboard
2. **Settings > Git** -- disconnect the current repo
3. Connect to `ucsdlib/dx-components`
4. Set **Root Directory** to `MISC_Projects/ai-positioning-quiz`
5. Confirm build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
6. Trigger a manual redeploy and confirm it works

The production URL will stay the same -- only the source repo changes.

---

## 6. Archive the personal repo

Once Vercel is redeployed and confirmed working:

1. Go to the personal `ai-positioning-quiz` repo on GitHub
2. **Settings > Danger Zone > Archive this repository**

Archiving preserves the history and URL as read-only without deleting anything.
