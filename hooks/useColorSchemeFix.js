import { Appearance } from 'react-native'
import { useEffect, useRef, useState } from 'react'

const useColorScheme = (delay = 500) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme())

  let timeout = useRef.current

  useEffect(() => {
    Appearance.addChangeListener(onColorSchemeChange)

    return () => {
      resetCurrentTimeout()
      Appearance.removeChangeListener(onColorSchemeChange)
    }
  }, [])

  function onColorSchemeChange(preferences) {
    resetCurrentTimeout()

    timeout = setTimeout(() => {
      setColorScheme(preferences.colorScheme)
    }, delay)
  }

  function resetCurrentTimeout() {
    if (timeout) {
      clearTimeout(timeout)
    }
  }

  return colorScheme
}

export default useColorScheme
