import { useContext, useEffect, useCallback } from 'react'
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom'

function useBlocker(blocker, when = true) {
  const { navigator } = useContext(NavigationContext)
  useEffect(() => {
    if (!when) return
    const unblock = navigator.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock()
          tx.retry()
        },
      }
      blocker(autoUnblockingTx)
    })
    return unblock
  }, [navigator, blocker, when])
}

export default function useBeforeunload(when = true) {
  const blocker = useCallback((tx) => {
    if (window.confirm('변경사항이 저장되지 않을 수 있습니다.'))
      tx.retry()
  }, [])

  useBlocker(blocker, when)
}
