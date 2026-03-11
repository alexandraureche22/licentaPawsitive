import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Search, Filter } from 'lucide-react'
import AnimalCard from '../components/AnimalCard'
import { getAllAnimals } from '../stores/actions/animal-actions'
import './Pages.css'

const speciesFilters = ['Toate', 'câine', 'pisică', 'iepure', 'altele']

const AnimalsPage = () => {
  const dispatch = useDispatch()
  const animals = useSelector(state => state.animal.data)
  const [search, setSearch] = useState('')
  const [speciesFilter, setSpeciesFilter] = useState('Toate')

  useEffect(() => {
    const load = async () => {
      const action = await getAllAnimals({ search, species: speciesFilter })
      dispatch(action)
    }
    load()
  }, [dispatch, search, speciesFilter])

  return (
    <div className='page'>
      <div className='container page-header'>
        <h1>Adoptă un animal</h1>
        <p>Descoperă animale care caută un cămin plin de iubire.</p>
        <div className='filters-row'>
          <div className='search-input'>
            <Search size={16} />
            <input placeholder='Caută după nume, rasă sau oraș...' value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className='filter-buttons'>
            {speciesFilters.map(s => (
              <button key={s} onClick={() => setSpeciesFilter(s)} className={`filter-btn ${speciesFilter === s ? 'active' : ''}`}>
                {s === 'Toate' ? 'Toate' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='animals-grid'>
          {animals.map(animal => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
        {animals.length === 0 && (
          <div className='empty-state'>
            <Filter size={48} />
            <p>Nu am găsit animale care să corespundă filtrelor tale.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnimalsPage
