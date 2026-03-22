import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { MapPin, Heart } from 'lucide-react'
import { SERVER } from '../../config/global'
import './AnimalCard.css'

const AnimalCard = ({ animal, matchScore }) => {
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.favorites.data)
  const isFavorite = favorites.some(a => a.id === animal.id)

  const handleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({ type: 'TOGGLE_FAVORITE', payload: animal })
  }

  return (
    <Link to={`/animale/${animal.id}`} className='animal-card'>
      <div className='animal-card-image'>
        <img src={animal.image?.startsWith('/uploads') ? `${SERVER}${animal.image}` : animal.image} alt={animal.name} loading='lazy' />
        {matchScore !== undefined && (
          <div className={`animal-card-match ${matchScore >= 80 ? 'high' : matchScore >= 60 ? 'medium' : 'low'}`}>
            {matchScore}% match
          </div>
        )}
        <div className='animal-card-species'>{animal.species}</div>
      </div>
      <div className='animal-card-body'>
        <div className='animal-card-header'>
          <h3>{animal.name}</h3>
          <button onClick={handleFavorite} className='animal-card-heart-btn'>
            <Heart size={16} className={`animal-card-heart ${isFavorite ? 'favorited' : ''}`} />
          </button>
        </div>
        <p className='animal-card-info'>{animal.breed} · {animal.age} · {animal.gender}</p>
        <div className='animal-card-location'>
          <MapPin size={12} />
          <span>{animal.city}</span>
        </div>
        <div className='animal-card-traits'>
          {(animal.personality || []).slice(0, 3).map(trait => (
            <span key={trait} className='animal-card-trait'>{trait}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default AnimalCard