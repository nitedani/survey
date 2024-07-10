import { usersApi } from '#root/server/client'
import { useSuspenseQuery } from '@tanstack/react-query'

export const useUser = ({ id }: { id: string }) => {
  return useSuspenseQuery({
    queryKey: ['user', id],
    queryFn: () => usersApi.getV1UsersId({ id })
  }).data
}
