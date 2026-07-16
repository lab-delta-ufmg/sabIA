import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Home, BookOpen, Settings } from 'lucide-react'

const FooterNav = () => {
  const location = useLocation()
  const isEnglish = location.pathname === '/en' || location.pathname.startsWith('/en/')

  const baseItems = isEnglish
    ? [
        { name: 'Home', path: '/en', icon: Home },
        { name: 'Tools', path: '/en/tools', icon: Settings },
        { name: 'Posts', path: '/en/posts', icon: BookOpen },
      ]
    : [
        { name: 'Ninho', path: '/', icon: Home },
        { name: 'Ferramentas', path: '/ferramentas', icon: Settings },
        { name: 'Posts', path: '/posts', icon: BookOpen },
      ]

  const navItemClass = ({ isActive }) =>
    `flex flex-col items-center justify-center rounded-2xl px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all ${
      isActive
        ? 'text-[var(--terra)] shadow-sm'
        : 'text-[var(--cream)] hover:text-[var(--ochre)]'
    }`

  return (
    <nav className="fixed bottom-0 z-50 mx-auto w-full border border-[var(--line)] bg-[#2a2014]/70 p-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.2)] backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-2 md:gap-3">
          {baseItems.map((item) => {
            const IconComponent = item.icon

            return (
              <NavLink key={item.name} to={item.path} className={navItemClass}>
                <IconComponent className="h-5 w-5" />
                <span className="mt-1">{item.name}</span>
              </NavLink>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default FooterNav