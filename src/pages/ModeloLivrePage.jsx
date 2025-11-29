import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, CheckCircle } from 'lucide-react'

export default function ModeloLivrePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
        {/* Header com navegação */}
        <div className="bg-primary text-white py-12">
          <div className="max-w-4xl mx-auto px-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-text-clear/80 hover:text-text-clear mb-6 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Voltar
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl text-white font-bold mb-2">
                Modelo L.I.V.R.E.
              </h1>
              <p className="text-lg text-white opacity-90"> 
                Modelo para analisar criticamente o uso de IA na aprendizagem de línguas
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-4 text-text-light">
        {/* Introdução */}
        <div className="p-8 mb-4">
          <p className="text-lg leading-relaxed text-left max-w-3xl mx-auto text-justify">
            O modelo L.I.V.R.E. foi criado para orientar estudantes, professores e curiosos a analisarem criticamente o uso de ferramentas de inteligência artificial na aprendizagem de línguas. Cada letra representa uma dimensão importante a considerar antes de adotar uma tecnologia.
          </p>
        </div>

        {/* Cada letra do modelo */}
        <div className="space-y-6 mb-2">
          {/* L - Linguagem */}
          <div className="bg-text-light/70 rounded-2xl shadow-lg overflow-hidden border-l-8 border-text-light">
            <div className="flex items-center p-4 text-white">
              <div className="text-6xl font-black mr-8 ml-2 flex-shrink-0">L</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-dark">Linguagem</h2>
                <p className="text-lg leading-relaxed opacity-95">
                  A ferramenta favorece práticas reais de linguagem ou apenas respostas mecânicas?
                </p>
              </div>
            </div>
          </div>

          {/* I - Intencionalidade */}
          <div className="bg-text-dark/60 rounded-2xl shadow-lg overflow-hidden border-l-8 border-text-dark">
            <div className="flex items-center p-4 text-white">
              <div className="text-6xl font-black mr-10 ml-3 flex-shrink-0">I</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-dark">Intencionalidade</h2>
                <p className="text-lg leading-relaxed opacity-95">
                  O usuário tem clareza sobre o objetivo do uso? É guiado ou apenas replicado?
                </p>
              </div>
            </div>
          </div>

          {/* V - Visibilidade dos Processos */}
          <div className="bg-text-light/70 rounded-2xl shadow-lg overflow-hidden border-l-8 border-text-light">
            <div className="flex items-center p-4 text-white">
              <div className="text-6xl font-black mr-8 flex-shrink-0">V</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-dark">Visibilidade dos Processos</h2>
                <p className="text-lg leading-relaxed opacity-95">
                  A ferramenta permite compreender como a IA funciona ou é uma "caixa-preta"?
                </p>
              </div>
            </div>
          </div>

          {/* R - Relevância Educacional */}
          <div className="bg-text-dark/60 rounded-2xl shadow-lg overflow-hidden border-l-8 border-text-dark">
            <div className="flex items-center p-4 text-white">
              <div className="text-6xl font-black mr-8 flex-shrink-0">R</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-dark">Relevância Educacional</h2>
                <p className="text-lg leading-relaxed opacity-95">
                  A proposta da ferramenta se conecta a objetivos de aprendizagem ou só entretém?
                </p>
              </div>
            </div>
          </div>

          {/* E - Ética e Autoria */}
          <div className="bg-text-light/70 rounded-2xl shadow-lg overflow-hidden border-l-8 border-text-light">
            <div className="flex items-center p-4 ml-2 text-white">
              <div className="text-6xl font-black mr-8 flex-shrink-0">E</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-dark">Ética e Autoria</h2>
                <p className="text-lg leading-relaxed opacity-95">
                  Há transparência no uso, proteção de dados e reconhecimento de autoria?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Como usar o modelo */}
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Como usar o modelo?</h2>
          
          <p className="text-lg mb-6 text-center">
            Você pode utilizar o L.I.V.R.E. para:
          </p>

          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-lg">
                Guiar reflexões individuais ou em grupo sobre ferramentas digitais
              </p>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-lg">
                Avaliar criticamente o uso de IA na sua rotina de estudo
              </p>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-lg">
                Incluir em projetos, oficinas ou momentos formativos
              </p>
            </div>
          </div>
        </div>

        {/* Navegação adicional */}
        <div className="mt-4 text-center">
          <Link 
            to="/categorias" 
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Conheça as Categorias
          </Link>
        </div>
      </div>
    </div>
  )
}