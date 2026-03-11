import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import AnimalCard from '../components/AnimalCard'
import { quizQuestions, calculateCompatibility } from '../data/animals'
import { getAllAnimals } from '../stores/actions/animal-actions'
import './Pages.css'

const CompatibilityPage = () => {
  const dispatch = useDispatch()
  const animals = useSelector(state => state.animal.data)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    const load = async () => {
      const action = await getAllAnimals()
      dispatch(action)
    }
    load()
  }, [dispatch])

  const currentQ = quizQuestions[step]
  const progress = ((step + 1) / quizQuestions.length) * 100

  const handleSelect = (value) => {
    const newAnswers = { ...answers, [currentQ.id]: value }
    setAnswers(newAnswers)
    if (step < quizQuestions.length - 1) {
      setTimeout(() => setStep(step + 1), 300)
    } else {
      setTimeout(() => setShowResults(true), 300)
    }
  }

  const reset = () => {
    setStep(0)
    setAnswers({})
    setShowResults(false)
  }

  const results = showResults
    ? animals.map(a => ({ animal: a, score: calculateCompatibility(answers, a) })).sort((a, b) => b.score - a.score)
    : []

  return (
    <div className='page' style={{ paddingTop: '6rem', paddingBottom: '3rem' }}>
      <div className='container quiz-container'>
        {!showResults ? (
          <div>
            <div className='section-header'>
              <h2>Quiz de Compatibilitate</h2>
              <p>Răspunde la câteva întrebări și îți găsim animalul potrivit.</p>
            </div>
            <div className='quiz-progress'>
              <div className='quiz-progress-bar' style={{ width: `${progress}%` }} />
            </div>
            <div className='quiz-card'>
              <p className='quiz-step'>Întrebarea {step + 1} din {quizQuestions.length}</p>
              <h2 className='quiz-question'>{currentQ.question}</h2>
              <div className='quiz-options'>
                {currentQ.options.map(opt => (
                  <button key={opt.value} onClick={() => handleSelect(opt.value)} className={`quiz-option ${answers[currentQ.id] === opt.value ? 'selected' : ''}`}>
                    <span className='quiz-option-icon'>{opt.icon}</span>
                    <span className='quiz-option-label'>{opt.label}</span>
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className='quiz-back'>
                  <ArrowLeft size={16} /> Întrebarea anterioară
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className='section-header'>
              <h2>Rezultatele tale</h2>
              <p>Am calculat compatibilitatea ta cu fiecare animal disponibil.</p>
              <button onClick={reset} className='btn btn-outline' style={{ marginTop: '1rem' }}>
                <RefreshCw size={16} /> Refă quiz-ul
              </button>
            </div>
            <div className='animals-grid' style={{ maxWidth: '700px', margin: '0 auto' }}>
              {results.map(({ animal, score }) => (
                <AnimalCard key={animal.id} animal={animal} matchScore={score} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CompatibilityPage
