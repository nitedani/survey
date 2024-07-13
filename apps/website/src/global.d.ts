import type { Request, Response } from 'express'
import type { Session, SupabaseClient, User } from '@supabase/supabase-js'

declare global {
  declare namespace Express {
    export interface Request {
      supabase: SupabaseClient
      user?: User
      session?: Session
    }
  }

  namespace Vike {
    interface PageContext {
      req: Request
      res: Response
      supabase: SupabaseClient
      user?: User
      session?: Session
    }
  }
}
