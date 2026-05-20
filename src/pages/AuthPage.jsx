import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { PawPrint, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { login, register } from '../stores/actions/user-actions'
import './Pages.css'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const userData = useSelector(state => state.user.data)
  const loading = useSelector(state => state.user.loading)

  const isAuthenticated = !!userData.token

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/'
      navigate(from)
    }
  }, [isAuthenticated, location.state, navigate])

  const handleSubmit = async () => {
    if (isLogin) {
      const action = await login(email, password)
      dispatch(action)
    } else {
      if (!fullName.trim()) return
      const action = await register(email, password, fullName)
      dispatch(action)
    }
  }

  return (
    <div className='auth-page'>
      <div className='auth-card'>
        <div className='form-card'>
          <div className='auth-icon'>
            <PawPrint size={32} />
          </div>
          <h1>{isLogin ? 'Conectare' : 'Înregistrare'}</h1>
          <p className='auth-subtitle'>
            {isLogin ? 'Intră în contul tău pentru a gestiona adopțiile' : 'Creează un cont pentru a adopta animale'}
          </p>

          {!isLogin && (
            <div className='form-group'>
              <label>Nume complet</label>
              <div className='form-input-icon'>
                <User size={16} />
                <input className='form-input' value={fullName} onChange={e => setFullName(e.target.value)} placeholder='Ion Popescu' />
              </div>
            </div>
          )}

          <div className='form-group'>
            <label>Email</label>
            <div className='form-input-icon'>
              <Mail size={16} />
              <input className='form-input' type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='email@exemplu.ro' />
            </div>
          </div>

          <div className='form-group'>
            <label>Parolă</label>
            <div className='form-input-icon' style={{ position: 'relative' }}>
              <Lock size={16} />
              <input
                className='form-input'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Minim 6 caractere'
                style={{ paddingRight: '2.5rem' }}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '0.75rem', top: '50%',
                  transform: 'translateY(-50%)', background: 'none',
                  border: 'none', cursor: 'pointer', color: '#888', padding: 0
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button className='btn btn-primary btn-block' onClick={handleSubmit} disabled={loading} style={{ marginTop: '1rem' }}>
            {loading ? 'Se procesează...' : isLogin ? 'Conectare' : 'Creează cont'}
          </button>

          <div className='auth-toggle'>
            <button onClick={() => { setIsLogin(!isLogin); setShowPassword(false) }}>
              {isLogin ? 'Nu ai cont? Înregistrează-te' : 'Ai deja cont? Conectează-te'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage