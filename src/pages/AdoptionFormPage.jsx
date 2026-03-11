import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Heart, ArrowLeft } from 'lucide-react'
import { getOneAnimal } from '../stores/actions/animal-actions'
import { createAdoptionRequest } from '../stores/actions/adoption-actions'
import './Pages.css'

const AdoptionFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.data)
  const animal = useSelector(state => state.animal.selectedAnimal)
  const loading = useSelector(state => state.adoption.loading)
  const success = useSelector(state => state.adoption.success)
  const isAuthenticated = !!userData.token

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', city: '', housingType: '',
    hasYard: false, hasOtherPets: false, otherPetsDetails: '',
    hasChildren: false, childrenAges: '', experience: '', motivation: ''
  })

  useEffect(() => {
    const load = async () => {
      const action = await getOneAnimal(id)
      dispatch(action)
    }
    load()
  }, [dispatch, id])

  useEffect(() => {
    if (success) navigate('/animale')
  }, [success, navigate])

  if (!isAuthenticated) return <Navigate to='/autentificare' replace />

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = async () => {
    if (!form.fullName || !form.email || !form.phone || !form.city || !form.housingType || !form.motivation) return
    const action = await createAdoptionRequest({ ...form, animalId: parseInt(id) })
    dispatch(action)
  }

  if (!animal) return <div className='page' style={{ paddingTop: '6rem', textAlign: 'center' }}>Se încarcă...</div>

  return (
    <div className='page' style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
      <div className='container' style={{ maxWidth: '600px' }}>
        <button className='back-link' onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
          <ArrowLeft size={16} /> Înapoi
        </button>
        <div className='form-card'>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <img src={animal.image} alt={animal.name} style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Adoptă pe {animal.name}</h1>
              <p style={{ fontSize: '0.875rem', color: '#888', margin: 0 }}>{animal.breed} · {animal.age} · {animal.shelter}</p>
            </div>
            <Heart size={24} style={{ color: '#c2185b' }} />
          </div>

          <div className='form-row'>
            <div className='form-group'><label>Nume complet *</label><input className='form-input' value={form.fullName} onChange={e => update('fullName', e.target.value)} /></div>
            <div className='form-group'><label>Email *</label><input className='form-input' type='email' value={form.email} onChange={e => update('email', e.target.value)} /></div>
            <div className='form-group'><label>Telefon *</label><input className='form-input' value={form.phone} onChange={e => update('phone', e.target.value)} /></div>
            <div className='form-group'><label>Oraș *</label><input className='form-input' value={form.city} onChange={e => update('city', e.target.value)} /></div>
          </div>
          <div className='form-group'>
            <label>Tip locuință *</label>
            <select className='form-select' value={form.housingType} onChange={e => update('housingType', e.target.value)}>
              <option value=''>Selectează</option>
              <option value='apartament-mic'>Apartament mic</option>
              <option value='apartament-mare'>Apartament mare</option>
              <option value='casa-curte-mica'>Casă cu curte mică</option>
              <option value='casa-curte-mare'>Casă cu curte mare</option>
            </select>
          </div>
          <div className='form-check'><input type='checkbox' checked={form.hasYard} onChange={e => update('hasYard', e.target.checked)} /><label>Am curte / grădină</label></div>
          <div className='form-check'><input type='checkbox' checked={form.hasOtherPets} onChange={e => update('hasOtherPets', e.target.checked)} /><label>Am alte animale</label></div>
          {form.hasOtherPets && <div className='form-group'><input className='form-input' placeholder='Ce animale ai?' value={form.otherPetsDetails} onChange={e => update('otherPetsDetails', e.target.value)} /></div>}
          <div className='form-check'><input type='checkbox' checked={form.hasChildren} onChange={e => update('hasChildren', e.target.checked)} /><label>Am copii</label></div>
          {form.hasChildren && <div className='form-group'><input className='form-input' placeholder='Vârstele copiilor' value={form.childrenAges} onChange={e => update('childrenAges', e.target.value)} /></div>}
          <div className='form-group'><label>Experiență cu animale</label><textarea className='form-textarea' value={form.experience} onChange={e => update('experience', e.target.value)} placeholder='Descrie experiența ta...' /></div>
          <div className='form-group'><label>De ce vrei să adopți? *</label><textarea className='form-textarea' value={form.motivation} onChange={e => update('motivation', e.target.value)} placeholder='Motivația ta...' /></div>
          <button className='btn btn-primary btn-block btn-lg' onClick={handleSubmit} disabled={loading}>
            {loading ? 'Se trimite...' : 'Trimite cererea de adopție'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdoptionFormPage
