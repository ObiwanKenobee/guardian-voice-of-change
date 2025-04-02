
-- This SQL table would need to be executed in the Supabase SQL editor
CREATE TABLE IF NOT EXISTS analytics_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  name TEXT NOT NULL,
  metrics_count INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'disconnected',
  last_updated TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, module_id)
);

-- Enable Row Level Security
ALTER TABLE analytics_modules ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own analytics modules"
  ON analytics_modules
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analytics modules"
  ON analytics_modules
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analytics modules"
  ON analytics_modules
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own analytics modules"
  ON analytics_modules
  FOR DELETE
  USING (auth.uid() = user_id);
