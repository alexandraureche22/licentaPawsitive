import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { PawPrint, Menu, X, User, LogOut } from 'lucide-react'
import { logout } from '../../stores/actions/user-actions'
import './Navbar.css'

const navLinks = [
  { to: '/', label: 'Acasă' },
  { to: '/animale', label: 'Adoptă' },
  { to: '/compatibilitate', label: 'Quiz' },
  { to: '/despre', label: 'Despre Noi' },
  { to: '/donatii', label: 'Donează' },
  { to: '/implica-te', label: 'Implică-te' },
  { to: '/noutati', label: 'Noutăți' },
  { to: '/favorite', label: 'Favorite' }
]

const adminLink = { to: '/admin', label: 'Admin' }
const userDataSelector = state => state.user.data

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()
  const userData = useSelector(userDataSelector)
  const isAuthenticated = !!userData.token

  const handleLogout = async () => {
    const action = await logout()
    dispatch(action)
    setOpen(false)
  }

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-brand'>
          <PawPrint size={24} />
          <span>AdoptăCuDrag</span>
        </Link>

        <div className='navbar-links'>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated && userData.type === 'admin' && (
            <Link to={adminLink.to} className={`navbar-link ${location.pathname === '/admin' ? 'active' : ''}`}>
              {adminLink.label}
            </Link>
          )}
          {isAuthenticated ? (
            <button onClick={handleLogout} className='navbar-link navbar-btn'>
              <LogOut size={16} /> Ieșire
            </button>
          ) : (
            <Link to='/autentificare' className='navbar-auth-btn'>
              <User size={16} /> Cont
            </Link>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className='navbar-toggle'>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className='navbar-mobile'>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`navbar-mobile-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated && userData.type === 'admin' && (
            <Link to={adminLink.to} onClick={() => setOpen(false)} className={`navbar-mobile-link ${location.pathname === '/admin' ? 'active' : ''}`}>
              {adminLink.label}
            </Link>
          )}
          {isAuthenticated ? (
            <button onClick={handleLogout} className='navbar-mobile-link navbar-btn'>
              <LogOut size={16} /> Ieșire
            </button>
          ) : (
            <Link to='/autentificare' onClick={() => setOpen(false)} className='navbar-mobile-link'>
              <User size={16} /> Conectare
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar