#!/usr/bin/env node

/**
 * Notion Markdown Sync Script
 * 
 * This script automatically syncs markdown files to Notion as child pages.
 * It creates a child page for each markdown file under a parent page.
 */

import { Client } from '@notionhq/client';
import { markdownToBlocks } from '@tryfabric/martian';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';

// Configuration
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID = process.env.NOTION_PARENT_PAGE;
const WORKSPACE_ROOT = process.env.GITHUB_WORKSPACE || process.cwd();

// Validate environment variables
if (!NOTION_TOKEN) {
    console.error('❌ NOTION_TOKEN environment variable is required');
    process.exit(1);
}

if (!PARENT_PAGE_ID) {
    console.error('❌ NOTION_PARENT_PAGE environment variable is required');
    process.exit(1);
}

// Initialize Notion client
const notion = new Client({ auth: NOTION_TOKEN });

/**
 * Get all child pages of the parent page
 */
async function getExistingPages() {
    try {
        const response = await notion.blocks.children.list({
            block_id: PARENT_PAGE_ID,
            page_size: 100,
        });

        const pages = {};
        for (const block of response.results) {
            if (block.type === 'child_page') {
                const title = block.child_page?.title || '';
                pages[title] = block.id;
            }
        }

        return pages;
    } catch (error) {
        console.error('Error fetching existing pages:', error.message);
        return {};
    }
}

/**
 * Convert markdown content to Notion blocks
 */
async function convertMarkdownToBlocks(markdownContent) {
    try {
        // Use martian to convert markdown to Notion blocks
        const blocks = await markdownToBlocks(markdownContent);
        return blocks;
    } catch (error) {
        console.error('Error converting markdown:', error.message);
        // Fallback: create a simple text block
        return [{
            object: 'block',
            type: 'paragraph',
            paragraph: {
                rich_text: [{
                    type: 'text',
                    text: { content: markdownContent.substring(0, 2000) }
                }]
            }
        }];
    }
}

/**
 * Create or update a Notion page
 */
async function syncMarkdownFile(filePath, existingPages) {
    try {
        const fullPath = path.join(WORKSPACE_ROOT, filePath);
        const content = await fs.readFile(fullPath, 'utf-8');

        // Parse frontmatter if it exists
        const { data: frontmatter, content: markdownContent } = matter(content);

        // Generate title from filename or frontmatter
        const fileName = path.basename(filePath, '.md');
        const title = frontmatter.title ||
            fileName.split(/[-_]/).map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');

        console.log(`📄 Processing: ${filePath} -> "${title}"`);

        // Convert markdown to Notion blocks
        const blocks = await convertMarkdownToBlocks(markdownContent);

        // Check if page already exists
        const existingPageId = existingPages[title];

        if (existingPageId) {
            // Update existing page
            console.log(`  ↻ Updating existing page: ${title}`);

            // Delete all existing blocks in the page
            const existingBlocks = await notion.blocks.children.list({
                block_id: existingPageId,
            });

            for (const block of existingBlocks.results) {
                try {
                    await notion.blocks.delete({ block_id: block.id });
                } catch (e) {
                    // Some blocks can't be deleted, skip them
                }
            }

            // Add new blocks
            if (blocks.length > 0) {
                await notion.blocks.children.append({
                    block_id: existingPageId,
                    children: blocks.slice(0, 100), // Notion API limit: 100 blocks per request
                });
            }

            console.log(`  ✅ Updated: ${title}`);
        } else {
            // Create new page
            console.log(`  + Creating new page: ${title}`);

            const newPage = await notion.pages.create({
                parent: { page_id: PARENT_PAGE_ID },
                properties: {
                    title: {
                        title: [{
                            text: { content: title }
                        }]
                    }
                },
                children: blocks.slice(0, 100), // Notion API limit
            });

            console.log(`  ✅ Created: ${title} (ID: ${newPage.id})`);
        }

        return { success: true, title, filePath };
    } catch (error) {
        console.error(`  ❌ Error syncing ${filePath}:`, error.message);
        return { success: false, title: filePath, error: error.message };
    }
}

/**
 * Main function
 */
async function main() {
    console.log('🚀 Starting Notion sync...\n');
    console.log(`📁 Workspace: ${WORKSPACE_ROOT}`);
    console.log(`📑 Parent Page ID: ${PARENT_PAGE_ID}\n`);

    try {
        // Get existing pages
        console.log('📊 Fetching existing pages...');
        const existingPages = await getExistingPages();
        console.log(`  Found ${Object.keys(existingPages).length} existing pages\n`);

        // Find all markdown files
        const markdownFiles = await glob('**/*.md', {
            cwd: WORKSPACE_ROOT,
            ignore: [
                'node_modules/**',
                '.git/**',
                '**/node_modules/**',
                'NOTION_SYNC_*.md',
                'EXAMPLE_*.md',
            ],
        });

        console.log(`📝 Found ${markdownFiles.length} markdown files\n`);

        // Sync each file
        const results = [];
        for (const file of markdownFiles) {
            const result = await syncMarkdownFile(file, existingPages);
            results.push(result);

            // Add delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 300));
        }

        // Summary
        console.log('\n' + '='.repeat(50));
        console.log('📊 Sync Summary');
        console.log('='.repeat(50));

        const successful = results.filter(r => r.success);
        const failed = results.filter(r => !r.success);

        console.log(`✅ Successfully synced: ${successful.length}`);
        if (failed.length > 0) {
            console.log(`❌ Failed: ${failed.length}`);
            failed.forEach(f => console.log(`   - ${f.title}: ${f.error}`));
        }

        console.log('\n✨ Sync complete!');

        // Exit with error if any failed
        if (failed.length > 0) {
            process.exit(1);
        }
    } catch (error) {
        console.error('\n❌ Fatal error:', error.message);
        process.exit(1);
    }
}

// Run main function
main();
