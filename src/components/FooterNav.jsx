import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../stores'
import { Home, BookOpen, Settings, Users, LayoutDashboard, LogOut } from 'lucide-react'

const FooterNav = () => {
  const { isAuthenticated, hasToolAccess, user, teamData, logout } = useAuthStore()

  const baseItems = [
    { name: 'Ninho', path: '/', icon: Home },
    { name: 'Ferramentas', path: '/ferramentas', icon: Settings },
    { name: 'Posts', path: '/posts', icon: BookOpen },
  ]

  const userName = teamData?.nome || user?.email?.split('@')[0] || 'Usuário'

  const navItemClass = ({ isActive }) =>
    `flex flex-col items-center justify-center rounded-2xl px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all ${
      isActive
        ? 'text-[var(--terra)] shadow-sm'
        : 'text-[var(--cream)] hover:text-[var(--ochre)]'
    }`

  return (
    <nav className="fixed bottom-0 z-50 mx-auto w-full border border-[var(--line)] bg-[#2a2014]/70 p-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.2)] backdrop-blur-md">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex-1" />

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

        <div className="flex flex-1 items-center justify-end gap-2 md:gap-3">
          {!isAuthenticated ? (
            <NavLink to="/login" className={navItemClass}>
              <LayoutDashboard className="h-5 w-5" />
              <span className="mt-1">Login</span>
            </NavLink>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center rounded-2xl">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[--ochre]">
                  <span className="text-[11px] font-semibold text-[var(--cream)]">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="mt-1 max-w-16 truncate text-[11px] text-[var(--cream)]">
                  {userName}
                </span>
              </div>

              {hasToolAccess() && (
                <NavLink to="/painel" className={navItemClass}>
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="mt-1">Painel</span>
                </NavLink>
              )}

              <button
                onClick={logout}
                className="flex flex-col items-center justify-center rounded-2xl text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink2)] transition-all hover:bg-[rgba(42,32,20,0.04)] hover:text-[var(--cream)]"
                title="Sair"
              >
                <LogOut className="h-5 w-5" />
                <span className="mt-1">Sair</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default FooterNav