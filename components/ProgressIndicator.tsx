'use client'

interface ProgressIndicatorProps {
  current: number
  total: number
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>Progression</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}