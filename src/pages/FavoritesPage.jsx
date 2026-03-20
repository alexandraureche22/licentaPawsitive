import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Heart, Sparkles } from 'lucide-react'
import AnimalCard from '../components/AnimalCard'
import { getAllAnimals } from '../stores/actions/animal-actions'
import './Pages.css'

// ALGORITM RECOMANDĂRI
// Analizează animalele favorite și calculează un scor de similaritate
// pentru fiecare animal din platformă bazat pe: specie, talie, energie,
// compatibilitate apartament, compatibilitate cu copii/pisici/câini
function getRecommendations(favorites, allAnimals) {
  if (favorites.length === 0) return []

  // Calculăm profilul mediu al favoritelor
  const profile = {
    species: {},
    size: {},
    energyLevel: {},
    apartmentFriendly: 0,
    goodWithKids: 0,
    goodWithCats: 0,
    goodWithDogs: 0
  }

  favorites.forEach(fav => {
    profile.species[fav.species] = (profile.species[fav.species] || 0) + 1
    profile.size[fav.size] = (profile.size[fav.size] || 0) + 1
    profile.energyLevel[fav.energyLevel] = (profile.energyLevel[fav.energyLevel] || 0) + 1
    if (fav.apartmentFriendly) profile.apartmentFriendly++
    if (fav.goodWithKids) profile.goodWithKids++
    if (fav.goodWithCats) profile.goodWithCats++
    if (fav.goodWithDogs) profile.goodWithDogs++
  })

  const total = favorites.length
  const favoriteIds = favorites.map(f => f.id)

  // Calculăm scor pentru fiecare animal ne-favorit
  const scored = allAnimals
    .filter(a => !favoriteIds.includes(a.id))
    .map(animal => {
      let score = 0
      let maxScore = 0

      // Scor specie (40 puncte) — preferăm specia cea mai frecventă din favorite
      maxScore += 40
      score += ((profile.species[animal.species] || 0) / total) * 40

      // Scor talie (20 puncte)
      maxScore += 20
      score += ((profile.size[animal.size] || 0) / total) * 20

      // Scor energie (20 puncte)
      maxScore += 20
      score += ((profile.energyLevel[animal.energyLevel] || 0) / total) * 20

      // Scor apartament (10 puncte)
      maxScore += 10
      const aptRatio = profile.apartmentFriendly / total
      if (animal.apartmentFriendly && aptRatio > 0.5) score += 10
      else if (!animal.apartmentFriendly && aptRatio <= 0.5) score += 10
      else score += 3

      // Scor compatibilitate (10 puncte)
      maxScore += 10
      let compatPoints = 0
      if (animal.goodWithKids && profile.goodWithKids / total > 0.5) compatPoints += 3.3
      if (animal.goodWithCats && profile.goodWithCats / total > 0.5) compatPoints += 3.3
      if (animal.goodWithDogs && profile.goodWithDogs / total > 0.5) compatPoints += 3.4
      score += compatPoints

      return {
        animal,
        score: Math.round((score / maxScore) * 100)
      }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)

  return scored
}

const FavoritesPage = () => {
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.favorites.data)
  const allAnimals = useSelector(state => state.animal.data)

  useEffect(() => {
    const load = async () => {
      const action = await getAllAnimals()
      dispatch(action)
    }
    load()
  }, [dispatch])

  const recommendations = getRecommendations(favorites, allAnimals)

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

        {/* Recomandări bazate pe algoritm */}
        {recommendations.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Sparkles size={24} style={{ color: '#c2185b' }} />
              <div>
                <h2 style={{ margin: 0 }}>Recomandate pentru tine</h2>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#888' }}>
                  Bazat pe animalele tale favorite, algoritmul nostru sugerează aceste animale similare
                </p>
              </div>
            </div>
            <div className='animals-grid'>
              {recommendations.map(({ animal, score }) => (
                <AnimalCard key={animal.id} animal={animal} matchScore={score} />
              ))}
            </div>
            <div className='form-card' style={{ marginTop: '1.5rem', padding: '1rem 1.5rem' }}>
              <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: '#c2185b' }}>Cum funcționează algoritmul?</h4>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#888', lineHeight: 1.6 }}>
                Analizăm animalele tale favorite și creăm un profil de preferințe bazat pe: specia preferată (40%), talia (20%),
                nivelul de energie (20%), compatibilitatea cu apartamentul (10%) și compatibilitatea cu copii/alte animale (10%).
                Apoi calculăm un scor de similaritate pentru fiecare animal din platformă.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage