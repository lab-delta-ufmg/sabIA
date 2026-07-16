import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../stores'

const LoginPageEn = () => {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nome: '',
    instituicao: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const {
    login,
    register,
    isLoading,
    isAuthenticated,
    hasToolAccess
  } = useAuthStore()

  if (isAuthenticated && hasToolAccess()) {
    return <Navigate to="/painel" replace />
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.email || !formData.password) {
      setError('Email and password are required')
      return
    }

    let result
    if (isLoginMode) {
      result = await login(formData.email, formData.password)
    } else {
      if (!formData.nome) {
        setError('Full name is required to sign up')
        return
      }
      result = await register(formData.email, formData.password, {
        nome: formData.nome,
        instituicao: formData.instituicao
      })
    }

    if (result.success) {
      if (isLoginMode) {
        setSuccess('Login successful!')
      } else {
        setSuccess('Registration submitted! Please wait for team approval.')
      }
      setFormData({ email: '', password: '', nome: '', instituicao: '' })
    } else {
      setError(result.error || 'Unknown error')
    }
  }

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode)
    setFormData({ email: '', password: '', nome: '', instituicao: '' })
    setError('')
    setSuccess('')
  }

  return (
    <div className="min-h-screen modal-overlay flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="logo-mark text-4xl mb-2 text-[var(--cream)]">
            sabIA
          </h1>
          <p className="text-[rgba(251,246,236,0.85)]">
            {isLoginMode ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        <div className="modal-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLoginMode && (
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-[var(--ink)] mb-2">
                  Full name *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="modal-input"
                  placeholder="Your full name"
                  required={!isLoginMode}
                />
              </div>
            )}

            {!isLoginMode && (
              <div>
                <label htmlFor="instituicao" className="block text-sm font-medium text-[var(--ink)] mb-2">
                  Institution (optional)
                </label>
                <input
                  type="text"
                  id="instituicao"
                  name="instituicao"
                  value={formData.instituicao}
                  onChange={handleInputChange}
                  className="modal-input"
                  placeholder="Your institution"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--ink)] mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="modal-input"
                placeholder="you@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--ink)] mb-2">
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="modal-input"
                placeholder="••••••••"
                required
                minLength={6}
              />
              {!isLoginMode && (
                <p className="text-xs text-[var(--ink2)] mt-1">
                  Minimum 6 characters
                </p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isLoginMode ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                isLoginMode ? 'Sign in' : 'Create account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--ink2)]">
              {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-1 text-[var(--terra)] hover:text-[var(--terrad)] font-medium transition-colors"
              >
                {isLoginMode ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>

          {!isLoginMode && (
            <div className="mt-4 p-3 surface-accent rounded-lg">
              <p className="text-xs text-[var(--ink2)]">
                New users need team approval to access the tools dashboard.
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <a
            href="/en"
            className="text-sm text-[rgba(251,246,236,0.85)] hover:text-[var(--cream)] transition-colors"
          >
            ← Back to site
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginPageEn
