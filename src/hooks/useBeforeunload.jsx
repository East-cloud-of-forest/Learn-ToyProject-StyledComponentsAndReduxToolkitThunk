import { useCallback } from 'react'

export default function useBeforeunload() {
  const listener = useCallback((event) => {
    event.preventDefault()
    event.returnValue = ''
  }, [])
  const enableBeforeunload = () => {
    // window.addEventListener('beforeunload', listener)
  }
  const disableBeforeunload = () => {
    // window.removeEventListener('beforeunload', listener)
  }
  return {
    enableBeforeunload,
    disableBeforeunload,
  }
}
