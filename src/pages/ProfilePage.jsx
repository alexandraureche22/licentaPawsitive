import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Link } from 'react-router-dom'
import { User, Mail, Shield, Heart, HandHeart, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { SERVER } from '../config/global'
import './Pages.css'

const statusLabels = {
  pending: { text: 'În așteptare', color: '#f57c00', bg: '#fff3e0', icon: Clock },
  approved: { text: 'Aprobată', color: '#2e7d32', bg: '#e8f5e9', icon: CheckCircle },
  rejected: { text: 'Respinsă', color: '#d32f2f', bg: '#ffebee', icon: XCircle }
}

const ProfilePage = () => {
  const userData = useSelector(state => state.user.data)
  const [adoptionRequests, setAdoptionRequests] = useState([])
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('info')

  const isAuthenticated = !!userData.token

  useEffect(() => {
    if (!isAuthenticated) return

    const fetchData = async () => {
      try {
        // Cereri de adopție
        const adoptRes = await fetch(`${SERVER}/api/adoption-requests/mine`, {
          headers: { authorization: userData.token }
        })
        if (adoptRes.ok) {
          const data = await adoptRes.json()
          setAdoptionRequests(data)
        }

        // Donații
        const donRes = await fetch(`${SERVER}/api/donations/mine`, {
          headers: { authorization: userData.token }
        })
        if (donRes.ok) {
          const data = await donRes.json()
          setDonations(data)
        }
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }

    fetchData()
  }, [isAuthenticated, userData.token])

  if (!isAuthenticated) return <Navigate to='/autentificare' replace />

  const totalDonat = donations.reduce((sum, d) => sum + d.amount, 0)

  return (
    <div className='page' style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
      <div className='container' style={{ maxWidth: '800px' }}>
        {/* Header profil */}
        <div className='form-card' style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#fce4ec', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <User size={36} style={{ color: '#c2185b' }} />
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: '0 0 0.25rem', fontSize: '1.5rem' }}>{userData.fullName}</h1>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#888', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={14} /> {userData.email}
            </p>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: '#aaa', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={14} /> Cont {userData.type === 'admin' ? 'administrator' : 'standard'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', textAlign: 'center' }}>
            <div>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#c2185b', margin: 0 }}>{adoptionRequests.length}</p>
              <p style={{ fontSize: '0.75rem', color: '#888', margin: 0 }}>Cereri adopție</p>
            </div>
            <div>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#c2185b', margin: 0 }}>{donations.length}</p>
              <p style={{ fontSize: '0.75rem', color: '#888', margin: 0 }}>Donații</p>
            </div>
            <div>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#c2185b', margin: 0 }}>{totalDonat}</p>
              <p style={{ fontSize: '0.75rem', color: '#888', margin: 0 }}>RON donați</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className='tabs' style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
          <button className={`tab-btn ${tab === 'info' ? 'active' : ''}`} onClick={() => setTab('info')}>
            <User size={16} /> Informații
          </button>
          <button className={`tab-btn ${tab === 'adoptions' ? 'active' : ''}`} onClick={() => setTab('adoptions')}>
            <Heart size={16} /> Cereri adopție ({adoptionRequests.length})
          </button>
          <button className={`tab-btn ${tab === 'donations' ? 'active' : ''}`} onClick={() => setTab('donations')}>
            <HandHeart size={16} /> Donații ({donations.length})
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>Se încarcă...</div>
        ) : (
          <>
            {/* Info */}
            {tab === 'info' && (
              <div className='form-card'>
                <h3 style={{ marginTop: 0 }}>Datele contului</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#fafafa', borderRadius: 8 }}>
                    <span style={{ color: '#888' }}>Nume complet</span>
                    <strong>{userData.fullName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#fafafa', borderRadius: 8 }}>
                    <span style={{ color: '#888' }}>Email</span>
                    <strong>{userData.email}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#fafafa', borderRadius: 8 }}>
                    <span style={{ color: '#888' }}>Tip cont</span>
                    <strong>{userData.type === 'admin' ? 'Administrator' : 'Standard'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#fafafa', borderRadius: 8 }}>
                    <span style={{ color: '#888' }}>Total donat</span>
                    <strong style={{ color: '#c2185b' }}>{totalDonat} RON</strong>
                  </div>
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                  <Link to='/animale' className='btn btn-primary'>Adoptă un animal</Link>
                  <Link to='/donatii' className='btn btn-outline'>Fă o donație</Link>
                </div>
              </div>
            )}

            {/* Cereri adopție */}
            {tab === 'adoptions' && (
              <div>
                {adoptionRequests.length === 0 ? (
                  <div className='form-card' style={{ textAlign: 'center', padding: '3rem' }}>
                    <Heart size={48} style={{ color: '#ddd', margin: '0 auto 1rem', display: 'block' }} />
                    <p style={{ color: '#888', marginBottom: '1rem' }}>Nu ai trimis încă nicio cerere de adopție.</p>
                    <Link to='/animale' className='btn btn-primary'>Vezi animalele</Link>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {adoptionRequests.map(req => {
                      const status = statusLabels[req.status] || statusLabels.pending
                      const StatusIcon = status.icon
                      return (
                        <div key={req.id} className='form-card' style={{ padding: '1.25rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              {req.animal && (
                                <img
                                  src={req.animal.image?.startsWith('/uploads') ? `http://localhost:8080${req.animal.image}` : req.animal.image}
                                  alt={req.animal.name}
                                  style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }}
                                />
                              )}
                              <div>
                                <strong style={{ fontSize: '1.0625rem' }}>{req.animal ? req.animal.name : 'Animal'}</strong>
                                <p style={{ margin: 0, fontSize: '0.8125rem', color: '#888' }}>
                                  {req.animal ? `${req.animal.breed} · ${req.animal.age}` : ''}
                                </p>
                              </div>
                            </div>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.25rem 0.75rem', borderRadius: 50, fontSize: '0.75rem', fontWeight: 600, background: status.bg, color: status.color }}>
                              <StatusIcon size={14} /> {status.text}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.875rem', color: '#555', margin: '0 0 0.25rem' }}><strong>Motivație:</strong> {req.motivation}</p>
                          <p style={{ fontSize: '0.75rem', color: '#aaa', margin: 0 }}>
                            Trimisă pe {new Date(req.createdAt).toLocaleDateString('ro-RO')}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Donații */}
            {tab === 'donations' && (
              <div>
                {donations.length === 0 ? (
                  <div className='form-card' style={{ textAlign: 'center', padding: '3rem' }}>
                    <HandHeart size={48} style={{ color: '#ddd', margin: '0 auto 1rem', display: 'block' }} />
                    <p style={{ color: '#888', marginBottom: '1rem' }}>Nu ai făcut încă nicio donație.</p>
                    <Link to='/donatii' className='btn btn-primary'>Donează acum</Link>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {donations.map(don => (
                      <div key={don.id} className='form-card' style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <strong>{don.donationType === 'general' ? 'Donație generală' : don.donationType === 'shelter' ? 'Pentru adăpost' : don.donationType === 'medical' ? 'Fond medical' : 'Hrană'}</strong>
                          {don.shelterName && <span style={{ fontSize: '0.8125rem', color: '#888' }}> · {don.shelterName}</span>}
                          {don.message && <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: '#666' }}>"{don.message}"</p>}
                          <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#aaa' }}>
                            {new Date(don.createdAt).toLocaleDateString('ro-RO')}
                          </p>
                        </div>
                        <strong style={{ fontSize: '1.25rem', color: '#c2185b' }}>{don.amount} RON</strong>
                      </div>
                    ))}
                    <div className='form-card' style={{ background: '#fce4ec', textAlign: 'center', padding: '1rem' }}>
                      <strong style={{ color: '#c2185b', fontSize: '1.125rem' }}>Total donat: {totalDonat} RON</strong>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ProfilePage