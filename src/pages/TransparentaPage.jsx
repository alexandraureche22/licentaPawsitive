import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Eye, Award } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { getStats } from '../stores/actions/stats-actions'
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

const TransparentaPage = () => {
  const dispatch = useDispatch()
  const stats = useSelector(state => state.stats.data)
  const loading = useSelector(state => state.stats.loading)

  useEffect(() => {
    const load = async () => {
      dispatch(await getStats())
    }
    load()
  }, [dispatch])

  if (loading || !stats) return <div className='page' style={{ paddingTop: '6rem', textAlign: 'center' }}>Se încarcă...</div>

  const totalDonatii = Number(stats.totalDonații) || 0

  const donatiiPeTip = stats.donatiiPeTip.map(d => ({
    categorie: d.donationType === 'general' ? 'Donație generală' : d.donationType === 'shelter' ? 'Pentru adăpost' : d.donationType === 'medical' ? 'Fond medical' : 'Hrană',
    suma: Number(d.total),
    count: Number(d.count),
    procent: totalDonatii > 0 ? Math.round((Number(d.total) / totalDonatii) * 100) : 0
  }))

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
          <div className='form-card' style={{ textAlign: 'center', marginBottom: '2rem', padding: '2rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#888', margin: '0 0 0.5rem' }}>Total fonduri strânse</p>
            <p style={{ fontSize: '3rem', fontWeight: 700, color: '#c2185b', margin: '0 0 0.5rem' }}>{totalDonatii.toLocaleString()} RON</p>
            <p style={{ fontSize: '0.875rem', color: '#666', margin: 0 }}>din {stats.nrDonații} donații</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div className='form-card'>
              <h3 style={{ marginTop: 0 }}>Cheltuieli adăpost (medie)</h3>
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

            <div className='form-card'>
              <h3 style={{ marginTop: 0 }}>Unde se duc donațiile</h3>
              {donatiiPeTip.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {donatiiPeTip.map(item => (
                    <div key={item.categorie}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                        <span>{item.categorie}</span>
                        <strong>{item.procent}% · {item.suma} RON ({item.count} donații)</strong>
                      </div>
                      <div style={{ height: 8, background: '#f0f0f0', borderRadius: 50, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${item.procent}%`, background: '#c2185b', borderRadius: 50 }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.875rem', color: '#888' }}>Nu există donații încă. Fii primul care donează!</p>
              )}
            </div>
          </div>

          <div className='form-card'>
            <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={20} style={{ color: '#c2185b' }} /> Top donatori
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>Mulțumim tuturor celor care contribuie la bunăstarea animalelor!</p>
            {stats.topDonatori.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {stats.topDonatori.map((donator, i) => (
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
                      <strong style={{ fontSize: '0.9375rem' }}>{donator.donorName}</strong>
                      {donator.message && <p style={{ margin: 0, fontSize: '0.75rem', color: '#888' }}>"{donator.message}"</p>}
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#aaa' }}>{new Date(donator.createdAt).toLocaleDateString('ro-RO')}</p>
                    </div>
                    <strong style={{ color: '#c2185b', fontSize: '1.125rem' }}>{donator.amount.toLocaleString()} RON</strong>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.875rem', color: '#888' }}>Nu există donații încă.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default TransparentaPage