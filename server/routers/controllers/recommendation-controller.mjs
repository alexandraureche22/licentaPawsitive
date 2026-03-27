import models from '../../models/index.mjs'

// ALGORITM DE RECOMANDARE PERSONALIZATĂ
// Analizează comportamentul utilizatorului (favorite, cereri de adopție)
// și calculează un scor de preferință pentru fiecare animal disponibil.
//
// Pași:
// 1. Colectează animalele cu care user-ul a interacționat (favorite + cereri adopție)
// 2. Construiește un profil de preferințe: specie, talie, energie, compatibilități
// 3. Calculează scor de similaritate pentru fiecare animal ne-interacționat
// 4. Returnează top N animale sortate descrescător după scor

const getRecommendations = async (req, res, next) => {
  try {
    // 1. Colectăm toate interacțiunile user-ului
    const favorites = await models.Favorite.findAll({
      where: { userId: req.user.id },
      include: [{ model: models.Animal }]
    })

    const adoptionRequests = await models.AdoptionRequest.findAll({
      where: { userId: req.user.id },
      include: [{ model: models.Animal }]
    })

    // Extragem animalele cu care a interacționat
    const interactedAnimals = []
    const interactedIds = new Set()

    favorites.forEach(fav => {
      if (fav.animal) {
        interactedAnimals.push(fav.animal)
        interactedIds.add(fav.animal.id)
      }
    })

    adoptionRequests.forEach(req => {
      if (req.animal && !interactedIds.has(req.animal.id)) {
        interactedAnimals.push(req.animal)
        interactedIds.add(req.animal.id)
        // Cererile de adopție au greutate dublă (interes mai puternic)
        interactedAnimals.push(req.animal)
      }
    })

    // Dacă nu are interacțiuni, returnăm animale random
    if (interactedAnimals.length === 0) {
      const randomAnimals = await models.Animal.findAll({
        order: models.sequelize.random(),
        limit: 6,
        include: [{ model: models.HealthRecord }]
      })
      return res.status(200).json({
        recommendations: randomAnimals.map(a => ({ animal: a, score: 50, reason: 'Popular pe platformă' })),
        profile: null
      })
    }

    // 2. Construim profilul de preferințe
    const profile = {
      species: {},
      size: {},
      energyLevel: {},
      apartmentFriendly: 0,
      goodWithKids: 0,
      goodWithCats: 0,
      goodWithDogs: 0,
      cities: {},
      shelters: {}
    }

    const total = interactedAnimals.length

    interactedAnimals.forEach(animal => {
      profile.species[animal.species] = (profile.species[animal.species] || 0) + 1
      profile.size[animal.size] = (profile.size[animal.size] || 0) + 1
      profile.energyLevel[animal.energyLevel] = (profile.energyLevel[animal.energyLevel] || 0) + 1
      profile.cities[animal.city] = (profile.cities[animal.city] || 0) + 1
      profile.shelters[animal.shelter] = (profile.shelters[animal.shelter] || 0) + 1
      if (animal.apartmentFriendly) profile.apartmentFriendly++
      if (animal.goodWithKids) profile.goodWithKids++
      if (animal.goodWithCats) profile.goodWithCats++
      if (animal.goodWithDogs) profile.goodWithDogs++
    })

    // Specia preferată
    const topSpecies = Object.entries(profile.species).sort((a, b) => b[1] - a[1])[0]

    // 3. Calculăm scor pentru fiecare animal
    const allAnimals = await models.Animal.findAll({
      include: [{ model: models.HealthRecord }]
    })

    const scored = allAnimals
      .filter(a => !interactedIds.has(a.id))
      .map(animal => {
        let score = 0
        let maxScore = 0
        const reasons = []

        // Scor specie (35 puncte) — cel mai important
        maxScore += 35
        const speciesMatch = (profile.species[animal.species] || 0) / total
        score += speciesMatch * 35
        if (speciesMatch > 0.5) reasons.push(`Îți plac ${animal.species === 'câine' ? 'câinii' : animal.species === 'pisică' ? 'pisicile' : animal.species === 'iepure' ? 'iepurii' : 'animalele de acest tip'}`)

        // Scor talie (15 puncte)
        maxScore += 15
        score += ((profile.size[animal.size] || 0) / total) * 15

        // Scor energie (15 puncte)
        maxScore += 15
        score += ((profile.energyLevel[animal.energyLevel] || 0) / total) * 15

        // Scor oraș (10 puncte) — preferă animale din același oraș
        maxScore += 10
        const cityMatch = (profile.cities[animal.city] || 0) / total
        score += cityMatch * 10
        if (cityMatch > 0.3) reasons.push(`Din ${animal.city}, orașul tău preferat`)

        // Scor apartament (10 puncte)
        maxScore += 10
        const aptRatio = profile.apartmentFriendly / total
        if (animal.apartmentFriendly && aptRatio > 0.5) score += 10
        else if (!animal.apartmentFriendly && aptRatio <= 0.5) score += 10
        else score += 3

        // Scor compatibilitate (15 puncte)
        maxScore += 15
        let compatPoints = 0
        if (animal.goodWithKids && profile.goodWithKids / total > 0.5) compatPoints += 5
        if (animal.goodWithCats && profile.goodWithCats / total > 0.5) compatPoints += 5
        if (animal.goodWithDogs && profile.goodWithDogs / total > 0.5) compatPoints += 5
        score += compatPoints

        const finalScore = Math.round((score / maxScore) * 100)

        if (reasons.length === 0) {
          if (finalScore >= 70) reasons.push('Se potrivește profilului tău')
          else reasons.push('Ar putea să-ți placă')
        }

        return {
          animal,
          score: finalScore,
          reason: reasons[0]
        }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)

    // Profilul rezumat
    const profileSummary = {
      topSpecies: topSpecies ? topSpecies[0] : null,
      totalInteractions: interactedIds.size,
      favoriteCount: favorites.length,
      adoptionRequestCount: adoptionRequests.length
    }

    res.status(200).json({
      recommendations: scored,
      profile: profileSummary
    })
  } catch (err) {
    next(err)
  }
}

// Favorite CRUD
const toggleFavorite = async (req, res, next) => {
  try {
    const existing = await models.Favorite.findOne({
      where: { userId: req.user.id, animalId: req.params.animalId }
    })
    if (existing) {
      await existing.destroy()
      res.status(200).json({ favorited: false })
    } else {
      await models.Favorite.create({ userId: req.user.id, animalId: parseInt(req.params.animalId) })
      res.status(201).json({ favorited: true })
    }
  } catch (err) {
    next(err)
  }
}

const getMyFavorites = async (req, res, next) => {
  try {
    const favorites = await models.Favorite.findAll({
      where: { userId: req.user.id },
      include: [{ model: models.Animal, include: [{ model: models.HealthRecord }] }]
    })
    const animals = favorites.map(f => f.animal).filter(Boolean)
    res.status(200).json(animals)
  } catch (err) {
    next(err)
  }
}

export default {
  getRecommendations,
  toggleFavorite,
  getMyFavorites
}