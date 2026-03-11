import React from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import './Footer.css'

const Footer = () => (
  <footer className='footer'>
    <div className='footer-container'>
      <div className='footer-grid'>
        <div>
          <div className='footer-brand'>
            <Heart size={20} />
            AdoptăCuDrag
          </div>
          <p className='footer-desc'>
            Platformă dedicată gestionării adopțiilor de animale, cu focus pe compatibilitate și transparență.
          </p>
        </div>
        <div>
          <h4 className='footer-title'>Adopții</h4>
          <div className='footer-links'>
            <Link to='/animale'>Adoptă un animal</Link>
            <Link to='/compatibilitate'>Quiz Compatibilitate</Link>
            <Link to='/harta-nevoi'>Hartă Nevoi</Link>
            <Link to='/suport'>Suport Post-Adopție</Link>
          </div>
        </div>
        <div>
          <h4 className='footer-title'>Comunitate</h4>
          <div className='footer-links'>
            <Link to='/despre'>Despre Noi</Link>
            <Link to='/donatii'>Donează</Link>
            <Link to='/implica-te'>Implică-te</Link>
            <Link to='/noutati'>Noutăți</Link>
          </div>
        </div>
        <div>
          <h4 className='footer-title'>Contact</h4>
          <div className='footer-links'>
            <p>contact@adoptacudrag.ro</p>
            <p>+40 721 234 567</p>
            <p>București, România</p>
          </div>
        </div>
      </div>
      <div className='footer-bottom'>
        © 2026 AdoptăCuDrag. Toate drepturile rezervate.
      </div>
    </div>
  </footer>
)

export default Footer
