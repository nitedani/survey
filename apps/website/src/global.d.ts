export {}

declare namespace Express {
  export interface Request {
     session: any
  }
}
declare global {
  namespace Vike {
    interface PageContext {
      csrfToken: string
    }
  }
}
