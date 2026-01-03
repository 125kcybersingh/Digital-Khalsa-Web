-- Transparency Page Schema
-- Run this in your Supabase SQL editor to create the necessary tables

-- Changelog/Status Updates Table
CREATE TABLE IF NOT EXISTS changelog_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('in-progress', 'completed', 'planned')),
  category TEXT CHECK (category IN ('feature', 'bug-fix', 'improvement', 'update')),
  share_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE
);

-- Timesheet Entries Table
CREATE TABLE IF NOT EXISTS timesheet_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  date DATE NOT NULL,
  hours DECIMAL(4,2) NOT NULL,
  description TEXT NOT NULL,
  category TEXT CHECK (category IN ('development', 'design', 'research', 'testing', 'documentation'))
);

-- Feature Requests Table
CREATE TABLE IF NOT EXISTS feature_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  submitter_name TEXT,
  submitter_email TEXT,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under-review', 'planned', 'in-progress', 'completed', 'declined')),
  github_issue_url TEXT,
  upvotes INTEGER DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE changelog_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE timesheet_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_requests ENABLE ROW LEVEL SECURITY;

-- Public read access for all transparency data
CREATE POLICY "Public read access for changelog" ON changelog_entries
  FOR SELECT USING (true);

CREATE POLICY "Public read access for timesheet" ON timesheet_entries
  FOR SELECT USING (true);

CREATE POLICY "Public read access for feature requests" ON feature_requests
  FOR SELECT USING (true);

-- Allow anyone to insert feature requests
CREATE POLICY "Public insert for feature requests" ON feature_requests
  FOR INSERT WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_changelog_created_at ON changelog_entries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_timesheet_date ON timesheet_entries(date DESC);
CREATE INDEX IF NOT EXISTS idx_feature_requests_created_at ON feature_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feature_requests_status ON feature_requests(status);
