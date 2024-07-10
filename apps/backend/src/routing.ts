import { Routing } from 'express-zod-api'
import { me } from './endpoints/users/me'
import { getUser } from './endpoints/users/getUser'

export const routing: Routing = {
  v1: {
    users: {
      me,
      ':id': getUser
    }
  }
}
