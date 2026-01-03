# Transparency Page

The `/transparency` page is a public-facing dashboard that showcases the development progress, time investment, and community feedback for Digital Khalsa.

## Features

### 📝 Changelog & Status Updates
- Display recent updates, features, and bug fixes
- Categorize entries (feature, bug-fix, improvement, update)
- Track status (planned, in-progress, completed)
- Pin important announcements
- **Social Media Sharing**: Share updates directly to Twitter and Instagram
- Track share counts for each update

### ⏱️ Timesheet
- Log and display hours spent on the project
- Categorize work (development, design, research, testing, documentation)
- View by week or month
- Display total hours and breakdown by category
- Transparent view of time investment

### 💡 Feature Requests
- Public form for submitting feature requests
- View all requests with status tracking
- Filter by status (submitted, under-review, planned, in-progress, completed, declined)
- Link feature requests to GitHub issues
- Track upvotes for popular requests
- Optional submitter name and email for updates

### 🔗 GitHub Integration
- Direct link to GitHub repository
- Feature requests can be linked to GitHub issues
- Encourages open-source collaboration

## Setup Instructions

### 1. Create Supabase Tables

Run the SQL schema in your Supabase SQL editor:

```bash
# The schema is in: supabase-schema.sql
```

This creates three tables:
- `changelog_entries` - For status updates and changelog
- `timesheet_entries` - For time tracking
- `feature_requests` - For community feature requests

### 2. Environment Variables

Ensure you have the following in your environment (Netlify or `.env.local`):

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Permissions

The schema includes Row Level Security (RLS) policies:
- **Public Read**: All three tables are publicly readable
- **Public Insert**: Feature requests table allows public inserts
- **Admin Only**: Changelog and timesheet entries require admin access to insert/update

To add data as an admin, use the Supabase dashboard or create a protected API route.

## File Structure

```
app/
  transparency/
    page.tsx              # Main transparency page

components/
  transparency/
    Changelog.tsx         # Changelog component with social sharing
    Timesheet.tsx         # Timesheet display component
    FeatureRequests.tsx   # Feature request form and list

lib/
  supabase.ts             # Updated with transparency types

supabase-schema.sql       # Database schema for transparency tables
```

## Usage

### Adding Changelog Entries

Use the Supabase dashboard to add entries to `changelog_entries`:

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

### Adding Timesheet Entries

```sql
INSERT INTO timesheet_entries (date, hours, description, category)
VALUES (
  '2026-01-03',
  4.5,
  'Built transparency page with changelog, timesheet, and feature requests',
  'development'
);
```

### Viewing Feature Requests

Feature requests are submitted by users through the form. View them in the Supabase dashboard under `feature_requests`.

To link a feature request to a GitHub issue:

```sql
UPDATE feature_requests
SET github_issue_url = 'https://github.com/125kcybersingh/Digital-Khalsa-Web/issues/123',
    status = 'planned'
WHERE id = 'request-uuid';
```

## Social Sharing

The changelog includes social sharing buttons:

- **Twitter**: Opens Twitter intent with pre-filled text
- **Instagram**: Copies text to clipboard (Instagram doesn't support direct sharing URLs)

Share counts are tracked automatically when users click the share buttons.

## Customization

### Colors

The page uses the Digital Khalsa brand colors:
- Primary Orange: `#FF9933`
- Primary Blue: `#000080`

### GitHub Repository Link

Update the GitHub link in `/app/transparency/page.tsx` if your repository URL changes.

## Benefits

1. **Build Trust**: Show the Sangat exactly what you're working on
2. **Community Input**: Let users request features and vote on priorities
3. **Accountability**: Public timesheet shows dedication and effort
4. **Marketing**: Shareable updates create social proof
5. **Open Source**: Encourages collaboration and contributions

## Future Enhancements

Potential improvements:
- Upvoting system for feature requests
- Email notifications when feature request status changes
- RSS feed for changelog
- Admin dashboard for managing entries
- Automatic GitHub issue creation for feature requests
- Analytics dashboard
