import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CategoriasPageEn = () => {
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const categories = [
    {
      emoji: '💬',
      name: 'Dialogue',
      description: 'Tools that allow users to simulate or practice dialogic interactions, helping develop communicative competence in real or simulated situations.'
    },
    {
      emoji: '✍️',
      name: 'Writing',
      description: 'Tools that support written production in different genres and contexts through suggestions, modeling, revision, or creative prompts.'
    },
    {
      emoji: '🎧',
      name: 'Listening',
      description: 'Tools that help develop listening comprehension using audio, video, synchronized transcripts, or listening-based activities.'
    },
    {
      emoji: '🗣️',
      name: 'Speaking',
      description: 'Tools that promote oral production and fluency practice in monologues, dialogues, presentations, and other speaking contexts.'
    },
    {
      emoji: '🤖',
      name: 'Text Generation',
      description: 'Tools whose main purpose is to generate text automatically from commands, prompts, or models, and can be used for writing, analysis, or rewriting.'
    },
    {
      emoji: '📖',
      name: 'Reading',
      description: 'Tools that support reading comprehension development by offering reading practice, text analysis, genre exploration, and strategy building.'
    },
    {
      emoji: '📝',
      name: 'Text Planning',
      description: 'Tools that help plan and organize texts through outlines, scripts, idea maps, argument structures, or discourse sequencing.'
    },
    {
      emoji: '🔁',
      name: 'Autonomous Practice',
      description: 'Tools that encourage autonomous and personalized study, allowing learners to define their own learning paths and pace.'
    },
    {
      emoji: '🎙️',
      name: 'Pronunciation',
      description: 'Tools that support pronunciation practice and improvement through feedback, repetition, audio comparison, or specific exercises.'
    },
    {
      emoji: '🌐',
      name: 'Translation',
      description: 'Tools that provide automatic or assisted translation resources and can be explored critically to develop translation competence and linguistic awareness.'
    },
    {
      emoji: '🔠',
      name: 'Vocabulary',
      description: 'Tools that support vocabulary expansion, exploration, and consolidation through practice activities, gamification, interactive glossaries, or lexical repertoire building.'
    }
  ]

  const selectedCategory = categories[selectedIndex]

  return (
    <div className="min-h-screen bg-transparent">
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-3 grid-rows-1 max-w-4xl mx-auto px-6">
          <button
            onClick={() => navigate('/en')}
            className="row-span-2 flex items-center"
            title="Back"
          >
            <div className="w-32 h-32 flex items-center justify-center">
              <img
                src="/logobig.png"
                alt="Back"
                className="w-24 h-24"
              />
            </div>
          </button>

          <div className="col-span-2 items-center mt-6">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-0">
              Explore the Categories
            </h1>
            <p className="text-xs md:text-sm tracking-widest uppercase font-semibold text-primary mb-6 md:mb-8">
              Linguistic and pedagogical organization of tools
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <div className="max-w-3xl">
            <p className="leading-relaxed mb-6 text-justify text-lg text-ink">
              Each tool in sabIA is classified into one or more linguistic and pedagogical categories
              to help you navigate and find resources aligned with your goals. Categories are organized with a focus on language and educational practices.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="max-w-4xl space-y-3 lg:hidden">
            {categories.map((category, index) => (
              <details
                key={index}
                className="group bg-[#fbf6ec]/70 border border-[--paper] rounded-2xl overflow-hidden open:shadow-lg open:shadow-[#b66a3c]/20"
                open={index === 0}
              >
                <summary className="list-none cursor-pointer px-5 py-4 flex items-center gap-3 group-open:bg-[--terra] transition-colors">
                  <span className="text-xl leading-none">{category.emoji}</span>
                  <h3 className="text-lg font-semibold group-open:text-[--cream]">{category.name}</h3>
                  <span className="ml-auto text-xs font-semibold tracking-wider opacity-70 group-open:text-[--cream]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </summary>

                <div className="p-6 border-t border-[--paper] bg-[#f7f2e8]">
                  <p className="text-xs font-semibold tracking-[0.2em] text-[--terra]/80 mb-3">
                    {String(index + 1).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}
                  </p>
                  <h4 className="font-serif text-3xl text-[--ink] mb-3">{category.name}</h4>
                  <p className="text-[--ink2] leading-relaxed text-base text-justify">
                    {category.description}
                  </p>
                </div>
              </details>
            ))}
          </div>

          <div className="hidden lg:grid lg:grid-cols-[0.85fr_1.15fr] gap-6 items-start">
            <div className="flex flex-col gap-2">
              {categories.map((category, index) => {
                const isActive = selectedIndex === index

                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedIndex(index)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center gap-3 ${
                      isActive
                        ? 'bg-[--terra] text-[--cream] border-[--terra] shadow-lg shadow-[#b66a3c]/25'
                        : 'bg-[#fbf6ec]/70 text-[--ink] border-[--paper] hover:bg-[#f3e8d8]'
                    }`}
                    aria-pressed={isActive}
                  >
                    <span className="text-lg leading-none">{category.emoji}</span>
                    <span className="font-semibold">{category.name}</span>
                    <span className="ml-auto text-xs tracking-wider opacity-70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="sticky top-24 bg-[#f7f2e8] border border-[--paper] rounded-3xl p-8 shadow-[0_22px_60px_rgba(42,32,20,0.08)] min-h-[320px] flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-[0.2em] text-[--terra]/80 mb-4">
                {String(selectedIndex + 1).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}
              </p>
              <h4 className="font-serif text-4xl text-[--ink] mb-4 leading-tight">
                {selectedCategory.emoji} {selectedCategory.name}
              </h4>
              <p className="text-[--ink2] leading-relaxed text-lg">
                {selectedCategory.description}
              </p>
            </div>
          </div>
        </div>

        <div className="surface-card p-4">
          <p className="text-[--ink]">
            A tool may appear in more than one category, since its uses can be multiple and flexible.
          </p>
        </div>

        <div className="mt-4 pt-8 border-t border-gray-300">
          <h3 className="text-lg font-semibold text-[--ink] mb-6">Explore more</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/en/about')}
              className="bg-[--ink] text-left p-4 hover:bg-[--ink2] transition-colors rounded-lg"
            >
              <h4 className="font-semibold text-[--ochre] mb-1">About sabIA</h4>
              <p className="text-sm text-[--cream]">Learn about our platform and mission</p>
            </button>

            <button
              onClick={() => navigate('/en/curation')}
              className="bg-[--ink] text-left p-4 hover:bg-[--ink2] transition-colors rounded-lg"
            >
              <h4 className="font-semibold text-[--ochre] mb-1">How curation works</h4>
              <p className="text-sm text-[--cream]">Understand our selection process</p>
            </button>
          </div>
        </div>
      </div>
  )
}

export default CategoriasPageEn
