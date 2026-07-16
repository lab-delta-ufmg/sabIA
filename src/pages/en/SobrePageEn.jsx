import React from 'react'
import { useNavigate } from 'react-router-dom'

const SobrePageEn = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-transparent">
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-12">
        <p className="text-xs md:text-sm tracking-widest uppercase font-semibold text-primary mb-6 md:mb-8">
          About sabIA
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-8 md:gap-12 lg:gap-16">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-0">
              Learn about our curation platform
            </h2>
          </div>

          <div>
            <p className="text-base md:text-lg leading-relaxed text-text-light mb-6 text-justify">
              sabIA is a platform for curating and exploring artificial intelligence tools applied
              to language teaching and learning. Designed as an accessible, educational, and collaborative
              space, sabIA enables students, educators, and curious learners to discover technological
              resources that support language practices focused on reading, writing, speaking, listening,
              vocabulary, text planning, translation, and more.
            </p>

            <p className="font-serif italic text-lg text-primary pl-5 border-l-2 border-primary mb-6">
              Inspired by the curious song of the sabia bird, the project values discovery, diversity,
              and care for shared knowledge.
            </p>

            <div className="bg-[#F5F0E8] border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xs uppercase tracking-widest font-bold text-primary mb-3">
                Our mission
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-gray-700 text-justify">
                Facilitate access to AI tools for language teaching and learning by offering thoughtful
                curation and pedagogical guidance for each featured resource.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20 pt-8 md:pt-12 border-t border-gray-300">
          <h3 className="text-lg font-semibold text-ink mb-6">Explore more</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/en/curation')}
              className="bg-[--ink] text-left p-4 hover:bg-[--ink2] transition-colors rounded-lg"
            >
              <h4 className="font-semibold text-[--ochre] mb-1">How curation works</h4>
              <p className="text-sm text-[--cream]">Understand our selection and analysis process</p>
            </button>

            <button
              onClick={() => navigate('/en/categories')}
              className="bg-[--ink] text-left p-4 hover:bg-[--ink2] transition-colors rounded-lg border border-gray-200"
            >
              <h4 className="font-semibold text-[--ochre] mb-1">Explore the categories</h4>
              <p className="text-sm text-[--cream]">See how we organize the tools</p>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SobrePageEn
