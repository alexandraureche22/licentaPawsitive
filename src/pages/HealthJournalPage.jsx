import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Shield, Check, ChevronRight } from 'lucide-react'
import { getAllAnimals } from '../stores/actions/animal-actions'
import './Pages.css'

const typeLabels = {
  vaccin: '💉 Vaccin',
  sterilizare: '✂️ Sterilizare',
  deparazitare: '🛡️ Deparazitare',
  control: '🩺 Control',
  tratament: '💊 Tratament'
}

const HealthJournalPage = () => {
  const dispatch = useDispatch()
  const animals = useSelector(state => state.animal.data)

  useEffect(() => {
    const load = async () => {
      const action = await getAllAnimals()
      dispatch(action)
    }
    load()
  }, [dispatch])

  return (
    <div className='page'>
      <section className='page-hero'>
        <div className='container'>
          <div className='hero-badge'><Shield size={16} /> Transparență medicală</div>
          <h1>Jurnal de <span className='text-gradient'>Sănătate</span></h1>
          <p>Istoric medical complet și verificat digital pentru fiecare animal din platformă.</p>
        </div>
      </section>
      <section className='section'>
        <div className='container'>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {animals.map(animal => (
              <div key={animal.id} className='form-card'>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <img src={animal.image} alt={animal.name} style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: '1.125rem' }}>{animal.name}</h3>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#888' }}>{animal.breed} · {animal.age} · {animal.city}</p>
                  </div>
                  <Link to={`/animale/${animal.id}`} className='btn btn-outline btn-sm'>
                    Profil <ChevronRight size={14} />
                  </Link>
                </div>
                {animal.healthRecords && animal.healthRecords.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {animal.healthRecords.map(record => (
                      <div key={record.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: '#fafafa', borderRadius: 8, border: '1px solid #f0f0f0' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{typeLabels[record.type] || record.type}</span>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontSize: '0.875rem' }}>{record.description}</p>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: '#888' }}>{record.date} · {record.veterinar}</p>
                        </div>
                        {record.verified && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#2e7d32', fontWeight: 500, whiteSpace: 'nowrap' }}>
                            <Check size={14} /> Verificat
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: '0.875rem', color: '#888' }}>Nu există înregistrări medicale.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HealthJournalPage