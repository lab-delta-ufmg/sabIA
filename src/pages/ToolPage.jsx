import React, { useEffect, useState, useMemo } from 'react'
import { ExternalLink, Search, Filter } from 'lucide-react'
import { useFerramentasStore } from '../stores'
import { useNavigate } from 'react-router-dom'

const ToolPage = () => {
  const { ferramentas, loading, error, loadFerramentas } = useFerramentasStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadFerramentas()
  }, [loadFerramentas])

  // Filtrar ferramentas baseado na busca e tag selecionada
  const filteredFerramentas = useMemo(() => {
    // 1) cria uma cópia e ordena A → Z pelo nome
    const sorted = [...ferramentas].sort((a, b) =>
      a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' })
    )

    // 2) aplica filtros em cima da lista ordenada
    return sorted.filter((ferramenta) => {
      const termo = searchTerm.toLowerCase()

      const matchesSearch =
        ferramenta.nome.toLowerCase().includes(termo) ||
        (ferramenta.funcao &&
          ferramenta.funcao.toLowerCase().includes(termo)) ||
        (ferramenta.como_pode_ajudar &&
          ferramenta.como_pode_ajudar.toLowerCase().includes(termo))
      
      const matchesTag =
        selectedTags.length === 0 ||
        (ferramenta.tags &&
          selectedTags.every((tag) => ferramenta.tags.includes(tag)))
      
      return matchesSearch && matchesTag
    })
  }, [ferramentas, searchTerm, selectedTags])

  // Obter todas as tags únicas
  const allTags = useMemo(() => {
    const tags = new Set()
    ferramentas.forEach(ferramenta => {
      if (ferramenta.tags && Array.isArray(ferramenta.tags)) {
        ferramenta.tags.forEach(tag => tags.add(tag))
      }
    })
    return Array.from(tags).sort()
  }, [ferramentas])

  // Função para obter favicon de um site
  const getFaviconUrl = (url) => {
    if (!url) return null
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
    } catch {
      return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-light">Carregando ferramentas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Erro ao carregar ferramentas: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <div className="bg-primary text-text-clear pt-4 pb-12 relative">
        <div className="max-w-4xl mx-auto px-6">

          {/* Botão de voltar com ícone da logo */}
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 top-4 flex items-center p-02"
            title="Voltar"
          >
            <div className="w-32 h-32 ml-32 bg-text-clear/100 backdrop-blur-md rounded-full flex items-center justify-center shadow-md hover:bg-text-clear/80 transition">
              <img
                src="/logobig.png"
                alt="Voltar"
                className="w-24 h-24"
              />
            </div>
          </button>

          <div className="flex flex-col items-center mt-6">
            <h1 className="text-3xl md:text-4xl text-text-clear font-bold mb-2 mt-0">
              Ferramentas de IA
            </h1>
            <p className="text-lg text-text-clear">
                  Explore nossa curadoria de ferramentas de inteligência artificial para ensino de línguas
                </p>
          </div>

              </div>
            </div>

                {/* Filtros */}
                <section className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-lg shadow-sm sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Barra de busca  + Contador de ferramentas*/}
                <div className="lg:w-1/3 w-full min-w-[300px] grid gap-2">

                  {/* Barra de busca */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                    <input
                      type="text"
                      placeholder="Buscar ferramentas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  {/* Contador de ferramentas */}
                  <div className="text-sm text-text-dark">
                    {filteredFerramentas.length} ferramenta{filteredFerramentas.length !== 1 ? 's' : ''} encontrada{filteredFerramentas.length !== 1 ? 's' : ''}
                  </div>

                </div>

                {/* Filtro por tags */}
              <div className="lg:w-4/7 w-full min-w-[300px] flex flex-wrap gap-2 items-start lg:self-center text-text-dark font-bold">
                <Filter className="text-text-dark  w-6 h-6" />

                {/* Botão "Todas" */}
                <button
                  type="button"
                  onClick={() => setSelectedTags([])}
                  className={`px-3 py-1 rounded-full border text-xs ${
                    selectedTags.length === 0
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-text-dark border-gray-300'
                  }`}
                >
                  Todas
                </button>

                {/* Chips de tags */}
                {allTags.map(tag => {
                  const isSelected = selectedTags.includes(tag)
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() =>
                        setSelectedTags(prev =>
                          isSelected ? prev.filter(t => t !== tag) : [...prev, tag]
                        )
                      }
                      className={`px-3 py-1 rounded-full border text-sm ${
                        isSelected
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-text-dark border-gray-300'
                      }`}
                    >
                      {tag}
                    </button>
                  )
                })}
              </div>
          </div>
        </div>
      </section>

      {/* Grid de Cards */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {filteredFerramentas.length === 0 ? (
          <div className="text-center py-2">
            <p className="text-text-dark text-lg">
              {ferramentas.length === 0 
                ? 'Nenhuma ferramenta disponível no momento.' 
                : 'Nenhuma ferramenta encontrada com os filtros aplicados.'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFerramentas.map((ferramenta) => (
              <div key={ferramenta.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                {/* Header do card */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-[-6px]">
                    <h3 className="text-lg font-bold text-text-dark flex-1 mr-3">
                      {ferramenta.nome}
                    </h3>
                    {ferramenta.link_site && (
                      <div className="flex items-center gap-2">
                        {getFaviconUrl(ferramenta.link_site) && (
                          <img 
                            src={getFaviconUrl(ferramenta.link_site)} 
                            alt=""
                            className="w-8 h-8"
                            onError={(e) => { e.target.style.display = 'none' }}
                          />
                        )}
                        <a
                          href={ferramenta.link_site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Acessar ferramenta"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Conteúdo do card */}
                <div className="p-4">
                  {/* Função e Tags */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-text-dark mb-1">Função</h4>
                      <p className="text-sm text-text-dark">
                        {ferramenta.funcao || 'Não informado'}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-dark mb-1">Tags</h4>
                      <div className="flex flex-wrap gap-1">
                        {ferramenta.tags && ferramenta.tags.length > 0 ? (
                          ferramenta.tags.slice(0, 3).map((tag, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 text-xs bg-secondary/20 text-text-light font-bold rounded-full"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-text-light">Sem tags</span>
                        )}
                        {ferramenta.tags && ferramenta.tags.length > 3 && (
                          <span className="text-sm text-text-light">
                            +{ferramenta.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Como pode ajudar */}
                  {ferramenta.como_pode_ajudar && (
                    <div>
                      <p className="text-sm text-text-light leading-relaxed line-clamp-3 text-justify">
                        {ferramenta.como_pode_ajudar}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer do card com link */}
                {ferramenta.link_site && (
                  <div className="px-4 pb-4">
                    <a
                      href={ferramenta.link_site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-primary text-text-clear py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                      Acessar Ferramenta
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default ToolPage