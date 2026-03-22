import './App.css'
import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ErrorDisplay from './components/ErrorDisplay'
import AuthGuard from './components/AuthGuard'

import Index from './pages/Index'
import AnimalsPage from './pages/AnimalsPage'
import AnimalDetailPage from './pages/AnimalDetailPage'
import AuthPage from './pages/AuthPage'
import CompatibilityPage from './pages/CompatibilityPage'
import AboutPage from './pages/AboutPage'
import DonationsPage from './pages/DonationsPage'
import DistanceAdoptionPage from './pages/DistanceAdoptionPage'
import NewsPage from './pages/NewsPage'
import SupportPage from './pages/SupportPage'
import NeedsMapPage from './pages/NeedsMapPage'
import AdoptionFormPage from './pages/AdoptionFormPage'
import NotFound from './pages/NotFound'
import FavoritesPage from './pages/FavoritesPage'
import HealthJournalPage from './pages/HealthJournalPage'
import AdminPage from './pages/AdminPage'
import ChatPage from './pages/ChatPage'
import AdminChatPage from './pages/AdminChatPage'
import CalculatorPage from './pages/CalculatorPage'
import StatisticiPage from './pages/StatisticiPage'
import TransparentaPage from './pages/TransparentaPage'
import ProfilePage from './pages/ProfilePage'

const userDataSelector = state => state.user.data

const App = () => {
  const userData = useSelector(userDataSelector)
  const isAuthenticated = !!userData.token

  return (
    <div className='app'>
      <ErrorDisplay />
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/animale' element={<AnimalsPage />} />
          <Route path='/animale/:id' element={<AnimalDetailPage />} />
          <Route path='/compatibilitate' element={<CompatibilityPage />} />
          <Route path='/despre' element={<AboutPage />} />
          <Route path='/donatii' element={<DonationsPage />} />
          <Route path='/implica-te' element={<DistanceAdoptionPage />} />
          <Route path='/noutati' element={<NewsPage />} />
          <Route path='/suport' element={<SupportPage />} />
          <Route path='/harta-nevoi' element={<NeedsMapPage />} />
          <Route path='/autentificare' element={<AuthPage />} />
          <Route path='/favorite' element={<FavoritesPage />} />
          <Route path='/jurnal-sanatate' element={<HealthJournalPage />} />
          <Route path='/calculator' element={<CalculatorPage />} />
          <Route path='/statistici' element={<StatisticiPage />} />
          <Route path='/transparenta' element={<TransparentaPage />} />
          <Route
            path='/profil'
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <ProfilePage />
              </AuthGuard>
            }
          />
          <Route
            path='/chat'
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <ChatPage />
              </AuthGuard>
            }
          />
          <Route
            path='/admin/chat'
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <AdminChatPage />
              </AuthGuard>
            }
          />
          <Route
            path='/admin'
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <AdminPage />
              </AuthGuard>
            }
          />
          <Route
            path='/adopta/:id'
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <AdoptionFormPage />
              </AuthGuard>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App