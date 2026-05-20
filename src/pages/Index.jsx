import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ArrowRight, Heart, Shield, MapPin, MessageCircle, Cat, Sparkles } from 'lucide-react'
import AnimalCard from '../components/AnimalCard'
import { getAllAnimals, getRecommendations, getMyFavorites } from '../stores/actions/animal-actions'
import './Pages.css'

const features = [
  { icon: Heart, title: 'Quiz de Compatibilitate', description: 'Algoritm inteligent care îți găsește animalul potrivit pe baza stilului tău de viață.', link: '/compatibilitate' },
  { icon: Shield, title: 'Jurnal de Sănătate', description: 'Istoric medical complet și transparent pentru fiecare animal, verificat digital.', link: '/jurnal-sanatate' },
  { icon: MessageCircle, title: 'Suport Post-Adopție', description: 'Comunicare directă cu voluntarii pentru o tranziție lină în noul cămin.', link: '/suport' },
  { icon: MapPin, title: 'Hartă Interactivă', description: 'Vezi nevoile adăposturilor din comunitatea ta și contribuie direct.', link: '/harta-nevoi' }
]

const Index = () => {
  const dispatch = useDispatch()
  const animals = useSelector(state => state.animal.data)
  const isAuthenticated = !!useSelector(state => state.user.data.token)
  const recommendations = useSelector(state => state.favorites.recommendations)
  const recProfile = useSelector(state => state.favorites.profile)

  useEffect(() => {
    const load = async () => {
      dispatch(await getAllAnimals())
      if (isAuthenticated) {
        dispatch(await getMyFavorites())
        dispatch(await getRecommendations())
      }
    }
    load()
  }, [dispatch, isAuthenticated])

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
                Găsește-ți <span className='text-gradient'>companionul</span> perfect
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

      {/* Recomandări personalizate (doar dacă e logat și are interacțiuni) */}
      {isAuthenticated && recommendations.length > 0 && (
        <section className='section' style={{ background: 'linear-gradient(135deg, #fff8e1 0%, #fce4ec 100%)' }}>
          <div className='container'>
            <div className='section-header-row'>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Sparkles size={24} style={{ color: '#c2185b' }} />
                  <h2 style={{ margin: 0 }}>Recomandate pentru tine</h2>
                </div>
                <p style={{ color: '#888', margin: 0 }}>
                  {recProfile && recProfile.topSpecies
                    ? `Bazat pe cele ${recProfile.totalInteractions} animale cu care ai interacționat — algoritmul a detectat că preferi ${recProfile.topSpecies === 'câine' ? 'câinii' : recProfile.topSpecies === 'pisică' ? 'pisicile' : recProfile.topSpecies === 'iepure' ? 'iepurii' : recProfile.topSpecies}`
                    : 'Animale populare pe platformă'
                  }
                </p>
              </div>
              <Link to='/animale' className='btn btn-outline'>
                Vezi toate <ArrowRight size={16} />
              </Link>
            </div>
            <div className='animals-grid'>
              {recommendations.slice(0, 3).map(({ animal, score, reason }) => (
                <div key={animal.id}>
                  <AnimalCard animal={animal} matchScore={score} />
                  <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: '#888', marginTop: '0.5rem' }}>{reason}</p>
                </div>
              ))}
            </div>
            <div className='form-card' style={{ marginTop: '1.5rem', padding: '1rem 1.5rem' }}>
              <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: '#c2185b' }}>Cum funcționează algoritmul?</h4>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#888', lineHeight: 1.6 }}>
                Analizăm animalele la care ai dat like și pentru care ai trimis cereri de adopție. Construim un profil de preferințe
                bazat pe: specie (35%), talie (15%), energie (15%), compatibilități (15%), oraș (10%) și tip locuință (10%).
                Cererile de adopție au greutate dublă deoarece reflectă un interes mai puternic.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Animale recomandate (generice) */}
      <section className='section section-sage'>
        <div className='container'>
          <div className='section-header-row'>
            <div>
              <h2>Animale disponibile</h2>
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