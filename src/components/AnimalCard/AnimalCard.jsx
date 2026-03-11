import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Heart } from 'lucide-react'
import './AnimalCard.css'

const AnimalCard = ({ animal, matchScore }) => {
  return (
    <Link to={`/animale/${animal.id}`} className='animal-card'>
      <div className='animal-card-image'>
        <img src={animal.image} alt={animal.name} loading='lazy' />
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
          <Heart size={16} className='animal-card-heart' />
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
