import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Heart, HandHeart, Building2, Zap, CreditCard, Lock, X } from 'lucide-react'
import { createDonation } from '../stores/actions/donation-actions'
import { shelterNeeds } from '../data/animals'
import './Pages.css'

function calculateDonationImpact(amount) {
  if (!amount || amount <= 0) return null
  return {
    zileHrana: Math.floor(amount / 8),
    animaleHraniteLuna: Math.floor((amount / (8 * 30)) * 10) / 10,
    vaccinuri: Math.floor(amount / 50),
    deparazitari: Math.floor(amount / 30),
    sterilizari: Math.floor(amount / 250),
    zileAdapostire: Math.floor(amount / 3)
  }
}

const amounts = [25, 50, 100, 200, 500]

const CardModal = ({ amount, onClose, onConfirm, loading }) => {
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [errors, setErrors] = useState({})

  const updateCard = (key, value) => {
    let formatted = value
    if (key === 'number') {
      formatted = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
    }
    if (key === 'expiry') {
      formatted = value.replace(/\D/g, '').slice(0, 4)
      if (formatted.length > 2) formatted = formatted.slice(0, 2) + '/' + formatted.slice(2)
    }
    if (key === 'cvv') {
      formatted = value.replace(/\D/g, '').slice(0, 3)
    }
    setCard(prev => ({ ...prev, [key]: formatted }))
  }

  const validate = () => {
    const errs = {}
    if (card.number.replace(/\s/g, '').length < 16) errs.number = 'Număr card invalid'
    if (!card.name.trim()) errs.name = 'Introdu numele de pe card'
    if (card.expiry.length < 5) errs.expiry = 'Dată expirare invalidă'
    if (card.cvv.length < 3) errs.cvv = 'CVV invalid'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handlePay = () => {
    if (validate()) onConfirm()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 200, padding: '1rem'
    }}>
      <div className='form-card' style={{ width: '100%', maxWidth: 420, position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>
          <X size={20} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: '#fce4ec', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CreditCard size={24} style={{ color: '#c2185b' }} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Plată cu cardul</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#888' }}>Sumă: <strong style={{ color: '#c2185b' }}>{amount} RON</strong></p>
          </div>
        </div>

        <div className='form-group'>
          <label>Număr card *</label>
          <input className='form-input' value={card.number} onChange={e => updateCard('number', e.target.value)} placeholder='1234 5678 9012 3456' />
          {errors.number && <p style={{ color: '#d32f2f', fontSize: '0.75rem', margin: '0.25rem 0 0' }}>{errors.number}</p>}
        </div>
        <div className='form-group'>
          <label>Nume titular *</label>
          <input className='form-input' value={card.name} onChange={e => updateCard('name', e.target.value)} placeholder='ION POPESCU' style={{ textTransform: 'uppercase' }} />
          {errors.name && <p style={{ color: '#d32f2f', fontSize: '0.75rem', margin: '0.25rem 0 0' }}>{errors.name}</p>}
        </div>
        <div className='form-row'>
          <div className='form-group'>
            <label>Dată expirare *</label>
            <input className='form-input' value={card.expiry} onChange={e => updateCard('expiry', e.target.value)} placeholder='MM/YY' />
            {errors.expiry && <p style={{ color: '#d32f2f', fontSize: '0.75rem', margin: '0.25rem 0 0' }}>{errors.expiry}</p>}
          </div>
          <div className='form-group'>
            <label>CVV *</label>
            <input className='form-input' value={card.cvv} onChange={e => updateCard('cvv', e.target.value)} placeholder='123' type='password' />
            {errors.cvv && <p style={{ color: '#d32f2f', fontSize: '0.75rem', margin: '0.25rem 0 0' }}>{errors.cvv}</p>}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: '#f5f5f5', borderRadius: 8, marginBottom: '1rem' }}>
          <Lock size={14} style={{ color: '#888' }} />
          <p style={{ margin: 0, fontSize: '0.75rem', color: '#888' }}>Plată securizată. Datele tale sunt protejate prin criptare SSL.</p>
        </div>

        <button className='btn btn-primary btn-block btn-lg' onClick={handlePay} disabled={loading}>
          {loading ? 'Se procesează...' : `Plătește ${amount} RON`}
        </button>
      </div>
    </div>
  )
}

const DonationsPage = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.donation.loading)
  const success = useSelector(state => state.donation.success)
  const [form, setForm] = useState({ donorName: '', email: '', amount: 0, customAmount: '', donationType: 'general', shelterName: '', message: '' })
  const [showCardModal, setShowCardModal] = useState(false)

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))
  const currentAmount = form.amount || Number(form.customAmount) || 0
  const impact = calculateDonationImpact(currentAmount)

  const handleOpenModal = () => {
    if (!form.donorName || !form.email || !currentAmount) return
    setShowCardModal(true)
  }

  const handleConfirmPayment = async () => {
    const action = await createDonation({ ...form, amount: currentAmount })
    dispatch(action)
    setShowCardModal(false)
  }

  return (
    <div className='page'>
      {showCardModal && (
        <CardModal
          amount={currentAmount}
          onClose={() => setShowCardModal(false)}
          onConfirm={handleConfirmPayment}
          loading={loading}
        />
      )}

      <section className='page-hero'>
        <div className='container'>
          <div className='hero-badge'><HandHeart size={16} /> Fiecare leu contează</div>
          <h1>Donează pentru <span className='text-gradient'>animale</span></h1>
          <p>Contribuția ta ajută la hrănirea, tratarea și adăpostirea animalelor care așteaptă o familie.</p>
        </div>
      </section>

      <section className='section'>
        <div className='container' style={{ maxWidth: '700px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
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
              <button className='btn btn-primary btn-block btn-lg' onClick={handleOpenModal} disabled={!form.donorName || !form.email || !currentAmount}>
                <CreditCard size={16} /> Continuă spre plată
              </button>
            </div>

            {impact && (
              <div className='form-card' style={{ background: 'linear-gradient(135deg, #fce4ec, #f3e5f5)', border: '1px solid #f8bbd0' }}>
                <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Zap size={20} style={{ color: '#c2185b' }} /> Impactul donației tale de {currentAmount} RON
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                 {[
                    { value: impact.zileHrana, label: `zile de hrană pentru un animal (8 RON/zi)` },
                    { value: impact.animaleHraniteLuna, label: 'animale hrănite timp de o lună întreagă' },
                    { value: impact.vaccinuri, label: 'vaccinuri complete (50 RON/vaccin)' },
                    { value: impact.deparazitari, label: 'deparazitări complete (30 RON/tratament)' },
                    { value: impact.sterilizari, label: 'sterilizări chirurgicale (250 RON/operație)' },
                    { value: impact.zileAdapostire, label: 'zile de adăpostire pentru un animal (3 RON/zi)' }
                  ].map(item => (
                    <div key={item.label} style={{ background: 'white', borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
                      <p style={{ fontSize: '2rem', fontWeight: 700, color: '#c2185b', margin: 0 }}>{item.value}</p>
                      <p style={{ fontSize: '0.8125rem', color: '#666', margin: '0.25rem 0 0' }}>{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
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