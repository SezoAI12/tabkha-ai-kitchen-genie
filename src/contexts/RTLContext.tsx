
import React, { createContext, useContext, useState } from 'react'

interface RTLContextType {
  isRTL: boolean
  setIsRTL: (isRTL: boolean) => void
  language: string
  setLanguage: (language: string) => void
  direction: string
  t: (key: string) => string
}

const RTLContext = createContext<RTLContextType | undefined>(undefined)

export const RTLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false)
  const [language, setLanguage] = useState('en')

  const direction = isRTL ? 'rtl' : 'ltr'
  
  // Simple translation function - returns the key for now
  const t = (key: string) => key

  return (
    <RTLContext.Provider value={{ isRTL, setIsRTL, language, setLanguage, direction, t }}>
      {children}
    </RTLContext.Provider>
  )
}

export const useRTL = () => {
  const context = useContext(RTLContext)
  if (context === undefined) {
    throw new Error('useRTL must be used within a RTLProvider')
  }
  return context
}
