import React, { useEffect, useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Calendar, Search, Filter, ExternalLink } from 'lucide-react'
import { usePaginasStore, useFerramentasStore } from '../../stores'

const PostsPageEn = () => {
  const { paginas, loading, error, loadPaginas } = usePaginasStore()
  const { ferramentas, loadFerramentas } = useFerramentasStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedFerramenta, setSelectedFerramenta] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadPaginas()
    loadFerramentas()
  }, [loadPaginas, loadFerramentas])

  const filteredPaginas = useMemo(() => {
    return paginas.filter((pagina) => {
      const matchesSearch = pagina.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pagina.autor.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesDate = !selectedDate ||
        new Date(pagina.created_at).toISOString().split('T')[0] === selectedDate

      const matchesFerramenta = !selectedFerramenta ||
        pagina.ferramenta_id?.toString() === selectedFerramenta

      return matchesSearch && matchesDate && matchesFerramenta
    })
  }, [paginas, searchTerm, selectedDate, selectedFerramenta])

  const generateSlug = (titulo) => {
    return titulo
      .toLowerCase()
      .replace(/[áàâãä]/g, 'a')
      .replace(/[éèêë]/g, 'e')
      .replace(/[íìîï]/g, 'i')
      .replace(/[óòôõö]/g, 'o')
      .replace(/[úùûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-light">Loading posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading posts: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent pb-12">
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
              Posts and Articles
            </h1>
            <p className="text-xs md:text-sm tracking-widest uppercase font-semibold text-primary mb-6 md:mb-8">
              Explore our content about Artificial Intelligence and Language Learning
            </p>
          </div>
        </div>
      </section>

      <section className="surface-panel max-w-6xl mx-auto sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-text-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="lg:w-48">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 text-text-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="lg:w-64 relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedFerramenta}
                onChange={(e) => setSelectedFerramenta(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-text-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none bg-white"
              >
                <option value="">All tools</option>
                {ferramentas.map((ferramenta) => (
                  <option key={ferramenta.id} value={ferramenta.id}>
                    {ferramenta.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-text-light">
            {filteredPaginas.length} post{filteredPaginas.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {filteredPaginas.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-light text-lg">
              {paginas.length === 0
                ? 'No posts available at the moment.'
                : 'No posts found with the applied filters.'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPaginas.map((pagina) => (
              <div key={pagina.id} className="surface-card surface-card-hover overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-text-dark flex-1 mr-3 line-clamp-2">
                      {pagina.titulo}
                    </h3>
                    {pagina.ferramentas && (
                      <div className="flex items-center gap-2">
                        <Link
                          to="/en/tools"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="View related tool"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-text-dark mb-1">Date</h4>
                      <div className="flex items-center text-sm text-text-light">
                        <Calendar className="w-4 h-4 mr-2 text-text-light" />
                        <span>
                          {new Date(pagina.created_at).toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-dark mb-1">Author</h4>
                      <p className="text-sm text-text-light">
                        {pagina.autor || 'Not informed'}
                      </p>
                    </div>
                  </div>

                  {pagina.ferramentas && (
                    <div>
                      <h4 className="text-sm font-semibold text-text-dark mb-1">Related Tool</h4>
                      <div className="flex flex-wrap gap-1">
                        <span className="chip-tag">
                          {pagina.ferramentas.nome}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-4 pb-4">
                  <Link
                    to={`/en/post/${generateSlug(pagina.titulo)}-${pagina.id}`}
                    className="btn-primary w-full text-sm"
                  >
                    Read Post
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default PostsPageEn
