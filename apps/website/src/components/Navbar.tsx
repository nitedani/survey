import { useAuth } from '#root/hooks/useAuth'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  User,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { Link } from './Link'

export function MyNavbar() {
  // const { me, signOut } = useAuth()

  return (
    <Navbar>
      <NavbarBrand className="h-full">
        <img src="/logo.png" className="h-full py-2 mr-2" alt="" />
        <p className="font-bold text-inherit">App</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4">
        {/* <NavbarItem>
          <Link color="foreground" href="/">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/">
            Integrations
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify="end">
        {/* {!me && (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/auth/login">Log in</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/auth/signup" variant="flat">
                Sign up
              </Button>
            </NavbarItem>
          </>
        )}
        {me && (
          <Dropdown>
            <DropdownTrigger>
              <User name={me.name} description={me.email} isFocusable className="cursor-pointer" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">View profile</DropdownItem>
              <DropdownItem key="copy">Settings</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger" onClick={signOut}>
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )} */}
      </NavbarContent>
    </Navbar>
  )
}
