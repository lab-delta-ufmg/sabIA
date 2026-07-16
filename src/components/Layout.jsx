import React from 'react'
import { Outlet } from 'react-router-dom'
import CanvasBackground from './CanvasBackground'
import FooterNav from './FooterNav'
import Topbar from './Topbar'

const Layout = () => {
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