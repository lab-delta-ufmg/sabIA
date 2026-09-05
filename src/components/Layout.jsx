import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import CanvasBackground from './CanvasBackground'
import FooterNav from './FooterNav'
import Topbar from './Topbar'
import { visitasService } from '../services/supabase'

const Layout = () => {
  const location = useLocation()

  useEffect(() => {
    const idioma = location.pathname === '/en' || location.pathname.startsWith('/en/') ? 'en' : 'pt'
    visitasService.registrarVisita(location.pathname, idioma)
    // Registrar apenas uma vez, ao montar o Layout (uma visita por sessão)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-background">
      <CanvasBackground />

      {/* Conteúdo principal */}
      <main className="relative z-10 mt-10 pb-20">
        <Outlet />
      </main>
      
      {/* Navegação superior */}
      <Topbar />
      {/* Navegação inferior */}
      <FooterNav />
    </div>
  )
}

export default Layout