import './index.css'
import { NextUIProvider } from '@nextui-org/react'

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>
}
