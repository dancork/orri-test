import { forwardRef } from 'react'
import {
  NavLink as RouterNavLink,
  NavLinkProps as RouterLinkNavProps,
} from 'react-router-dom'

export const MappedNavLink = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkNavProps, 'to'> & { href: RouterLinkNavProps['to'] }
>((props, ref) => {
  const { href, ...other } = props
  // Map href (Material UI) -> to (react-router)
  return <RouterNavLink ref={ref} to={href} {...other} />
})
