import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, AlertTriangle, Clock, Package } from 'lucide-react'
import { shelterNeeds } from '../data/animals'
import './Pages.css'


const NeedsMapPage = () => (
  <div className='page' style={{ paddingTop: '6rem', paddingBottom: '3rem' }}>
    <div className='container'>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Harta Nevoilor</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Adăposturile din comunitatea ta au nevoie de ajutor. Vezi ce poți face.</p>
      <div className='needs-grid'>
        <div className='map-placeholder'>
          <MapPin size={64} />
          <h3>Hartă Interactivă</h3>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.5rem' }}>Vizualizarea nevoilor pe hartă în timp real.</p>
          {shelterNeeds.map(s => (
            <div key={s.id} className='shelter-mini'>
              <div className='shelter-mini-icon'><MapPin size={16} /></div>
              <div><p>{s.shelter}</p><span>{s.city}</span></div>
            </div>
          ))}
        </div>
        <div className='need-cards'>
          {shelterNeeds.map(shelter => (
            <div key={shelter.id} className='need-card'>
              <div className='need-card-header'>
                <div>
                  <h3>{shelter.shelter}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: '#888' }}>
                    <MapPin size={14} /> {shelter.city}
                  </div>
                </div>
                <div className='need-card-date'><Clock size={12} /> {new Date(shelter.lastUpdated).toLocaleDateString('ro-RO')}</div>
              </div>
              <div className='need-items'>
                {shelter.needs.map((need, j) => (
                  <div key={j} className={`need-item ${need.urgency === 'ridicată' ? 'high' : need.urgency === 'medie' ? 'medium' : 'low'}`}>
                    <div>
                      <div className='need-item-name'>
                        <Package size={16} /> {need.item}
                      </div>
                      <div className='need-item-qty'>Cantitate: {need.quantity}</div>
                    </div>
                    <span className='need-item-urgency'>
                      {need.urgency === 'ridicată' && <AlertTriangle size={12} style={{ marginRight: 4 }} />}
                      {need.urgency}
                    </span>
                  </div>
                ))}
              </div>
              <Link to={`/donatii`} className='btn btn-outline btn-block' style={{ marginTop: '1rem' }}>Vreau să ajut</Link>
              </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default NeedsMapPage
