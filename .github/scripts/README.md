# Notion Sync Scripts

This directory contains the scripts and dependencies for automatically syncing markdown files to Notion.

## Files

- **`sync-to-notion.js`** - Main sync script that creates/updates Notion pages
- **`package.json`** - Node.js dependencies
- **`package-lock.json`** - Lock file (auto-generated)

## How It Works

The `sync-to-notion.js` script:

1. Connects to Notion using the API token
2. Fetches existing child pages from the parent page
3. Scans the repository for markdown files
4. For each markdown file:
   - Converts markdown to Notion blocks
   - Creates a new child page OR updates existing page
   - Uses filename or frontmatter for page title

## Environment Variables

Required environment variables (set in GitHub Actions):

- `NOTION_TOKEN` - Notion integration token
- `NOTION_PARENT_PAGE` - ID of the parent page in Notion
- `GITHUB_WORKSPACE` - Root directory of the repository

## Local Testing

To test locally:

1. Install dependencies:
   ```bash
   cd .github/scripts
   npm install
   ```

2. Set environment variables:
   ```bash
   # Windows (CMD)
   set NOTION_TOKEN=your_token_here
   set NOTION_PARENT_PAGE=your_page_id_here
   set GITHUB_WORKSPACE=C:\BeDelta\Solar Cooling

   # Windows (PowerShell)
   $env:NOTION_TOKEN="your_token_here"
   $env:NOTION_PARENT_PAGE="your_page_id_here"
   $env:GITHUB_WORKSPACE="C:\BeDelta\Solar Cooling"
   ```

3. Run the script:
   ```bash
   node sync-to-notion.js
   ```

## Dependencies

- **@notionhq/client** - Official Notion JavaScript SDK
- **@tryfabric/martian** - Converts markdown to Notion blocks
- **gray-matter** - Parses frontmatter from markdown files
- **glob** - File pattern matching for finding markdown files

## Customization

### Excluding Files

Edit the `glob` ignore patterns in `sync-to-notion.js`:

```javascript
const markdownFiles = await glob('**/*.md', {
  ignore: [
    'node_modules/**',
    '.git/**',
    '**/node_modules/**',
    'NOTION_SYNC_*.md',  // Add more patterns here
    'EXAMPLE_*.md',
  ],
});
```

### Custom Titles

Add frontmatter to your markdown files:

```yaml
---
title: My Custom Page Title
---
```

### Rate Limiting

The script includes a 300ms delay between API calls. Adjust if needed:

```javascript
// Add delay to avoid rate limiting
await new Promise(resolve => setTimeout(resolve, 300)); // Change value here
```

## Maintenance

The workflow automatically installs dependencies using `npm ci` on each run.

No manual maintenance required unless you need to:
- Update dependencies
- Modify the sync logic
- Change file exclusion patterns
