import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, CheckCircle } from 'lucide-react'

export default function ModeloLivrePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      {/* Header com navegação */}
      <div className="bg-primary text-text-clear pt-4 pb-12 relative">
      <div className="grid grid-cols-3 grid-rows-1 max-w-4xl mx-auto px-6">
          {/* Botão de voltar com ícone da logo */}
          <button
            onClick={() => navigate('/')}
            className="row-span-2 flex items-center"
            title="Voltar"
          >
            <div className="w-32 h-32 bg-text-clear/100 backdrop-blur-md rounded-full flex items-center justify-center shadow-md hover:bg-text-clear/80 transition">
              <img
                src="/logobig.png"
                alt="Voltar"
                className="w-24 h-24"
              />
            </div>
          </button>

          <div className="col-span-2 items-center mt-6">
            <h1 className="text-3xl md:text-4xl text-text-clear font-bold mb-2 mt-0">
              Modelo L.I.V.R.E.
            </h1>
            <p className="text-lg text-text-clear">
              Modelo para analisar criticamente o uso de IA na aprendizagem de línguas
            </p>
          </div>

        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 text-text-light">
        <div className="bg-white rounded-lg shadow-md p-8 text-text-light">
          {/* Introdução */}
          <div className="mb-6">
            <p className="text-md leading-relaxed text-left max-w-3xl mx-auto text-justify">
              O modelo L.I.V.R.E. foi criado para orientar estudantes, professores e curiosos a analisarem criticamente o uso de ferramentas de inteligência artificial na aprendizagem de línguas. Cada letra representa uma dimensão importante a considerar antes de adotar uma tecnologia.
            </p>
          </div>

          {/* Cada letra do modelo */}
          <div className="space-y-6 mb-2">
            {/* L - Linguagem */}
            <div className="bg-primary/80 rounded-2xl shadow-lg overflow-hidden">
              <div className="flex items-center p-4 text-white">
                <div className="text-6xl font-black mr-8 ml-2 flex-shrink-0">L</div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-text-clear">Linguagem</h2>
                    <p className="text-lg leading-relaxed opacity-95">
                      A ferramenta favorece práticas reais de linguagem ou apenas respostas mecânicas?
                    </p>
                  </div>
              </div>
            </div>

            {/* I - Intencionalidade */}
            <div className="bg-primary/80 rounded-2xl shadow-lg overflow-hidden">
              <div className="flex items-center p-4 text-text-clear">
                <div className="text-6xl font-black mr-10 ml-3 flex-shrink-0">I</div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-text-clear">Intencionalidade</h2>
                    <p className="text-lg leading-relaxed opacity-95">
                      O usuário tem clareza sobre o objetivo do uso? É guiado ou apenas replicado?
                    </p>
                  </div>
              </div>
            </div>

              {/* V - Visibilidade dos Processos */}
              <div className="bg-primary/80 rounded-2xl shadow-lg overflow-hidden">
                <div className="flex items-center p-4 text-text-clear">
                  <div className="text-6xl font-black mr-8 flex-shrink-0">V</div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-text-clear">Visibilidade dos Processos</h2>
                    <p className="text-lg leading-relaxed opacity-95">
                      A ferramenta permite compreender como a IA funciona ou é uma "caixa-preta"?
                    </p>
                  </div>
                </div>
              </div>

              {/* R - Relevância Educacional */}
              <div className="bg-primary/80 rounded-2xl shadow-lg overflow-hidden">
              <div className="flex items-center p-4 text-text-clear">
                <div className="text-6xl font-black mr-8 flex-shrink-0">R</div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-text-clear">Relevância Educacional</h2>
                    <p className="text-lg leading-relaxed opacity-95">
                      A proposta da ferramenta se conecta a objetivos de aprendizagem ou só entretém?
                    </p>
                  </div>
                </div>
              </div>

              {/* E - Ética e Autoria */}
              <div className="bg-primary/80 rounded-2xl shadow-lg overflow-hidden">
                <div className="flex items-center p-4 ml-2 text-text-clear">
                  <div className="text-6xl font-black mr-8 flex-shrink-0">E</div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-text-clear">Ética e Autoria</h2>
                    <p className="text-lg leading-relaxed opacity-95">
                      Há transparência no uso, proteção de dados e reconhecimento de autoria?
                    </p>
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md mt-8 pb-8 pl-4 text-text-light">
          {/* Como usar o modelo */}
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Como usar o modelo?</h2>
            
            <p className="text-md mb-6">
              Você pode utilizar o L.I.V.R.E. para:
            </p>

            <div className="space-y-2 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-md">
                  Guiar reflexões individuais ou em grupo sobre ferramentas digitais
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-md">
                  Avaliar criticamente o uso de IA na sua rotina de estudo
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-md">
                  Incluir em projetos, oficinas ou momentos formativos
                </p>
              </div>
            </div>
          </div>

          {/* Navegação adicional */}
          <div className="mt-0 text-center">
            <Link 
              to="/categorias" 
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Conheça as Categorias
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}