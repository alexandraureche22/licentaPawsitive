import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Shield, PlusCircle, Edit, Trash2, CheckCircle, XCircle, Heart, Stethoscope } from 'lucide-react'
import { getAllAnimals } from '../stores/actions/animal-actions'
import { SERVER } from '../config/global'
import { createAnimal, updateAnimal, deleteAnimal, getAllAdoptionRequests, updateAdoptionRequestStatus, getAllDonations, addHealthRecord } from '../stores/actions/admin-actions'
import './Pages.css'

const emptyAnimal = {
  name: '', species: 'câine', breed: '', age: '', gender: 'Mascul', size: 'mediu',
  image: '', description: '', personality: '', goodWithKids: false, goodWithCats: false,
  goodWithDogs: false, energyLevel: 'moderat', apartmentFriendly: false, shelter: '', city: ''
}

const emptyRecord = { date: '', type: 'vaccin', description: '', veterinar: '' }

const AdminPage = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.data)
  const animals = useSelector(state => state.animal.data)
  const adoptionRequests = useSelector(state => state.admin.adoptionRequests)
  const donations = useSelector(state => state.admin.donations)
  const loading = useSelector(state => state.admin.loading)

  const [tab, setTab] = useState('animals')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyAnimal)
  const [showHealthForm, setShowHealthForm] = useState(null)
  const [healthForm, setHealthForm] = useState(emptyRecord)

  const isAdmin = userData.type === 'admin'

  useEffect(() => {
    if (!isAdmin) return
    const load = async () => {
      dispatch(await getAllAnimals({ showAdopted: 'true' }))
      dispatch(await getAllAdoptionRequests())
      dispatch(await getAllDonations())
    }
    load()
  }, [dispatch, isAdmin])

  if (!userData.token) return <Navigate to='/autentificare' replace />
  if (!isAdmin) return <Navigate to='/' replace />

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSaveAnimal = async () => {
    if (!form.name || !form.breed || !form.age || !form.shelter || !form.city) return
    const data = {
      ...form,
      personality: typeof form.personality === 'string'
        ? form.personality.split(',').map(s => s.trim()).filter(Boolean)
        : form.personality
    }
    if (editingId) {
      dispatch(await updateAnimal(editingId, data))
    } else {
      dispatch(await createAnimal(data))
    }
    setShowForm(false)
    setEditingId(null)
    setForm(emptyAnimal)
    setTimeout(async () => dispatch(await getAllAnimals({ showAdopted: 'true' })), 500)
  }

  const handleEdit = (animal) => {
    setForm({
      ...animal,
      personality: Array.isArray(animal.personality) ? animal.personality.join(', ') : animal.personality
    })
    setEditingId(animal.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Ești sigur că vrei să ștergi acest animal?')) return
    dispatch(await deleteAnimal(id))
    setTimeout(async () => dispatch(await getAllAnimals({ showAdopted: 'true' })), 500)
  }

  const handleStatusChange = async (id, status) => {
    dispatch(await updateAdoptionRequestStatus(id, status))
    setTimeout(async () => dispatch(await getAllAnimals({ showAdopted: 'true' })), 500)
  }

  const handleAddHealthRecord = async () => {
    if (!healthForm.date || !healthForm.description || !healthForm.veterinar) return
    dispatch(await addHealthRecord(showHealthForm, { ...healthForm, verified: true }))
    setShowHealthForm(null)
    setHealthForm(emptyRecord)
    setTimeout(async () => dispatch(await getAllAnimals({ showAdopted: 'true' })), 500)
  }

  return (
    <div className='page' style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
      <div className='container'>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <Shield size={28} style={{ color: '#c2185b' }} />
          <h1 style={{ margin: 0 }}>Panou Admin</h1>
        </div>

        <div className='tabs' style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
          <button className={`tab-btn ${tab === 'animals' ? 'active' : ''}`} onClick={() => setTab('animals')}>
            Animale ({animals.length})
          </button>
          <button className={`tab-btn ${tab === 'adoptions' ? 'active' : ''}`} onClick={() => setTab('adoptions')}>
            Cereri adopție ({adoptionRequests.length})
          </button>
          <button className={`tab-btn ${tab === 'donations' ? 'active' : ''}`} onClick={() => setTab('donations')}>
            Donații ({donations.length})
          </button>
        </div>

        {/* ===== ANIMALE ===== */}
        {tab === 'animals' && (
          <div>
            <button className='btn btn-primary' onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyAnimal) }} style={{ marginBottom: '1.5rem' }}>
              <PlusCircle size={16} /> Adaugă animal
            </button>

            {showForm && (
              <div className='form-card' style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginTop: 0 }}>{editingId ? 'Editează animal' : 'Animal nou'}</h3>
                <div className='form-row'>
                  <div className='form-group'><label>Nume *</label><input className='form-input' value={form.name} onChange={e => update('name', e.target.value)} /></div>
                  <div className='form-group'><label>Rasă *</label><input className='form-input' value={form.breed} onChange={e => update('breed', e.target.value)} /></div>
                </div>
                <div className='form-row'>
                  <div className='form-group'><label>Specie</label>
                    <select className='form-select' value={form.species} onChange={e => update('species', e.target.value)}>
                      <option value='câine'>Câine</option><option value='pisică'>Pisică</option>
                      <option value='iepure'>Iepure</option><option value='altele'>Altele</option>
                    </select>
                  </div>
                  <div className='form-group'><label>Vârstă *</label><input className='form-input' value={form.age} onChange={e => update('age', e.target.value)} placeholder='ex: 2 ani' /></div>
                </div>
                <div className='form-row'>
                  <div className='form-group'><label>Gen</label>
                    <select className='form-select' value={form.gender} onChange={e => update('gender', e.target.value)}>
                      <option value='Mascul'>Mascul</option><option value='Femelă'>Femelă</option>
                    </select>
                  </div>
                  <div className='form-group'><label>Talie</label>
                    <select className='form-select' value={form.size} onChange={e => update('size', e.target.value)}>
                      <option value='mic'>Mic</option><option value='mediu'>Mediu</option><option value='mare'>Mare</option>
                    </select>
                  </div>
                </div>
                <div className='form-row'>
                  <div className='form-group'><label>Energie</label>
                    <select className='form-select' value={form.energyLevel} onChange={e => update('energyLevel', e.target.value)}>
                      <option value='scăzut'>Scăzut</option><option value='moderat'>Moderat</option><option value='ridicat'>Ridicat</option>
                    </select>
                  </div>
                  <div className='form-group'>
                  <label>Imagine</label>
                  {form.image && <img src={form.image.startsWith('/uploads') ? `${SERVER}${form.image}` : form.image} alt='preview' style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, marginBottom: '0.5rem', display: 'block' }} />}
                  <input type='file' accept='image/*' onChange={async (e) => {
                    const file = e.target.files[0]
                    if (!file) return
                    const formData = new FormData()
                    formData.append('image', file)
                    try {
                      const response = await fetch(`${SERVER}/api/upload`, {
                        method: 'post',
                        headers: { authorization: userData.token },
                        body: formData
                      })
                      if (response.ok) {
                        const data = await response.json()
                        update('image', data.imageUrl)
                      }
                    } catch (err) {
                      console.error('Upload failed:', err)
                    }
                  }} />
                </div>
                  </div>
                <div className='form-row'>
                  <div className='form-group'><label>Adăpost *</label><input className='form-input' value={form.shelter} onChange={e => update('shelter', e.target.value)} /></div>
                  <div className='form-group'><label>Oraș *</label><input className='form-input' value={form.city} onChange={e => update('city', e.target.value)} /></div>
                </div>
                <div className='form-group'><label>Descriere</label><textarea className='form-textarea' value={form.description} onChange={e => update('description', e.target.value)} /></div>
                <div className='form-group'><label>Personalitate (separate prin virgulă)</label><input className='form-input' value={form.personality} onChange={e => update('personality', e.target.value)} placeholder='Jucăuș, Calm, Loial' /></div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div className='form-check'><input type='checkbox' checked={form.goodWithKids} onChange={e => update('goodWithKids', e.target.checked)} /><label>Bun cu copiii</label></div>
                  <div className='form-check'><input type='checkbox' checked={form.goodWithCats} onChange={e => update('goodWithCats', e.target.checked)} /><label>Bun cu pisicile</label></div>
                  <div className='form-check'><input type='checkbox' checked={form.goodWithDogs} onChange={e => update('goodWithDogs', e.target.checked)} /><label>Bun cu câinii</label></div>
                  <div className='form-check'><input type='checkbox' checked={form.apartmentFriendly} onChange={e => update('apartmentFriendly', e.target.checked)} /><label>Potrivit apartament</label></div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className='btn btn-primary' onClick={handleSaveAnimal} disabled={loading}>
                    {loading ? 'Se salvează...' : editingId ? 'Salvează modificări' : 'Adaugă animal'}
                  </button>
                  <button className='btn btn-outline' onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyAnimal) }}>Anulează</button>
                </div>
              </div>
            )}

            {showHealthForm && (
              <div className='form-card' style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginTop: 0 }}>Adaugă înregistrare medicală</h3>
                <div className='form-row'>
                  <div className='form-group'><label>Data *</label><input className='form-input' type='date' value={healthForm.date} onChange={e => setHealthForm(p => ({ ...p, date: e.target.value }))} /></div>
                  <div className='form-group'><label>Tip</label>
                    <select className='form-select' value={healthForm.type} onChange={e => setHealthForm(p => ({ ...p, type: e.target.value }))}>
                      <option value='vaccin'>Vaccin</option><option value='sterilizare'>Sterilizare</option>
                      <option value='deparazitare'>Deparazitare</option><option value='control'>Control</option>
                      <option value='tratament'>Tratament</option>
                    </select>
                  </div>
                </div>
                <div className='form-group'><label>Descriere *</label><input className='form-input' value={healthForm.description} onChange={e => setHealthForm(p => ({ ...p, description: e.target.value }))} /></div>
                <div className='form-group'><label>Veterinar *</label><input className='form-input' value={healthForm.veterinar} onChange={e => setHealthForm(p => ({ ...p, veterinar: e.target.value }))} /></div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className='btn btn-primary' onClick={handleAddHealthRecord} disabled={loading}>{loading ? 'Se salvează...' : 'Adaugă'}</button>
                  <button className='btn btn-outline' onClick={() => { setShowHealthForm(null); setHealthForm(emptyRecord) }}>Anulează</button>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {animals.map(animal => (
                <div key={animal.id} className='form-card' style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={animal.image} alt={animal.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <strong>{animal.name}</strong>
                        {animal.adopted && (
                          <span style={{ padding: '0.125rem 0.5rem', borderRadius: 50, fontSize: '0.6875rem', fontWeight: 600, background: '#e8f5e9', color: '#2e7d32' }}>
                            Adoptat
                          </span>
                        )}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.8125rem', color: '#888' }}>{animal.species} · {animal.breed} · {animal.age} · {animal.city}</p>
                    </div>
                    <button className='btn btn-sm btn-outline' onClick={() => { setShowHealthForm(animal.id); setHealthForm(emptyRecord) }}>
                      <Stethoscope size={14} /> Medical
                    </button>
                    <button className='btn btn-sm btn-outline' onClick={() => handleEdit(animal)}><Edit size={14} /> Editează</button>
                    <button className='btn btn-sm btn-outline' onClick={() => handleDelete(animal.id)} style={{ color: '#d32f2f', borderColor: '#d32f2f' }}><Trash2 size={14} /> Șterge</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== CERERI ADOPȚIE ===== */}
        {tab === 'adoptions' && (
          <div>
            {adoptionRequests.length === 0 ? (
              <div className='empty-state'><Heart size={48} /><p>Nu există cereri de adopție.</p></div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {adoptionRequests.map(req => (
                  <div key={req.id} className='form-card' style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <div>
                        <strong style={{ fontSize: '1.125rem' }}>{req.fullName}</strong>
                        <p style={{ margin: 0, fontSize: '0.8125rem', color: '#888' }}>{req.email} · {req.phone} · {req.city}</p>
                      </div>
                      <span style={{
                        padding: '0.25rem 0.75rem', borderRadius: 50, fontSize: '0.75rem', fontWeight: 600,
                        background: req.status === 'approved' ? '#e8f5e9' : req.status === 'rejected' ? '#ffebee' : '#fff3e0',
                        color: req.status === 'approved' ? '#2e7d32' : req.status === 'rejected' ? '#d32f2f' : '#f57c00'
                      }}>
                        {req.status === 'pending' ? 'În așteptare' : req.status === 'approved' ? 'Aprobată' : 'Respinsă'}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#555', margin: '0 0 0.5rem' }}>
                      <strong>Animal:</strong> {req.animal ? req.animal.name : 'N/A'} · <strong>Locuință:</strong> {req.housingType} · <strong>Experiență:</strong> {req.experience || 'Nespecificată'}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#555', margin: '0 0 0.75rem' }}><strong>Motivație:</strong> {req.motivation}</p>
                    {req.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className='btn btn-sm btn-primary' onClick={() => handleStatusChange(req.id, 'approved')}>
                          <CheckCircle size={14} /> Aprobă
                        </button>
                        <button className='btn btn-sm btn-outline' onClick={() => handleStatusChange(req.id, 'rejected')} style={{ color: '#d32f2f', borderColor: '#d32f2f' }}>
                          <XCircle size={14} /> Respinge
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== DONAȚII ===== */}
        {tab === 'donations' && (
          <div>
            {donations.length === 0 ? (
              <div className='empty-state'><Heart size={48} /><p>Nu există donații.</p></div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {donations.map(don => (
                  <div key={don.id} className='form-card' style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <strong>{don.donorName}</strong>
                      <p style={{ margin: 0, fontSize: '0.8125rem', color: '#888' }}>{don.email} · {don.donationType}{don.shelterName ? ` · ${don.shelterName}` : ''}</p>
                      {don.message && <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: '#555' }}>"{don.message}"</p>}
                    </div>
                    <strong style={{ fontSize: '1.25rem', color: '#c2185b' }}>{don.amount} RON</strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage