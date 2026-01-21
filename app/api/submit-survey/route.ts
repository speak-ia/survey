import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Transformer les données du formulaire pour correspondre au schéma de la base de données
    const surveyData = {
      // Technical Skills
      technical_competence: body.technicalCompetence,
      technical_improvements: body.technicalImprovements || null,
      
      // Social Skills
      work_comfort: body.workComfort,
      social_improvement: body.socialImprovement || null,
      
      // Communication
      communication_clarity: body.communicationClarity,
      listening_ability: body.listeningAbility || null,
      communication_suggestions: body.communicationSuggestions || null,
      
      // Personality & Mindset
      attitude: body.attitude || [],
      negative_trait: body.negativeTrait || null,
      
      // Negative Traits
      arrogance_level: body.arroganceLevel,
      selfishness_level: body.selfishnessLevel,
      aggressiveness_level: body.aggressivenessLevel,
      meanness_level: body.meannessLevel,
      kindness_level: body.kindnessLevel,
      indulgence_level: body.indulgenceLevel,
      negative_traits_details: body.negativeTraitsDetails || null,
      
      // Teaching
      has_attended_classes: body.hasAttendedClasses || null,
      class_comprehensibility: body.classComprehensibility || null,
      teaching_speed: body.teachingSpeed || null,
      pedagogy_quality: body.pedagogyQuality || null,
      teaching_improvements: body.teachingImprovements || null,
      
      // Ambitions & Vision
      ambition_level: body.ambitionLevel,
      goals_clarity: body.goalsClarity || null,
      ambition_advice: body.ambitionAdvice || null,
      
      // Overall Feedback
      biggest_strength: body.biggestStrength || null,
      biggest_weakness: body.biggestWeakness || null,
      honest_advice: body.honestAdvice || null,
      critical_feedback: body.criticalFeedback || null,
    }

    // Insérer les données dans Supabase
    const { data, error } = await supabase
      .from('survey_responses')
      .insert([surveyData])
      .select()

    if (error) {
      console.error('Erreur Supabase:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la sauvegarde des données', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur serveur:', error)
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }
}