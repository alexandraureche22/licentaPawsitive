import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ArrowLeft, MapPin, Heart, Check, X } from 'lucide-react'
import HealthJournal from '../components/HealthJournal'
import { getOneAnimal } from '../stores/actions/animal-actions'
import { SERVER } from '../config/global'
import './Pages.css'

const AnimalDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const animal = useSelector(state => state.animal.selectedAnimal)

  useEffect(() => {
    const load = async () => {
      const action = await getOneAnimal(id)
      dispatch(action)
    }
    load()
  }, [dispatch, id])

  if (!animal) return <div className='page' style={{ paddingTop: '6rem', textAlign: 'center' }}>Se încarcă...</div>

  const energyLevels = ['scăzut', 'moderat', 'ridicat']
  const animalEnergyIndex = energyLevels.indexOf(animal.energyLevel)

  return (
    <div className='page' style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
      <div className='container'>
        <Link to='/animale' className='back-link'>
          <ArrowLeft size={16} /> Înapoi la catalog
        </Link>
        <div className='detail-grid'>
          <div>
            <img src={animal.image?.startsWith('/uploads') ? `${SERVER}${animal.image}` : animal.image} alt={animal.name} className='detail-image' />
          </div>
          <div>
            <div className='detail-badges'>
              <span className='badge badge-secondary'>{animal.species}</span>
              <span className='badge badge-outline'>{animal.gender}</span>
            </div>
            <h1 className='detail-name'>{animal.name}</h1>
            <p className='detail-info'>{animal.breed} · {animal.age} · Talie {animal.size}</p>
            <div className='detail-location'>
              <MapPin size={16} />
              <span>{animal.shelter}, {animal.city}</span>
            </div>
            <p className='detail-desc'>{animal.description}</p>

            <div className='detail-section'>
              <h3>Personalitate</h3>
              <div className='traits-list'>
                {(animal.personality || []).map(t => <span key={t} className='trait-tag'>{t}</span>)}
              </div>
            </div>

            <div className='detail-section' style={{ marginTop: '1.5rem' }}>
              <h3>Compatibilitate</h3>
              <div className='compat-grid'>
                <div className='compat-item'>{animal.goodWithKids ? <Check size={16} className='yes' /> : <X size={16} className='no' />} Copii</div>
                <div className='compat-item'>{animal.goodWithCats ? <Check size={16} className='yes' /> : <X size={16} className='no' />} Pisici</div>
                <div className='compat-item'>{animal.goodWithDogs ? <Check size={16} className='yes' /> : <X size={16} className='no' />} Câini</div>
                <div className='compat-item'>{animal.apartmentFriendly ? <Check size={16} className='yes' /> : <X size={16} className='no' />} Apartament</div>
              </div>
            </div>

            <div className='detail-section' style={{ marginTop: '1.5rem' }}>
              <h3>Nivel de energie</h3>
              <div className='energy-bar'>
                {energyLevels.map((level, i) => (
                  <div key={level} className={`energy-segment ${i <= animalEnergyIndex ? 'active' : ''}`} />
                ))}
              </div>
              <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem', textTransform: 'capitalize' }}>{animal.energyLevel}</p>
            </div>

            <div className='detail-actions'>
              <Link to={`/adopta/${animal.id}`} className='btn btn-primary' style={{ flex: 1 }}>
                <Heart size={16} /> Vreau să adopt
              </Link>
              <Link to='/compatibilitate' className='btn btn-outline'>
                Verifică compatibilitatea
              </Link>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '3rem' }}>
          <HealthJournal records={animal.healthRecords} />
        </div>
      </div>
    </div>
  )
}

export default AnimalDetailPage