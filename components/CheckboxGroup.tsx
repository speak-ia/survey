'use client'

interface CheckboxGroupProps {
  label: string
  options: string[]
  values: string[]
  onChange: (values: string[]) => void
  required?: boolean
}

export function CheckboxGroup({ label, options, values, onChange, required = false }: CheckboxGroupProps) {
  const handleToggle = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter(v => v !== option))
    } else {
      onChange([...values, option])
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <label
            key={option}
            className={`
              flex items-center px-4 py-2 rounded-lg cursor-pointer
              transition-all duration-200
              ${
                values.includes(option)
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            `}
          >
            <input
              type="checkbox"
              checked={values.includes(option)}
              onChange={() => handleToggle(option)}
              className="sr-only"
            />
            <span className="text-sm font-medium">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}