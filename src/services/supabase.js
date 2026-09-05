import { createClient } from '@supabase/supabase-js'

// Configurações do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://emhabcflfiabquldgbel.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGFiY2ZsZmlhYnF1bGRnYmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5ODEyMTEsImV4cCI6MjA3MzU1NzIxMX0.rGlwBODlJcv7wSiVrES6QCamC1hhYXT4m54Y_yeG-og'

// Cliente Supabase com autenticação
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tabelas
export const tableNames = {
  FERRAMENTAS: 'ferramentas',
  CATEGORIAS: 'categorias',
  SOLICITACOES: 'solicitacoes_acesso',
  EQUIPE: 'equipe',
  VISITAS: 'visitas'
}

// Chave usada para não contar mais de uma visita por sessão do navegador
const VISIT_SESSION_KEY = 'sabia_visita_registrada'

// Serviço de contagem de vistas ao site
export const visitasService = {
  // Registra uma visita, uma única vez por sessão do navegador
  async registrarVisita(caminho, idioma = 'pt') {
    try {
      if (typeof window === 'undefined') return

      if (sessionStorage.getItem(VISIT_SESSION_KEY)) {
        return
      }

      sessionStorage.setItem(VISIT_SESSION_KEY, '1')

      await supabase.from(tableNames.VISITAS).insert({ caminho, idioma })
    } catch (error) {
      // Falhar silenciosamente: contagem de visitas não deve afetar a navegação
      console.error('Erro ao registrar visita:', error)
    }
  },

  // Retorna o total de visitas registradas
  async contarVisitas() {
    const { count, error } = await supabase
      .from(tableNames.VISITAS)
      .select('*', { count: 'exact', head: true })

    if (error) {
      throw new Error(error.message)
    }

    return count || 0
  },

  // Retorna a série histórica de visitas por dia dos últimos `dias` dias
  async serieVisitasPorDia(dias = 30) {
    const formatarChaveLocal = (date) => {
      const ano = date.getFullYear()
      const mes = String(date.getMonth() + 1).padStart(2, '0')
      const dia = String(date.getDate()).padStart(2, '0')
      return `${ano}-${mes}-${dia}`
    }

    const desde = new Date()
    desde.setHours(0, 0, 0, 0)
    desde.setDate(desde.getDate() - (dias - 1))

    const { data, error } = await supabase
      .from(tableNames.VISITAS)
      .select('criado_em')
      .gte('criado_em', desde.toISOString())

    if (error) {
      throw new Error(error.message)
    }

    // Monta um mapa com todos os dias do período, zerados, e depois soma as visitas
    const contagemPorDia = new Map()
    for (let i = 0; i < dias; i++) {
      const dia = new Date(desde)
      dia.setDate(desde.getDate() + i)
      contagemPorDia.set(formatarChaveLocal(dia), 0)
    }

    ;(data || []).forEach((registro) => {
      // Converte o timestamp (UTC) para a data local do navegador, para bater com as chaves acima
      const chave = formatarChaveLocal(new Date(registro.criado_em))
      if (contagemPorDia.has(chave)) {
        contagemPorDia.set(chave, contagemPorDia.get(chave) + 1)
      }
    })

    return Array.from(contagemPorDia.entries()).map(([data, total]) => ({ data, total }))
  }
}

// Serviços de autenticação
export const authService = {
  // Login com email e senha
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Cadastro de novo usuário
  async signUp(email, password, userData = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  // Logout
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Obter usuário atual
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Obter dados do usuário na tabela equipe
  async getUserTeamData(email) {
    const { data, error } = await supabase
      .from(tableNames.EQUIPE)
      .select('*')
      .eq('email', email)
      .single()
    
    return { data, error }
  },

  // Criar ou atualizar dados do usuário na tabela equipe
  async upsertUserTeamData(userData) {
    const { data, error } = await supabase
      .from(tableNames.EQUIPE)
      .upsert(userData, { onConflict: 'email' })
      .select()
      .single()
    
    return { data, error }
  }
}

// Serviço de dados
export const supabaseService = {
  supabase,
  
  // Métodos básicos para CRUD
  async fetchFerramentas() {
    const { data, error } = await supabase
      .from(tableNames.FERRAMENTAS)
      .select('*')
      .order('nome', { ascending: true })
    
    if (error) throw error
    return data
  },
  
  async fetchFerramenta(id) {
    const { data, error } = await supabase
      .from(tableNames.FERRAMENTAS)
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },
  
  async fetchCategorias() {
    const { data, error } = await supabase
      .from(tableNames.CATEGORIAS)
      .select('*')
      .order('nome', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Métodos para gerenciamento de equipe
  async fetchEquipe() {
    const { data, error } = await supabase
      .from(tableNames.EQUIPE)
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async updateUserRole(userId, papel) {
    const { data, error } = await supabase
      .from(tableNames.EQUIPE)
      .update({ papel, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single()
    
    return { data, error }
  }
}