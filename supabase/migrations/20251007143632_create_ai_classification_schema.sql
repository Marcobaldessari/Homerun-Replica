/*
  # AI Classification Schema

  ## Overview
  This migration creates the database schema for storing AI-powered service classification
  requests and results. This enables tracking classification accuracy, building training
  data, and analyzing user input patterns.

  ## New Tables
  
  ### `ai_classification_requests`
  Stores each AI classification request with the user's input and system response.
  
  - `id` (uuid, primary key) - Unique identifier for each request
  - `user_input` (text) - The natural language description provided by the user
  - `classified_service_id` (text) - The service ID the AI classified this request to
  - `classified_category_id` (text) - The category ID the AI classified this request to
  - `confidence_score` (numeric) - AI confidence level (0-1) for the classification
  - `session_id` (text, nullable) - Optional session identifier for tracking user journeys
  - `user_accepted` (boolean, nullable) - Whether user proceeded with the classification
  - `actual_service_selected` (text, nullable) - If user changed service, which one they chose
  - `created_at` (timestamptz) - When the classification was made
  - `metadata` (jsonb, nullable) - Additional context (user agent, device info, etc.)
  
  ### `ai_classification_feedback`
  Captures explicit feedback when users correct AI classifications.
  
  - `id` (uuid, primary key) - Unique identifier
  - `request_id` (uuid, foreign key) - Links to the original classification request
  - `feedback_type` (text) - Type of feedback: 'correction', 'confirmation', 'unclear'
  - `corrected_service_id` (text, nullable) - Service user actually selected
  - `corrected_category_id` (text, nullable) - Category user actually selected
  - `feedback_notes` (text, nullable) - Additional user comments
  - `created_at` (timestamptz) - When feedback was provided

  ## Security
  
  - Enable RLS on all tables
  - Public can insert (for anonymous users describing their needs)
  - Only authenticated admins can read (for analytics and model improvement)

  ## Indexes
  
  - Index on created_at for time-based queries
  - Index on classified_service_id for aggregation
  - Index on session_id for journey analysis
*/

CREATE TABLE IF NOT EXISTS ai_classification_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_input text NOT NULL,
  classified_service_id text NOT NULL,
  classified_category_id text NOT NULL,
  confidence_score numeric CHECK (confidence_score >= 0 AND confidence_score <= 1),
  session_id text,
  user_accepted boolean DEFAULT NULL,
  actual_service_selected text,
  created_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS ai_classification_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES ai_classification_requests(id) ON DELETE CASCADE,
  feedback_type text NOT NULL CHECK (feedback_type IN ('correction', 'confirmation', 'unclear')),
  corrected_service_id text,
  corrected_category_id text,
  feedback_notes text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_requests_created_at ON ai_classification_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_requests_service ON ai_classification_requests(classified_service_id);
CREATE INDEX IF NOT EXISTS idx_ai_requests_category ON ai_classification_requests(classified_category_id);
CREATE INDEX IF NOT EXISTS idx_ai_requests_session ON ai_classification_requests(session_id);
CREATE INDEX IF NOT EXISTS idx_ai_feedback_request ON ai_classification_feedback(request_id);

ALTER TABLE ai_classification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_classification_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert classification requests"
  ON ai_classification_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Only admins can view classification requests"
  ON ai_classification_requests
  FOR SELECT
  TO authenticated
  USING (false);

CREATE POLICY "Anyone can insert feedback"
  ON ai_classification_feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Only admins can view feedback"
  ON ai_classification_feedback
  FOR SELECT
  TO authenticated
  USING (false);