-- Script SQL pour créer la table des réponses du sondage
-- À exécuter dans l'éditeur SQL de Supabase

-- Créer la table survey_responses
CREATE TABLE IF NOT EXISTS survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  
  -- Technical Skills
  technical_competence INTEGER,
  technical_improvements TEXT,
  
  -- Social Skills
  work_comfort INTEGER,
  social_improvement TEXT,
  
  -- Communication
  communication_clarity INTEGER,
  listening_ability TEXT,
  communication_suggestions TEXT,
  
  -- Personality & Mindset
  attitude TEXT[],
  negative_trait TEXT,
  
  -- Negative Traits
  arrogance_level INTEGER,
  selfishness_level INTEGER,
  aggressiveness_level INTEGER,
  meanness_level INTEGER,
  kindness_level INTEGER,
  indulgence_level INTEGER,
  negative_traits_details TEXT,
  
  -- Teaching
  has_attended_classes TEXT,
  class_comprehensibility INTEGER,
  teaching_speed TEXT,
  pedagogy_quality INTEGER,
  teaching_improvements TEXT,
  
  -- Ambitions & Vision
  ambition_level INTEGER,
  goals_clarity TEXT,
  ambition_advice TEXT,
  
  -- Overall Feedback
  biggest_strength TEXT,
  biggest_weakness TEXT,
  honest_advice TEXT,
  critical_feedback TEXT
);

-- Créer un index sur created_at pour faciliter les requêtes par date
CREATE INDEX IF NOT EXISTS idx_survey_responses_created_at ON survey_responses(created_at DESC);

-- Activer Row Level Security (RLS) pour la sécurité
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre l'insertion anonyme (pas d'authentification requise)
CREATE POLICY "Allow anonymous inserts" ON survey_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Créer une politique pour permettre la lecture seulement aux utilisateurs authentifiés
-- (vous pouvez modifier cela selon vos besoins)
-- Pour l'instant, on permet la lecture à tous pour faciliter le développement
CREATE POLICY "Allow public reads" ON survey_responses
  FOR SELECT
  TO anon
  USING (true);

-- Note: Pour la production, vous devriez restreindre la lecture aux utilisateurs authentifiés
-- et créer un rôle admin pour gérer les réponses