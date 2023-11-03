import Image from "next/image"
import ListMenu from "./ListMenu"
import menu from '@/app/assets/svg/menu.svg'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <nav className="flex justify-between p-4 lg:p-0 items-center">
            <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
              <Image
                className="cursor-pointer"
                src={menu}
                alt="Menu Icon"
              />
            </label>
          </nav>
          <main className="lg:mx-8 lg:mt-5">
          {children}
          </main>
        </div>
        <aside className="drawer-side relative hidden md:flex">
          <label htmlFor="my-drawer-2" className="drawer-overlay">
          </label>
          <div className="menu w-80 p-4 min-h-full bg-warning">
            <div className="text-white">
              <h1 className="font-bold text-2xl p-4">Cafetaria</h1>
              <ListMenu />
            </div>
          </div>
        </aside>
      </div>
    </>
      ) 
}