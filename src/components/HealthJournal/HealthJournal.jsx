import React from 'react'
import { Shield, Check } from 'lucide-react'
import './HealthJournal.css'

const typeLabels = {
  vaccin: '💉 Vaccin',
  sterilizare: '✂️ Sterilizare',
  deparazitare: '🛡️ Deparazitare',
  control: '🩺 Control',
  tratament: '💊 Tratament'
}

const HealthJournal = ({ records }) => {
  if (!records || records.length === 0) return null

  return (
    <div className='health-journal'>
      <div className='health-journal-header'>
        <Shield size={20} />
        <h2>Jurnal de Sănătate</h2>
      </div>
      <div className='health-journal-list'>
        {records.map(record => (
          <div key={record.id} className='health-record'>
            <div className='health-record-type'>
              {typeLabels[record.type] || record.type}
            </div>
            <div className='health-record-info'>
              <p className='health-record-desc'>{record.description}</p>
              <p className='health-record-meta'>
                {record.date} · {record.veterinar}
              </p>
            </div>
            {record.verified && (
              <div className='health-record-verified'>
                <Check size={14} /> Verificat
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HealthJournal
