# Example: How to Add Notion Frontmatter to Your Markdown Files

This file shows you exactly how to modify your existing markdown files to sync with Notion.

## Before (Current businessplan.md)

```markdown
# Solar Cooling - Business & Technical Plan

## 1. Executive Summary
**Objective:** Increase solar farm energy output by ~10% through active/passive panel cooling.
...
```

## After (With Notion Frontmatter)

```markdown
---
notion_page: https://www.notion.so/your-workspace/solar-cooling-business-plan-abc123def456
title: Solar Cooling Business Plan
---

# Solar Cooling - Business & Technical Plan

## 1. Executive Summary
**Objective:** Increase solar farm energy output by ~10% through active/passive panel cooling.
...
```

## What You Need to Add

Just add these 3 lines to the **very top** of your markdown file:

```yaml
---
notion_page: YOUR_NOTION_PAGE_URL_HERE
title: YOUR_PAGE_TITLE_HERE
---
```

## Step-by-Step for Each File

### For business_plan.md:
1. Create a page in Notion called "Solar Cooling Business Plan"
2. Share the page with your integration
3. Copy the URL
4. Add frontmatter to the top of business_plan.md:

```yaml
---
notion_page: https://www.notion.so/[paste-your-url-here]
title: Solar Cooling Business Plan
---
```

### For implementation_plan.md:
```yaml
---
notion_page: https://www.notion.so/[paste-your-url-here]
title: Implementation Plan
---
```

### For reports/energy_power_balance.md:
```yaml
---
notion_page: https://www.notion.so/[paste-your-url-here]
title: Energy Power Balance Report
---
```

### For reports/heat_rejection_methods.md:
```yaml
---
notion_page: https://www.notion.so/[paste-your-url-here]
title: Heat Rejection Methods
---
```

### For reports/thermal_coefficient_review.md:
```yaml
---
notion_page: https://www.notion.so/[paste-your-url-here]
title: Thermal Coefficient Review
---
```

## Important Notes

⚠️ **The frontmatter MUST be:**
- At the very top of the file (line 1)
- Between triple dashes (`---`)
- Valid YAML format
- Before any other content

✅ **Correct:**
```markdown
---
notion_page: https://www.notion.so/...
title: My Title
---

# Content starts here
```

❌ **Wrong:**
```markdown
# Content starts here

---
notion_page: https://www.notion.so/...
title: My Title
---
```

## Testing It

1. Add frontmatter to a file (e.g., `business_plan.md`)
2. Commit and push to `main` branch:
   ```bash
   git add business_plan.md
   git commit -m "Add Notion sync to business plan"
   git push
   ```
3. Check the **Actions** tab in GitHub to see the workflow run
4. Check your Notion page - it should be updated!

---

**Next:** See [NOTION_SYNC_SETUP.md](NOTION_SYNC_SETUP.md) for the complete setup guide.
