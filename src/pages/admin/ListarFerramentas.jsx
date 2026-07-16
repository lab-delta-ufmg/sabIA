import React, { useEffect, useState, useMemo } from 'react'
import { Save, X, Plus, Trash2, Edit, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { useFerramentasStore } from '../../stores'
import FooterNav from '../../components/FooterNav'
import AdminHeader from '../../components/AdminHeader'

const ListarFerramentas = () => {
  const { ferramentas, loading, error, loadFerramentas, deleteFerramenta, createFerramenta, updateFerramenta } = useFerramentasStore()
  const [editingId, setEditingId] = useState(null)
  const [newRow, setNewRow] = useState({
    nome: '',
    link_site: '',
    funcao: '',
    como_pode_ajudar: '',
    features: '',
    how_can_help: '',
    tags: '',
    tags_en: '',
    gratuidade: ''
  })
  const [editingData, setEditingData] = useState({})
  const [saving, setSaving] = useState(false)
  const [sortBy, setSortBy] = useState('nome') // 'nome' ou 'created_at'
  const [sortOrder, setSortOrder] = useState('asc') // 'asc' ou 'desc'
  const [activeLanguage, setActiveLanguage] = useState('pt')
  const [nameFilter, setNameFilter] = useState('')
  const [tagSuggestions, setTagSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState({ newRow: false, editing: false })
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const [gratuidadeSuggestions, setGratuidadeSuggestions] = useState([])
  const [showGratuidadeSuggestions, setShowGratuidadeSuggestions] = useState({ newRow: false, editing: false })
  const [activeGratuidadeSuggestion, setActiveGratuidadeSuggestion] = useState(-1)
  const newTagInputRef = React.useRef(null)
  const editTagInputRef = React.useRef(null)
  const newGratuidadeInputRef = React.useRef(null)
  const editGratuidadeInputRef = React.useRef(null)
  const tagsFieldName = activeLanguage === 'en' ? 'tags_en' : 'tags'

  useEffect(() => {
    loadFerramentas()
  }, [loadFerramentas])

  // Extract all unique tags from existing ferramentas
  const allTags = useMemo(() => {
    const tagsSet = new Set()
    ferramentas.forEach(ferramenta => {
      if (Array.isArray(ferramenta[tagsFieldName])) {
        ferramenta[tagsFieldName].forEach(tag => tagsSet.add(tag))
      }
    })
    return Array.from(tagsSet).sort()
  }, [ferramentas, tagsFieldName])

  const allGratuidadeOptions = useMemo(() => {
    const knownOptions = ['gratuita', 'freemium', 'open_source']
    const gratuidadeSet = new Set(knownOptions)

    ferramentas.forEach(ferramenta => {
      if (typeof ferramenta.gratuidade === 'string' && ferramenta.gratuidade.trim()) {
        gratuidadeSet.add(ferramenta.gratuidade.trim())
      }
    })

    return Array.from(gratuidadeSet).sort((a, b) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }))
  }, [ferramentas])

  // Get current word being typed in tags input
  const getCurrentWord = (text, cursorPos) => {
    const beforeCursor = text.slice(0, cursorPos)
    const afterComma = beforeCursor.split(',').pop()
    return afterComma.trim()
  }

  // Filter suggestions based on current input
  const getFilteredSuggestions = (currentValue, cursorPos) => {
    const currentWord = getCurrentWord(currentValue, cursorPos)
    if (!currentWord) return []
    
    return allTags.filter(tag => 
      tag.toLowerCase().startsWith(currentWord.toLowerCase()) &&
      !currentValue.split(',').map(t => t.trim()).includes(tag)
    )
  }

  const handleTagInputChange = (value, isNewRow, e, field) => {
    const cursorPos = e.target.selectionStart
    const suggestions = getFilteredSuggestions(value, cursorPos)
    
    setTagSuggestions(suggestions)
    setShowSuggestions({
      newRow: isNewRow && suggestions.length > 0,
      editing: !isNewRow && suggestions.length > 0
    })
    setActiveSuggestion(-1)

    if (isNewRow) {
      handleNewRowChange(field, value)
    } else {
      handleEditingChange(field, value)
    }
  }

  const insertSuggestion = (suggestion, isNewRow, inputRef, field) => {
    const currentValue = isNewRow ? (newRow[field] || '') : (editingData[field] || '')
    const cursorPos = inputRef.current?.selectionStart || currentValue.length
    
    const beforeCursor = currentValue.slice(0, cursorPos)
    const afterCursor = currentValue.slice(cursorPos)
    
    const parts = beforeCursor.split(',')
    parts[parts.length - 1] = ' ' + suggestion + ', '
    
    const newValue = parts.join(',') + afterCursor
    
    if (isNewRow) {
      handleNewRowChange(field, newValue)
    } else {
      handleEditingChange(field, newValue)
    }
    
    setShowSuggestions({ newRow: false, editing: false })
    setTagSuggestions([])
    inputRef.current?.focus()
  }

  const handleTagKeyDown = (e, isNewRow, inputRef, field) => {
    const suggestions = tagSuggestions
    
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveSuggestion(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Enter' && activeSuggestion >= 0) {
      e.preventDefault()
      insertSuggestion(suggestions[activeSuggestion], isNewRow, inputRef, field)
    } else if (e.key === 'Escape') {
      setShowSuggestions({ newRow: false, editing: false })
      setTagSuggestions([])
    }
  }

  const getFilteredGratuidadeSuggestions = (value) => {
    const normalizedValue = value.trim().toLowerCase()
    if (!normalizedValue) return []

    return allGratuidadeOptions.filter(option =>
      option.toLowerCase().startsWith(normalizedValue) &&
      option.toLowerCase() !== normalizedValue
    )
  }

  const handleGratuidadeInputChange = (value, isNewRow) => {
    const suggestions = getFilteredGratuidadeSuggestions(value)

    setGratuidadeSuggestions(suggestions)
    setShowGratuidadeSuggestions({
      newRow: isNewRow && suggestions.length > 0,
      editing: !isNewRow && suggestions.length > 0
    })
    setActiveGratuidadeSuggestion(-1)

    if (isNewRow) {
      handleNewRowChange('gratuidade', value)
    } else {
      handleEditingChange('gratuidade', value)
    }
  }

  const insertGratuidadeSuggestion = (suggestion, isNewRow, inputRef) => {
    if (isNewRow) {
      handleNewRowChange('gratuidade', suggestion)
    } else {
      handleEditingChange('gratuidade', suggestion)
    }

    setShowGratuidadeSuggestions({ newRow: false, editing: false })
    setGratuidadeSuggestions([])
    inputRef.current?.focus()
  }

  const handleGratuidadeKeyDown = (e, isNewRow, inputRef) => {
    const suggestions = gratuidadeSuggestions

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveGratuidadeSuggestion(prev =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveGratuidadeSuggestion(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Enter' && activeGratuidadeSuggestion >= 0) {
      e.preventDefault()
      insertGratuidadeSuggestion(suggestions[activeGratuidadeSuggestion], isNewRow, inputRef)
    } else if (e.key === 'Escape') {
      setShowGratuidadeSuggestions({ newRow: false, editing: false })
      setGratuidadeSuggestions([])
    }
  }

  const handleDelete = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja excluir a ferramenta "${nome}"?`)) {
      const result = await deleteFerramenta(id)
      if (!result.success) {
        alert('Erro ao excluir ferramenta: ' + result.error)
      }
    }
  }

  const handleEdit = (ferramenta) => {
    setEditingId(ferramenta.id)
    setEditingData({
      nome: ferramenta.nome || '',
      link_site: ferramenta.link_site || '',
      funcao: ferramenta.funcao || '',
      como_pode_ajudar: ferramenta.como_pode_ajudar || '',
      features: ferramenta.features || '',
      how_can_help: ferramenta.how_can_help || '',
      tags: Array.isArray(ferramenta.tags) ? ferramenta.tags.join(', ') : '',
      tags_en: Array.isArray(ferramenta.tags_en) ? ferramenta.tags_en.join(', ') : '',
      gratuidade: ferramenta.gratuidade || ''
    })
  }

  const handleSave = async (id = null) => {
    setSaving(true)
    try {
      const data = id ? editingData : newRow
      
      // Validações básicas
      if (!data.nome || !data.nome.trim()) {
        alert('Nome da ferramenta é obrigatório')
        return
      }

      const tagsArray = typeof data.tags === 'string'
        ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : Array.isArray(data.tags) ? data.tags : []
      const tagsEnArray = typeof data.tags_en === 'string'
        ? data.tags_en.split(',').map(tag => tag.trim()).filter(tag => tag)
        : Array.isArray(data.tags_en) ? data.tags_en : []

      const ferramentaData = {
        nome: data.nome.trim(),
        link_site: data.link_site ? data.link_site.trim() : null,
        funcao: data.funcao ? data.funcao.trim() : null,
        como_pode_ajudar: data.como_pode_ajudar ? data.como_pode_ajudar.trim() : null,
        features: data.features ? data.features.trim() : null,
        how_can_help: data.how_can_help ? data.how_can_help.trim() : null,
        tags: tagsArray.length > 0 ? tagsArray : null,
        tags_en: tagsEnArray.length > 0 ? tagsEnArray : null,
        gratuidade: data.gratuidade ? data.gratuidade.trim() : null
      }

      console.log('Dados preparados para salvar:', ferramentaData)

      let result
      if (id) {
        result = await updateFerramenta(id, ferramentaData)
      } else {
        result = await createFerramenta(ferramentaData)
      }

      if (result.success) {
        if (id) {
          setEditingId(null)
          setEditingData({})
        } else {
          setNewRow({
            nome: '',
            link_site: '',
            funcao: '',
            como_pode_ajudar: '',
            features: '',
            how_can_help: '',
            tags: '',
            tags_en: '',
            gratuidade: ''
          })
        }
      } else {
        alert('Erro ao salvar: ' + result.error)
      }
    } catch (error) {
      console.error('Erro no handleSave:', error)
      alert('Erro ao salvar: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditingData({})
  }

  const handleNewRowChange = (field, value) => {
    setNewRow(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEditingChange = (field, value) => {
    setEditingData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Filtrar e ordenar ferramentas
  const filteredAndSortedFerramentas = useMemo(() => {
    let filtered = ferramentas.filter(ferramenta =>
      ferramenta.nome.toLowerCase().includes(nameFilter.toLowerCase())
    )

    filtered.sort((a, b) => {
      let comparison = 0
      
      if (sortBy === 'nome') {
        comparison = a.nome.localeCompare(b.nome)
      } else if (sortBy === 'created_at') {
        const dateA = new Date(a.created_at || 0)
        const dateB = new Date(b.created_at || 0)
        comparison = dateA - dateB
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [ferramentas, nameFilter, sortBy, sortOrder])

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const getSortIcon = (field) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="w-3 h-3 ml-1 text-gray-400" />
    }
    return sortOrder === 'asc' 
      ? <ArrowUp className="w-3 h-3 ml-1 text-primary" />
      : <ArrowDown className="w-3 h-3 ml-1 text-primary" />
  }

  const getGratuidadeConfig = (tipo) => {
    switch (tipo) {
      case 'gratuita':
        return {
          label: 'Gratuita',
          className: 'bg-green-100 text-green-700'
        }
      case 'freemium':
        return {
          label: 'Freemium',
          className: 'bg-yellow-100 text-yellow-700'
        }
      case 'open_source':
        return {
          label: 'Open Source',
          className: 'bg-blue-100 text-blue-700'
        }
      default:
        return {
          label: tipo || '-',
          className: tipo ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-500'
        }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando ferramentas...</p>
        </div>
      </div>
    )
  }

  const renderCell = (ferramenta, field, isEditing) => {
    if (isEditing) {
      if (field === 'tags' || field === 'tags_en') {
        return (
          <div className="relative">
            <textarea
              ref={editTagInputRef}
              value={editingData[field] || ''}
              onChange={(e) => handleTagInputChange(e.target.value, false, e, field)}
              onKeyDown={(e) => handleTagKeyDown(e, false, editTagInputRef, field)}
              onBlur={() => setTimeout(() => setShowSuggestions(prev => ({ ...prev, editing: false })), 200)}
              placeholder="Tag1, Tag2, Tag3"
              className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
              rows="2"
            />
            {showSuggestions.editing && tagSuggestions.length > 0 && (
              <div className="popup-menu">
                {tagSuggestions.map((tag, index) => (
                  <div
                    key={tag}
                    onClick={() => insertSuggestion(tag, false, editTagInputRef, field)}
                    className={`popup-menu-item ${
                      index === activeSuggestion ? 'bg-[rgba(199,91,44,0.14)] text-[var(--terra)]' : ''
                    }`}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      }

      if (field === 'gratuidade') {
        return (
          <div className="relative">
            <input
              ref={editGratuidadeInputRef}
              type="text"
              value={editingData[field] || ''}
              onChange={(e) => handleGratuidadeInputChange(e.target.value, false)}
              onKeyDown={(e) => handleGratuidadeKeyDown(e, false, editGratuidadeInputRef)}
              onBlur={() => setTimeout(() => setShowGratuidadeSuggestions(prev => ({ ...prev, editing: false })), 200)}
              placeholder="gratuita, freemium..."
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
            {showGratuidadeSuggestions.editing && gratuidadeSuggestions.length > 0 && (
              <div className="popup-menu">
                {gratuidadeSuggestions.map((option, index) => (
                  <div
                    key={option}
                    onClick={() => insertGratuidadeSuggestion(option, false, editGratuidadeInputRef)}
                    className={`popup-menu-item ${
                      index === activeGratuidadeSuggestion ? 'bg-[rgba(199,91,44,0.14)] text-[var(--terra)]' : ''
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      }
      
      return (
        <textarea
          value={editingData[field] || ''}
          onChange={(e) => handleEditingChange(field, e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
          rows={field === 'funcao' || field === 'como_pode_ajudar' || field === 'features' || field === 'how_can_help' ? "3" : "1"}
          placeholder={field === 'link_site' ? 'https://...' : `${field.charAt(0).toUpperCase()}${field.slice(1)}`}
        />
      )
    }

    // Modo visualização
    if (field === 'tags' || field === 'tags_en') {
      return (
        <div className="flex flex-wrap gap-1">
          {ferramenta[field] && ferramenta[field].length > 0 ? (
            ferramenta[field].map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs bg-secondary/20 text-primary rounded-full"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-400">-</span>
          )}
        </div>
      )
    }

    if (field === 'link_site' && ferramenta[field]) {
      return (
        <a 
          href={ferramenta[field]} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm truncate max-w-xs block"
        >
          {ferramenta[field]}
        </a>
      )
    }

    if (field === 'gratuidade') {
      const config = getGratuidadeConfig(ferramenta[field])

      return (
        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${config.className}`}>
          {config.label}
        </span>
      )
    }

    return (
      <div className="text-sm text-gray-900 max-w-xs">
        {ferramenta[field] || '-'}
      </div>
    )
  }

  const renderNewRowCell = (field) => {
    if (field === 'tags' || field === 'tags_en') {
      return (
        <div className="relative">
          <textarea
            ref={newTagInputRef}
            value={newRow[field] || ''}
            onChange={(e) => handleTagInputChange(e.target.value, true, e, field)}
            onKeyDown={(e) => handleTagKeyDown(e, true, newTagInputRef, field)}
            onBlur={() => setTimeout(() => setShowSuggestions(prev => ({ ...prev, newRow: false })), 200)}
            placeholder="Tag1, Tag2, Tag3"
            className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
            rows="2"
          />
          {showSuggestions.newRow && tagSuggestions.length > 0 && (
            <div className="popup-menu">
              {tagSuggestions.map((tag, index) => (
                <div
                  key={tag}
                  onClick={() => insertSuggestion(tag, true, newTagInputRef, field)}
                  className={`popup-menu-item ${
                    index === activeSuggestion ? 'bg-[rgba(199,91,44,0.14)] text-[var(--terra)]' : ''
                  }`}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    if (field === 'gratuidade') {
      return (
        <div className="relative">
          <input
            ref={newGratuidadeInputRef}
            type="text"
            value={newRow[field] || ''}
            onChange={(e) => handleGratuidadeInputChange(e.target.value, true)}
            onKeyDown={(e) => handleGratuidadeKeyDown(e, true, newGratuidadeInputRef)}
            onBlur={() => setTimeout(() => setShowGratuidadeSuggestions(prev => ({ ...prev, newRow: false })), 200)}
            placeholder="gratuita, freemium..."
            className="w-full p-2 border border-gray-300 rounded text-sm"
          />
          {showGratuidadeSuggestions.newRow && gratuidadeSuggestions.length > 0 && (
            <div className="popup-menu">
              {gratuidadeSuggestions.map((option, index) => (
                <div
                  key={option}
                  onClick={() => insertGratuidadeSuggestion(option, true, newGratuidadeInputRef)}
                  className={`popup-menu-item ${
                    index === activeGratuidadeSuggestion ? 'bg-[rgba(199,91,44,0.14)] text-[var(--terra)]' : ''
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }
    
    return (
      <textarea
        value={newRow[field] || ''}
        onChange={(e) => handleNewRowChange(field, e.target.value)}
        className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
        rows={field === 'funcao' || field === 'como_pode_ajudar' || field === 'features' || field === 'how_can_help' ? "3" : "1"}
        placeholder={field === 'link_site' ? 'https://...' : `${field.charAt(0).toUpperCase()}${field.slice(1)}`}
      />
    )
  }

  const functionFieldName = activeLanguage === 'en' ? 'features' : 'funcao'
  const helpFieldName = activeLanguage === 'en' ? 'how_can_help' : 'como_pode_ajudar'
  const functionColumnLabel = activeLanguage === 'en' ? 'Features' : 'Função'
  const helpColumnLabel = activeLanguage === 'en' ? 'How can it help' : 'Como pode ajudar'
  const tagsColumnLabel = activeLanguage === 'en' ? 'Tags (EN)' : 'Tags'

  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <AdminHeader subtitle="Gerencie e organize ferramentas da plataforma" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Gerenciar Ferramentas</h2>
          <div className="text-sm text-gray-600">
            Total: {filteredAndSortedFerramentas.length} de {ferramentas.length} ferramenta{ferramentas.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filtrar
              </label>
              <input
                type="text"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                placeholder="Digite o nome da ferramenta..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />  
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSort('nome')}
                className={`px-3 py-2 text-sm rounded-md border transition-colors flex items-center ${
                  sortBy === 'nome' 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Nome {getSortIcon('nome')}
              </button>
              <button
                onClick={() => handleSort('created_at')}
                className={`px-3 py-2 text-sm rounded-md border transition-colors flex items-center ${
                  sortBy === 'created_at' 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Data {getSortIcon('created_at')}
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Idioma (campos descritivos e tags)
              </label>
              <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setActiveLanguage('pt')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    activeLanguage === 'pt'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  PT
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLanguage('en')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    activeLanguage === 'en'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            Erro ao carregar ferramentas: {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden overflow-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    Nome
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    Link
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    {functionColumnLabel}
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    {helpColumnLabel}
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                    Distribuição
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                    {tagsColumnLabel}
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Linha para nova ferramenta - sempre no topo */}
                <tr className="bg-gray-100 border-b-2 border-gray-200">
                  <td className="px-4">
                    {renderNewRowCell('nome')}
                  </td>
                  <td className="px-2">
                    {renderNewRowCell('link_site')}
                  </td>
                  <td className="px-2">
                    {renderNewRowCell(functionFieldName)}
                  </td>
                  <td className="px-2">
                    {renderNewRowCell(helpFieldName)}
                  </td>
                  <td className="px-2">
                    {renderNewRowCell('gratuidade')}
                  </td>
                  <td className="px-2">
                    {renderNewRowCell(tagsFieldName)}
                  </td>
                  <td className="px-2 text-right">
                    <button
                      onClick={() => handleSave()}
                      disabled={saving || !newRow.nome.trim()}
                      className="text-green-600 hover:text-green-900 transition-colors disabled:opacity-50"
                      title="Adicionar ferramenta"
                    >
                      <Plus className="w-8 h-8" />
                    </button>
                  </td>
                </tr>
                
                {filteredAndSortedFerramentas.map((ferramenta) => {
                  const isEditing = editingId === ferramenta.id
                  return (
                    <tr key={ferramenta.id} className={isEditing ? "bg-blue-50" : "hover:bg-gray-50"}>
                      <td className="p-2">
                        {renderCell(ferramenta, 'nome', isEditing)}
                      </td>
                      <td className="p-2">
                        {renderCell(ferramenta, 'link_site', isEditing)}
                      </td>
                      <td className="p-2">
                        {renderCell(ferramenta, functionFieldName, isEditing)}
                      </td>
                      <td className="p-2">
                        {renderCell(ferramenta, helpFieldName, isEditing)}
                      </td>
                      <td className="p-2">
                        {renderCell(ferramenta, 'gratuidade', isEditing)}
                      </td>
                      <td className="p-2">
                        {renderCell(ferramenta, tagsFieldName, isEditing)}
                      </td>
                      <td className="p-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => handleSave(ferramenta.id)}
                                disabled={saving}
                                className="text-green-600 hover:text-green-900 transition-colors disabled:opacity-50"
                                title="Salvar"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                onClick={handleCancel}
                                disabled={saving}
                                className="text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
                                title="Cancelar"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(ferramenta)}
                                className="text-primary hover:text-primary/80 transition-colors"
                                title="Editar"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(ferramenta.id, ferramenta.nome)}
                                className="text-red-600 hover:text-red-900 transition-colors"
                                title="Excluir"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        {ferramentas.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhuma ferramenta cadastrada. Use a linha verde no topo da tabela para adicionar a primeira ferramenta.</p>
          </div>
        )}

        {filteredAndSortedFerramentas.length === 0 && ferramentas.length > 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhuma ferramenta encontrada com o filtro aplicado.</p>
          </div>
        )}
        
      </div>
        {/* Footer Navigation */}
        <FooterNav />

    </div>
    </>
  )
}

export default ListarFerramentas