'use client'

interface RatingProps {
  value: number | null
  onChange: (value: number) => void
  label: string
  required?: boolean
}

export function Rating({ value, onChange, label, required = false }: RatingProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex gap-2 flex-wrap">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={`
              w-12 h-12 rounded-lg font-medium transition-all duration-200
              ${
                value === num
                  ? 'bg-blue-600 text-white shadow-lg scale-105 dark:bg-blue-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            `}
          >
            {num}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">1 = Très faible, 5 = Excellent</p>
    </div>
  )
}