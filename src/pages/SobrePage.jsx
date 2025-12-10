import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Info } from 'lucide-react'

const SobrePage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-bakground">
    {/* Header da página */}
    <div className="bg-primary text-text-clear pt-4 pb-12 relative">
      <div className="max-w-4xl mx-auto px-6">

        {/* Botão de voltar com ícone da logo */}
        <button
          onClick={() => navigate('/')}
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
            Sobre O SabIA
          </h1>
          <p className="text-lg text-text-clear">
            Conheça nossa plataforma de curadoria
          </p>
        </div>

      </div>
    </div>

      {/* Conteúdo principal */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="bg-white rounded-lg shadow-md p-8">          
          <div className="prose prose-lg max-w-none text-text-light text-justify leading-relaxed">
            <p className="mb-4">
              O sabIA é uma plataforma de curadoria e exploração de ferramentas de inteligência artificial 
              aplicadas ao ensino e aprendizagem de línguas. Pensado como um espaço acessível, educativo e 
              colaborativo, o sabIÁ permite que estudantes, educadores e curiosos descubram recursos 
              tecnológicos úteis para práticas linguísticas, com foco em leitura, escrita, fala, escuta, 
              vocabulário, planejamento textual, tradução, entre outros aspectos.
            </p>
            
            <p>
              Inspirado no canto curioso do sabiá, o projeto valoriza a descoberta, a diversidade e o 
              cuidado com o conhecimento compartilhado.
            </p>
          </div>

          {/* Card de destaque */}
          <div className="mt-4 bg-background rounded-lg p-6 border-l-4 border-primary">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Info className="w-6 h-6 text-primary mt-1" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-text-dark mb-2">Nossa Missão</h3>
                <p className="text-text-light">
                  Facilitar o acesso a ferramentas de IA para ensino de línguas, oferecendo curadoria 
                  cuidadosa e orientações pedagógicas para cada recurso apresentado.
                </p>
              </div>
            </div>
          </div>

          {/* Navegação para outras páginas */}
          <div className="mt-8 pt-4 border-t border-text-dark">
            <h3 className="text-lg font-semibold text-text-dark mb-4">Explore mais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/curadoria')}
                className="text-left p-4 bg-background rounded-lg hover:bg-gray-100 transition-colors border-l-4 border-primary"
              >
                <h4 className="font-semibold text-text-dark mb-1">Como funciona a curadoria</h4>
                <p className="text-sm text-text-light">Entenda nosso processo de seleção e análise</p>
              </button>
              
              <button
                onClick={() => navigate('/categorias')}
                className="text-left p-4 bg-background rounded-lg hover:bg-gray-100 transition-colors border-l-4 border-primary"
              >
                <h4 className="font-semibold text-text-dark mb-1">Conheça as categorias</h4>
                <p className="text-sm text-text-light">Veja como organizamos as ferramentas</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SobrePage