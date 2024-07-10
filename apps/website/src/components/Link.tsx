export { Link }

import { LinkProps, Link as OriginalLink, forwardRef } from '@nextui-org/react'
import { navigate } from 'vike/client/router'

// the original @nextui-org/react Link breaks client-side navigation
const Link = forwardRef(({ children, ...props }: LinkProps, ref) => {
  const onClickHandler =
    'href' in props && !import.meta.env.SSR
      ? (e: any) => {
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
