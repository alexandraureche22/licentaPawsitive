import React, { useState, useEffect } from 'react'
import { Heart, Users } from 'lucide-react'
import { shelterNeeds } from '../data/animals'
import { SERVER } from '../config/global'
import './Pages.css'

const DistanceAdoptionPage = () => {
  const [activeTab, setActiveTab] = useState('sponsor')
  const [animals, setAnimals] = useState([])

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch(`${SERVER}/api/animals`)
        if (response.ok) {
          const data = await response.json()
          setAnimals(data.data || [])
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchAnimals()
  }, [])

  return (
    <div className='page'>
      <section className='page-hero'>
        <div className='container'>
          <div className='hero-badge'><Heart size={16} /> Implică-te</div>
          <h1>Adoptă la <span className='text-gradient'>distanță</span> & Voluntariat</h1>
          <p>Nu poți adopta acum? Sponsorizează un animal sau devino voluntar la un adăpost din comunitatea ta.</p>
        </div>
      </section>
      <section className='section'>
        <div className='container' style={{ maxWidth: '700px' }}>
          <div className='tabs'>
            <button className={`tab-btn ${activeTab === 'sponsor' ? 'active' : ''}`} onClick={() => setActiveTab('sponsor')}>
              <Heart size={16} /> Sponsorizare
            </button>
            <button className={`tab-btn ${activeTab === 'volunteer' ? 'active' : ''}`} onClick={() => setActiveTab('volunteer')}>
              <Users size={16} /> Voluntariat
            </button>
          </div>

          {activeTab === 'sponsor' && (
            <div className='form-card'>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Sponsorizează un animal</h2>
              <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>Alege un animal și contribuie lunar la întreținerea lui.</p>
              <div className='form-row'>
                <div className='form-group'><label>Nume *</label><input className='form-input' /></div>
                <div className='form-group'><label>Email *</label><input className='form-input' type='email' /></div>
              </div>
              <div className='form-group'>
                <label>Animal *</label>
                <select className='form-select'>
                  <option value=''>Alege animalul</option>
                  {animals.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.name} — {a.species} · {a.breed} · {a.city}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'><label>Sumă lunară (RON) *</label><input className='form-input' type='number' min={10} /></div>
              <div className='form-group'><label>Mesaj (opțional)</label><textarea className='form-textarea' /></div>
              <button className='btn btn-primary btn-block btn-lg'>Sponsorizează</button>
            </div>
          )}

          {activeTab === 'volunteer' && (
            <div className='form-card'>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Devino voluntar</h2>
              <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>Ajută adăposturile din comunitatea ta.</p>
              <div className='form-row'>
                <div className='form-group'><label>Nume complet *</label><input className='form-input' /></div>
                <div className='form-group'><label>Email *</label><input className='form-input' type='email' /></div>
                <div className='form-group'><label>Telefon *</label><input className='form-input' /></div>
                <div className='form-group'><label>Oraș *</label><input className='form-input' /></div>
              </div>
              <div className='form-group'>
                <label>Adăpost preferat</label>
                <select className='form-select'>
                  <option value=''>Oricare</option>
                  {shelterNeeds.map(s => <option key={s.id} value={s.shelter}>{s.shelter} - {s.city}</option>)}
                </select>
              </div>
              <div className='form-group'>
                <label>Disponibilitate *</label>
                <select className='form-select'>
                  <option value=''>Selectează</option>
                  <option value='weekend'>Weekenduri</option>
                  <option value='saptamanal'>Câteva ore pe săptămână</option>
                  <option value='zilnic'>Zilnic</option>
                  <option value='ocazional'>Ocazional</option>
                </select>
              </div>
              <div className='form-group'><label>Abilități</label><input className='form-input' placeholder='Transport, îngrijire animale, social media...' /></div>
              <div className='form-group'><label>Motivație *</label><textarea className='form-textarea' placeholder='De ce vrei să fii voluntar?' /></div>
              <button className='btn btn-primary btn-block btn-lg'>Aplică pentru voluntariat</button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default DistanceAdoptionPage