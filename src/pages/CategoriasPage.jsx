import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Archive, Info } from 'lucide-react'

const CategoriasPage = () => {
  const navigate = useNavigate()

  const categorias = [
    {
      emoji: '💬',
      nome: 'Diálogo',
      descricao: 'Ferramentas que permitem simular ou praticar interações dialogadas, ajudando no desenvolvimento da competência comunicativa em situações reais ou simuladas.'
    },
    {
      emoji: '✍️',
      nome: 'Escrita',
      descricao: 'Ferramentas que apoiam a produção escrita em diferentes gêneros e contextos, seja por meio de sugestões, modelagens, revisões ou estímulos criativos.'
    },
    {
      emoji: '🎧',
      nome: 'Escuta',
      descricao: 'Ferramentas que ajudam a desenvolver a compreensão auditiva, seja com áudios, vídeos, transcrições sincronizadas ou atividades baseadas em escuta.'
    },
    {
      emoji: '🗣️',
      nome: 'Fala',
      descricao: 'Ferramentas que promovem a prática da produção oral e da fluência, seja em monólogos, diálogos, apresentações ou outros contextos.'
    },
    {
      emoji: '🤖',
      nome: 'Geração de Texto',
      descricao: 'Ferramentas cujo uso principal é gerar textos automaticamente com base em comandos, prompts ou modelos, podendo ser exploradas para produção textual, análise ou reescrita.'
    },
    {
      emoji: '📖',
      nome: 'Leitura',
      descricao: 'Ferramentas que apoiam o desenvolvimento da compreensão de textos escritos, oferecendo práticas de leitura, análise, exploração de gêneros e estratégias.'
    },
    {
      emoji: '📝',
      nome: 'Planejamento de Textos',
      descricao: 'Ferramentas que ajudam no planejamento e organização de textos, como esquemas, roteiros, mapas de ideias, estruturação de argumentos ou sequências discursivas.'
    },
    {
      emoji: '🔁',
      nome: 'Prática Autônoma',
      descricao: 'Ferramentas que favorecem o estudo autônomo e personalizado, permitindo que aprendizes definam seus percursos e ritmos de aprendizagem de forma personalizada.'
    },
    {
      emoji: '🎙️',
      nome: 'Pronúncia',
      descricao: 'Ferramentas que oferecem suporte à prática e ao aprimoramento da pronúncia, seja por meio de feedback, repetição, comparação sonora ou exercícios específicos.'
    },
    {
      emoji: '🌐',
      nome: 'Tradução',
      descricao: 'Ferramentas que oferecem recursos de tradução automática ou assistida, e que podem ser exploradas criticamente para o desenvolvimento da competência tradutiva e da consciência linguística.'
    },
    {
      emoji: '🔠',
      nome: 'Vocabulário',
      descricao: 'Ferramentas que apoiam a ampliação, exploração e consolidação do vocabulário, seja em atividades de prática, gamificação, glossários interativos ou construção de repertório lexical.'
    }
  ]

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
              Conheça as Categorias
            </h1>
            <p className="text-lg text-text-clear">
              Organização linguístico-pedagógica das ferramentas
            </p>
          </div>

        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Introdução */}
        <div className="bg-white text-text-light rounded-lg shadow-md p-8 mb-8">
          <div className="text-center mb-2">
            <p className="leading-relaxed mb-6 text-justify">
              Cada ferramenta no sabIÁ é classificada em uma ou mais categorias linguístico-pedagógicas, 
              que ajudam você a navegar e encontrar recursos alinhados aos seus objetivos.
            </p>
            
            <div className="bg-primary/10 rounded-lg p-6 border-l-4 border-primary">
              <p className="font-bold">
                As categorias não são apenas técnicas, mas organizadas com foco em práticas linguísticas e educacionais.
              </p>
            </div>
          </div>
        </div>

        {/* Grid de categorias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categorias.map((categoria, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border-l-4 border-transparent hover:border-primary"
            >
              <div className="flex items-start mb-4">
                <span className="text-3xl mr-3 flex-shrink-0">{categoria.emoji}</span>
                <h3 className="text-xl font-bold text-text-dark">{categoria.nome}</h3>
              </div>
              <p className="text-text-light leading-relaxed text-sm text-justify">
                {categoria.descricao}
              </p>
            </div>
          ))}
        </div>

        {/* Nota sobre múltiplas categorias */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Info className="w-6 h-6 text-secondary mt-1" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-text-dark mb-2">Categorias Múltiplas</h3>
              <p className="text-text-light">
                Uma ferramenta pode aparecer em mais de uma categoria, pois seus usos são múltiplos e flexíveis.
              </p>
            </div>
          </div>

          {/* Navegação para outras páginas */}
          <div className="mt-12 pt-6 border-t border-text-dark">
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
                onClick={() => navigate('/curadoria')}
                className="text-left p-4 bg-background rounded-lg hover:bg-gray-100 transition-colors border-l-4 border-primary"
              >
                <h4 className="font-semibold text-text-dark mb-1">Como funciona a curadoria</h4>
                <p className="text-sm text-text-light">Entenda nosso processo de seleção</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriasPage