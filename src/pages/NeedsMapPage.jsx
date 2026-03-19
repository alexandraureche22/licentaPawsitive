import React from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { MapPin, AlertTriangle, Clock, Package } from 'lucide-react'
import { shelterNeeds } from '../data/animals'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import './Pages.css'

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
})

const allShelters = [
  ...shelterNeeds,
  {
    id: '4',
    shelter: 'Asociația AdoptăAcum',
    city: 'Iași',
    lat: 47.1585,
    lng: 27.6014,
    needs: [
      { item: 'Hrană uscată', urgency: 'ridicată', quantity: '40 kg' },
      { item: 'Pături', urgency: 'medie', quantity: '15 bucăți' }
    ],
    lastUpdated: '2026-03-10'
  },
  {
    id: '5',
    shelter: 'Fundația Patru Lăbuțe',
    city: 'Brașov',
    lat: 45.6427,
    lng: 25.5887,
    needs: [
      { item: 'Medicamente', urgency: 'ridicată', quantity: 'Diverse' },
      { item: 'Voluntari', urgency: 'ridicată', quantity: '10 persoane' },
      { item: 'Hrană umedă', urgency: 'medie', quantity: '20 conserve' }
    ],
    lastUpdated: '2026-03-08'
  },
  {
    id: '6',
    shelter: 'Adăpostul Suflete Blânde',
    city: 'Constanța',
    lat: 44.1598,
    lng: 28.6348,
    needs: [
      { item: 'Cuști transport', urgency: 'medie', quantity: '5 bucăți' },
      { item: 'Hrană junior', urgency: 'ridicată', quantity: '30 kg' }
    ],
    lastUpdated: '2026-03-05'
  },
  {
    id: '7',
    shelter: 'Asociația Prieteni Credincioși',
    city: 'Sibiu',
    lat: 45.7983,
    lng: 24.1256,
    needs: [
      { item: 'Hrană uscată câini', urgency: 'ridicată', quantity: '60 kg' },
      { item: 'Deparazitare', urgency: 'medie', quantity: '20 doze' },
      { item: 'Nisip pisici', urgency: 'scăzută', quantity: '8 saci' }
    ],
    lastUpdated: '2026-03-12'
  },
  {
    id: '8',
    shelter: 'Centrul de Adopții Craiova',
    city: 'Craiova',
    lat: 44.3302,
    lng: 23.7949,
    needs: [
      { item: 'Pături și paturi', urgency: 'ridicată', quantity: '25 bucăți' },
      { item: 'Hrană pisici', urgency: 'medie', quantity: '15 kg' }
    ],
    lastUpdated: '2026-03-01'
  }
]

const NeedsMapPage = () => (
  <div className='page' style={{ paddingTop: '6rem', paddingBottom: '3rem' }}>
    <div className='container'>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Harta Nevoilor</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Adăposturile partenere din toată România au nevoie de ajutorul tău.</p>

      {/* Harta reală */}
      <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: '2rem', border: '1px solid #e5e5e5', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <MapContainer center={[45.9432, 24.9668]} zoom={7} style={{ height: '450px', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {allShelters.map(shelter => (
            <Marker key={shelter.id} position={[shelter.lat, shelter.lng]}>
              <Popup>
                <div style={{ minWidth: 200 }}>
                  <strong style={{ fontSize: '0.9375rem' }}>{shelter.shelter}</strong>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.8125rem', color: '#888' }}>{shelter.city}</p>
                  <div style={{ marginTop: '0.5rem' }}>
                    {shelter.needs.map((need, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', padding: '0.25rem 0' }}>
                        <span>{need.item}</span>
                        <span style={{ color: need.urgency === 'ridicată' ? '#d32f2f' : need.urgency === 'medie' ? '#f57c00' : '#888', fontWeight: 600 }}>
                          {need.urgency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Lista adăposturi */}
      <h2 style={{ marginBottom: '1.5rem' }}>Adăposturi partenere ({allShelters.length})</h2>
      <div className='need-cards'>
        {allShelters.map(shelter => (
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
            <Link to='/donatii' className='btn btn-outline btn-block' style={{ marginTop: '1rem' }}>Vreau să ajut</Link>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default NeedsMapPage