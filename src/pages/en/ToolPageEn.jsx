import React, { useEffect, useState, useMemo } from 'react'
import { ExternalLink, Search, Filter } from 'lucide-react'
import { useFerramentasStore } from '../../stores'
import { useNavigate } from 'react-router-dom'

const getToolTags = (ferramenta) => {
  if (Array.isArray(ferramenta.tags_en) && ferramenta.tags_en.length > 0) {
    return ferramenta.tags_en
  }
  return Array.isArray(ferramenta.tags) ? ferramenta.tags : []
}

const ToolPageEn = () => {
  const { ferramentas, loading, error, loadFerramentas } = useFerramentasStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadFerramentas()
  }, [loadFerramentas])

  const filteredFerramentas = useMemo(() => {
    const sorted = [...ferramentas].sort((a, b) =>
      a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' })
    )

    return sorted.filter((ferramenta) => {
      const term = searchTerm.toLowerCase()
      const featureText = ferramenta.features || ferramenta.funcao
      const howCanHelpText = ferramenta.how_can_help || ferramenta.como_pode_ajudar
      const toolTags = getToolTags(ferramenta)

      const matchesSearch =
        ferramenta.nome.toLowerCase().includes(term) ||
        (featureText &&
          featureText.toLowerCase().includes(term)) ||
        (howCanHelpText &&
          howCanHelpText.toLowerCase().includes(term))

      const matchesTag =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => toolTags.includes(tag))

      return matchesSearch && matchesTag
    })
  }, [ferramentas, searchTerm, selectedTags])

  const allTags = useMemo(() => {
    const tags = new Set()
    ferramentas.forEach((ferramenta) => {
      getToolTags(ferramenta).forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [ferramentas])

  const getFaviconUrl = (url) => {
    if (!url) return null
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
    } catch {
      return null
    }
  }

  const getPricingConfig = (tipo) => {
    switch (tipo) {
      case 'gratuita':
        return {
          label: 'Free',
          className: 'bg-green-100 text-green-700'
        }
      case 'freemium':
        return {
          label: 'Freemium',
          className: 'bg-yellow-100 text-yellow-700'
        }
      case 'open_source':
        return {
          label: 'Open Source',
          className: 'bg-blue-100 text-blue-700'
        }
      default:
        return {
          label: 'Not informed',
          className: 'bg-gray-100 text-gray-600'
        }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-light">Loading tools...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading tools: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent">
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-3 grid-rows-1 max-w-4xl mx-auto px-6">
          <button
            onClick={() => navigate('/en')}
            className="row-span-2 flex items-center"
            title="Back"
          >
            <div className="w-32 h-32 flex items-center justify-center">
              <img
                src="/logobig.png"
                alt="Back"
                className="w-24 h-24"
              />
            </div>
          </button>

          <div className="col-span-2 items-center mt-6">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-0">
              AI Tools
            </h1>
            <p className="text-xs md:text-sm tracking-widest uppercase font-semibold text-primary mb-6 md:mb-8">
              Explore our curated AI tools for language teaching and learning
            </p>
          </div>
        </div>
      </section>

      <section className="surface-panel max-w-full mx-auto">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-start gap-4">
            <div className="lg:w-1/3 w-full min-w-[300px] grid gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="text-sm text-text-dark">
                {filteredFerramentas.length} tool{filteredFerramentas.length !== 1 ? 's' : ''} found
              </div>
            </div>

            <div className="lg:w-4/7 w-full min-w-[300px] flex flex-wrap gap-2 items-start lg:self-center text-text-dark font-bold">
              <Filter className="text-text-dark w-6 h-6" />

              <button
                type="button"
                onClick={() => setSelectedTags([])}
                className={`px-3 py-1 rounded-full border text-xs ${
                  selectedTags.length === 0
                    ? 'bg-primary text-white border-primary'
                    : 'chip-filter'
                }`}
              >
                All
              </button>

              {allTags.map((tag) => {
                const isSelected = selectedTags.includes(tag)
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() =>
                      setSelectedTags((prev) =>
                        isSelected ? prev.filter((t) => t !== tag) : [...prev, tag]
                      )
                    }
                    className={`px-3 py-1 rounded-full border text-sm ${
                      isSelected
                        ? 'bg-primary text-white border-primary'
                        : 'chip-filter'
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

      <main className="max-w-6xl mx-auto px-4 py-6">
        {filteredFerramentas.length === 0 ? (
          <div className="text-center py-2">
            <p className="text-text-dark text-lg">
              {ferramentas.length === 0
                ? 'No tools available at the moment.'
                : 'No tools found with the applied filters.'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFerramentas.map((ferramenta) => {
              const featureText = ferramenta.features || ferramenta.funcao
              const howCanHelpText = ferramenta.how_can_help || ferramenta.como_pode_ajudar
              const toolTags = getToolTags(ferramenta)

              return (
                <div key={ferramenta.id} className="surface-card surface-card-hover overflow-hidden flex flex-col h-full">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-[-6px]">
                    <div className="flex flex-col flex-1 mr-3">
                      <h3 className="text-lg font-bold text-text-dark">
                        {ferramenta.nome}
                      </h3>

                      <span
                        className={`mt-1 w-fit px-2 py-0.5 text-xs font-semibold rounded-full ${
                          getPricingConfig(ferramenta.gratuidade).className
                        }`}
                      >
                        {getPricingConfig(ferramenta.gratuidade).label}
                      </span>
                    </div>
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
                          title="Open tool"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-text-dark mb-1">What it is for</h4>
                      <p className="text-sm text-text-light">
                        {featureText || 'Not informed'}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-dark mb-1">Tags</h4>
                      <div className="flex flex-wrap gap-1">
                        {toolTags.length > 0 ? (
                          toolTags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="chip-tag">
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-text-light">No tags</span>
                        )}
                        {toolTags.length > 3 && (
                          <span className="text-sm text-text-light">
                            +{toolTags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {howCanHelpText && (
                    <div>
                      <h4 className="text-sm font-semibold text-text-dark mb-1">How it can help</h4>
                      <p className="text-sm text-text-light leading-relaxed line-clamp-3 text-justify">
                        {howCanHelpText}
                      </p>
                    </div>
                  )}
                </div>

                {ferramenta.link_site && (
                  <div className="px-4 pb-4">
                    <a
                      href={ferramenta.link_site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full text-sm"
                    >
                      Open Tool
                    </a>
                  </div>
                )}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

export default ToolPageEn
