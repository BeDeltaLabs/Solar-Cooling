# Notion Sync Setup - Option 3: Auto Subpages

This guide explains how to set up automatic Notion subpage creation for your markdown files.

## 🎯 How It Works

1. You create **ONE parent page** in Notion (one-time setup)
2. The GitHub Action **automatically creates child pages** for each markdown file
3. Each markdown file becomes its own Notion page under the parent
4. **No frontmatter required** in your markdown files
5. Pages are automatically updated when you push changes

## 📋 Setup Steps

### Step 1: Create Notion Integration

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click **"+ New integration"**
3. Name it: "Solar Cooling Auto Sync"
4. Select your workspace
5. Set capabilities:
   - ✅ Read content
   - ✅ Update content
   - ✅ Insert content
6. Click **"Submit"**
7. **Copy the Internal Integration Token** (starts with `secret_...`)

### Step 2: Create Parent Page in Notion

1. Open Notion
2. Create a **new page** called "Solar Cooling Documentation"
3. **Share the page with your integration:**
   - Click the **"..."** menu (top right)
   - Click **"Add connections"**
   - Select "Solar Cooling Auto Sync"
4. **Copy the page ID from the URL:**
   - URL format: `https://www.notion.so/workspace/Page-Title-abc123def456`
   - Page ID is the part after the last dash: `abc123def456`
   - Or the full UUID if you see one

### Step 3: Add Secrets to GitHub

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add **TWO** secrets:

   **Secret 1:**
   - Name: `NOTION_TOKEN`
   - Value: Your integration token from Step 1

   **Secret 2:**
   - Name: `NOTION_PARENT_PAGE`
   - Value: Your page ID from Step 2

### Step 4: Test the Setup

1. Commit and push any markdown file change:
   ```bash
   git add .
   git commit -m "Test Notion sync"
   git push
   ```

2. Go to **Actions** tab in GitHub
3. Watch the workflow run
4. Check your Notion parent page - you should see child pages appear!

## 📁 What Gets Synced

The script will sync all markdown files in your repository, **except**:
- Files in `node_modules/`
- Files in `.git/`
- Files starting with `NOTION_SYNC_`
- Files starting with `EXAMPLE_`

**Current files that will be synced:**
- `business_plan.md` → "Business Plan" page
- `implementation_plan.md` → "Implementation Plan" page
- `task.md` → "Task" page
- `reports/energy_power_balance.md` → "Energy Power Balance" page
- `reports/heat_rejection_methods.md` → "Heat Rejection Methods" page
- `reports/thermal_coefficient_review.md` → "Thermal Coefficient Review" page

## 🎨 Customizing Page Titles

By default, page titles are generated from filenames:
- `business_plan.md` → "Business Plan"
- `energy_power_balance.md` → "Energy Power Balance"

To customize a title, add frontmatter to your markdown file:

```yaml
---
title: My Custom Title
---

# Your content here
```

## 🔍 How It Works Under the Hood

1. **Workflow Trigger:** Pushes to `main` that modify `.md` files
2. **Node.js Script:** Runs `.github/scripts/sync-to-notion.js`
3. **Process:**
   - Fetches existing child pages from parent
   - Finds all markdown files in repo
   - For each file:
     - Checks if page exists (by title)
     - If exists: Updates content
     - If new: Creates new child page
   - Converts markdown to Notion blocks using `@tryfabric/martian`

## 🛠️ Troubleshooting

### "NOTION_TOKEN environment variable is required"
- Make sure you added the secret in GitHub Settings → Secrets
- Check spelling: `NOTION_TOKEN` (all caps)

### "NOTION_PARENT_PAGE environment variable is required"
- Make sure you added the parent page ID as a secret
- Check spelling: `NOTION_PARENT_PAGE` (all caps)

### "Error: object not found"
- The integration doesn't have access to the parent page
- Go to the page in Notion and share it with your integration

### "Error: rate limited"
- The script includes 300ms delay between files
- If you have many files, the API might still rate limit
- Re-run the workflow after a few minutes

### Pages not updating
- Check the Actions tab for errors
- Verify the parent page ID is correct
- Make sure the integration has Update permissions

### Duplicate pages appearing
- The script matches pages by title
- If you manually changed a page title in Notion, it will create a new one
- Delete duplicates manually in Notion

## 📊 Viewing Sync Results

After pushing, check the **Actions** tab in GitHub:

1. Click on your latest workflow run
2. Expand the "Sync to Notion" step
3. You'll see output like:

```
🚀 Starting Notion sync...

📁 Workspace: /home/runner/work/Solar-Cooling/Solar-Cooling
📑 Parent Page ID: abc123def456

📊 Fetching existing pages...
  Found 0 existing pages

📝 Found 6 markdown files

📄 Processing: business_plan.md -> "Business Plan"
  + Creating new page: Business Plan
  ✅ Created: Business Plan (ID: xyz789)

📄 Processing: implementation_plan.md -> "Implementation Plan"
  + Creating new page: Implementation Plan
  ✅ Created: Implementation Plan (ID: abc456)

==================================================
📊 Sync Summary
==================================================
✅ Successfully synced: 6
✨ Sync complete!
```

## 🔄 Updating Pages

When you modify a markdown file and push:

1. The script finds the existing page by title
2. Deletes all blocks in that page
3. Re-creates the content with your new markdown
4. You'll see: `↻ Updating existing page: [Title]`

## 🎯 Benefits of This Approach

✅ **No manual page creation** (except the one parent page)
✅ **No frontmatter required** (unless you want custom titles)
✅ **Automatic updates** when you push changes
✅ **Organized structure** - all docs as subpages
✅ **Clear in Notion** - see all your docs in one place

## 📝 Next Steps

1. ✅ Complete Step 1: Create integration
2. ✅ Complete Step 2: Create parent page and get ID
3. ✅ Complete Step 3: Add both secrets to GitHub
4. ✅ Complete Step 4: Push and test!

## 🚀 You're All Set!

Once setup is complete:
- Just edit your markdown files
- Commit and push to `main`
- Your Notion page updates automatically!

No need to touch Notion manually ever again! 🎉

---

## 📖 Related Files

- Workflow: `.github/workflows/push-to-notion.yml`
- Sync Script: `.github/scripts/sync-to-notion.js`
- Dependencies: `.github/scripts/package.json`

## 🐛 Getting Help

If you encounter issues:
1. Check the Actions tab for detailed logs
2. Verify your secrets are set correctly
3. Ensure the integration has access to the parent page
4. Check that the parent page ID is correct (no dashes in UUID)
