# Transparency Page Data Guide

## Overview

The transparency page displays data from three Supabase tables:
1. **changelog_entries** - Status updates and changelog
2. **timesheet_entries** - Time tracking
3. **feature_requests** - Community feature requests (users can submit these via the form)

## Step 1: Create the Database Tables

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Click **Run** to execute the SQL

This creates:
- The three tables with proper structure
- Row Level Security (RLS) policies
- Indexes for performance

## Step 2: Add Data to Tables

### Option A: Using Supabase Dashboard (Easiest)

#### Adding Changelog Entries

1. Go to **Table Editor** in Supabase dashboard
2. Select `changelog_entries` table
3. Click **Insert** → **Insert row**
4. Fill in the fields:

| Field | Type | Required | Example Values |
|-------|------|----------|---------------|
| `title` | Text | ✅ Yes | "Added Transparency Page" |
| `description` | Text | ✅ Yes | "Created a public transparency page to share progress with the Sangat." |
| `status` | Text | ✅ Yes | `'completed'`, `'in-progress'`, or `'planned'` |
| `category` | Text | Optional | `'feature'`, `'bug-fix'`, `'improvement'`, or `'update'` |
| `share_count` | Integer | Optional | `0` (default) |
| `is_pinned` | Boolean | Optional | `true` or `false` (default) |

**Example Entry:**
```
title: "Launched GurBani Finder Beta"
description: "The first version of GurBani Finder is now available for beta testers. Point your camera at Gurmukhi text and get instant shabad identification."
status: "completed"
category: "feature"
is_pinned: true
share_count: 0
```

#### Adding Timesheet Entries

1. Go to **Table Editor** → `timesheet_entries`
2. Click **Insert** → **Insert row**
3. Fill in the fields:

| Field | Type | Required | Example Values |
|-------|------|----------|---------------|
| `date` | Date | ✅ Yes | `2026-01-15` (YYYY-MM-DD format) |
| `hours` | Decimal | ✅ Yes | `4.5`, `2.0`, `8.25` |
| `description` | Text | ✅ Yes | "Built transparency page with changelog, timesheet, and feature requests" |
| `category` | Text | Optional | `'development'`, `'design'`, `'research'`, `'testing'`, or `'documentation'` |

**Example Entry:**
```
date: 2026-01-15
hours: 4.5
description: "Built transparency page with changelog, timesheet, and feature requests"
category: "development"
```

#### Feature Requests

**Note:** Users can submit feature requests through the form on the transparency page. You can also add them manually:

1. Go to **Table Editor** → `feature_requests`
2. Click **Insert** → **Insert row**
3. Fill in the fields:

| Field | Type | Required | Example Values |
|-------|------|----------|---------------|
| `title` | Text | ✅ Yes | "Add dark mode support" |
| `description` | Text | ✅ Yes | "Would love to see a dark mode option for the app" |
| `submitter_name` | Text | Optional | "John Doe" |
| `submitter_email` | Text | Optional | "john@example.com" |
| `status` | Text | Optional | `'submitted'` (default), `'under-review'`, `'planned'`, `'in-progress'`, `'completed'`, or `'declined'` |
| `github_issue_url` | Text | Optional | "https://github.com/125kCyberSingh/Digital-Khalsa-Web/issues/123" |
| `upvotes` | Integer | Optional | `0` (default) |

### Option B: Using SQL (For Bulk Inserts)

#### Changelog Entry Example

```sql
INSERT INTO changelog_entries (title, description, status, category, is_pinned)
VALUES (
  'Added Transparency Page',
  'Created a public transparency page to share progress with the Sangat.',
  'completed',
  'feature',
  true
);
```

#### Timesheet Entry Example

```sql
INSERT INTO timesheet_entries (date, hours, description, category)
VALUES (
  '2026-01-15',
  4.5,
  'Built transparency page with changelog, timesheet, and feature requests',
  'development'
);
```

#### Feature Request Example

```sql
INSERT INTO feature_requests (title, description, submitter_name, status)
VALUES (
  'Add dark mode support',
  'Would love to see a dark mode option for the app',
  'John Doe',
  'submitted'
);
```

## Step 3: Update Feature Request Status

When you want to update a feature request (e.g., mark it as "planned" or link it to a GitHub issue):

```sql
UPDATE feature_requests
SET 
  status = 'planned',
  github_issue_url = 'https://github.com/125kCyberSingh/Digital-Khalsa-Web/issues/123'
WHERE id = 'request-uuid-here';
```

## Step 4: Verify Data is Showing

1. Visit `/transparency` on your website
2. Check that:
   - Changelog entries appear
   - Timesheet entries show with totals
   - Feature requests display correctly

## Common Issues & Solutions

### Issue: "No updates yet" or empty sections

**Solution:** 
- Verify tables exist in Supabase dashboard
- Check that RLS policies are enabled and allow public read access
- Ensure you've added at least one entry to each table

### Issue: "Error fetching changelog" in browser console

**Solution:**
- Check Supabase environment variables are set correctly
- Verify RLS policies allow public SELECT
- Check Supabase project URL and anon key in `.env.local`

### Issue: Can't insert data (permission denied)

**Solution:**
- For changelog and timesheet: You need admin access. Use Supabase dashboard or create a protected API route
- For feature requests: Public insert is allowed, so this should work from the form

## Data Structure Reference

### Changelog Status Values
- `'completed'` - Feature/work is done
- `'in-progress'` - Currently being worked on
- `'planned'` - Planned for future

### Changelog Category Values
- `'feature'` - New feature
- `'bug-fix'` - Bug fix
- `'improvement'` - Improvement to existing feature
- `'update'` - General update

### Timesheet Category Values
- `'development'` - Coding/development work
- `'design'` - Design work
- `'research'` - Research and planning
- `'testing'` - Testing and QA
- `'documentation'` - Writing documentation

### Feature Request Status Values
- `'submitted'` - Just submitted (default)
- `'under-review'` - Being reviewed
- `'planned'` - Planned for implementation
- `'in-progress'` - Currently being worked on
- `'completed'` - Feature is complete
- `'declined'` - Not planning to implement

## Quick Start Checklist

- [ ] Run `supabase-schema.sql` in Supabase SQL Editor
- [ ] Add at least one changelog entry
- [ ] Add at least one timesheet entry
- [ ] Test feature request form submission
- [ ] Verify data appears on `/transparency` page
- [ ] Test social sharing buttons on changelog entries

## Need Help?

If you encounter errors:
1. Check browser console for error messages
2. Verify Supabase connection in Network tab
3. Check Supabase dashboard → Logs for database errors
4. Ensure environment variables are set correctly

