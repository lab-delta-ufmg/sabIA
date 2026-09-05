import React, { useEffect, useState } from 'react'
import { Wrench, Users, Eye, RefreshCw } from 'lucide-react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'
import { supabase, visitasService } from '../../services/supabase'
import FooterNav from '../../components/FooterNav'
import AdminHeader from '../../components/AdminHeader'

const PERIODOS = [
  { label: '7 dias', dias: 7 },
  { label: '30 dias', dias: 30 },
  { label: '90 dias', dias: 90 }
]

const formatarDataCurta = (data) => {
  const [, mes, dia] = data.split('-')
  return `${dia}/${mes}`
}

const VisaoGeral = () => {
  const [totalFerramentas, setTotalFerramentas] = useState(0)
  const [totalEquipe, setTotalEquipe] = useState(0)
  const [totalVisitas, setTotalVisitas] = useState(0)
  const [serieVisitas, setSerieVisitas] = useState([])
  const [periodo, setPeriodo] = useState(30)
  const [loading, setLoading] = useState(true)
  const [loadingSerie, setLoadingSerie] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadStats()
  }, [])

  useEffect(() => {
    loadSerieVisitas(periodo)
  }, [periodo])

  const loadStats = async () => {
    try {
      setLoading(true)
      setError('')

      const [ferramentasResult, equipeResult, visitasCount] = await Promise.all([
        supabase.from('ferramentas').select('*', { count: 'exact', head: true }),
        supabase.from('equipe').select('*', { count: 'exact', head: true }),
        visitasService.contarVisitas()
      ])

      if (ferramentasResult.error) throw ferramentasResult.error
      if (equipeResult.error) throw equipeResult.error

      setTotalFerramentas(ferramentasResult.count || 0)
      setTotalEquipe(equipeResult.count || 0)
      setTotalVisitas(visitasCount || 0)
    } catch (err) {
      console.error('Erro ao carregar visão geral:', err)
      setError('Erro ao carregar as estatísticas: ' + (err.message || ''))
    } finally {
      setLoading(false)
    }
  }

  const loadSerieVisitas = async (dias) => {
    try {
      setLoadingSerie(true)
      const serie = await visitasService.serieVisitasPorDia(dias)
      setSerieVisitas(serie.map((ponto) => ({ ...ponto, dataLabel: formatarDataCurta(ponto.data) })))
    } catch (err) {
      console.error('Erro ao carregar série de visitas:', err)
    } finally {
      setLoadingSerie(false)
    }
  }

  const recarregarTudo = () => {
    loadStats()
    loadSerieVisitas(periodo)
  }

  const cards = [
    {
      label: 'Ferramentas cadastradas',
      value: totalFerramentas,
      icon: Wrench
    },
    {
      label: 'Membros da equipe',
      value: totalEquipe,
      icon: Users
    },
    {
      label: 'Vistas ao site',
      value: totalVisitas,
      icon: Eye
    }
  ]

  return (
    <div className="min-h-screen bg-[gray-100] pb-24">
      <AdminHeader subtitle="Resumo geral da plataforma" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="heading-display text-xl md:text-2xl">Visão geral</h2>
          <button
            onClick={recarregarTudo}
            disabled={loading || loadingSerie}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--paper2)] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink2)] transition-all hover:bg-[rgba(42,32,20,0.05)] hover:text-[var(--terra)] disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading || loadingSerie ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-[1.25rem] border border-[var(--line)] bg-[rgba(251,246,236,0.9)] p-6 shadow-[0_18px_50px_rgba(42,32,20,0.08)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(199,91,44,0.12)]">
                <card.icon className="h-6 w-6 text-[var(--terra)]" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--ink2)]">
                {card.label}
              </p>
              <p className="mt-2 text-3xl font-bold text-[var(--ink)]">
                {loading ? '—' : card.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[1.25rem] border border-[var(--line)] bg-[rgba(251,246,236,0.9)] p-6 shadow-[0_18px_50px_rgba(42,32,20,0.08)]">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--ink2)]">
              Acessos ao site ao longo do tempo
            </h3>
            <div className="flex gap-2">
              {PERIODOS.map((opcao) => (
                <button
                  key={opcao.dias}
                  onClick={() => setPeriodo(opcao.dias)}
                  className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-all ${
                    periodo === opcao.dias
                      ? 'bg-[rgba(199,91,44,0.12)] text-[var(--terra)]'
                      : 'text-[var(--ink2)] hover:bg-[rgba(42,32,20,0.05)]'
                  }`}
                >
                  {opcao.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full">
            {loadingSerie ? (
              <div className="flex h-full items-center justify-center text-sm text-[var(--ink2)]">
                Carregando gráfico...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={serieVisitas} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(42,32,20,0.1)" />
                  <XAxis
                    dataKey="dataLabel"
                    tick={{ fontSize: 11, fill: 'var(--ink2)' }}
                    interval={Math.max(0, Math.ceil(serieVisitas.length / 10) - 1)}
                    angle={-35}
                    textAnchor="end"
                    height={50}
                  />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: 'var(--ink2)' }} />
                  <Tooltip
                    formatter={(value) => [value, 'Visitas']}
                    labelFormatter={(label) => `Dia ${label}`}
                    contentStyle={{
                      borderRadius: '0.75rem',
                      border: '1px solid var(--line)',
                      background: 'var(--paper2)'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="var(--terra, #c75b2c)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <FooterNav />
    </div>
  )
}

export default VisaoGeral
