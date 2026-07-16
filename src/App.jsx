import React, { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'

// Store de autenticação
import { useAuthStore } from './stores'

// Layouts e componentes
import Layout from './components/Layout'

// Páginas principais
import HomePage from './pages/HomePage'
import ToolPage from './pages/ToolPage'
import PostsPage from './pages/PostsPage'
import PostPage from './pages/PostPage'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'

// Páginas em inglês
import HomePageEn from './pages/en/HomePageEn'
import ToolPageEn from './pages/en/ToolPageEn'
import PostsPageEn from './pages/en/PostsPageEn'
import PostPageEn from './pages/en/PostPageEn'
import LoginPageEn from './pages/en/LoginPageEn'
import SobrePageEn from './pages/en/SobrePageEn'
import CuradoriaPageEn from './pages/en/CuradoriaPageEn'
import CategoriasPageEn from './pages/en/CategoriasPageEn'
import ModeloLivrePageEn from './pages/en/ModeloLivrePageEn'
import EquipePageEn from './pages/en/EquipePageEn'

// Componente de proteção
import ProtectedAdminRoute from './components/ProtectedAdminRoute'

// Páginas estáticas
import SobrePage from './pages/SobrePage'
import CuradoriaPage from './pages/CuradoriaPage'
import CategoriasPage from './pages/CategoriasPage'
import ModeloLivrePage from './pages/ModeloLivrePage'
import EquipePage from './pages/EquipePage'

// Páginas administrativas
import CriarFerramenta from './pages/admin/CriarFerramenta'
import EditarFerramenta from './pages/admin/EditarFerramenta'
import ListarFerramentas from './pages/admin/ListarFerramentas'
import ListarPaginas from './pages/admin/ListarPaginas'
import CriarPagina from './pages/admin/CriarPagina'
import EditarPagina from './pages/admin/EditarPagina'
import GerenciarSolicitacoes from './pages/admin/GerenciarSolicitacoes'
import GerenciarEquipe from './pages/admin/GerenciarEquipe'

// Importar CSS do Tailwind
import './index.css'

const ptToEnMap = {
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

const enToPtMap = {
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

const resolveLanguagePath = (pathname, targetLang) => {
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

    return ptToEnMap[pathname] || '/en'
  }

  if (pathname === '/' || !pathname.startsWith('/en')) return pathname

  if (pathname.startsWith('/en/post/')) {
    return pathname.replace('/en/post/', '/post/')
  }

  if (pathname.startsWith('/en/tool/')) {
    return pathname.replace('/en/tool/', '/ferramenta/')
  }

  return enToPtMap[pathname] || '/'
}

const AutoLanguageRedirect = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const hasCheckedLanguage = useRef(false)

  useEffect(() => {
    if (hasCheckedLanguage.current) {
      return
    }

    hasCheckedLanguage.current = true

    const preferredLang = sessionStorage.getItem('sabia_lang')
    if (preferredLang !== 'pt' && preferredLang !== 'en') {
      return
    }

    const nextPath = resolveLanguagePath(location.pathname, preferredLang)
    if (nextPath !== location.pathname) {
      navigate(nextPath, { replace: true })
    }
  }, [location.pathname, navigate])

  return null
}

function App() {
  const { initAuth } = useAuthStore()

  // Inicializar autenticação quando o app carrega
  useEffect(() => {
    initAuth()
  }, [initAuth])

  return (
    <Router>
      <AutoLanguageRedirect />
      <Routes>
        {/* Rota de login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/en/login" element={<LoginPageEn />} />

        {/* Rotas públicas */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="ferramentas" element={<ToolPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="post/:slug" element={<PostPage />} />
          <Route path="ferramenta/:id" element={<ToolPage />} />
          
          {/* Páginas estáticas */}
          <Route path="sobre" element={<SobrePage />} />
          <Route path="curadoria" element={<CuradoriaPage />} />
          <Route path="categorias" element={<CategoriasPage />} />
          <Route path="modelo-livre" element={<ModeloLivrePage />} />
          <Route path="creditos" element={<EquipePage />} />
          <Route path="equipe" element={<Navigate to="/creditos" replace />} />
        </Route>

        {/* Rotas públicas em inglês */}
        <Route path="/en" element={<Layout />}>
          <Route index element={<HomePageEn />} />
          <Route path="tools" element={<ToolPageEn />} />
          <Route path="posts" element={<PostsPageEn />} />
          <Route path="post/:slug" element={<PostPageEn />} />
          <Route path="tool/:id" element={<ToolPageEn />} />

          <Route path="about" element={<SobrePageEn />} />
          <Route path="curation" element={<CuradoriaPageEn />} />
          <Route path="categories" element={<CategoriasPageEn />} />
          <Route path="free-model" element={<ModeloLivrePageEn />} />
          <Route path="credits" element={<EquipePageEn />} />
          <Route path="team" element={<Navigate to="/en/credits" replace />} />
        </Route>

        {/* Rotas protegidas - Painel Administrativo */}
        <Route path="/painel" element={<ProtectedAdminRoute />}>
          <Route index element={<AdminDashboard />} />
          <Route path="ferramentas" element={<ListarFerramentas />} />
          <Route path="ferramentas/criar" element={<CriarFerramenta />} />
          <Route path="ferramentas/editar/:id" element={<EditarFerramenta />} />
          <Route path="paginas" element={<ListarPaginas />} />
          <Route path="paginas/criar" element={<CriarPagina />} />
          <Route path="paginas/editar/:id" element={<EditarPagina />} />
          <Route path="solicitacoes" element={<GerenciarSolicitacoes />} />
          <Route path="equipe" element={<GerenciarEquipe />} />
        </Route>

        {/* Rota de fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App