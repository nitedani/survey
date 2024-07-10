import { authenticatedEndpointsFactory } from '#root/factories'
import { z } from 'zod'

export const me = authenticatedEndpointsFactory.build({
  method: 'get',
  tag: 'users',
  description: 'Retrieves the current user profile.',
  input: z.object({}),
  output: z.object({
    name: z.string({
      description: 'The name of the user.'
    }),
    email: z.string({
      description: 'The email of the user.'
    })
  }),
  handler: async ({ options: { session } }) => {
    return session.user
  }
})
