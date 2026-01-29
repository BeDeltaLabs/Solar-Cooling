# 🚀 Quick Start - Notion Auto Sync

This is the **simplified Option 3** setup that creates child pages automatically!

## What You Get

✅ Create **ONE page in Notion** (one-time)  
✅ **No frontmatter** needed in markdown files  
✅ **Automatic child pages** created for each markdown file  
✅ **Auto-updates** when you push changes

## 3-Minute Setup

### 1️⃣ Create Notion Integration (2 minutes)

1. Go to https://www.notion.so/my-integrations
2. Click **"+ New integration"**
3. Name: "Solar Cooling Sync"
4. Give it: Read, Update, Insert permissions
5. **Copy the token** (starts with `secret_...`)

### 2️⃣ Create Parent Page & Get ID (1 minute)

1. Create a page in Notion: "Solar Cooling Docs"
2. Share it with your integration (click "..." → "Add connections")
3. Copy the page ID from URL:
   - URL: `https://www.notion.so/My-Page-abc123def456`
   - ID: `abc123def456` (the part after the last dash)

### 3️⃣ Add Secrets to GitHub (1 minute)

Go to: **Your Repo → Settings → Secrets → Actions**

Add these TWO secrets:

| Secret Name | Value |
|------------|-------|
| `NOTION_TOKEN` | Your integration token from step 1 |
| `NOTION_PARENT_PAGE` | Your page ID from step 2 |

### 4️⃣ Test It! (30 seconds)

```bash
git add .
git commit -m "Test Notion sync"
git push
```

Then:
1. Go to **Actions** tab in GitHub
2. Watch it run
3. Check your Notion page - child pages appear! 🎉

## What Gets Synced

All your markdown files become child pages:

| File | → | Notion Page |
|------|---|-------------|
| `business_plan.md` | → | "Business Plan" |
| `implementation_plan.md` | → | "Implementation Plan" |
| `reports/energy_power_balance.md` | → | "Energy Power Balance" |

## Customizing Titles

Want a custom title? Add frontmatter:

```yaml
---
title: My Custom Title
---

# Your content...
```

## Troubleshooting

**❌ "Error: object not found"**
→ Share the parent page with your integration

**❌ "NOTION_TOKEN required"**
→ Add the secret in GitHub Settings → Secrets

**❌ Pages not appearing**
→ Check Actions tab for error logs

## Full Documentation

See [`NOTION_SYNC_SETUP.md`](NOTION_SYNC_SETUP.md) for complete details!

---

**That's it!** 🎊 Your markdown files will now auto-sync to Notion as child pages.
