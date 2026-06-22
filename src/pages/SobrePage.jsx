import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Info } from 'lucide-react'

const SobrePage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-transparent">
      {/* Manifesto Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-12">
        {/* Label */}
        <p className="text-xs md:text-sm tracking-widest uppercase font-semibold text-primary mb-6 md:mb-8">
          Sobre o sabIA
        </p>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-8 md:gap-12 lg:gap-16">
          {/* Left Column - Heading */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-0">
              Conheça nossa plataforma de curadoria
            </h2>
          </div>

          {/* Right Column - Content */}
          <div>
            <p className="text-base md:text-lg leading-relaxed text-text-light mb-6 text-justify">
              O sabIA é uma plataforma de curadoria e exploração de ferramentas de inteligência artificial 
              aplicadas ao ensino e aprendizagem de línguas. Pensado como um espaço acessível, educativo e 
              colaborativo, o sabIA permite que estudantes, educadores e curiosos descubram recursos 
              tecnológicos úteis para práticas linguísticas, com foco em leitura, escrita, fala, escuta, 
              vocabulário, planejamento textual, tradução, entre outros aspectos.
            </p>

            <p className="font-serif italic text-lg text-primary pl-5 border-l-2 border-primary mb-6">
              Inspirado no canto curioso do sabiá, o projeto valoriza a descoberta, a diversidade e o 
              cuidado com o conhecimento compartilhado.
            </p>

            {/* Mission Box */}
            <div className="bg-[#F5F0E8] border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xs uppercase tracking-widest font-bold text-primary mb-3">
                Nossa missão
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-gray-700 text-justify">
                Facilitar o acesso a ferramentas de IA para ensino de línguas, oferecendo curadoria 
                cuidadosa e orientações pedagógicas para cada recurso apresentado.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-16 md:mt-20 pt-8 md:pt-12 border-t border-gray-300">
          <h3 className="text-lg font-semibold text-ink mb-6">Explore mais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/curadoria')}
              className="bg-[--ink] text-left p-4 hover:bg-[--ink2] transition-colors rounded-lg"
            >
              <h4 className="font-semibold text-[--ochre] mb-1">Como funciona a curadoria</h4>
              <p className="text-sm text-[--cream]">Entenda nosso processo de seleção e análise</p>
            </button>
            
            <button
              onClick={() => navigate('/categorias')}
              className="bg-[--ink] text-left p-4 hover:bg-[--ink2] transition-colors rounded-lg border border-gray-200"
            >
              <h4 className="font-semibold text-[--ochre] mb-1">Conheça as categorias</h4>
              <p className="text-sm text-[--cream]">Veja como organizamos as ferramentas</p>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SobrePage