import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './ErrorDisplay.css'

const ErrorDisplay = () => {
  const userError = useSelector(state => state.user.error)
  const animalError = useSelector(state => state.animal.error)
  const adoptionError = useSelector(state => state.adoption.error)
  const donationError = useSelector(state => state.donation.error)

  const [message, setMessage] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const error = userError || animalError || adoptionError || donationError
    if (error) {
      const text = typeof error === 'string' ? error : 'A apărut o eroare'
      setMessage(text)
    }
  }, [userError, animalError, adoptionError, donationError])

  useEffect(() => {
    if (!message) return
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
      setMessage('')
    }, 5000)
    return () => clearTimeout(timer)
  }, [message])

  return (
    <div className={`error-display ${isVisible && message ? 'visible' : ''}`}>
      <div>Eroare: {message}</div>
    </div>
  )
}

export default ErrorDisplay
