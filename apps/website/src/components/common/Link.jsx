export { Link }

import { Link as OriginalLink } from '@nextui-org/react'
import { forwardRef } from 'react'
import { navigate } from 'vike/client/router'

// the original @nextui-org/react Link breaks client-side navigation
const Link = forwardRef(({ children, ...props }, ref) => {
  const onClickHandler =
    'href' in props && !import.meta.env.SSR
      ? (e) => {
        e.preventDefault()
        props.href && navigate(props.href)
        props.onClick?.(e)
      }
      : props.onClick

  return (
    <OriginalLink {...props} ref={ref} onClick={onClickHandler}>
      {children}
    </OriginalLink>
  )
})
