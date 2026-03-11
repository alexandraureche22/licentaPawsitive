import React from 'react'
import { Heart, Users, Target, Shield, PawPrint } from 'lucide-react'
import './Pages.css'

const stats = [
  { value: '2,200+', label: 'Adopții reușite' },
  { value: '50+', label: 'Adăposturi partenere' },
  { value: '300+', label: 'Voluntari activi' },
  { value: '15', label: 'Orașe acoperite' }
]
const values = [
  { icon: Heart, title: 'Compasiune', description: 'Fiecare animal merită o a doua șansă și un cămin plin de dragoste.' },
  { icon: Shield, title: 'Transparență', description: 'Istoric medical complet și verificat pentru fiecare animal din platformă.' },
  { icon: Users, title: 'Comunitate', description: 'Conectăm adoptorii, voluntarii și adăposturile într-o rețea solidară.' },
  { icon: Target, title: 'Inovație', description: 'Folosim tehnologia pentru a face procesul de adopție mai inteligent.' }
]
const team = [
  { name: 'Ureche Alexandra', role: 'Fondator & Director', description: 'Pasionată de animale, Alexandra a fondat AdoptăCuDrag.' },
  { name: 'Ureche Larisa', role: 'Coordonator Voluntari', description: 'Cu experiență în ONG-uri, Larisa coordonează rețeaua de voluntari.' },
  { name: 'Godza Nicholas', role: 'Medic Veterinar', description: 'Nicholas se asigură că fiecare animal are un jurnal medical complet.' }
]

const AboutPage = () => (
  <div className='page'>
    <section className='page-hero'>
      <div className='container'>
        <div className='hero-badge'><PawPrint size={16} /> Povestea noastră</div>
        <h1>Cine <span className='text-gradient'>suntem</span></h1>
        <p>AdoptăCuDrag a luat naștere din dorința de a face procesul de adopție mai uman, mai transparent și mai eficient.</p>
      </div>
    </section>
    <section className='section'>
      <div className='container'>
        <div className='stats-grid'>
          {stats.map(s => <div key={s.label} className='stat-card'><p className='stat-value'>{s.value}</p><p className='stat-label'>{s.label}</p></div>)}
        </div>
      </div>
    </section>
    <section className='section section-sage'>
      <div className='container' style={{ maxWidth: '800px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Misiunea noastră</h2>
        <p style={{ color: '#666', fontSize: '1.125rem', lineHeight: 1.7 }}>
          Ne dorim să eliminăm barierele din procesul de adopție și să creăm o legătură perfectă între oamenii care vor să ofere un cămin și animalele care așteaptă o familie.
        </p>
      </div>
    </section>
    <section className='section'>
      <div className='container'>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Valorile noastre</h2>
        <div className='values-grid'>
          {values.map(v => (
            <div key={v.title} className='value-card'>
              <div className='value-icon'><v.icon size={24} /></div>
              <h3>{v.title}</h3>
              <p>{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className='section section-sage'>
      <div className='container'>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Echipa</h2>
        <div className='team-grid'>
          {team.map(m => (
            <div key={m.name} className='team-card'>
              <div className='team-avatar'><Users size={32} /></div>
              <h3>{m.name}</h3>
              <p className='team-role'>{m.role}</p>
              <p>{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
)

export default AboutPage
