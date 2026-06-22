import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, CheckCircle, Info, BookOpen } from 'lucide-react'

const CuradoriaPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-3 grid-rows-1 max-w-4xl mx-auto px-6">

          {/* Botão de voltar com ícone da logo */}
          <button
            onClick={() => navigate('/')}
            className="row-span-2 flex items-center"
            title="Voltar"
          >
            <div className="w-32 h-32 flex items-center justify-center">
              <img
                src="/logobig.png"
                alt="Voltar"
                className="w-24 h-24"
              />
            </div>
          </button>
          <div className="col-span-2 items-center mt-6">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-0">
              Como funciona a curadoria no sabIA
            </h1>
           <p className="text-xs md:text-sm tracking-widest uppercase font-semibold text-primary mb-6 md:mb-8">
              Nosso processo de seleção e análise
            </p>
          </div>

        </div>
      </section>

      {/* Conteúdo principal */}
      <div className="max-w-4xl mx-auto px-6 py-2">
        <div className="surface-card text-text-light p-8">
          
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

            <div className="surface-accent p-6">
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

            <div className="surface-accent p-4">
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

            <div className="surface-accent p-4">
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

        </div>
      </div>

      {/* Navegação para outras páginas */}
      <div className="max-w-4xl mx-auto px-6 pb-10">
        <div className="mt-4 pt-8 border-t border-gray-300">
          <h3 className="text-lg font-semibold text-ink mb-6">Explore mais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/sobre')}
              className="bg-[--ink] text-left p-4 hover:bg-[--ink2] transition-colors rounded-lg"
            >
              <h4 className="font-semibold text-[--ochre] mb-1">Sobre o sabIA</h4>
              <p className="text-sm text-[--cream]">Conheça nossa plataforma e missão</p>
            </button>

            <button
              onClick={() => navigate('/categorias')}
              className="bg-[--ink] text-left p-4 hover:bg-[--ink2] transition-colors rounded-lg"
            >
              <h4 className="font-semibold text-[--ochre] mb-1">Conheça as categorias</h4>
              <p className="text-sm text-[--cream]">Veja como organizamos as ferramentas</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CuradoriaPage