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
import { useSupabase } from '#root/hooks/useSupabase'
import { Bell, Coins } from 'lucide-react'

export function MyNavbar() {
  const { session, logout } = useSupabase()
  const user = session?.user

  return (
    <Navbar maxWidth="full">
      <span className="text-2xl font-bold text-indigo-600">SurveyDash 📊💰</span>
      <NavbarContent justify="end">
        <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full flex items-center">
          <Coins size={16} className="mr-2" />
          <span className="font-semibold">5,230 SVC</span>
        </div>
        <button className="text-gray-500 hover:text-indigo-600">
          <Bell size={20} />
        </button>
        {!user && (
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
        {user && (
          <Dropdown>
            <DropdownTrigger>
              <User
                name={user.identities?.[0].identity_data?.full_name}
                description={user.email}
                isFocusable
                className="cursor-pointer"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">View profile</DropdownItem>
              <DropdownItem key="copy">Settings</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger" onClick={logout}>
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
    </Navbar>
  )
}
