# GitHub Action Troubleshooting: Why Isn't It Running?

## Common Reasons & How to Fix

### ✅ Checklist

Go through each item to identify the issue:

#### 1. **Has the workflow file been pushed to GitHub?**

The workflow file must exist in the remote repository at `.github/workflows/push-to-notion.yml`.

**Check:**
```bash
git status
# Make sure there are no uncommitted changes to the workflow file

git log --oneline -1 .github/workflows/push-to-notion.yml
# Verify it's been committed

git push origin master
# Push if needed
```

**Fix:** Commit and push the workflow file:
```bash
git add .github/workflows/push-to-notion.yml
git commit -m "Add Notion sync workflow"
git push origin master
```

#### 2. **Are you on the correct branch?**

The workflow is configured to run on pushes to `master` branch.

**Check:**
```bash
git branch --show-current
# Should show: master
```

**Fix:** Switch to master branch:
```bash
git checkout master
```

#### 3. **Did you push a markdown file change?**

The workflow only triggers when `.md` files are modified.

**Check your last commit:**
```bash
git show --name-only HEAD
# Should show changed .md files
```

**Fix:** Make a change to a markdown file and push:
```bash
echo "" >> business_plan.md
git add business_plan.md
git commit -m "Trigger workflow"
git push origin master
```

#### 4. **Are GitHub Actions enabled for your repository?**

**Check:**
1. Go to your repository on GitHub
2. Click the **"Actions"** tab
3. If you see a message about Actions being disabled, click "Enable"

**Note:** Private repositories need Actions enabled in Settings.

#### 5. **Are the required secrets set?**

The workflow needs two secrets:
- `NOTION_TOKEN`
- `NOTION_PARENT_PAGE`

**Check:**
1. Go to: **Repo → Settings → Secrets and variables → Actions**
2. Verify both secrets exist
3. Secret names must EXACTLY match (case-sensitive)

**Fix:** Add missing secrets in GitHub Settings.

#### 6. **Is the workflow file syntax correct?**

YAML syntax errors will prevent the workflow from running.

**Check:**
1. Go to GitHub → Actions tab
2. Look for any parsing errors

**Validate locally:**
```bash
# View the workflow file
cat .github/workflows/push-to-notion.yml
```

The file should have:
- Correct indentation (spaces, not tabs)
- Valid YAML syntax
- Matching branch name (`master`)

#### 7. **Did you recently create the repository?**

Sometimes it takes a few minutes for GitHub to recognize new workflow files.

**Fix:** Wait 2-3 minutes and try pushing again.

#### 8. **Check the Actions tab in GitHub**

Even if a workflow doesn't run, it should appear in the Actions tab.

**Steps:**
1. Go to your GitHub repository
2. Click **"Actions"** tab
3. Look for:
   - **Any workflow runs** (successful or failed)
   - **Workflow file** in the left sidebar
   - **Error messages** or warnings

#### 9. **Is the workflow file in the right location?**

Path must be exactly: `.github/workflows/push-to-notion.yml`

**Check:**
```bash
ls -la .github/workflows/
# Should show: push-to-notion.yml
```

**Common mistakes:**
- ❌ `github/workflows/` (missing dot)
- ❌ `.github/workflow/` (missing 's')
- ❌ Wrong file extension (`.yaml` vs `.yml`)

Our file uses `.yml` which is correct.

#### 10. **Did you exclude the workflow file in .gitignore?**

**Check:**
```bash
git check-ignore .github/workflows/push-to-notion.yml
# Should return nothing
```

**Fix:** If it returns the path, remove it from `.gitignore`

---

## Quick Diagnostic Commands

Run these in order:

```bash
# 1. Check current branch
git branch --show-current

# 2. Check if workflow file exists and is committed
git ls-files .github/workflows/push-to-notion.yml

# 3. Check if it's been pushed
git log origin/master --oneline -1 .github/workflows/push-to-notion.yml

# 4. Check what files changed in last commit
git show --name-only HEAD

# 5. Push everything
git push origin master
```

---

## Manual Test Run

If you want to test immediately:

1. **Make a small change to a markdown file:**
   ```bash
   echo "" >> business_plan.md
   ```

2. **Commit and push:**
   ```bash
   git add business_plan.md
   git commit -m "Test: Trigger Notion sync"
   git push origin master
   ```

3. **Watch the Actions tab:**
   - Go to GitHub → Actions
   - Should see a new workflow run appear
   - Click on it to see logs

---

## Expected Workflow Behavior

When working correctly, you should see:

1. **In GitHub Actions tab:**
   - Workflow run appears immediately after push
   - Job name: "Sync Markdown to Notion Subpages"
   - Steps run in order:
     1. Checkout
     2. Setup Node.js
     3. Install Dependencies
     4. Sync to Notion

2. **In Notion:**
   - Child pages appear under parent page
   - One page per markdown file

---

## Still Not Working?

### Check the workflow file content:

```yaml
name: Push Markdown to Notion (Auto Subpages)

on:
  push:
    branches:
      - master  # ← Must match your branch name
    paths:
      - '**.md'
      - '!NOTION_SYNC_*.md'
      - '!EXAMPLE_*.md'
```

### Most likely issues:

1. **Not pushed to GitHub** ← Most common
2. **Wrong branch** (you're on `main` but workflow expects `master`)
3. **Secrets not set**
4. **No markdown files changed in the commit**

---

## Getting Help

If still stuck, check:

1. **GitHub Actions tab** for error messages
2. **Workflow run logs** for detailed error info
3. **Repository settings** for Actions permissions

Let me know what you find and I can help debug further!
