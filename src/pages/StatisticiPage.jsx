import React from 'react'
import { useSelector } from 'react-redux'
import { BarChart2, TrendingUp, Users, Heart, PawPrint } from 'lucide-react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts'
import './Pages.css'

const COLORS = ['#c2185b', '#f48fb1', '#7b1fa2', '#ce93d8', '#ff8a65', '#4db6ac']

const raportAdaposturi = [
  { luna: 'Oct 2025', intrate: 45, adoptate: 30, returnate: 3 },
  { luna: 'Nov 2025', intrate: 38, adoptate: 35, returnate: 2 },
  { luna: 'Dec 2025', intrate: 52, adoptate: 28, returnate: 4 },
  { luna: 'Ian 2026', intrate: 40, adoptate: 42, returnate: 1 },
  { luna: 'Feb 2026', intrate: 35, adoptate: 38, returnate: 2 },
  { luna: 'Mar 2026', intrate: 30, adoptate: 45, returnate: 1 }
]

const speciiDistribuție = [
  { name: 'Câini', value: 45 },
  { name: 'Pisici', value: 32 },
  { name: 'Iepuri', value: 12 },
  { name: 'Altele', value: 11 }
]

const adoptiiPeOrase = [
  { oras: 'București', adoptii: 85 },
  { oras: 'Cluj-Napoca', adoptii: 62 },
  { oras: 'Timișoara', adoptii: 48 },
  { oras: 'Iași', adoptii: 35 },
  { oras: 'Brașov', adoptii: 28 }
]

const StatisticiPage = () => {
  const animals = useSelector(state => state.animal.data)
  const donations = useSelector(state => state.admin.donations || [])

  const totalAnimale = animals.length
  const totalDonații = donations.reduce((sum, d) => sum + d.amount, 0)

  return (
    <div className='page'>
      <section className='page-hero'>
        <div className='container'>
          <div className='hero-badge'><BarChart2 size={16} /> Date în timp real</div>
          <h1>Dashboard <span className='text-gradient'>Statistici</span></h1>
          <p>Monitorizează performanța platformei, adopțiile și impactul comunității.</p>
        </div>
      </section>

      <section className='section'>
        <div className='container'>
          {/* KPI Cards */}
          <div className='stats-grid' style={{ marginBottom: '3rem' }}>
            <div className='stat-card'>
              <PawPrint size={24} style={{ color: '#c2185b', margin: '0 auto 0.5rem', display: 'block' }} />
              <p className='stat-value'>{totalAnimale}</p>
              <p className='stat-label'>Animale în platformă</p>
            </div>
            <div className='stat-card'>
              <Heart size={24} style={{ color: '#c2185b', margin: '0 auto 0.5rem', display: 'block' }} />
              <p className='stat-value'>2,200+</p>
              <p className='stat-label'>Adopții reușite</p>
            </div>
            <div className='stat-card'>
              <Users size={24} style={{ color: '#c2185b', margin: '0 auto 0.5rem', display: 'block' }} />
              <p className='stat-value'>300+</p>
              <p className='stat-label'>Voluntari activi</p>
            </div>
            <div className='stat-card'>
              <TrendingUp size={24} style={{ color: '#c2185b', margin: '0 auto 0.5rem', display: 'block' }} />
              <p className='stat-value'>{totalDonații || '12,500'} RON</p>
              <p className='stat-label'>Donații totale</p>
            </div>
          </div>

          {/* Raport lunar adăposturi */}
          <div className='form-card' style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginTop: 0 }}>Raport lunar adăposturi</h3>
            <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>Animale intrate, adoptate și returnate pe ultimele 6 luni</p>
            <div style={{ height: 350 }}>
              <ResponsiveContainer>
                <BarChart data={raportAdaposturi}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='luna' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey='intrate' name='Intrate' fill='#f48fb1' radius={[4, 4, 0, 0]} />
                  <Bar dataKey='adoptate' name='Adoptate' fill='#c2185b' radius={[4, 4, 0, 0]} />
                  <Bar dataKey='returnate' name='Returnate' fill='#e0e0e0' radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Distribuție specii */}
            <div className='form-card'>
              <h3 style={{ marginTop: 0 }}>Distribuție specii</h3>
              <div style={{ height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={speciiDistribuție} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {speciiDistribuție.map((entry, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => `${val} animale`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Adopții pe orașe */}
            <div className='form-card'>
              <h3 style={{ marginTop: 0 }}>Top adopții pe orașe</h3>
              <div style={{ height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={adoptiiPeOrase} layout='vertical'>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis type='number' />
                    <YAxis dataKey='oras' type='category' width={100} />
                    <Tooltip formatter={(val) => `${val} adopții`} />
                    <Bar dataKey='adoptii' name='Adopții' fill='#c2185b' radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Trend adopții */}
          <div className='form-card' style={{ marginTop: '2rem' }}>
            <h3 style={{ marginTop: 0 }}>Trend adopții (6 luni)</h3>
            <div style={{ height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={raportAdaposturi}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='luna' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type='monotone' dataKey='adoptate' name='Adoptate' stroke='#c2185b' strokeWidth={3} dot={{ r: 5 }} />
                  <Line type='monotone' dataKey='intrate' name='Intrate' stroke='#f48fb1' strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StatisticiPage