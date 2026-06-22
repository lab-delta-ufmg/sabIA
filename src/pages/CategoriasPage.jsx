import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CategoriasPage = () => {
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useState(0)

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

  const selectedCategoria = categorias[selectedIndex]

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header da página */}
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
              Conheça as Categorias
            </h1>
            <p className="text-xs md:text-sm tracking-widest uppercase font-semibold text-primary mb-6 md:mb-8">
              Organização linguístico-pedagógica das ferramentas
            </p>
          </div>

        </div>
      </section>

      {/* Conteúdo principal */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Introdução */}
        <div className="mb-8">
          <div className="max-w-3xl">
            <p className="leading-relaxed mb-6 text-justify text-lg text-ink">
              Cada ferramenta no sabIÁ é classificada em uma ou mais categorias linguístico-pedagógicas, 
              que ajudam você a navegar e encontrar recursos alinhados aos seus objetivos.
            </p>

            <div className="border-l-2 border-[--terra] pl-4">
              <p className="font-serif italic text-xl text-[--terra]">
                As categorias são organizadas com foco em práticas linguísticas e educacionais.
              </p>
            </div>
          </div>
        </div>

        {/* Lista interativa de categorias */}
        <div className="mb-8">
          {/* Mobile/Tablet: accordion */}
          <div className="max-w-4xl space-y-3 lg:hidden">
            {categorias.map((categoria, index) => (
              <details
                key={index}
                className="group bg-[#fbf6ec]/70 border border-[--paper] rounded-2xl overflow-hidden open:shadow-lg open:shadow-[#b66a3c]/20"
                open={index === 0}
              >
                <summary className="list-none cursor-pointer px-5 py-4 flex items-center gap-3 group-open:bg-[--terra] transition-colors">
                  <span className="text-xl leading-none">{categoria.emoji}</span>
                  <h3 className="text-lg font-semibold group-open:text-[--cream]">{categoria.nome}</h3>
                  <span className="ml-auto text-xs font-semibold tracking-wider opacity-70 group-open:text-[--cream]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </summary>

                <div className="p-6 border-t border-[--paper] bg-[#f7f2e8]">
                  <p className="text-xs font-semibold tracking-[0.2em] text-[--terra]/80 mb-3">
                    {String(index + 1).padStart(2, '0')} / {String(categorias.length).padStart(2, '0')}
                  </p>
                  <h4 className="font-serif text-3xl text-[--ink] mb-3">{categoria.nome}</h4>
                  <p className="text-[--ink2] leading-relaxed text-base text-justify">
                    {categoria.descricao}
                  </p>
                </div>
              </details>
            ))}
          </div>

          {/* Desktop: menu + painel fixo */}
          <div className="hidden lg:grid lg:grid-cols-[0.85fr_1.15fr] gap-6 items-start">
            <div className="flex flex-col gap-2">
              {categorias.map((categoria, index) => {
                const isActive = selectedIndex === index

                return (
                  <button
                    key={categoria.nome}
                    onClick={() => setSelectedIndex(index)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center gap-3 ${
                      isActive
                        ? 'bg-[--terra] text-[--cream] border-[--terra] shadow-lg shadow-[#b66a3c]/25'
                        : 'bg-[#fbf6ec]/70 text-[--ink] border-[--paper] hover:bg-[#f3e8d8]'
                    }`}
                    aria-pressed={isActive}
                  >
                    <span className="text-lg leading-none">{categoria.emoji}</span>
                    <span className="font-semibold">{categoria.nome}</span>
                    <span className="ml-auto text-xs tracking-wider opacity-70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="sticky top-24 bg-[#f7f2e8] border border-[--paper] rounded-3xl p-8 shadow-[0_22px_60px_rgba(42,32,20,0.08)] min-h-[320px] flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-[0.2em] text-[--terra]/80 mb-4">
                {String(selectedIndex + 1).padStart(2, '0')} / {String(categorias.length).padStart(2, '0')}
              </p>
              <h4 className="font-serif text-4xl text-[--ink] mb-4 leading-tight">
                {selectedCategoria.emoji} {selectedCategoria.nome}
              </h4>
              <p className="text-[--ink2] leading-relaxed text-lg">
                {selectedCategoria.descricao}
              </p>
            </div>
          </div>
        </div>

        <div className="surface-card p-4">
          <p className="text-[--ink]">
            Uma ferramenta pode aparecer em mais de uma categoria, pois seus usos são múltiplos e flexíveis.
          </p>
        </div>

          {/* Navegação para outras páginas */}
        <div className="mt-4 pt-8 border-t border-gray-300">
          <h3 className="text-lg font-semibold text-[--ink] mb-6">Explore mais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/sobre')}
                className="bg-[--ink] text-left p-4 hover:bg-[--ink2] transition-colors rounded-lg"
              >
                <h4 className="font-semibold text-[--ochre] mb-1">Sobre o sabIA</h4>
                <p className="text-sm text-[--cream]">Conheça nossa plataforma e missão</p>
              </button>
              
              <button
                onClick={() => navigate('/curadoria')}
                className="bg-[--ink] text-left p-4 hover:bg-[--ink2] transition-colors rounded-lg"
              >
                <h4 className="font-semibold text-[--ochre] mb-1">Como funciona a curadoria</h4>
                <p className="text-sm text-[--cream]">Entenda nosso processo de seleção</p>
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CategoriasPage