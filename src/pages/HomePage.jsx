import React, { useEffect } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import { Info, CheckCircle, Archive, BookOpen, Users } from 'lucide-react'
import { useFerramentasStore } from '../stores'

const HomePage = () => {
  const { ferramentas, loading, error, loadFerramentas } = useFerramentasStore()
  const navigate = useNavigate()

  useEffect(() => {
    loadFerramentas()
  }, [loadFerramentas])

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-light">Carregando ferramentas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Erro ao carregar ferramentas: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      {/* Hero Section */}
        <section className="py-10 md:py-14">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="mb-8 md:mb-10">
              <img className="h-36 md:h-44 mx-auto" src="/logobig.png" alt="Logo Sabia" />
            </div>

            <p className="kicker mb-5 tracking-[0.24em]">FACULDADE DE LETRAS · UFMG</p>

            <h1 className="logo-mark text-6xl md:text-8xl leading-none mb-6">
              sab<span className="logo-ia">IA</span>
            </h1>

            <p className="heading-italic text-2xl md:text-4xl max-w-3xl mx-auto text-text-light">
              Saberes sobre Inteligência Artificial para a Aprendizagem de Línguas
            </p>
          </div>
        </section>

        {/* Seção de Páginas Informativas */}
      <section className="p-0">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-display text-2xl md:text-3xl mb-4 text-center">Conheça o sabIA</h2>
          
          {/* Grid de 2 colunas sem scrollbar - mais compacto */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div 
              onClick={() => navigate('/sobre')}
              className="surface-card surface-card-hover p-3 cursor-pointer group"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                  <Info className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-bold text-text-dark group-hover:text-primary transition-colors">Sobre O SabIA</h3>
              </div>
              <p className="text-sm text-text-light ml-11">
                Conheça nossa plataforma de curadoria de ferramentas de IA para ensino de línguas.
              </p>
            </div>

            <div 
              onClick={() => navigate('/curadoria')}
              className="surface-card surface-card-hover p-3 cursor-pointer group"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-secondary/30 transition-colors">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-bold text-text-dark group-hover:text-primary transition-colors">Como Funciona a Curadoria</h3>
              </div>
              <p className="text-sm text-text-light ml-11">
                Entenda nosso processo de seleção e análise das ferramentas de inteligência artificial.
              </p>
            </div>

            <div 
              onClick={() => navigate('/categorias')}
              className="surface-card surface-card-hover p-3 cursor-pointer group"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                  <Archive className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-bold text-text-dark group-hover:text-primary transition-colors">Conheça as Categorias</h3>
              </div>
              <p className="text-sm text-text-light ml-11">
                Explore nossa organização linguístico-pedagógica das ferramentas disponíveis.
              </p>
            </div>

            <div 
              onClick={() => navigate('/modelo-livre')}
              className="surface-card surface-card-hover p-3 cursor-pointer group"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-secondary/30 transition-colors">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-bold text-text-dark group-hover:text-primary transition-colors">Modelo L.I.V.R.E.</h3>
              </div>
              <p className="text-sm text-text-light ml-11">
                Descubra nosso framework para análise crítica de ferramentas de IA na aprendizagem de línguas.
              </p>
            </div>

            <div 
              onClick={() => navigate('/creditos')}
              className="surface-card surface-card-hover p-3 cursor-pointer group"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-bold text-text-dark group-hover:text-primary transition-colors">Créditos e Licença</h3>
              </div>
              <p className="text-sm text-text-light ml-11">
                Conheça nossa equipe, licenças de uso e informações de contato do projeto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Ferramentas */}
        <div className="mx-auto flex items-center justify-center p-6">
          <Link
            to="/ferramentas"
            className="btn-primary text-2xl font-bold px-10 py-4"
          >
            Explorar Ferramentas
          </Link>
        </div>
        <div className="mx-auto flex items-center justify-center p-0"> SabIA  v.2.5 beta</div>

    </div>
  )
}

export default HomePage