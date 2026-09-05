-- Criação da tabela de contagem de vistas ao site
-- Execute este script no Supabase SQL Editor

-- 1. Tabela que guarda uma linha por visita registrada
CREATE TABLE IF NOT EXISTS public.visitas (
  id BIGSERIAL PRIMARY KEY,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
  caminho TEXT,
  idioma TEXT
);

-- 2. Índice para consultas rápidas por data (ex: visitas de hoje/mês)
CREATE INDEX IF NOT EXISTS visitas_criado_em_idx ON public.visitas (criado_em);

-- 3. Habilitar RLS
ALTER TABLE public.visitas ENABLE ROW LEVEL SECURITY;

-- 4. Qualquer visitante (anônimo ou autenticado) pode registrar uma visita
DROP POLICY IF EXISTS "Qualquer um pode registrar visita" ON public.visitas;
CREATE POLICY "Qualquer um pode registrar visita" ON public.visitas
  FOR INSERT
  WITH CHECK (true);

-- 5. Apenas usuários autenticados (equipe/admin) podem ler a contagem de visitas
DROP POLICY IF EXISTS "Equipe pode ver visitas" ON public.visitas;
CREATE POLICY "Equipe pode ver visitas" ON public.visitas
  FOR SELECT
  TO authenticated
  USING (true);
