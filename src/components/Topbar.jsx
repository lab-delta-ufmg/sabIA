import React from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores'
import { LayoutDashboard, LogOut } from 'lucide-react'

const Topbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, hasToolAccess, user, teamData, logout } = useAuthStore()

  const userName = teamData?.nome || user?.email?.split('@')[0] || 'Usuário'
  const isEnglish = location.pathname === '/en' || location.pathname.startsWith('/en/')

  const navItemClass = ({ isActive }) =>
    `inline-flex items-center justify-center rounded-xl px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all ${
      isActive
        ? 'bg-[rgba(42,32,20,0.08)] text-[var(--terra)] shadow-sm'
        : 'text-[var(--ink2)] hover:bg-[rgba(42,32,20,0.05)] hover:text-[var(--terra)]'
    }`

  const mapPtToEn = {
    '/': '/en',
    '/login': '/en/login',
    '/ferramentas': '/en/tools',
    '/posts': '/en/posts',
    '/post': '/en/post',
    '/ferramenta': '/en/tool',
    '/sobre': '/en/about',
    '/curadoria': '/en/curation',
    '/categorias': '/en/categories',
    '/modelo-livre': '/en/free-model',
    '/creditos': '/en/credits',
    '/equipe': '/en/team',
  }

  const mapEnToPt = {
    '/en': '/',
    '/en/login': '/login',
    '/en/tools': '/ferramentas',
    '/en/posts': '/posts',
    '/en/post': '/post',
    '/en/tool': '/ferramenta',
    '/en/about': '/sobre',
    '/en/curation': '/curadoria',
    '/en/categories': '/categorias',
    '/en/free-model': '/modelo-livre',
    '/en/credits': '/creditos',
    '/en/team': '/equipe',
  }

  const getSwitchedPath = (targetLang) => {
    const { pathname } = location

    if (pathname.startsWith('/painel')) {
      return pathname
    }

    if (targetLang === 'en') {
      if (pathname === '/en' || pathname.startsWith('/en/')) return pathname

      if (pathname.startsWith('/post/')) {
        return pathname.replace('/post/', '/en/post/')
      }

      if (pathname.startsWith('/ferramenta/')) {
        return pathname.replace('/ferramenta/', '/en/tool/')
      }

      return mapPtToEn[pathname] || '/en'
    }

    if (pathname === '/' || !pathname.startsWith('/en')) return pathname

    if (pathname.startsWith('/en/post/')) {
      return pathname.replace('/en/post/', '/post/')
    }

    if (pathname.startsWith('/en/tool/')) {
      return pathname.replace('/en/tool/', '/ferramenta/')
    }

    return mapEnToPt[pathname] || '/'
  }

  const switchLanguage = (targetLang) => {
    const nextPath = getSwitchedPath(targetLang)
    sessionStorage.setItem('sabia_lang', targetLang)
    navigate(nextPath)
  }

  return (
    <nav className="fixed top-0 z-50 mx-auto w-full bg-[rgba(251,246,236,0.40)] p-2 shadow-[0_8px_18px_-12px_rgba(0,0,0,0.28)] backdrop-blur-md md:px-4">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
        <Link
          to={isEnglish ? '/en' : '/'}
          className="group inline-flex items-center gap-2 rounded-xl px-2 transition-colors hover:bg-[rgba(42,32,20,0.05)]"
          title={isEnglish ? 'Go to home' : 'Ir para a página inicial'}
        >
          <img className="h-10 w-10 object-contain" alt="Logo sabIA" src="/logobig.png" />
          <h1 className="logo-mark text-xl leading-none text-[var(--ink)]">
            sab <span className="logo-ia">IA</span>
          </h1>
        </Link>

        <div className="flex items-center justify-end gap-2 md:gap-3">
          <div className="inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--paper2)]">
            <button
              type="button"
              onClick={() => switchLanguage('pt')}
              className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] transition-all md:text-[11px] ${
                !isEnglish
                  ? 'bg-[var(--terra)] text-[var(--cream)] shadow-sm'
                  : 'text-[var(--ink2)] hover:text-[var(--terra)]'
              }`}
              aria-pressed={!isEnglish}
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => switchLanguage('en')}
              className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] transition-all md:text-[11px] ${
                isEnglish
                  ? 'bg-[var(--terra)] text-[var(--cream)] shadow-sm'
                  : 'text-[var(--ink2)] hover:text-[var(--terra)]'
              }`}
              aria-pressed={isEnglish}
            >
              EN
            </button>
          </div>

          {!isAuthenticated ? (
            <NavLink to={isEnglish ? '/en/login' : '/login'} className={navItemClass}>
              <LayoutDashboard className="h-4 w-4" />
              <span className="ml-1">{isEnglish ? 'Login' : 'Login'}</span>
            </NavLink>
          ) : (
            <>
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
                  <span className="ml-1">{isEnglish ? 'Panel' : 'Painel'}</span>
                </NavLink>
              )}

              <button
                onClick={logout}
                className="inline-flex items-center rounded-xl px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink2)] transition-all hover:bg-[rgba(42,32,20,0.05)] hover:text-[var(--terra)]"
                title={isEnglish ? 'Sign out' : 'Sair'}
              >
                <LogOut className="h-4 w-4" />
                <span className="ml-1">{isEnglish ? 'Sign out' : 'Sair'}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Topbar