import React, { useState } from 'react'
import { Calculator, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import './Pages.css'

const costuriLunare = {
  câine: { hrană: 200, veterinar: 80, accesorii: 50, igienă: 40, jucării: 30 },
  pisică: { hrană: 120, veterinar: 70, accesorii: 30, igienă: 50, jucării: 20 },
  iepure: { hrană: 60, veterinar: 50, accesorii: 20, igienă: 30, jucării: 15 },
  hamster: { hrană: 30, veterinar: 40, accesorii: 15, igienă: 20, jucării: 10 },
  papagal: { hrană: 50, veterinar: 60, accesorii: 25, igienă: 15, jucării: 20 },
  măgar: { hrană: 400, veterinar: 150, accesorii: 100, igienă: 60, jucării: 20 }
}

const costuriInitiale = {
  câine: { sterilizare: 350, vaccinuri: 200, microcip: 50, echipament: 300 },
  pisică: { sterilizare: 250, vaccinuri: 150, microcip: 50, echipament: 200 },
  iepure: { sterilizare: 200, vaccinuri: 100, microcip: 30, echipament: 150 },
  hamster: { sterilizare: 0, vaccinuri: 50, microcip: 0, echipament: 100 },
  papagal: { sterilizare: 0, vaccinuri: 80, microcip: 0, echipament: 200 },
  măgar: { sterilizare: 500, vaccinuri: 300, microcip: 50, echipament: 500 }
}

const CalculatorPage = () => {
  const [species, setSpecies] = useState('câine')
  const [months, setMonths] = useState(12)

  const lunar = costuriLunare[species]
  const initial = costuriInitiale[species]
  const totalLunar = Object.values(lunar).reduce((a, b) => a + b, 0)
  const totalInitial = Object.values(initial).reduce((a, b) => a + b, 0)
  const totalPerioadă = totalLunar * months + totalInitial

  const chartData = Object.entries(lunar).map(([key, val]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    lunar: val,
    anual: val * 12
  }))

  const budgetData = [
    { name: 'Costuri inițiale', valoare: totalInitial },
    { name: `Întreținere ${months} luni`, valoare: totalLunar * months },
    { name: 'Total estimat', valoare: totalPerioadă }
  ]

  return (
    <div className='page'>
      <section className='page-hero'>
        <div className='container'>
          <div className='hero-badge'><Calculator size={16} /> Planifică-ți bugetul</div>
          <h1>Calculator <span className='text-gradient'>costuri</span></h1>
          <p>Estimează cât costă întreținerea unui animal și planifică-ți bugetul pentru adopție.</p>
        </div>
      </section>

      <section className='section'>
        <div className='container' style={{ maxWidth: '900px' }}>
          {/* Selector */}
          <div className='form-card' style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calculator size={20} style={{ color: '#c2185b' }} /> Configurare
            </h2>
            <div className='form-row'>
              <div className='form-group'>
                <label>Tip animal</label>
                <select className='form-select' value={species} onChange={e => setSpecies(e.target.value)}>
                  <option value='câine'>Câine</option>
                  <option value='pisică'>Pisică</option>
                  <option value='iepure'>Iepure</option>
                  <option value='hamster'>Hamster</option>
                  <option value='papagal'>Papagal</option>
                  <option value='măgar'>Măgar</option>
                </select>
              </div>
              <div className='form-group'>
                <label>Perioada (luni)</label>
                <select className='form-select' value={months} onChange={e => setMonths(Number(e.target.value))}>
                  <option value={6}>6 luni</option>
                  <option value={12}>1 an</option>
                  <option value={24}>2 ani</option>
                  <option value={36}>3 ani</option>
                  <option value={60}>5 ani</option>
                </select>
              </div>
            </div>
          </div>

          {/* Costuri lunare */}
          <div className='form-card' style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginTop: 0 }}>Costuri lunare estimative — {species}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {Object.entries(lunar).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#fafafa', borderRadius: 8, border: '1px solid #f0f0f0' }}>
                  <span style={{ fontWeight: 500, textTransform: 'capitalize' }}>{key}</span>
                  <strong>{val} RON</strong>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#fce4ec', borderRadius: 8 }}>
                <strong>Total lunar</strong>
                <strong style={{ color: '#c2185b' }}>{totalLunar} RON</strong>
              </div>
            </div>
            <div style={{ height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip formatter={(val) => `${val} RON`} />
                  <Legend />
                  <Bar dataKey='lunar' name='Cost lunar' fill='#c2185b' radius={[4, 4, 0, 0]} />
                  <Bar dataKey='anual' name='Cost anual' fill='#f48fb1' radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Estimator buget adopție */}
          <div className='form-card' style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={20} style={{ color: '#c2185b' }} /> Estimator buget adopție
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>Costuri inițiale unice + întreținere pe {months} luni</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {Object.entries(initial).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#fafafa', borderRadius: 8, border: '1px solid #f0f0f0' }}>
                  <span style={{ fontWeight: 500, textTransform: 'capitalize' }}>{key}</span>
                  <strong>{val} RON</strong>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#f3e5f5', borderRadius: 8 }}>
                <strong>Total costuri inițiale</strong>
                <strong>{totalInitial} RON</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#e8f5e9', borderRadius: 8 }}>
                <strong>Întreținere {months} luni</strong>
                <strong>{totalLunar * months} RON</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#fce4ec', borderRadius: 8, fontSize: '1.125rem' }}>
                <strong>TOTAL ESTIMAT</strong>
                <strong style={{ color: '#c2185b' }}>{totalPerioadă} RON</strong>
              </div>
            </div>
            <div style={{ height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={budgetData} layout='vertical'>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis type='number' />
                  <YAxis dataKey='name' type='category' width={140} />
                  <Tooltip formatter={(val) => `${val} RON`} />
                  <Bar dataKey='valoare' name='Sumă (RON)' fill='#c2185b' radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CalculatorPage