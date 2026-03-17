import React from 'react'
import { useSelector } from 'react-redux'
import { Eye, Award, TrendingUp } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import './Pages.css'

const COLORS = ['#c2185b', '#f48fb1', '#7b1fa2', '#ce93d8', '#ff8a65', '#4db6ac']

const cheltuieliAdapost = [
  { name: 'Hrană', value: 35 },
  { name: 'Medicamente', value: 25 },
  { name: 'Utilități', value: 15 },
  { name: 'Personal', value: 12 },
  { name: 'Echipamente', value: 8 },
  { name: 'Transport', value: 5 }
]

const distributieDonații = [
  { categorie: 'Hrană animale', procent: 30, suma: 3750 },
  { categorie: 'Tratamente medicale', procent: 25, suma: 3125 },
  { categorie: 'Întreținere adăposturi', procent: 20, suma: 2500 },
  { categorie: 'Campanii sterilizare', procent: 15, suma: 1875 },
  { categorie: 'Administrare platformă', procent: 5, suma: 625 },
  { categorie: 'Fond de urgență', procent: 5, suma: 625 }
]

const topDonatori = [
  { rang: 1, nume: 'Maria D.', suma: 2500, mesaj: 'Pentru toți prietenii blănoși!' },
  { rang: 2, nume: 'Anonim', suma: 1800, mesaj: '' },
  { rang: 3, nume: 'Familia Popescu', suma: 1500, mesaj: 'Cu drag pentru adăpostul Speranța' },
  { rang: 4, nume: 'Alexandru M.', suma: 1200, mesaj: 'Susțin cauza!' },
  { rang: 5, nume: 'Anonim', suma: 1000, mesaj: '' },
  { rang: 6, nume: 'Elena R.', suma: 800, mesaj: 'Pentru pisicuțe' },
  { rang: 7, nume: 'Andrei C.', suma: 600, mesaj: '' },
  { rang: 8, nume: 'Compania TechSoft', suma: 5000, mesaj: 'Parteneriat corporativ 2026' }
]

const topDonatoriSorted = [...topDonatori].sort((a, b) => b.suma - a.suma)

const TransparentaPage = () => {
  const donations = useSelector(state => state.admin.donations || [])
  const totalDonatii = donations.length > 0
    ? donations.reduce((sum, d) => sum + d.amount, 0)
    : 12500

  return (
    <div className='page'>
      <section className='page-hero'>
        <div className='container'>
          <div className='hero-badge'><Eye size={16} /> 100% transparent</div>
          <h1>Transparență <span className='text-gradient'>Financiară</span></h1>
          <p>Aici poți vedea exact unde ajung banii donați și cum sunt folosiți pentru animale.</p>
        </div>
      </section>

      <section className='section'>
        <div className='container'>
          {/* Total și rezumat */}
          <div className='form-card' style={{ textAlign: 'center', marginBottom: '2rem', padding: '2rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#888', margin: '0 0 0.5rem' }}>Total fonduri strânse în 2026</p>
            <p style={{ fontSize: '3rem', fontWeight: 700, color: '#c2185b', margin: '0 0 0.5rem' }}>{totalDonatii.toLocaleString()} RON</p>
            <p style={{ fontSize: '0.875rem', color: '#666', margin: 0 }}>din {donations.length || 47} donații</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            {/* Pie chart cheltuieli */}
            <div className='form-card'>
              <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Cheltuieli adăpost
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>Distribuția cheltuielilor medii ale unui adăpost</p>
              <div style={{ height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={cheltuieliAdapost} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={100} label={({ name, value }) => `${name} ${value}%`}>
                      {cheltuieliAdapost.map((entry, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => `${val}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Unde se duc banii */}
            <div className='form-card'>
              <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Unde se duc donațiile
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>Repartizarea fondurilor pe categorii</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {distributieDonații.map(item => (
                  <div key={item.categorie}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                      <span>{item.categorie}</span>
                      <strong>{item.procent}% · {item.suma} RON</strong>
                    </div>
                    <div style={{ height: 8, background: '#f0f0f0', borderRadius: 50, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${item.procent}%`, background: '#c2185b', borderRadius: 50 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Clasament donatori */}
          <div className='form-card'>
            <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={20} style={{ color: '#c2185b' }} /> Top donatori
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>Mulțumim tuturor celor care contribuie la bunăstarea animalelor!</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {topDonatoriSorted.map((donator, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem',
                  background: i === 0 ? '#fff8e1' : i === 1 ? '#f5f5f5' : i === 2 ? '#fff3e0' : '#fafafa',
                  borderRadius: 8, border: '1px solid #f0f0f0'
                }}>
                  <span style={{
                    width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.875rem',
                    background: i === 0 ? '#ffd54f' : i === 1 ? '#bdbdbd' : i === 2 ? '#ffab91' : '#e0e0e0',
                    color: i < 3 ? '#333' : '#888'
                  }}>
                    {i + 1}
                  </span>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '0.9375rem' }}>{donator.nume}</strong>
                    {donator.mesaj && <p style={{ margin: 0, fontSize: '0.75rem', color: '#888' }}>"{donator.mesaj}"</p>}
                  </div>
                  <strong style={{ color: '#c2185b', fontSize: '1.125rem' }}>{donator.suma.toLocaleString()} RON</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TransparentaPage