import { AsyncLocalStorage } from 'async_hooks'
import type { NextFunction, Request, Response } from 'express'

export type ReqContext = {
  req: Request
  res: Response
}

declare global {
  // eslint-disable-next-line no-var
  var __storage: AsyncLocalStorage<ReqContext>
}

globalThis.__storage ??= new AsyncLocalStorage<ReqContext>()
export const getRequestContext = () => globalThis.__storage.getStore()! as ReqContext
export const requestContextMiddleware = (req: Request, res: Response, next: NextFunction) => {
  globalThis.__storage.run({ req, res } satisfies ReqContext, next)
}
