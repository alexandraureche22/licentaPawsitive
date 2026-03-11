import React from 'react'
import { Link } from 'react-router-dom'
import './Pages.css'

const NotFound = () => (
  <div className='not-found'>
    <h1>404</h1>
    <p>Pagina nu a fost găsită.</p>
    <Link to='/' className='btn btn-primary'>Înapoi acasă</Link>
  </div>
)

export default NotFound
