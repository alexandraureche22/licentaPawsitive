import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ArrowRight, Heart, Shield, MapPin, MessageCircle, Cat } from 'lucide-react'
import AnimalCard from '../components/AnimalCard'
import { getAllAnimals } from '../stores/actions/animal-actions'
import './Pages.css'

const features = [
  { icon: Heart, title: 'Quiz de Compatibilitate', description: 'Algoritm inteligent care îți găsește animalul potrivit pe baza stilului tău de viață.', link: '/compatibilitate' },
  { icon: Shield, title: 'Jurnal de Sănătate', description: 'Istoric medical complet și transparent pentru fiecare animal, verificat digital.', link: '/animale' },
  { icon: MessageCircle, title: 'Suport Post-Adopție', description: 'Comunicare directă cu voluntarii pentru o tranziție lină în noul cămin.', link: '/suport' },
  { icon: MapPin, title: 'Hartă Interactivă', description: 'Vezi nevoile adăposturilor din comunitatea ta și contribuie direct.', link: '/harta-nevoi' }
]

const animalsSelector = state => state.animal.data

const Index = () => {
  const dispatch = useDispatch()
  const animals = useSelector(animalsSelector)

  useEffect(() => {
    const load = async () => {
      const action = await getAllAnimals()
      dispatch(action)
    }
    load()
  }, [dispatch])

  return (
    <div className='page'>
      {/* Hero */}
      <section className='hero'>
        <div className='container'>
          <div className='hero-grid'>
            <div className='hero-content'>
              <div className='hero-badge'>
                <Heart size={16} /> Peste 500 de animale caută un cămin
              </div>
              <h1 className='hero-title'>
                Găsește-ți <span className='text-gradient'>companion</span> perfect
              </h1>
              <p className='hero-desc'>
                Platformă inteligentă de adopții care folosește un algoritm de compatibilitate
                pentru a conecta oamenii cu animalul potrivit stilului lor de viață.
              </p>
              <div className='hero-actions'>
                <Link to='/compatibilitate' className='btn btn-primary'>
                  Începe Quiz-ul <ArrowRight size={16} />
                </Link>
                <Link to='/animale' className='btn btn-outline'>
                  Vezi animalele
                </Link>
              </div>
            </div>
            <div className='hero-image-wrapper'>
              <img src='/images/hero-animals.jpg' alt='Animale care așteaptă adopția' className='hero-image' />
              <div className='hero-stat'>
                <div className='hero-stat-icon'>
                  <Cat size={20} />
                </div>
                <div>
                  <p className='hero-stat-number'>2,200+</p>
                  <p className='hero-stat-label'>Adopții reușite</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className='section'>
        <div className='container'>
          <div className='section-header'>
            <h2>Pawsitive Choice — Mai mult decât un catalog de adopții</h2>
            <p>Funcționalități unice care fac procesul de adopție mai sigur, mai transparent și mai eficient.</p>
          </div>
          <div className='features-grid'>
            {features.map(feat => (
              <Link to={feat.link} key={feat.title} className='feature-card'>
                <div className='feature-icon'>
                  <feat.icon size={24} />
                </div>
                <h3>{feat.title}</h3>
                <p>{feat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Animals */}
      <section className='section section-sage'>
        <div className='container'>
          <div className='section-header-row'>
            <div>
              <h2>Animale recomandate</h2>
              <p>Fiecare merită un cămin plin de iubire</p>
            </div>
            <Link to='/animale' className='btn btn-outline'>
              Vezi toate <ArrowRight size={16} />
            </Link>
          </div>
          <div className='animals-grid'>
            {animals.slice(0, 3).map(animal => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='section'>
        <div className='container'>
          <div className='cta-box'>
            <h2>Fă primul pas spre adopție</h2>
            <p>Completează quiz-ul nostru de compatibilitate și descoperă animalul care se potrivește perfect stilului tău de viață.</p>
            <Link to='/compatibilitate' className='btn btn-primary btn-lg'>
              Începe acum <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Index
