import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EnvelopeIcon } from '@heroicons/react/24/outline'

const TEAM = [
  { name: 'Ronaldo Correa Gomes Junior', role: 'Criacao e desenvolvimento', tone: '#A4451F' },
  { name: 'Carlos Henrique Rodrigues Valadares', role: 'Desenvolvimento e suporte', tone: '#B5612C' },
  { name: 'Elaine Teixeira da Silva', role: 'Desenvolvimento e curadoria', tone: '#94631E' },
  { name: 'Alice Brandao Azevedo Alves', role: 'Curadoria', tone: '#5B582E' },
  { name: 'Giovanna Carolina Martins', role: 'Curadoria e suporte', tone: '#7A4A24' },
]

const BirdAvatar = ({ tone }) => (
  <div className="relative flex h-[118px] w-[118px] items-center justify-center overflow-hidden rounded-full border border-[var(--line)] bg-[var(--paper2)]">
    <div
      className="absolute top-[34px] h-[74px] w-[74px] rounded-full"
      style={{ background: 'radial-gradient(circle at 50% 45%, #F4C56C, #E6AC49)' }}
    />
    <svg width="94" height="94" viewBox="0 0 100 100" className="relative">
      <polygon points="26,60 2,73 30,75" fill={tone} />
      <ellipse cx="50" cy="62" rx="27" ry="22" fill={tone} />
      <circle cx="70" cy="42" r="15" fill={tone} />
      <polygon points="83,38 99,43 83,48" fill={tone} />
      <circle cx="74" cy="39" r="2.6" fill="#FBF6EC" />
    </svg>
  </div>
)

const EquipePage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-transparent">
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-3 grid-rows-1 max-w-4xl mx-auto px-6">
          <button onClick={() => navigate('/')} className="row-span-2 flex items-center" title="Voltar">
            <div className="w-32 h-32 flex items-center justify-center">
              <img src="/logobig.png" alt="Voltar" className="w-24 h-24" />
            </div>
          </button>

          <div className="col-span-2 items-center mt-6">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-0">Equipe</h1>
            <p className="text-xs md:text-sm tracking-widest uppercase font-semibold text-primary mb-6 md:mb-8">As pessoas por trás da curadoria do sabIA</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-2">
        <div className="surface-card p-2 md:p-10 mb-6">
          <div className="text-center mb-10">
            <p className="kicker mb-4">Quem faz acontecer</p>
            <h2 className="heading-display text-3xl md:text-4xl mb-2">Nucleo de Projeto</h2>
            <p className="text-text-light">Equipe sabIA vinculada a Faculdade de Letras da UFMG.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-10">
            {TEAM.map((member) => (
              <article key={member.name} className="surface-card surface-card-hover w-[220px] px-5 py-6 text-center">
                <div className="mb-4 flex justify-center">
                  <BirdAvatar tone={member.tone} />
                </div>
                <h3 className="text-[19px] leading-tight text-[var(--ink)] mb-2">{member.name}</h3>
                <p className="text-[11.5px] uppercase tracking-[0.1em] text-[var(--terrad)] font-semibold">{member.role}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="surface-card p-8 md:p-10">
            <div className="text-center mb-6">
              <p className="kicker mb-4">Uso e compartilhamento</p>
              <h2 className="heading-display text-3xl md:text-4xl mb-2">Licenca de Uso</h2>
            </div>
            <p className="text-text-light leading-relaxed mb-4 text-justify">
              O conteudo autoral deste site, incluindo descricoes, categorizacao, organizacao de
              informacoes e textos explicativos, e disponibilizado sob a licenca
              <strong> Creative Commons Atribuicao-NaoComercial-CompartilhaIgual 4.0 Internacional (CC BY-NC-SA 4.0)</strong>.
            </p>
            <p className="text-text-light leading-relaxed text-justify">
              Isso significa que voce pode usar, adaptar e compartilhar os conteudos do sabIA para
              fins nao comerciais, desde que atribua os creditos corretamente e mantenha a mesma
              licenca nas versoes derivadas.
            </p>
          </div>

          <div className="surface-card p-8 md:p-10">
            <div className="text-center mb-4">
              <p className="kicker mb-4">Observacao legal</p>
              <h2 className="heading-display text-3xl md:text-4xl mb-2">Nota sobre marcas registradas</h2>
            </div>
            <p className="text-text-light leading-relaxed text-justify">
              As marcas, logotipos e nomes das ferramentas de IA listadas neste aplicativo pertencem
              aos seus respectivos proprietarios. O sabIA realiza uma curadoria educativa e nao possui
              vinculo comercial com os servicos mencionados.
            </p>
          </div>
        </div>

        <div className="p-8 text-center">
          <h2 className="heading-display text-3xl md:text-4xl mb-6">Contato</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:gpdelta@gmail.com" className="btn-secondary text-lg inline-flex items-center gap-2">
              <EnvelopeIcon className="w-6 h-6" />
              gpdelta@gmail.com
            </a>
            <Link to="/sobre" className="btn-primary">
              Sobre o sabIA
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EquipePage