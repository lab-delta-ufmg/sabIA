import React, { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Calendar, ArrowLeft, ExternalLink } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { usePaginasStore } from '../../stores'
import 'prismjs/themes/prism.css'

const PostPageEn = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { paginaAtual, loading, error, loadPagina } = usePaginasStore()

  useEffect(() => {
    const id = slug.split('-').pop()
    if (id && !isNaN(id)) {
      loadPagina(parseInt(id, 10))
    }
  }, [slug, loadPagina])

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-light">Loading post...</p>
        </div>
      </div>
    )
  }

  if (error || !paginaAtual) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {error || 'Post not found'}
          </p>
          <button
            onClick={() => navigate('/en/posts')}
            className="btn-primary"
          >
            Back to Posts
          </button>
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
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/en/posts')}
              className="btn-secondary"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Posts
            </button>

            <div className="text-sm text-text-light">
              {new Date(paginaAtual.created_at).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <article className="surface-card overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-text-dark flex-1 mr-4">
                {paginaAtual.titulo}
              </h1>
              {paginaAtual.ferramentas && (
                <Link
                  to="/en/tools"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors shrink-0"
                  title="View related tool"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-text-dark mb-1">Author</h4>
                <p className="text-sm text-text-light">
                  {paginaAtual.autor || 'Not informed'}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-text-dark mb-1">Related Tool</h4>
                <div className="flex items-center gap-2">
                  {paginaAtual.ferramentas ? (
                    <Link
                      to="/en/tools"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      {paginaAtual.ferramentas.nome}
                    </Link>
                  ) : (
                    <span className="text-xs text-text-light/70">None</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="markdown-content max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {paginaAtual.conteudo || 'No content available.'}
              </ReactMarkdown>
            </div>
          </div>

          <div className="px-6 pb-6">
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-text-light">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  Published on {new Date(paginaAtual.created_at).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    weekday: 'long'
                  })}
                </span>
              </div>

              {paginaAtual.ferramentas && (
                <Link
                  to="/en/tools"
                  className="btn-primary text-sm"
                >
                  View Tool
                </Link>
              )}
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}

export default PostPageEn
