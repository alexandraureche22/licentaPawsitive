import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BarChart2, TrendingUp, Users, Heart, PawPrint } from 'lucide-react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts'
import { getStats } from '../stores/actions/stats-actions'
import { getAllAnimals } from '../stores/actions/animal-actions'
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

const StatisticiPage = () => {
  const dispatch = useDispatch()
  const stats = useSelector(state => state.stats.data)
  const loading = useSelector(state => state.stats.loading)

  useEffect(() => {
    const load = async () => {
      dispatch(await getStats())
      dispatch(await getAllAnimals())
    }
    load()
  }, [dispatch])

  if (loading || !stats) return <div className='page' style={{ paddingTop: '6rem', textAlign: 'center' }}>Se încarcă statisticile...</div>

  const speciiData = stats.animalePeSpecie.map(s => ({
    name: s.species.charAt(0).toUpperCase() + s.species.slice(1),
    value: parseInt(s.count)
  }))

  const oraseData = stats.animalePeOras.map(o => ({
    oras: o.city,
    animale: parseInt(o.count)
  }))

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
          <div className='stats-grid' style={{ marginBottom: '3rem' }}>
            <div className='stat-card'>
              <PawPrint size={24} style={{ color: '#c2185b', margin: '0 auto 0.5rem', display: 'block' }} />
              <p className='stat-value'>{stats.totalAnimale}</p>
              <p className='stat-label'>Animale în platformă</p>
            </div>
            <div className='stat-card'>
              <Heart size={24} style={{ color: '#c2185b', margin: '0 auto 0.5rem', display: 'block' }} />
              <p className='stat-value'>{stats.totalAdoptii}</p>
              <p className='stat-label'>Adopții aprobate</p>
            </div>
            <div className='stat-card'>
              <Users size={24} style={{ color: '#c2185b', margin: '0 auto 0.5rem', display: 'block' }} />
              <p className='stat-value'>{stats.totalCereri}</p>
              <p className='stat-label'>Cereri de adopție</p>
            </div>
            <div className='stat-card'>
              <TrendingUp size={24} style={{ color: '#c2185b', margin: '0 auto 0.5rem', display: 'block' }} />
              <p className='stat-value'>{Number(stats.totalDonații).toLocaleString()} RON</p>
              <p className='stat-label'>Donații totale ({stats.nrDonații} donații)</p>
            </div>
          </div>

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
            <div className='form-card'>
              <h3 style={{ marginTop: 0 }}>Distribuție specii (din platformă)</h3>
              <div style={{ height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={speciiData} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {speciiData.map((entry, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => `${val} animale`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className='form-card'>
              <h3 style={{ marginTop: 0 }}>Animale pe orașe (din platformă)</h3>
              <div style={{ height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={oraseData} layout='vertical'>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis type='number' />
                    <YAxis dataKey='oras' type='category' width={100} />
                    <Tooltip formatter={(val) => `${val} animale`} />
                    <Bar dataKey='animale' name='Animale' fill='#c2185b' radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {stats.donatiiPeTip.length > 0 && (
            <div className='form-card' style={{ marginTop: '2rem' }}>
              <h3 style={{ marginTop: 0 }}>Donații pe categorii (din platformă)</h3>
              <div style={{ height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={stats.donatiiPeTip.map(d => ({ name: d.donationType, value: Number(d.total) }))}
                      dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={100}
                      label={({ name, value }) => `${name}: ${value} RON`}
                    >
                      {stats.donatiiPeTip.map((entry, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => `${val} RON`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

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