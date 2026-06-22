import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const dimensions = [
  {
    letter: 'L',
    name: 'Linguagem',
    description: 'A ferramenta favorece práticas reais de linguagem ou apenas respostas mecânicas?',
  },
  {
    letter: 'I',
    name: 'Intencionalidade',
    description: 'O usuário tem clareza sobre o objetivo do uso? É guiado ou apenas replicado?',
  },
  {
    letter: 'V',
    name: 'Visibilidade dos Processos',
    description: 'A ferramenta permite compreender como a IA funciona ou é uma "caixa-preta"?',
  },
  {
    letter: 'R',
    name: 'Relevância Educacional',
    description: 'A proposta da ferramenta se conecta a objetivos de aprendizagem ou só entretém?',
  },
  {
    letter: 'E',
    name: 'Ética e Autoria',
    description: 'Há transparência no uso, proteção de dados e reconhecimento de autoria?',
  },
]

export default function ModeloLivrePage() {
  const navigate = useNavigate()
  const [activeDimension, setActiveDimension] = useState(0)
  const current = dimensions[activeDimension]

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-32">
        {/* Centered Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Label */}
          <p className="text-xs md:text-sm tracking-widest uppercase font-semibold text-primary mb-6">
            Pensar antes de adotar
          </p>

          {/* Title */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            O modelo L.I.V.R.E.
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-text-light leading-relaxed">
            Cinco dimensões para analisar criticamente o uso de ferramentas de IA na aprendizagem de línguas. Cada letra é uma pergunta a se fazer antes de adotar uma tecnologia.
          </p>
        </div>

        {/* Letter Buttons */}
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

        {/* Info Card */}
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
          
          {/* Footer Text */}
          <p className="text-center text-sm text-text-light italic mt-6">
            Modelo desenvolvido pelo sabIA.
          </p>
        </div>

        {/* Usage Section */}
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="surface-card p-4 md:p-8">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-4">Como usar o modelo?</h2>
            
            <p className="text-lg text-text-light mb-6">
              Você pode utilizar o L.I.V.R.E. para:
            </p>

            <div className="space-y-2 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-lg text-text-light">
                  Guiar reflexões individuais ou em grupo sobre ferramentas digitais
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-lg text-text-light">
                  Avaliar criticamente o uso de IA na sua rotina de estudo
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-lg text-text-light">
                  Incluir em projetos, oficinas ou momentos formativos
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="text-center">
              <Link 
                to="/categorias" 
                className="inline-block px-2 md:px-4 py-2 md:py-2 bg-primary text-text-clear rounded-xl font-semibold hover:bg-primary-dark transition-colors"
              >
                Conheça as Categorias
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}