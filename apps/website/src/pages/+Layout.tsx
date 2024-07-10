import { MyNavbar } from '#root/components/Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MyNavbar />
      <div className="p-4 max-w-[1024px] mx-auto">{children}</div>
    </div>
  )
}
