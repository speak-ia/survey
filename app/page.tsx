'use client'

import { useState } from 'react'
import { Rating } from '@/components/Rating'
import { Textarea } from '@/components/Textarea'
import { CheckboxGroup } from '@/components/CheckboxGroup'
import { SelectOption } from '@/components/SelectOption'
import { ProgressIndicator } from '@/components/ProgressIndicator'
import { useTheme } from '@/components/ThemeProvider'

interface SurveyData {
  // Technical Skills
  technicalCompetence: number | null
  technicalImprovements: string

  // Social Skills
  workComfort: number | null
  socialImprovement: string

  // Communication
  communicationClarity: number | null
  listeningAbility: string | null
  communicationSuggestions: string

  // Personality & Mindset
  attitude: string[]
  negativeTrait: string

  // Negative Traits (new section)
  arroganceLevel: number | null
  selfishnessLevel: number | null
  aggressivenessLevel: number | null
  meannessLevel: number | null
  kindnessLevel: number | null
  indulgenceLevel: number | null
  negativeTraitsDetails: string

  // Teaching (if applicable)
  hasAttendedClasses: string | null
  classComprehensibility: number | null
  teachingSpeed: string | null
  pedagogyQuality: number | null
  teachingImprovements: string

  // Ambitions & Vision
  ambitionLevel: number | null
  goalsClarity: string | null
  ambitionAdvice: string

  // Overall Feedback
  biggestStrength: string
  biggestWeakness: string
  honestAdvice: string
  criticalFeedback: string
}

const TOTAL_SECTIONS = 8

export default function SurveyPage() {
  const { theme, toggleTheme } = useTheme()
  const [currentSection, setCurrentSection] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState<SurveyData>({
    technicalCompetence: null,
    technicalImprovements: '',
    workComfort: null,
    socialImprovement: '',
    communicationClarity: null,
    listeningAbility: null,
    communicationSuggestions: '',
    attitude: [],
    negativeTrait: '',
    arroganceLevel: null,
    selfishnessLevel: null,
    aggressivenessLevel: null,
    meannessLevel: null,
    kindnessLevel: null,
    indulgenceLevel: null,
    negativeTraitsDetails: '',
    hasAttendedClasses: null,
    classComprehensibility: null,
    teachingSpeed: null,
    pedagogyQuality: null,
    teachingImprovements: '',
    ambitionLevel: null,
    goalsClarity: null,
    ambitionAdvice: '',
    biggestStrength: '',
    biggestWeakness: '',
    honestAdvice: '',
    criticalFeedback: '',
  })

  const updateField = <K extends keyof SurveyData>(field: K, value: SurveyData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Ne soumettre QUE si on est sur la dernière page
    if (currentSection !== TOTAL_SECTIONS - 1) {
      console.log('handleSubmit appelé mais pas sur la dernière page, ignoré', { currentSection, total: TOTAL_SECTIONS })
      return
    }
    
    console.log('handleSubmit appelé sur la dernière page - soumission directe', { currentSection, isSubmitting })
    
    // Pas de validation - soumission directe

    setIsSubmitting(true)

    try {
      console.log('Envoi des données...', formData)
      
      // Envoyer les données à l'API Supabase
      const response = await fetch('/api/submit-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('Réponse reçue:', response.status, response.statusText)

      const result = await response.json()
      console.log('Résultat:', result)

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de la soumission')
      }

      // Succès - afficher le message de remerciement
      console.log('Réponses sauvegardées avec succès:', result.data)
      setSubmitted(true)
    } catch (error) {
      console.error('Erreur lors de la soumission:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
      alert(`Erreur lors de la sauvegarde de vos réponses: ${errorMessage}\n\nVeuillez vérifier la console pour plus de détails.`)
      setIsSubmitting(false)
    }
  }

  const nextSection = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (currentSection < TOTAL_SECTIONS - 1) {
      setCurrentSection(currentSection + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Merci pour votre honnêteté
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Vos retours m&apos;aident à m&apos;améliorer.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header avec toggle dark mode */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header du sondage */}
        <div className="text-center mb-8 space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Sondage d&apos;auto-évaluation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Aidez-moi à grandir en partageant des retours honnêtes et constructifs. Ce sondage est 100% anonyme.
          </p>
        </div>

        {/* Indicateur de progression */}
        <div className="mb-8">
          <ProgressIndicator current={currentSection + 1} total={TOTAL_SECTIONS} />
        </div>

        {/* Formulaire */}
        <form 
          onSubmit={handleSubmit} 
          className="space-y-8"
          onKeyDown={(e) => {
            // Empêcher la soumission avec Entrée sauf si c'est le bouton submit
            if (e.key === 'Enter' && e.target instanceof HTMLTextAreaElement) {
              e.preventDefault()
            }
            // Empêcher la soumission du formulaire si on n'est pas sur la dernière page
            if (e.key === 'Enter' && currentSection !== TOTAL_SECTIONS - 1) {
              e.preventDefault()
            }
          }}
        >
          {/* Section 1: Technical Skills */}
          {currentSection === 0 && (
            <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 space-y-6 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                1. Compétences Techniques
              </h2>
              
              <Rating
                label="Comment évaluez-vous mes compétences techniques ?"
                value={formData.technicalCompetence}
                onChange={(value) => updateField('technicalCompetence', value)}
                required
              />

              <Textarea
                label="Dans quels domaines techniques devrais-je m&apos;améliorer ?"
                value={formData.technicalImprovements}
                onChange={(e) => updateField('technicalImprovements', e.target.value)}
                placeholder="Vos suggestions..."
              />
            </section>
          )}

          {/* Section 2: Social Skills */}
          {currentSection === 1 && (
            <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 space-y-6 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                2. Compétences Sociales
              </h2>
              
              <Rating
                label="À quel point suis-je agréable à travailler avec vous ?"
                value={formData.workComfort}
                onChange={(value) => updateField('workComfort', value)}
                required
              />

              <Textarea
                label="Une chose que je devrais améliorer socialement"
                value={formData.socialImprovement}
                onChange={(e) => updateField('socialImprovement', e.target.value)}
                placeholder="Vos suggestions..."
              />
            </section>
          )}

          {/* Section 3: Communication */}
          {currentSection === 2 && (
            <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 space-y-6 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                3. Communication
              </h2>
              
              <Rating
                label="Quelle est la clarté de ma communication ?"
                value={formData.communicationClarity}
                onChange={(value) => updateField('communicationClarity', value)}
                required
              />

              <SelectOption
                label="Est-ce que j&apos;écoute bien les autres ?"
                options={['Oui', 'Non', 'Parfois']}
                value={formData.listeningAbility}
                onChange={(value) => updateField('listeningAbility', value)}
              />

              <Textarea
                label="Suggestions pour améliorer ma communication"
                value={formData.communicationSuggestions}
                onChange={(e) => updateField('communicationSuggestions', e.target.value)}
                placeholder="Vos suggestions..."
              />
            </section>
          )}

          {/* Section 4: Personality & Mindset */}
          {currentSection === 3 && (
            <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 space-y-6 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                4. Personnalité et État d&apos;Esprit
              </h2>
              
              <CheckboxGroup
                label="Comment décririez-vous mon attitude ?"
                options={['Positif', 'Calme', 'Motivé', 'Stressé', 'Confiant', 'Réservé']}
                values={formData.attitude}
                onChange={(values) => updateField('attitude', values)}
              />

              <Textarea
                label="Un trait négatif sur lequel je devrais travailler"
                value={formData.negativeTrait}
                onChange={(e) => updateField('negativeTrait', e.target.value)}
                placeholder="Votre retour constructif..."
              />
            </section>
          )}

          {/* Section 5: Traits Négatifs */}
          {currentSection === 4 && (
            <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 space-y-6 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                5. Traits de Personnalité (Évaluation Honnête)
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Soyez honnête, cela m&apos;aide vraiment à m&apos;améliorer. 1 = Pas du tout, 5 = Très
              </p>
              
              <Rating
                label="À quel point suis-je arrogant ?"
                value={formData.arroganceLevel}
                onChange={(value) => updateField('arroganceLevel', value)}
                required
              />

              <Rating
                label="À quel point suis-je égoïste ?"
                value={formData.selfishnessLevel}
                onChange={(value) => updateField('selfishnessLevel', value)}
                required
              />

              <Rating
                label="À quel point suis-je agressif/violent dans mes interactions ?"
                value={formData.aggressivenessLevel}
                onChange={(value) => updateField('aggressivenessLevel', value)}
                required
              />

              <Rating
                label="À quel point puis-je être méchant ?"
                value={formData.meannessLevel}
                onChange={(value) => updateField('meannessLevel', value)}
                required
              />

              <Rating
                label="À quel point suis-je gentil ?"
                value={formData.kindnessLevel}
                onChange={(value) => updateField('kindnessLevel', value)}
                required
              />

              <Rating
                label="À quel point suis-je indulgent (trop permissif) ?"
                value={formData.indulgenceLevel}
                onChange={(value) => updateField('indulgenceLevel', value)}
                required
              />

              <Textarea
                label="Détails sur mes traits négatifs - soyez très honnête et critique"
                value={formData.negativeTraitsDetails}
                onChange={(e) => updateField('negativeTraitsDetails', e.target.value)}
                placeholder="Décrivez en détail les aspects négatifs de ma personnalité que vous avez observés..."
              />
            </section>
          )}

          {/* Section 6: Teaching */}
          {currentSection === 5 && (
            <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 space-y-6 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                6. Qualité d&apos;Enseignement
              </h2>
              
              <SelectOption
                label="Avez-vous déjà assisté à mes cours ou à une de mes présentations ?"
                options={['Oui', 'Non']}
                value={formData.hasAttendedClasses}
                onChange={(value) => updateField('hasAttendedClasses', value)}
              />

              {formData.hasAttendedClasses === 'Oui' && (
                <>
                  <Rating
                    label="Mes cours sont-ils compréhensibles ?"
                    value={formData.classComprehensibility}
                    onChange={(value) => updateField('classComprehensibility', value)}
                    required
                  />

                  <SelectOption
                    label="Suis-je trop rapide ou trop lent dans mes explications ?"
                    options={['Trop rapide', 'Trop lent', 'Vitesse appropriée', 'Parfois trop rapide', 'Parfois trop lent']}
                    value={formData.teachingSpeed}
                    onChange={(value) => updateField('teachingSpeed', value)}
                  />

                  <Rating
                    label="Comment évaluez-vous ma pédagogie (méthode d&apos;enseignement) ?"
                    value={formData.pedagogyQuality}
                    onChange={(value) => updateField('pedagogyQuality', value)}
                    required
                  />

                  <Textarea
                    label="Comment puis-je améliorer ma façon d&apos;enseigner ?"
                    value={formData.teachingImprovements}
                    onChange={(e) => updateField('teachingImprovements', e.target.value)}
                    placeholder="Vos suggestions critiques et constructives..."
                  />
                </>
              )}

              {formData.hasAttendedClasses === 'Non' && (
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  Vous pouvez passer à la section suivante.
                </p>
              )}
            </section>
          )}

          {/* Section 7: Ambitions & Vision */}
          {currentSection === 6 && (
            <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 space-y-6 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                7. Ambitions et Vision
              </h2>
              
              <Rating
                label="Est-ce que je semble ambitieux ?"
                value={formData.ambitionLevel}
                onChange={(value) => updateField('ambitionLevel', value)}
                required
              />

              <SelectOption
                label="Mes objectifs vous semblent-ils clairs ?"
                options={['Oui', 'Non', 'Pas sûr']}
                value={formData.goalsClarity}
                onChange={(value) => updateField('goalsClarity', value)}
              />

              <Textarea
                label="Un conseil concernant mes ambitions ou ma direction"
                value={formData.ambitionAdvice}
                onChange={(e) => updateField('ambitionAdvice', e.target.value)}
                placeholder="Votre conseil..."
              />
            </section>
          )}

          {/* Section 8: Overall Feedback */}
          {currentSection === 7 && (
            <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 space-y-6 transition-all duration-300">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  8. Retour Critique
                </h2>
                <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                  ⚠️ Prenez votre temps pour remplir ce champ. Votre retour est très précieux.
                </p>
              </div>
              
              <Textarea
                label="Retour critique général - Dites-moi tout ce qui ne va pas (c&apos;est ce qui m&apos;aide le plus)"
                value={formData.criticalFeedback}
                onChange={(e) => updateField('criticalFeedback', e.target.value)}
                placeholder="Soyez brutalement honnête. Qu'est-ce qui vous dérange chez moi ? Qu'est-ce que je fais mal ? Comment puis-je être meilleur ?"
                minHeight="250px"
              />
            </section>
          )}

          {/* Boutons de navigation */}
          <div className="flex justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={prevSection}
              disabled={currentSection === 0}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all duration-200
                ${
                  currentSection === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }
              `}
            >
              Précédent
            </button>

            {currentSection < TOTAL_SECTIONS - 1 ? (
              <button
                type="button"
                onClick={nextSection}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all duration-200
                  ${
                    isSubmitting
                      ? 'bg-gray-400 text-white cursor-not-allowed dark:bg-gray-600'
                      : 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
                  }
                `}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Soumettre'}
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  )
}