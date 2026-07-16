import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, LogOut } from 'lucide-react'
import { useAuthStore } from '../stores'

const AdminHeader = ({ title, subtitle, solicitacoesPendentes = 0 }) => {
  const location = useLocation()
  const { hasToolAccess, user, teamData, logout } = useAuthStore()
  const userName = teamData?.nome || user?.email?.split('@')[0] || 'Usuario'

  const navItemClass = ({ isActive }) =>
    `inline-flex items-center justify-center rounded-xl px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all ${
      isActive
        ? 'bg-[rgba(42,32,20,0.08)] text-[var(--terra)] shadow-sm'
        : 'text-[var(--ink2)] hover:bg-[rgba(42,32,20,0.05)] hover:text-[var(--terra)]'
    }`

  const tabClass = (active) =>
    `rounded-xl px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all ${
      active
        ? 'bg-[rgba(199,91,44,0.12)] text-[var(--terra)] shadow-sm'
        : 'text-[var(--ink2)] hover:bg-[rgba(42,32,20,0.04)] hover:text-[var(--ink)]'
    }`

  return (
    <>
      <header className="border-b border-[var(--line)] bg-[linear-gradient(180deg,rgba(239,227,207,0.94),rgba(239,227,207,0.78))] text-[var(--ink)] backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="kicker mb-2">Painel administrativo</p>
              <h1 className="heading-display text-2xl md:text-3xl">Painel SabIA</h1>
              <p className="mt-2 text-sm text-[var(--ink2)]">
                {subtitle || 'Gerencie ferramentas, páginas e solicitações'}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 md:gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--paper2)] px-2 py-1">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[--ochre]">
                  <span className="text-[11px] font-semibold text-[var(--cream)]">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="max-w-24 truncate text-[11px] font-semibold text-[var(--ink)] md:max-w-32">
                  {userName}
                </span>
              </div>

              {hasToolAccess() && (
                <NavLink to="/painel" className={navItemClass}>
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="ml-1">Painel</span>
                </NavLink>
              )}

              <button
                onClick={logout}
                className="inline-flex items-center rounded-xl px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink2)] transition-all hover:bg-[rgba(42,32,20,0.05)] hover:text-[var(--terra)]"
                title="Sair"
              >
                <LogOut className="h-4 w-4" />
                <span className="ml-1">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 overflow-hidden rounded-[1.25rem] border border-[var(--line)] bg-[rgba(251,246,236,0.9)] shadow-[0_18px_50px_rgba(42,32,20,0.08)]">
          <nav className="flex overflow-x-auto p-2">
            <Link to="/painel/ferramentas" className={tabClass(location.pathname.includes('/painel/ferramentas'))}>
              Ferramentas
            </Link>
            <Link to="/painel/paginas" className={tabClass(location.pathname.includes('/painel/paginas'))}>
              Páginas
            </Link>
            <Link to="/painel/solicitacoes" className={tabClass(location.pathname === '/painel/solicitacoes')}>
              Solicitações {solicitacoesPendentes > 0 && <span className="ml-1 rounded-full bg-[rgba(199,91,44,0.12)] px-2 py-0.5 text-xs font-semibold text-[var(--terra)]">{solicitacoesPendentes}</span>}
            </Link>
            <Link to="/painel/equipe" className={tabClass(location.pathname === '/painel/equipe')}>
              Equipe
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}

export default AdminHeader