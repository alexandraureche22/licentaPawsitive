import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Heart, HandHeart, Building2 } from 'lucide-react'
import { createDonation } from '../stores/actions/donation-actions'
import { shelterNeeds } from '../data/animals'
import './Pages.css'

const amounts = [25, 50, 100, 200, 500]

const DonationsPage = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.donation.loading)
  const success = useSelector(state => state.donation.success)
  const [form, setForm] = useState({ donorName: '', email: '', amount: 0, customAmount: '', donationType: 'general', shelterName: '', message: '' })

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = async () => {
    const finalAmount = form.amount || Number(form.customAmount)
    if (!form.donorName || !form.email || !finalAmount) return
    const action = await createDonation({ ...form, amount: finalAmount })
    dispatch(action)
  }

  return (
    <div className='page'>
      <section className='page-hero'>
        <div className='container'>
          <div className='hero-badge'><HandHeart size={16} /> Fiecare leu contează</div>
          <h1>Donează pentru <span className='text-gradient'>animale</span></h1>
          <p>Contribuția ta ajută la hrănirea, tratarea și adăpostirea animalelor care așteaptă o familie.</p>
        </div>
      </section>
      <section className='section'>
        <div className='container' style={{ maxWidth: '600px' }}>
          <div className='form-card'>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Heart size={24} style={{ color: '#c2185b' }} /> Formular donație
            </h2>
            {success && <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>Mulțumim! Donația a fost înregistrată.</div>}
            <div className='form-row'>
              <div className='form-group'><label>Nume *</label><input className='form-input' value={form.donorName} onChange={e => update('donorName', e.target.value)} /></div>
              <div className='form-group'><label>Email *</label><input className='form-input' type='email' value={form.email} onChange={e => update('email', e.target.value)} /></div>
            </div>
            <div className='form-group'>
              <label>Sumă (RON) *</label>
              <div className='amount-buttons'>
                {amounts.map(a => (
                  <button key={a} onClick={() => { update('amount', a); update('customAmount', '') }} className={`amount-btn ${form.amount === a ? 'active' : ''}`}>{a} RON</button>
                ))}
              </div>
              <input className='form-input' type='number' placeholder='Altă sumă' value={form.customAmount} onChange={e => { update('customAmount', e.target.value); update('amount', 0) }} style={{ marginTop: '0.5rem' }} />
            </div>
            <div className='form-group'>
              <label>Tip donație</label>
              <select className='form-select' value={form.donationType} onChange={e => update('donationType', e.target.value)}>
                <option value='general'>Donație generală</option>
                <option value='shelter'>Pentru un adăpost</option>
                <option value='medical'>Fond medical</option>
                <option value='food'>Hrană</option>
              </select>
            </div>
            {form.donationType === 'shelter' && (
              <div className='form-group'>
                <label>Adăpost</label>
                <select className='form-select' value={form.shelterName} onChange={e => update('shelterName', e.target.value)}>
                  <option value=''>Selectează adăpostul</option>
                  {shelterNeeds.map(s => <option key={s.id} value={s.shelter}>{s.shelter} - {s.city}</option>)}
                </select>
              </div>
            )}
            <div className='form-group'><label>Mesaj (opțional)</label><textarea className='form-textarea' value={form.message} onChange={e => update('message', e.target.value)} placeholder='Un mesaj de încurajare...' /></div>
            <button className='btn btn-primary btn-block btn-lg' onClick={handleSubmit} disabled={loading}>
              {loading ? 'Se procesează...' : 'Donează acum'}
            </button>
          </div>
        </div>
      </section>
      <section className='section section-sage'>
        <div className='container'>
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Ce au nevoie adăposturile</h2>
          <div className='features-grid' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {shelterNeeds.map(shelter => (
              <div key={shelter.id} className='form-card'>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Building2 size={20} style={{ color: '#c2185b' }} />
                  <h3 style={{ margin: 0 }}>{shelter.shelter}</h3>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#888', margin: '0 0 0.75rem' }}>{shelter.city}</p>
                {shelter.needs.map(need => (
                  <div key={need.item} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    <span>{need.item}</span>
                    <span style={{ fontSize: '0.75rem', color: need.urgency === 'ridicată' ? '#d32f2f' : need.urgency === 'medie' ? '#f57c00' : '#888' }}>{need.urgency}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default DonationsPage
