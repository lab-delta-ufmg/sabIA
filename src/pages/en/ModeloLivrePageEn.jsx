import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const dimensions = [
  {
    letter: 'L',
    name: 'Language',
    description: 'Does the tool support real language practices, or only mechanical responses?',
  },
  {
    letter: 'I',
    name: 'Intentionality',
    description: 'Is the user clear about the goal of use? Is use guided or simply replicated?',
  },
  {
    letter: 'V',
    name: 'Visibility of Processes',
    description: 'Does the tool allow users to understand how AI works, or is it a black box?',
  },
  {
    letter: 'R',
    name: 'Educational Relevance',
    description: 'Is the tool connected to learning goals, or does it only entertain?',
  },
  {
    letter: 'E',
    name: 'Ethics and Authorship',
    description: 'Is there transparency in use, data protection, and recognition of authorship?',
  },
]

export default function ModeloLivrePageEn() {
  const [activeDimension, setActiveDimension] = useState(0)
  const current = dimensions[activeDimension]

  return (
    <div className="min-h-screen bg-transparent">
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs md:text-sm tracking-widest uppercase font-semibold text-primary mb-6">
            Think before adopting
          </p>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            The L.I.V.R.E. model
          </h1>

          <p className="text-lg md:text-xl text-text-light leading-relaxed">
            Five dimensions to critically analyze the use of AI tools in language learning.
            Each letter is a guiding question to ask before adopting a technology.
          </p>
        </div>

        <div className="flex justify-center gap-3 md:gap-4 mb-12">
          {dimensions.map((dim, idx) => (
            <button
              key={dim.letter}
              onClick={() => setActiveDimension(idx)}
              className={`
                font-serif text-3xl md:text-4xl lg:text-5xl
                w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24
                rounded-2xl md:rounded-3xl
                flex items-center justify-center
                transition-all duration-300 ease-out
                ${
                  idx === activeDimension
                    ? 'bg-primary text-text-clear shadow-lg scale-105'
                    : 'bg-cream border border-line text-text-dark hover:bg-gray-100'
                }
              `}
              title={dim.name}
            >
              {dim.letter}
            </button>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-cream border border-line rounded-3xl p-8 md:p-12 text-center">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 md:mb-6 text-text-dark">
              <span className="text-primary">{current.name[0]}</span>
              <span>{current.name.slice(1)}</span>
            </h3>
            <p className="text-lg md:text-xl text-text-light leading-relaxed">
              {current.description}
            </p>
          </div>

          <p className="text-center text-sm text-text-light italic mt-6">
            Model developed by sabIA.
          </p>
        </div>

        <div className="mt-10 max-w-4xl mx-auto">
          <div className="surface-card p-4 md:p-8">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-4">How to use the model</h2>

            <p className="text-lg text-text-light mb-6">
              You can use L.I.V.R.E. to:
            </p>

            <div className="space-y-2 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-lg text-text-light">
                  Guide individual or group reflections about digital tools
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-lg text-text-light">
                  Critically evaluate AI use in your study routine
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-lg text-text-light">
                  Include it in projects, workshops, or teacher development sessions
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/en/categories"
                className="inline-block px-2 md:px-4 py-2 md:py-2 bg-primary text-text-clear rounded-xl font-semibold hover:bg-primary-dark transition-colors"
              >
                Explore the Categories
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
