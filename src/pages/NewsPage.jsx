import React from 'react'
import { Newspaper, Calendar, Tag } from 'lucide-react'
import './Pages.css'

const articles = [
  { id: 1, title: 'Campanie de sterilizare gratuită în București', summary: 'Asociația Prietenii Animalelor organizează o campanie de sterilizare gratuită.', category: 'campanii', date: '2026-03-01' },
  { id: 2, title: 'Ava a fost adoptat după 2 ani în adăpost!', summary: 'O poveste emoționantă: Ava a găsit în sfârșit o familie iubitoare din Târgoviște.', category: 'adoptii', date: '2026-02-25' },
  { id: 3, title: 'Voluntarii noștri au ajuns la 100!', summary: 'Comunitatea AdoptăCuDrag crește: am depășit pragul de 300 voluntari activi.', category: 'comunitate', date: '2026-02-20' },
  { id: 4, title: 'Ghid: Cum pregătești casa pentru un nou animal', summary: 'Tot ce trebuie să știi înainte de a aduce un animal acasă.', category: 'educatie', date: '2026-02-15' }
]

const NewsPage = () => (
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
            <article key={article.id} className='news-card'>
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

export default NewsPage
