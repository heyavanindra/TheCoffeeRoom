
'use client'

import React from 'react'
import { ThemeAnimationType, useModeAnimation } from 'react-theme-switch-animation'

const ModeToggle = () => {
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    animationType: ThemeAnimationType.CIRCLE,
  })

  return (
    <button className='p-2 cursor-pointer' ref={ref} onClick={toggleSwitchTheme}>
      {isDarkMode ? '🌙' : '☀️'} 
    </button>
  )
}

export default ModeToggle