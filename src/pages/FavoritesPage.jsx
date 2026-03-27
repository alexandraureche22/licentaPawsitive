import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Heart, Sparkles } from 'lucide-react'
import AnimalCard from '../components/AnimalCard'
import { getMyFavorites, getRecommendations } from '../stores/actions/animal-actions'
import './Pages.css'

const FavoritesPage = () => {
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.favorites.data)
  const recommendations = useSelector(state => state.favorites.recommendations)
  const recProfile = useSelector(state => state.favorites.profile)
  const isAuthenticated = !!useSelector(state => state.user.data.token)

  useEffect(() => {
    if (!isAuthenticated) return
    const load = async () => {
      dispatch(await getMyFavorites())
      dispatch(await getRecommendations())
    }
    load()
  }, [dispatch, isAuthenticated])

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

        {/* Recomandări */}
        {recommendations.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Sparkles size={24} style={{ color: '#c2185b' }} />
              <div>
                <h2 style={{ margin: 0 }}>Recomandate pentru tine</h2>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#888' }}>
                  {recProfile && recProfile.topSpecies
                    ? `Algoritmul a detectat că preferi ${recProfile.topSpecies === 'câine' ? 'câinii' : recProfile.topSpecies === 'pisică' ? 'pisicile' : recProfile.topSpecies === 'iepure' ? 'iepurii' : recProfile.topSpecies}`
                    : 'Bazat pe comportamentul tău pe platformă'
                  }
                </p>
              </div>
            </div>
            <div className='animals-grid'>
              {recommendations.map(({ animal, score, reason }) => (
                <div key={animal.id}>
                  <AnimalCard animal={animal} matchScore={score} />
                  <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: '#888', marginTop: '0.5rem' }}>{reason}</p>
                </div>
              ))}
            </div>
            <div className='form-card' style={{ marginTop: '1.5rem', padding: '1rem 1.5rem' }}>
              <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: '#c2185b' }}>Cum funcționează algoritmul?</h4>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#888', lineHeight: 1.6 }}>
                Analizăm favoritele tale și cererile de adopție. Construim un profil: specie preferată (35%), talie (15%),
                energie (15%), compatibilități (15%), oraș (10%) și tip locuință (10%). Cererile de adopție au greutate dublă.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage