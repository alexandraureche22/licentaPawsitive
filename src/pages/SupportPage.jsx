import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, BookOpen, HelpCircle, ChevronDown, MessageCircle } from 'lucide-react'
import './Pages.css'

const faqs = [
  { q: 'Ce fac dacă animalul nu se adaptează?', a: 'Este normal ca adaptarea să dureze 2-4 săptămâni. Echipa noastră te va ghida pe tot parcursul.' },
  { q: 'Cum funcționează programul de mentorat?', a: 'Fiecare adoptator este conectat cu un voluntar experimentat, timp de 3 luni post-adopție.' },
  { q: 'Ce documente primesc la adopție?', a: 'Primești contractul de adopție, jurnalul de sănătate, cartea de identitate și recomandări personalizate.' },
  { q: 'Pot returna animalul dacă nu funcționează?', a: 'Încurajăm comunicarea înainte de orice decizie. Echipa va lucra cu tine pentru a rezolva provocările.' },
  { q: 'Cât durează procesul de adopție?', a: 'De obicei, procesul durează între 3-7 zile, de la completarea formularului până la predarea animalului.' },
  { q: 'Pot adopta dacă stau la apartament?', a: 'Da! Multe animale sunt potrivite pentru apartament. Quiz-ul de compatibilitate te ajută să găsești animalul potrivit.' }
]

const ghidSectiuni = [
  { titlu: 'Pregătirea casei', continut: 'Asigură-te că ai toate produsele necesare: hrană adecvată, boluri pentru apă și mâncare, pat sau pătură, jucării și un spațiu sigur unde animalul se poate retrage.' },
  { titlu: 'Primele zile', continut: 'Fii răbdător! Animalul are nevoie de timp să se adapteze. Oferă-i un loc liniștit, nu-l forța să interacționeze și lasă-l să exploreze în ritmul lui.' },
  { titlu: 'Alimentația', continut: 'Continuă cu aceeași hrană pe care o primea în adăpost. Orice schimbare trebuie făcută treptat, pe parcursul a 7-10 zile.' },
  { titlu: 'Vizita la veterinar', continut: 'Programează o vizită la veterinar în prima săptămână. Ia cu tine jurnalul de sănătate primit la adopție.' },
  { titlu: 'Socializarea', continut: 'Prezintă-l treptat altor membri ai familiei, alte animale și medii noi. Nu grăbi procesul.' }
]

const SupportPage = () => {
  const [openFaq, setOpenFaq] = useState(null)
  const [showGhid, setShowGhid] = useState(false)

  const handlePrintGhid = () => {
    const printContent = ghidSectiuni.map(s => `<h2>${s.titlu}</h2><p>${s.continut}</p>`).join('')
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Ghid de Îngrijire - AdoptăCuDrag</title>
          <style>
            body { font-family: Georgia, serif; max-width: 700px; margin: 40px auto; padding: 0 20px; color: #333; }
            h1 { color: #c2185b; border-bottom: 2px solid #c2185b; padding-bottom: 10px; }
            h2 { color: #555; margin-top: 30px; }
            p { line-height: 1.8; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #888; }
          </style>
        </head>
        <body>
          <h1>Ghid de Îngrijire Post-Adopție</h1>
          <p><em>AdoptăCuDrag — Tot ce trebuie să știi pentru primele zile cu noul tău companion.</em></p>
          ${printContent}
          <div class="footer">
            <p>© 2026 AdoptăCuDrag | contact@adoptacudrag.ro | 0721 234 567</p>
            <p>Pentru suport suplimentar, vizitează platforma noastră sau contactează-ne direct.</p>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div className='page' style={{ paddingTop: '6rem', paddingBottom: '3rem' }}>
      <div className='container'>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Suport Post-Adopție</h1>
        <p style={{ color: '#666', marginBottom: '2.5rem' }}>Nu ești singur! Echipa noastră te sprijină pe tot parcursul adaptării.</p>

        <div className='support-grid'>
          {/* FAQ */}
          <div>
            <div className='form-card'>
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
          </div>

          {/* Resurse */}
          <div>
            {/* Ghid */}
            <div className='form-card' style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginTop: 0, fontSize: '1.125rem' }}>Ghid de îngrijire</h3>
              <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
                Tot ce trebuie să știi pentru primele zile cu noul tău companion.
              </p>
              <button className='btn btn-outline btn-sm' onClick={() => setShowGhid(!showGhid)} style={{ marginBottom: showGhid ? '1rem' : 0 }}>
                {showGhid ? 'Ascunde ghidul' : 'Citește ghidul'}
              </button>
              {showGhid && (
                <div style={{ marginTop: '0.5rem' }}>
                  {ghidSectiuni.map((s, i) => (
                    <div key={i} style={{ marginBottom: '1rem' }}>
                      <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.9375rem', color: '#c2185b' }}>{s.titlu}</h4>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: '#555', lineHeight: 1.6 }}>{s.continut}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact cards */}
            <div className='resource-grid'>
              <div className='resource-card warm'>
                <Phone size={32} />
                <h4>Linie telefonică</h4>
                <p>L-V: 9:00 - 18:00</p>
                <p style={{ fontWeight: 600, color: '#1a1a1a' }}>0721 234 567</p>
              </div>
              <div className='resource-card sage'>
                <BookOpen size={32} />
                <h4>Descarcă PDF</h4>
                <p>Ghidul complet printabil</p>
                <button className='btn btn-outline btn-sm' style={{ marginTop: '0.5rem' }} onClick={handlePrintGhid}>Descarcă PDF</button>
              </div>
            </div>

            {/* Link la chat */}
            <div className='form-card' style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <MessageCircle size={32} style={{ color: '#c2185b', margin: '0 auto 0.75rem', display: 'block' }} />
              <h3 style={{ marginTop: 0 }}>Ai nevoie de ajutor?</h3>
              <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>Scrie-ne direct prin chat și echipa noastră îți va răspunde.</p>
              <Link to='/chat' className='btn btn-primary'>Deschide chat-ul</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportPage