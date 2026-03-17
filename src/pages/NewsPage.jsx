import React, { useState } from 'react'
import { Newspaper, Calendar, Tag, ArrowLeft } from 'lucide-react'
import './Pages.css'

const articles = [
  { id: 1, title: 'Campanie de sterilizare gratuită în București', summary: 'Asociația Prietenii Animalelor organizează o campanie de sterilizare gratuită.', content: 'Asociația Prietenii Animalelor, în parteneriat cu mai multe clinici veterinare din București, organizează o campanie de sterilizare gratuită pentru câinii și pisicile din adăposturi. Campania se va desfășura pe parcursul lunii martie și vizează reducerea numărului de animale abandonate. Voluntarii pot participa la sesiunile de transport și îngrijire post-operatorie. Înscrierile se fac prin platforma AdoptăCuDrag sau direct la sediul asociației.', category: 'campanii', date: '2026-03-01' },
  { id: 2, title: 'Nacho a fost adoptat după 2 ani în adăpost!', summary: 'O poveste emoționantă: Nacho a găsit în sfârșit o familie iubitoare din Cluj-Napoca.', content: 'După doi ani de așteptare în Adăpostul Speranța din București, Nacho — un Border Collie mix energic și loial — a fost adoptat de o familie din Cluj-Napoca. Familia Dumitrescu l-a descoperit pe platformă prin quiz-ul de compatibilitate și s-a îndrăgostit imediat. "Am știut din prima că e al nostru", povestește Maria Dumitrescu. Nacho se bucură acum de plimbări lungi în parcul Central și de o curte mare unde aleargă liber.', category: 'adoptii', date: '2026-02-25' },
  { id: 3, title: 'Voluntarii noștri au ajuns la 300!', summary: 'Comunitatea AdoptăCuDrag crește: am depășit pragul de 300 voluntari activi.', content: 'Suntem mândri să anunțăm că echipa de voluntari AdoptăCuDrag a depășit pragul de 300 de membri activi în 15 orașe din România. Voluntarii noștri contribuie zilnic la hrănirea, îngrijirea și socializarea animalelor din adăposturi. De asemenea, ei ajută la organizarea evenimentelor de adopție și la transportul animalelor către noile cămine. Dacă vrei să te alături echipei, vizitează pagina Implică-te.', category: 'comunitate', date: '2026-02-20' },
  { id: 4, title: 'Ghid: Cum pregătești casa pentru un companion', summary: 'Tot ce trebuie să știi înainte de a aduce un animal acasă.', content: 'Adopția unui animal este un moment emoționant, dar necesită pregătire. Iată câteva sfaturi esențiale: asigură-te că ai toate produsele necesare (hrană, boluri, pat, jucării), creează un spațiu sigur unde animalul se poate retrage, elimină obiectele periculoase din zona accesibilă, și planifică o vizită la veterinar în prima săptămână. Fii răbdător — adaptarea poate dura între 2 și 4 săptămâni. Nu uita că echipa noastră de suport post-adopție e mereu disponibilă!', category: 'educatie', date: '2026-02-15' }
]

const NewsPage = () => {
  const [selectedArticle, setSelectedArticle] = useState(null)

  if (selectedArticle) {
    return (
      <div className='page'>
        <section className='page-hero'>
          <div className='container'>
            <div className='hero-badge'><Newspaper size={16} /> Articol</div>
            <h1>{selectedArticle.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1rem' }}>
              <span className={`news-category ${selectedArticle.category}`}>
                <Tag size={12} style={{ marginRight: 4, display: 'inline' }} />
                {selectedArticle.category}
              </span>
              <span className='news-date'>
                <Calendar size={12} /> {new Date(selectedArticle.date).toLocaleDateString('ro-RO')}
              </span>
            </div>
          </div>
        </section>
        <section className='section'>
          <div className='container' style={{ maxWidth: '700px' }}>
            <button onClick={() => setSelectedArticle(null)} className='back-link' style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              <ArrowLeft size={16} /> Înapoi la noutăți
            </button>
            <div className='form-card' style={{ marginTop: '1rem' }}>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#333' }}>{selectedArticle.content}</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className='page'>
      <section className='page-hero'>
        <div className='container'>
          <div className='hero-badge'><Newspaper size={16} /> Rămâi informat</div>
          <h1>Noutăți & <span className='text-gradient'>Știri</span></h1>
          <p>Află ultimele vești despre adopții, campanii și comunitatea noastră.</p>
        </div>
      </section>
      <section className='section'>
        <div className='container'>
          <div className='news-grid'>
            {articles.map(article => (
              <article key={article.id} className='news-card' onClick={() => setSelectedArticle(article)} style={{ cursor: 'pointer' }}>
                <div className='news-meta'>
                  <span className={`news-category ${article.category}`}>
                    <Tag size={12} style={{ marginRight: 4, display: 'inline' }} />
                    {article.category}
                  </span>
                  <span className='news-date'>
                    <Calendar size={12} /> {new Date(article.date).toLocaleDateString('ro-RO')}
                  </span>
                </div>
                <h2>{article.title}</h2>
                <p>{article.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default NewsPage