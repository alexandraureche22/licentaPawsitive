import React, { useState } from 'react'
import { MessageCircle, Send, Phone, BookOpen, HelpCircle, ChevronDown } from 'lucide-react'
import './Pages.css'

const faqs = [
  { q: 'Ce fac dacă animalul nu se adaptează?', a: 'Este normal ca adaptarea să dureze 2-4 săptămâni. Echipa noastră te va ghida pe tot parcursul.' },
  { q: 'Cum funcționează programul de mentorat?', a: 'Fiecare adoptator este conectat cu un voluntar experimentat, timp de 3 luni post-adopție.' },
  { q: 'Ce documente primesc la adopție?', a: 'Primești contractul de adopție, jurnalul de sănătate, cartea de identitate și recomandări personalizate.' },
  { q: 'Pot returna animalul dacă nu funcționează?', a: 'Încurajăm comunicarea înainte de orice decizie. Echipa va lucra cu tine pentru a rezolva provocările.' }
]

const SupportPage = () => {
  const [openFaq, setOpenFaq] = useState(null)
  const [messages, setMessages] = useState([{ from: 'system', text: 'Bun venit! Sunt aici să te ajut cu orice întrebare despre adopție. 🐾' }])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages([...messages, { from: 'user', text: input }])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'system', text: 'Mulțumim! Un voluntar va reveni cu un răspuns în cel mai scurt timp. 💚' }])
    }, 1000)
  }

  return (
    <div className='page' style={{ paddingTop: '6rem', paddingBottom: '3rem' }}>
      <div className='container'>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Suport Post-Adopție</h1>
        <p style={{ color: '#666', marginBottom: '2.5rem' }}>Nu ești singur! Echipa noastră te sprijină pe tot parcursul adaptării.</p>
        <div className='support-grid'>
          <div className='chat-container'>
            <div className='chat-header'>
              <div className='chat-avatar'><MessageCircle size={20} /></div>
              <div><h3>Chat cu Voluntarii</h3><p>Timp mediu de răspuns: 15 minute</p></div>
            </div>
            <div className='chat-messages'>
              {messages.map((msg, i) => <div key={i} className={`chat-msg ${msg.from}`}>{msg.text}</div>)}
            </div>
            <div className='chat-input'>
              <input placeholder='Scrie un mesaj...' value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} />
              <button onClick={sendMessage}><Send size={16} /></button>
            </div>
          </div>
          <div>
            <div className='form-card' style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <HelpCircle size={20} style={{ color: '#c2185b' }} />
                <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Întrebări frecvente</h3>
              </div>
              <div className='faq-list'>
                {faqs.map((faq, i) => (
                  <div key={i} className='faq-item'>
                    <button className='faq-question' onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <span>{faq.q}</span>
                      <ChevronDown size={16} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>
                    {openFaq === i && <div className='faq-answer'>{faq.a}</div>}
                  </div>
                ))}
              </div>
            </div>
            <div className='resource-grid'>
              <div className='resource-card warm'>
                <Phone size={32} />
                <h4>Linie telefonică</h4>
                <p>L-V: 9:00 - 18:00</p>
                <p style={{ fontWeight: 600, color: '#1a1a1a' }}>0721 234 567</p>
              </div>
              <div className='resource-card sage'>
                <BookOpen size={32} />
                <h4>Ghid de îngrijire</h4>
                <p>Sfaturi pentru primele zile</p>
                <button className='btn btn-outline btn-sm' style={{ marginTop: '0.5rem' }}>Descarcă PDF</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportPage
