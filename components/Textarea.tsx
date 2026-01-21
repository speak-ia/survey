'use client'

import { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  required?: boolean
}

export function Textarea({ label, required = false, className = '', onKeyDown, minHeight = '100px', ...props }: TextareaProps & { minHeight?: string }) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Empêcher la soumission du formulaire avec Entrée
    // Permettre Ctrl+Entrée ou Cmd+Entrée pour soumettre
    if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey) {
      e.stopPropagation()
    }
    // Appeler le gestionnaire personnalisé s'il existe
    if (onKeyDown) {
      onKeyDown(e)
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        className={`
          w-full px-4 py-3 rounded-lg border border-gray-300 
          bg-white dark:bg-gray-800 dark:border-gray-700
          text-gray-900 dark:text-gray-100
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
          resize-y
          ${className}
        `}
        style={{ minHeight }}
        onKeyDown={handleKeyDown}
        {...props}
      />
      {!required && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Optionnel mais encouragé
        </p>
      )}
    </div>
  )
}