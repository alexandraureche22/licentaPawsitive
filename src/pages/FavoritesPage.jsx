import React from 'react'
import { useSelector } from 'react-redux'
import { Heart } from 'lucide-react'
import AnimalCard from '../components/AnimalCard'
import './Pages.css'

const FavoritesPage = () => {
  const favorites = useSelector(state => state.favorites.data)

  return (
    <div className='page'>
      <div className='container page-header'>
        <h1>Animalele mele favorite</h1>
        <p>Aici găsești toate animalele pe care le-ai apreciat cu inimă.</p>
      </div>
      <div className='container'>
        {favorites.length > 0 ? (
          <div className='animals-grid'>
            {favorites.map(animal => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        ) : (
          <div className='empty-state'>
            <Heart size={48} />
            <p>Nu ai adăugat încă niciun animal la favorite.</p>
            <p style={{ fontSize: '0.875rem', color: '#888' }}>Apasă pe inimă de pe cardul unui animal pentru a-l adăuga.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage