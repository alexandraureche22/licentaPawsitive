import models from './models/index.mjs'
import bcrypt from 'bcrypt'

const preloadData = async () => {
  // --- Useri ---
  const admin = await models.User.create({
    email: 'admin@online.ro',
    passwordHash: await bcrypt.hash('admin123', 10),
    fullName: 'Admin AdoptăCuDrag',
    type: 'admin'
  })

  const user1 = await models.User.create({
    email: 'ureche@online.ro',
    passwordHash: await bcrypt.hash('parola123', 10),
    fullName: 'Ureche Ureche',
    type: 'regular'
  })

  const user2 = await models.User.create({
    email: 'alexandra@online.ro',
    passwordHash: await bcrypt.hash('parola123', 10),
    fullName: 'Ureche Alexandra',
    type: 'regular'
  })

  // --- Animale ---
  const nacho = await models.Animal.create({
    name: 'Nacho',
    species: 'câine',
    breed: 'Border Collie mix',
    age: '3 ani',
    gender: 'Mascul',
    size: 'mare',
    image: '/images/dog1.jpg',
    description: 'Nacho e un suflet blând prins într-un corp impunător. Adoră drumețiile și nu se dezlipește de stăpân. A fost găsit rătăcind prin munți și de atunci visează la o familie.',
    personality: ['Protector', 'Aventuros', 'Loial', 'Blând'],
    goodWithKids: true,
    goodWithCats: false,
    goodWithDogs: true,
    energyLevel: 'ridicat',
    apartmentFriendly: false,
    shelter: 'Adăpostul Speranța',
    city: 'București'
  })

  const indigo = await models.Animal.create({
    name: 'Indigo',
    species: 'câine',
    breed: 'Labrador',
    age: '6 luni',
    gender: 'Femelă',
    size: 'mic',
    image: '/images/dog2.jpg',
    description: 'Indigo dansează de fericire de fiecare dată când vede pe cineva. E mică, pufoasă și plină de energie. Perfectă pentru apartament.',
    personality: ['Veselă', 'Energică', 'Sociabilă', 'Jucăușă'],
    goodWithKids: true,
    goodWithCats: true,
    goodWithDogs: true,
    energyLevel: 'ridicat',
    apartmentFriendly: true,
    shelter: 'Asociația Prietenii Animalelor',
    city: 'Cluj-Napoca'
  })

  const tango = await models.Animal.create({
    name: 'Tango',
    species: 'câine',
    breed: 'Metis',
    age: '5 luni',
    gender: 'Mascul',
    size: 'mediu',
    image: '/images/dog3.jpg',
    description: 'Tango e filosoful adăpostului — liniștit, observator și incredibil de răbdător. Îi place să stea lângă tine în timp ce citești.',
    personality: ['Calm', 'Răbdător', 'Devotat', 'Cuminte'],
    goodWithKids: true,
    goodWithCats: true,
    goodWithDogs: true,
    energyLevel: 'scăzut',
    apartmentFriendly: true,
    shelter: 'Adăpostul Micii Prieteni',
    city: 'Timișoara'
  })

  const fulg = await models.Animal.create({
    name: 'Fulg',
    species: 'câine',
    breed: 'Labrador mix',
    age: '6 ani',
    gender: 'Femelă',
    size: 'mare',
    image: '/images/dog4.jpg',
    description: 'Fulg e pură nebunie pozitivă. Aleargă, se rostogolește și adoră apa. Are nevoie de spațiu și de un om la fel de activ ca ea.',
    personality: ['Nebunătică', 'Curajoasă', 'Afectuoasă', 'Activă'],
    goodWithKids: true,
    goodWithCats: false,
    goodWithDogs: true,
    energyLevel: 'ridicat',
    apartmentFriendly: false,
    shelter: 'Adăpostul Speranța',
    city: 'București'
  })

  const visina = await models.Animal.create({
    name: 'Vișină',
    species: 'pisică',
    breed: 'Europeană',
    age: '9 luni',
    gender: 'Femelă',
    size: 'mic',
    image: '/images/cat1.jpg',
    description: 'Vișină e dulce exact cât sugerează numele. Toarce non-stop, adoră locurile calde și e expertă în a te face să te simți iubit.',
    personality: ['Dulce', 'Afectuoasă', 'Liniștită', 'Toarcătoare'],
    goodWithKids: true,
    goodWithCats: true,
    goodWithDogs: false,
    energyLevel: 'scăzut',
    apartmentFriendly: true,
    shelter: 'Asociația Prietenii Animalelor',
    city: 'Cluj-Napoca'
  })

  const nimbus = await models.Animal.create({
    name: 'Nimbus',
    species: 'pisică',
    breed: 'Persană mix',
    age: '4 luni',
    gender: 'Mascul',
    size: 'mediu',
    image: '/images/cat2.jpg',
    description: 'Nimbus e regele casei — maiestuos, puțin arogant, dar cu un suflet mare. Își alege singur momentele de tandrețe, și asta îl face special.',
    personality: ['Maiestuos', 'Independent', 'Curios', 'Regal'],
    goodWithKids: false,
    goodWithCats: true,
    goodWithDogs: false,
    energyLevel: 'moderat',
    apartmentFriendly: true,
    shelter: 'Adăpostul Speranța',
    city: 'București'
  })

  const pixel = await models.Animal.create({
    name: 'Pixel',
    species: 'pisică',
    breed: 'Metis tabby',
    age: '2 luni',
    gender: 'Femelă',
    size: 'mic',
    image: '/images/cat3.jpg',
    description: 'Pixel e un glonț mic și dungat care atacă tot ce mișcă. Jucăriile, șosetele, umbra ta — nimic nu e în siguranță. Adorabilă și haotică.',
    personality: ['Haotică', 'Jucăușă', 'Rapidă', 'Curioasă'],
    goodWithKids: true,
    goodWithCats: true,
    goodWithDogs: true,
    energyLevel: 'ridicat',
    apartmentFriendly: true,
    shelter: 'Adăpostul Micii Prieteni',
    city: 'Timișoara'
  })

  const solomona = await models.Animal.create({
    name: 'Solomona',
    species: 'pisică',
    breed: 'Siameză mix',
    age: '9 ani',
    gender: 'Femelă',
    size: 'mic',
    image: '/images/cat4.jpg',
    description: 'Solomona vorbește mult — miaună la tine ca și cum ar povesti ce a făcut toată ziua. Elegantă, vocală și imposibil de ignorat.',
    personality: ['Vocală', 'Elegantă', 'Inteligentă', 'Sociabilă'],
    goodWithKids: true,
    goodWithCats: true,
    goodWithDogs: false,
    energyLevel: 'moderat',
    apartmentFriendly: true,
    shelter: 'Asociația Prietenii Animalelor',
    city: 'Cluj-Napoca'
  })

  const brioche = await models.Animal.create({
    name: 'Brioche',
    species: 'iepure',
    breed: 'Lop',
    age: '1 an',
    gender: 'Mascul',
    size: 'mic',
    image: '/images/bunny.jpg',
    description: 'Brioche e rotund, pufos și mereu flămând. Urechile lui căzute îi dau un aer permanent surprins. Ideal pentru familii liniștite.',
    personality: ['Pufos', 'Calm', 'Lacom', 'Blând'],
    goodWithKids: true,
    goodWithCats: true,
    goodWithDogs: false,
    energyLevel: 'scăzut',
    apartmentFriendly: true,
    shelter: 'Adăpostul Micii Prieteni',
    city: 'Timișoara'
  })

  const kumquat = await models.Animal.create({
    name: 'Kumquat',
    species: 'iepure',
    breed: 'Pitic olandez',
    age: '8 luni',
    gender: 'Femelă',
    size: 'mic',
    image: '/images/rabbit1.jpg',
    description: 'Kumquat e mică dar plină de personalitate. Sare peste obstacole, fură morcovi și te privește fix în ochi fără pic de vinovăție.',
    personality: ['Îndrăzneață', 'Jucăușă', 'Rapidă', 'Haioasă'],
    goodWithKids: true,
    goodWithCats: false,
    goodWithDogs: false,
    energyLevel: 'moderat',
    apartmentFriendly: true,
    shelter: 'Adăpostul Speranța',
    city: 'București'
  })

  const napoleon = await models.Animal.create({
    name: 'Napoleon',
    species: 'altele',
    breed: 'Măgar domestic',
    age: '7 ani',
    gender: 'Mascul',
    size: 'mare',
    image: '/images/donkey.jpg',
    description: 'Napoleon e încăpățânat doar cu numele. De fapt e cel mai blând suflet — adoră mângâierile pe bot și morcovii proaspeți. Are nevoie de spațiu verde.',
    personality: ['Blând', 'Răbdător', 'Încăpățânat', 'Amuzant'],
    goodWithKids: true,
    goodWithCats: true,
    goodWithDogs: true,
    energyLevel: 'scăzut',
    apartmentFriendly: false,
    shelter: 'Adăpostul Micii Prieteni',
    city: 'Timișoara'
  })

  const gizmo = await models.Animal.create({
    name: 'Gizmo',
    species: 'altele',
    breed: 'Hamster sirian',
    age: '4 luni',
    gender: 'Mascul',
    size: 'mic',
    image: '/images/hamster.jpg',
    description: 'Gizmo e un mic inginer — își construiește tuneluri elaborate și face provizii ca pentru apocalipsă. Nocturn, pufos și absolut hipnotizant de privit.',
    personality: ['Ocupat', 'Pufos', 'Nocturn', 'Inventiv'],
    goodWithKids: true,
    goodWithCats: false,
    goodWithDogs: false,
    energyLevel: 'moderat',
    apartmentFriendly: true,
    shelter: 'Asociația AdoptăAcum',
    city: 'Iași'
  })

  const calypso = await models.Animal.create({
    name: 'Calypso',
    species: 'altele',
    breed: 'Papagal Ara',
    age: '5 ani',
    gender: 'Femelă',
    size: 'mediu',
    image: '/images/perrot1.jpg',
    description: 'Calypso cântă, dansează și repetă tot ce auzi. Are culori spectaculoase și o personalitate pe măsură. Atenție: va deveni centrul atenției.',
    personality: ['Zgomotoasă', 'Colorată', 'Inteligentă', 'Sociabilă'],
    goodWithKids: false,
    goodWithCats: false,
    goodWithDogs: false,
    energyLevel: 'ridicat',
    apartmentFriendly: true,
    shelter: 'Adăpostul Speranța',
    city: 'București'
  })

  const mango = await models.Animal.create({
    name: 'Mango',
    species: 'altele',
    breed: 'Papagal Nimfă',
    age: '2 ani',
    gender: 'Mascul',
    size: 'mic',
    image: '/images/perrot2.jpg',
    description: 'Mango fluieră melodii și stă pe umărul tău ca un mic pirat. E blând, ușor de îngrijit și perfect pentru un companion de birou.',
    personality: ['Melodios', 'Blând', 'Fidel', 'Cântăreț'],
    goodWithKids: true,
    goodWithCats: false,
    goodWithDogs: false,
    energyLevel: 'moderat',
    apartmentFriendly: true,
    shelter: 'Adăpostul Micii Prieteni',
    city: 'Timișoara'
  })
 // --- Health Records ---
  await models.HealthRecord.bulkCreate([
    { date: '2024-01-15', type: 'vaccin', description: 'Vaccin antirabic', veterinar: 'Dr. Ureche A.', verified: true, animalId: nacho.id },
    { date: '2024-03-10', type: 'deparazitare', description: 'Deparazitare internă și externă', veterinar: 'Dr. Ureche A.', verified: true, animalId: nacho.id },
    { date: '2024-06-20', type: 'sterilizare', description: 'Sterilizare chirurgicală', veterinar: 'Dr. Godza N.', verified: true, animalId: nacho.id },
    { date: '2024-02-01', type: 'vaccin', description: 'Vaccin polivalent', veterinar: 'Dr. Ureche L.', verified: true, animalId: indigo.id },
    { date: '2024-05-15', type: 'sterilizare', description: 'Sterilizare', veterinar: 'Dr. Ureche L.', verified: true, animalId: indigo.id },
    { date: '2023-11-01', type: 'vaccin', description: 'Vaccin antirabic + polivalent', veterinar: 'Dr. Godza N.', verified: true, animalId: tango.id },
    { date: '2024-02-20', type: 'sterilizare', description: 'Sterilizare', veterinar: 'Dr. Godza N.', verified: true, animalId: tango.id },
    { date: '2024-07-10', type: 'control', description: 'Control anual - sănătos', veterinar: 'Dr. Godza N.', verified: true, animalId: tango.id },
    { date: '2024-08-01', type: 'vaccin', description: 'Vaccin antirabic', veterinar: 'Dr. Ureche A.', verified: true, animalId: fulg.id },
    { date: '2024-09-15', type: 'deparazitare', description: 'Deparazitare completă', veterinar: 'Dr. Ureche A.', verified: true, animalId: fulg.id },
    { date: '2024-02-01', type: 'vaccin', description: 'Vaccin trivalent', veterinar: 'Dr. Ureche L.', verified: true, animalId: visina.id },
    { date: '2024-04-15', type: 'sterilizare', description: 'Sterilizare', veterinar: 'Dr. Ureche L.', verified: true, animalId: visina.id },
    { date: '2024-06-01', type: 'control', description: 'Control - stare excelentă', veterinar: 'Dr. Ureche L.', verified: true, animalId: visina.id },
    { date: '2024-01-10', type: 'vaccin', description: 'Vaccin trivalent', veterinar: 'Dr. Ureche A.', verified: true, animalId: nimbus.id },
    { date: '2024-03-20', type: 'sterilizare', description: 'Sterilizare', veterinar: 'Dr. Godza N.', verified: true, animalId: nimbus.id },
    { date: '2024-09-01', type: 'vaccin', description: 'Prima doză vaccin', veterinar: 'Dr. Godza N.', verified: true, animalId: pixel.id },
    { date: '2024-10-01', type: 'deparazitare', description: 'Deparazitare internă', veterinar: 'Dr. Godza N.', verified: true, animalId: pixel.id },
    { date: '2024-03-01', type: 'vaccin', description: 'Vaccin trivalent', veterinar: 'Dr. Ureche L.', verified: true, animalId: solomona.id },
    { date: '2024-05-10', type: 'sterilizare', description: 'Sterilizare', veterinar: 'Dr. Ureche L.', verified: true, animalId: solomona.id },
    { date: '2024-05-01', type: 'control', description: 'Control general - stare bună', veterinar: 'Dr. Godza N.', verified: true, animalId: brioche.id },
    { date: '2024-07-15', type: 'deparazitare', description: 'Deparazitare externă', veterinar: 'Dr. Godza N.', verified: true, animalId: brioche.id },
    { date: '2024-06-01', type: 'control', description: 'Control general - sănătoasă', veterinar: 'Dr. Ureche A.', verified: true, animalId: kumquat.id },
    { date: '2024-04-01', type: 'control', description: 'Control general - sănătos', veterinar: 'Dr. Godza N.', verified: true, animalId: napoleon.id },
    { date: '2024-05-15', type: 'deparazitare', description: 'Deparazitare completă', veterinar: 'Dr. Godza N.', verified: true, animalId: napoleon.id },
    { date: '2024-08-01', type: 'control', description: 'Control general - activ', veterinar: 'Dr. Ureche L.', verified: true, animalId: gizmo.id },
    { date: '2024-03-15', type: 'control', description: 'Control anual - sănătoasă', veterinar: 'Dr. Ureche A.', verified: true, animalId: calypso.id },
    { date: '2024-06-10', type: 'control', description: 'Control - stare bună', veterinar: 'Dr. Godza N.', verified: true, animalId: mango.id },
  ])
  console.log('Date preîncărcate cu succes!')
  console.log('Admin: admin@online.ro / admin123')
  console.log('User: alexandra@online.ro / parola123')
  console.log('User: ureche@eonline.ro / parola123')
}

try {
  await preloadData()
} catch (error) {
  console.warn(error)
}