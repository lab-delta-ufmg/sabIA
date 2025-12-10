import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, CheckCircle, Info, BookOpen } from 'lucide-react'

const CuradoriaPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
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
              Como funciona a curadoria no sabIA
            </h1>
            <p className="text-lg text-text-clear">
              Nosso processo de seleção e análise
            </p>
          </div>

        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="bg-white text-text-light rounded-lg shadow-md p-8">
          
          {/* Introdução */}
          <div className="mb-10">
            <p className="leading-relaxed mb-4 text-justify">
              O sabIÁ nasceu para ajudar estudantes, professores e curiosos a explorar de forma crítica 
              e criativa as ferramentas de inteligência artificial aplicadas à aprendizagem de línguas.
            </p>
            
            <p className="leading-relaxed mb-4 text-justify">
              Para isso, não basta listar ferramentas: é preciso organizar, contextualizar e explicar 
              como cada uma delas pode (ou não) contribuir para processos de ensino e aprendizagem.
            </p>

            <div className="bg-primary/10 rounded-lg p-6 border-l-4 border-primary">
              <p className="font-medium text-justify">
                Essa é a função da nossa curadoria. Todas as ferramentas incluídas no sabIÁ passam 
                por um processo de seleção e análise, em que buscamos identificar:
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="">quais são seus usos nativos (ou seja, para que servem originalmente); e</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="">quais são seus potenciais pedagógicos para a aprendizagem de línguas.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Seção Para que serve */}
          <div className="mb-10">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                <Info className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-text-dark">Para que serve</h2>
            </div>
            
            <p className="text-text-light leading-relaxed mb-4 text-justify">
              Este campo descreve a função principal da ferramenta: o que ela faz e qual é seu uso nativo, 
              independentemente do contexto educacional.
            </p>
            
            <p className="text-text-light mb-4 text-justify">
              Aqui você encontrará descrições objetivas e diretas sobre o funcionamento da ferramenta.
            </p>

            <div className="bg-primary/10 rounded-lg p-4 border-l-4 border-primary">
              <h4 className="font-semibold text-text-light mb-3">Exemplos:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="">Gerar imagens a partir de descrições em texto.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="">Transcrever automaticamente áudios e vídeos.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="">Simular diálogos interativos em diferentes contextos.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Seção Como pode ajudar */}
          <div className="mb-4 text-text-light">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-text-dark">Como pode ajudar</h2>
            </div>
            
            <p className="leading-relaxed mb-4 text-justify">
              Este campo indica potenciais da ferramenta para a aprendizagem de línguas. Em outras palavras, 
              destacamos como ela pode ser integrada em percursos de aprendizagem autônoma ou em práticas pedagógicas.
            </p>
            
            <p className="mb-4 text-justify">
              Aqui você encontrará potenciais educacionais: possibilidades de uso que ampliam a aprendizagem.
            </p>

            <div className="bg-primary/10 rounded-lg p-4 border-l-4 border-primary">
              <h4 className="font-semibold mb-3">Exemplos:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="">Estimular a produção escrita por meio de atividades criativas com imagens.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="">Apoiar o desenvolvimento da escuta e da compreensão oral com transcrições acompanhadas de áudio.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="">Promover a prática de fluência em conversas simuladas.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Navegação para outras páginas */}
          <div className="mt-8 pt-6 border-t border-text-dark">
            <h3 className="text-lg font-semibold text-text-dark mb-4">Explore mais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/sobre')}
                className="text-left p-4 bg-background rounded-lg hover:bg-gray-100 transition-colors border-l-4 border-primary"
              >
                <h4 className="font-semibold text-text-dark mb-1">Sobre o sabIA</h4>
                <p className="text-sm text-text-light">Conheça nossa plataforma e missão</p>
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

export default CuradoriaPage