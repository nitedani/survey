import { EffectCallback, useEffect, useRef } from 'react'

/**
 *
 * Run only once in React.StrictMode
 */

export const useEffectOnce = (effect: EffectCallback) => {
  if (import.meta.env.DEV) {
    const cleanup = useRef<any>(null)
    useEffect(() => {
      if (cleanup.current === null) {
        cleanup.current = effect()
      } else {
        return cleanup.current
      }
    }, [])
  } else {
    useEffect(effect, [])
  }
}
