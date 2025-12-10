import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { ChevronLeft, CheckCircle } from 'lucide-react'

export default function CreditosPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      {/* Header com navegação */}
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
              Créditos e Licença
            </h1>
            <p className="text-lg text-text-clear">
              Informações sobre equipe e licença
            </p>
          </div>

        </div>
      </div>

        <div className="max-w-4xl mx-auto px-4 py-6">

        {/* Licença Creative Commons */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-text-dark mb-6 text-center">Licença de Uso</h2>
          <p className="text-md text-text-light leading-relaxed mb-4 text-justify">
            O conteúdo autoral deste site – incluindo descrições, categorização, organização de informações e textos explicativos – é disponibilizado sob a licença <strong>Creative Commons Atribuição-NãoComercial-CompartilhaIgual 4.0 Internacional (CC BY-NC-SA 4.0)</strong>.
          </p>
          <p className="text-md text-text-light leading-relaxed text-justify">
            Isso significa que você pode usar, adaptar e compartilhar os conteúdos do sabIÁ para fins não comerciais, desde que atribua os créditos corretamente e mantenha a mesma licença nas versões derivadas.
          </p>
        </div>

        {/* Equipe - Grid de cartões */}
        <div className="space-y-6">
          {/* Criação e desenvolvimento conceitual */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h2 className="text-xl font-bold text-text-dark mb-2 text-center">
              Criação e desenvolvimento conceitual e estrutural
            </h2>
            <div className="text-center">
              <p className="text-md font-semibold text-text-light">
                Ronaldo Corrêa Gomes Junior
              </p>
            </div>
          </div>

          {/* Desenvolvimento e suporte */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h2 className="text-xl font-bold text-text-dark mb-2 text-center">
              Desenvolvimento e suporte
            </h2>
            <div className="space-y-1 text-center">
              <p className="text-md font-semibold text-text-light">
                Ronaldo Corrêa Gomes Junior
              </p>
              <p className="text-md font-semibold text-text-light">
                Carlos Henrique Rodrigues Valadares
              </p>
              <p className="text-md font-semibold text-text-light">
                Elaine Teixeira da Silva
              </p>
            </div>
          </div>

          {/* Curadoria */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h2 className="text-xl font-bold text-text-dark mb-2 text-center">
              Curadoria
            </h2>
            <div className="space-y-1 text-center">
              <p className="text-md font-semibold text-text-light">
                Alice Brandão Azevedo Alves
              </p>
              <p className="text-md font-semibold text-text-light">
                Elaine Teixeira da Silva
              </p>
              <p className="text-md font-semibold text-text-light">
                Ronaldo Corrêa Gomes Junior
              </p>
            </div>
          </div>
        </div>

        {/* Nota sobre marcas registradas */}
        <div className="bg-secondary/20 rounded-xl p-8 mt-6">
          <h2 className="text-xl font-bold text-text-dark mb-2 text-center">Nota sobre marcas registradas</h2>
          <p className="text-md text-text-light leading-relaxed text-justify">
            As marcas, logotipos e nomes das ferramentas de IA listadas neste aplicativo pertencem aos seus respectivos proprietários. O sabIÁ realiza uma curadoria educativa e não possui vínculo comercial com os serviços mencionados.
          </p>
        </div>

        {/* Contato */}
        <div className="bg-primary rounded-xl p-4 mt-6 text-center">
          <h2 className="text-xl font-bold text-white mb-4">Contato</h2>
          <a 
            href="mailto:gpdelta@gmail.com"
            className="inline-flex items-center gap-3 bg-white text-primary px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg"
          >
            <EnvelopeIcon className="w-6 h-6" />
            gpdelta@gmail.com
          </a>
        </div>

        {/* Navegação adicional */}
        <div className="mt-6 text-center">
          <Link 
            to="/sobre" 
            className="inline-flex items-center gap-2 bg-secondary text-text-dark px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors font-medium"
          >
            Sobre o sabIÁ
          </Link>
        </div>
      </div>
    </div>
  )
}