export const shelterNeeds = [
  {
    id: '1',
    shelter: 'Adăpostul Speranța',
    city: 'București',
    lat: 44.4268,
    lng: 26.1025,
    needs: [
      { item: 'Pături', urgency: 'ridicată', quantity: '20 bucăți' },
      { item: 'Hrană uscată câini', urgency: 'ridicată', quantity: '50 kg' },
      { item: 'Voluntari weekend', urgency: 'medie', quantity: '5 persoane' }
    ],
    lastUpdated: '2024-12-01'
  },
  {
    id: '2',
    shelter: 'Asociația Prietenii Animalelor',
    city: 'Cluj-Napoca',
    lat: 46.7712,
    lng: 23.6236,
    needs: [
      { item: 'Hrană umedă pisici', urgency: 'ridicată', quantity: '30 conserve' },
      { item: 'Nisip pisici', urgency: 'medie', quantity: '10 saci' }
    ],
    lastUpdated: '2024-12-03'
  },
  {
    id: '3',
    shelter: 'Adăpostul Micii Prieteni',
    city: 'Timișoara',
    lat: 45.7489,
    lng: 21.2087,
    needs: [
      { item: 'Medicamente', urgency: 'ridicată', quantity: 'Diverse' },
      { item: 'Cuști transport', urgency: 'scăzută', quantity: '3 bucăți' },
      { item: 'Hrană junior', urgency: 'medie', quantity: '20 kg' }
    ],
    lastUpdated: '2024-12-02'
  }
]

export const quizQuestions = [
  {
    id: 'housing',
    question: 'Unde locuiești?',
    options: [
      { label: 'Apartament mic', value: 'apt-mic', icon: '🏢' },
      { label: 'Apartament mare', value: 'apt-mare', icon: '🏠' },
      { label: 'Casă cu curte mică', value: 'casa-mica', icon: '🏡' },
      { label: 'Casă cu curte mare', value: 'casa-mare', icon: '🌳' }
    ]
  },
  {
    id: 'activity',
    question: 'Cât de activ ești?',
    options: [
      { label: 'Sedentar', value: 'sedentar', icon: '🛋️' },
      { label: 'Moderat activ', value: 'moderat', icon: '🚶' },
      { label: 'Foarte activ', value: 'activ', icon: '🏃' },
      { label: 'Sportiv', value: 'sportiv', icon: '⛰️' }
    ]
  },
  {
    id: 'kids',
    question: 'Ai copii?',
    options: [
      { label: 'Nu am copii', value: 'fara', icon: '👤' },
      { label: 'Copii mici (0-5 ani)', value: 'mici', icon: '👶' },
      { label: 'Copii mari (6+ ani)', value: 'mari', icon: '🧒' }
    ]
  },
  {
    id: 'experience',
    question: 'Ai mai avut animale?',
    options: [
      { label: 'Niciodată', value: 'niciodata', icon: '🆕' },
      { label: 'Da, câini', value: 'caini', icon: '🐕' },
      { label: 'Da, pisici', value: 'pisici', icon: '🐈' },
      { label: 'Da, diverse', value: 'diverse', icon: '🐾' }
    ]
  },
  {
    id: 'time',
    question: 'Cât timp poți dedica zilnic?',
    options: [
      { label: 'Sub 1 oră', value: 'putin', icon: '⏰' },
      { label: '1-2 ore', value: 'moderat', icon: '🕐' },
      { label: '2-4 ore', value: 'mult', icon: '🕑' },
      { label: 'Peste 4 ore', value: 'foarte-mult', icon: '🌟' }
    ]
  },
  {
    id: 'preference',
    question: 'Ce tip de animal preferi?',
    options: [
      { label: 'Câine', value: 'caine', icon: '🐶' },
      { label: 'Pisică', value: 'pisica', icon: '🐱' },
      { label: 'Iepure', value: 'iepure', icon: '🐰' },
      { label: 'Orice', value: 'orice', icon: '❤️' }
    ]
  }
]

export function calculateCompatibility(answers, animal) {
  let score = 0
  let maxScore = 0

  maxScore += 30
  if (answers.housing === 'apt-mic' || answers.housing === 'apt-mare') {
    score += animal.apartmentFriendly ? 30 : 5
  } else {
    score += 25
    if (animal.size === 'mare') score += 5
  }

  maxScore += 25
  const activityMap = {
    sedentar: ['scăzut'],
    moderat: ['scăzut', 'moderat'],
    activ: ['moderat', 'ridicat'],
    sportiv: ['ridicat']
  }
  if (activityMap[answers.activity]?.includes(animal.energyLevel)) {
    score += 25
  } else {
    score += 10
  }

  maxScore += 20
  if (answers.kids === 'fara') {
    score += 20
  } else if (animal.goodWithKids) {
    score += 20
  } else {
    score += 5
  }

  maxScore += 15
  if (answers.time === 'foarte-mult' || answers.time === 'mult') {
    score += 15
  } else if (answers.time === 'moderat') {
    score += animal.energyLevel === 'ridicat' ? 8 : 15
  } else {
    score += animal.energyLevel === 'scăzut' ? 15 : 5
  }

  maxScore += 10
  if (answers.preference === 'orice') {
    score += 10
  } else {
    const prefMap = { caine: 'câine', pisica: 'pisică', iepure: 'iepure' }
    score += prefMap[answers.preference] === animal.species ? 10 : 0
  }

  return Math.round((score / maxScore) * 100)
}
