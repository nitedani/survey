import { useAuth } from '#root/hooks/useAuth'
import { withFallback } from 'vike-react-query'

export const Profile = withFallback(() => {
  const { me } = useAuth()

  return <div>Profile: {me?.email}</div>
})
