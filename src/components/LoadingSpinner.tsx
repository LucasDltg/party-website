// components/SpinnerWithText.tsx
'use client'

interface LoadingSpinnerProps {
  text: string
  containerClassName?: string
  textClassName?: string
}

export default function LoadingSpinner({
  text,
  containerClassName = '',
  textClassName = '',
}: LoadingSpinnerProps) {
  return (
    <div className={containerClassName}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className={textClassName}>{text}</p>
    </div>
  )
}
