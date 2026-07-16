import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Info, BookOpen } from 'lucide-react'

const CuradoriaPageEn = () => {
  const navigate = useNavigate()

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
              How Curation Works in sabIA
            </h1>
            <p className="text-xs md:text-sm tracking-widest uppercase font-semibold text-primary mb-6 md:mb-8">
              Our selection and analysis process
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-2">
        <div className="surface-card text-text-light p-8">
          <div className="mb-10">
            <p className="leading-relaxed mb-4 text-justify">
              sabIA was created to help students, teachers, and curious learners critically and creatively
              explore artificial intelligence tools applied to language learning.
            </p>

            <p className="leading-relaxed mb-4 text-justify">
              To do this, listing tools is not enough: we need to organize, contextualize, and explain
              how each one can (or cannot) contribute to teaching and learning processes.
            </p>

            <div className="surface-accent p-6">
              <p className="font-medium text-justify">
                This is the role of our curation. Every tool included in sabIA goes through a
                selection and analysis process where we seek to identify:
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>its native uses (that is, what it is originally designed for); and</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>its pedagogical potential for language learning.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-10">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                <Info className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-text-dark">What It Is For</h2>
            </div>

            <p className="text-text-light leading-relaxed mb-4 text-justify">
              This field describes the tool's main function: what it does and what its native use is,
              regardless of educational context.
            </p>

            <p className="text-text-light mb-4 text-justify">
              Here you will find objective and direct descriptions of how the tool works.
            </p>

            <div className="surface-accent p-4">
              <h4 className="font-semibold text-text-light mb-3">Examples:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Generate images from text descriptions.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Automatically transcribe audio and video.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Simulate interactive dialogues in different contexts.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-4 text-text-light">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-text-dark">How It Can Help</h2>
            </div>

            <p className="leading-relaxed mb-4 text-justify">
              This field highlights the tool's potential for language learning. In other words,
              we describe how it can be integrated into autonomous learning paths or pedagogical practices.
            </p>

            <p className="mb-4 text-justify">
              Here you will find educational potential: use possibilities that expand learning.
            </p>

            <div className="surface-accent p-4">
              <h4 className="font-semibold mb-3">Examples:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Stimulate writing production through creative image-based activities.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Support listening and oral comprehension development with transcripts and audio.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Promote fluency practice through simulated conversations.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-10">
        <div className="mt-4 pt-8 border-t border-gray-300">
          <h3 className="text-lg font-semibold text-ink mb-6">Explore more</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/en/about')}
              className="bg-[--ink] text-left p-4 hover:bg-[--ink2] transition-colors rounded-lg"
            >
              <h4 className="font-semibold text-[--ochre] mb-1">About sabIA</h4>
              <p className="text-sm text-[--cream]">Learn about our platform and mission</p>
            </button>

            <button
              onClick={() => navigate('/en/categories')}
              className="bg-[--ink] text-left p-4 hover:bg-[--ink2] transition-colors rounded-lg"
            >
              <h4 className="font-semibold text-[--ochre] mb-1">Explore the categories</h4>
              <p className="text-sm text-[--cream]">See how we organize the tools</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CuradoriaPageEn
