import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Info, CheckCircle, Archive, BookOpen, Users } from 'lucide-react'
import { useFerramentasStore } from '../../stores'

const HomePageEn = () => {
  const { loading, error, loadFerramentas } = useFerramentasStore()
  const navigate = useNavigate()

  useEffect(() => {
    loadFerramentas()
  }, [loadFerramentas])

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
    <div className="min-h-screen p-6">
      <section className="py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="mb-8 md:mb-10">
            <img className="h-36 md:h-44 mx-auto" src="/logobig.png" alt="sabIA logo" />
          </div>

          <p className="kicker mb-5 tracking-[0.24em]">FACULTY OF LANGUAGES, LITERATURE, AND LINGUISTICS · UFMG</p>

          <h1 className="logo-mark text-6xl md:text-8xl leading-none mb-6">
            sab<span className="logo-ia">IA</span>
          </h1>

          <p className="heading-italic text-2xl md:text-4xl max-w-3xl mx-auto text-text-light">
            Knowledge base about Artificial Intelligence for Language Learning
          </p>
        </div>
      </section>

      <section className="p-0">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-display text-2xl md:text-3xl mb-4 text-center">Discover sabIA</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div
              onClick={() => navigate('/en/about')}
              className="surface-card surface-card-hover p-3 cursor-pointer group"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                  <Info className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-bold text-text-dark group-hover:text-primary transition-colors">About sabIA</h3>
              </div>
              <p className="text-sm text-text-light ml-11">
                Learn about our AI tools curation platform for language teaching and learning.
              </p>
            </div>

            <div
              onClick={() => navigate('/en/curation')}
              className="surface-card surface-card-hover p-3 cursor-pointer group"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-secondary/30 transition-colors">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-bold text-text-dark group-hover:text-primary transition-colors">How Curation Works</h3>
              </div>
              <p className="text-sm text-text-light ml-11">
                Understand our process for selecting and analyzing AI tools.
              </p>
            </div>

            <div
              onClick={() => navigate('/en/categories')}
              className="surface-card surface-card-hover p-3 cursor-pointer group"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                  <Archive className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-bold text-text-dark group-hover:text-primary transition-colors">Explore Categories</h3>
              </div>
              <p className="text-sm text-text-light ml-11">
                Explore our linguistic and pedagogical organization of available tools.
              </p>
            </div>

            <div
              onClick={() => navigate('/en/free-model')}
              className="surface-card surface-card-hover p-3 cursor-pointer group"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-secondary/30 transition-colors">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-bold text-text-dark group-hover:text-primary transition-colors">L.I.V.R.E. Model</h3>
              </div>
              <p className="text-sm text-text-light ml-11">
                Discover our framework for critically analyzing AI tools in language learning.
              </p>
            </div>

            <div
              onClick={() => navigate('/en/credits')}
              className="surface-card surface-card-hover p-3 cursor-pointer group"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-bold text-text-dark group-hover:text-primary transition-colors">Credits and License</h3>
              </div>
              <p className="text-sm text-text-light ml-11">
                Meet the team, usage license details, and project contact information.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex items-center justify-center p-6">
        <Link
          to="/en/tools"
          className="btn-primary text-2xl font-bold px-10 py-4"
        >
          Explore Tools
        </Link>
      </div>
      <div className="mx-auto flex items-center justify-center p-0">sabIA v.2.5 beta</div>
    </div>
  )
}

export default HomePageEn
