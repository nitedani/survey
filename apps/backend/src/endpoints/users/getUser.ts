import { prisma } from '#root/db'
import { authenticatedEndpointsFactory } from '#root/factories'
import createHttpError from 'http-errors'
import { z } from 'zod'

export const getUser = authenticatedEndpointsFactory.build({
  method: 'get',
  tag: 'users',
  description: 'Retrieves the user by id.',
  input: z.object({
    id: z.string()
  }),
  output: z.object({
    name: z.string({
      description: 'The name of the user.'
    }),
    email: z.string({
      description: 'The email of the user.'
    })
  }),
  handler: async ({ options: { session }, input: { id } }) => {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    if (!user) {
      throw createHttpError(404, 'User not found')
    }
    return user
  }
})
