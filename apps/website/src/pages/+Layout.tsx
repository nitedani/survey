import { MyNavbar } from '#root/components/Navbar'
import {
  LayoutDashboard,
  FileText,
  Coins,
  ShoppingBag,
  Settings,
  HelpCircle,
  Search,
  Bell,
  User,
  PlusCircle,
  BarChart2,
  Users,
  DollarSign,
  CreditCard
} from 'lucide-react'
import { usePageContext } from 'vike-react/usePageContext'

const NavItem = ({ icon: Icon, label, href }) => {
  const ctx = usePageContext()
  const active = ctx.urlPathname === href

  return (
    <a href={href}>
      <button
        className={`w-[90%] my-1 mx-auto pl-4 flex items-center py-2 rounded-lg ${
          active ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Icon size={20} className="mr-3" />
        <span className="font-medium">{label}</span>
      </button>
    </a>
  )
}
export default function Layout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'surveys', label: 'Surveys', icon: FileText },
    { id: 'wallet', label: 'Wallet', icon: Coins },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ]

  return (
    <div className="flex flex-col h-screen">
      <MyNavbar />
      <div className="flex flex-grow">
        <div className="w-48 fixed">
          {navItems.map((item) => (
            <NavItem key={item.id} icon={item.icon} label={item.label} href={`/${item.id}`} />
          ))}
        </div>

        <div className="ml-48 p-4 bg-gray-100 flex-grow">{children}</div>
      </div>
    </div>
  )
}
