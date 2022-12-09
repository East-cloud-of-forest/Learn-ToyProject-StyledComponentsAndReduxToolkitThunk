import { useCallback } from 'react'

export default function useBeforeunload() {
  const listener = useCallback((event) => {
    event.preventDefault()
    event.returnValue = ''
  }, [])
  const enableBeforeunload = () => {
    console.log(window)
    window.addEventListener('beforeunload', listener)
  }
  const disableBeforeunload = () => {
    console.log(window)
    window.removeEventListener('beforeunload', listener)
  }
  return {
    enableBeforeunload,
    disableBeforeunload,
  }
}
