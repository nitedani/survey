import { useAuth } from '#root/hooks/useAuth'
import { useEffectOnce } from '#root/hooks/useEffectOnce'

export default function Page() {
  const { handleThirdPartyCallback } = useAuth()
  useEffectOnce(() => {
    handleThirdPartyCallback()
  })

  return <div>Signing in...</div>
}
