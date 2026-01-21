'use client'

interface SelectOptionProps {
  label: string
  options: string[]
  value: string | null
  onChange: (value: string) => void
  required?: boolean
}

export function SelectOption({ label, options, value, onChange, required = false }: SelectOptionProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${
                value === option
                  ? 'bg-blue-600 text-white shadow-lg dark:bg-blue-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}