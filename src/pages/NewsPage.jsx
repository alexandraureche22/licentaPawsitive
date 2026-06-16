import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Newspaper, Calendar, Tag, ArrowLeft, PlusCircle, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { SERVER } from '../config/global'
import './Pages.css'

const emptyArticle = { title: '', summary: '', content: '', category: 'comunitate', date: '' }
const PAGE_SIZE = 4

const NewsPage = () => {
  const userData = useSelector(state => state.user.data)
  const isAdmin = userData.type === 'admin'

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyArticle)
  const [saving, setSaving] = useState(false)
  const [page, setPage] = useState(0)

  const fetchNews = async () => {
    try {
      const res = await fetch(`${SERVER}/api/news`)
      if (res.ok) {
        const data = await res.json()
        setArticles(data)
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleCreate = async () => {
    if (!form.title || !form.summary || !form.content || !form.date) return
    setSaving(true)
    try {
      const res = await fetch(`${SERVER}/api/news`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json', authorization: userData.token },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setShowForm(false)
        setForm(emptyArticle)
        setPage(0)
        await fetchNews()
      }
    } catch (err) {
      console.error(err)
    }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Ești sigur că vrei să ștergi acest articol?')) return
    try {
      const res = await fetch(`${SERVER}/api/news/${id}`, {
        method: 'delete',
        headers: { authorization: userData.token }
      })
      if (res.ok) {
        setArticles(prev => prev.filter(a => a.id !== id))
        if (selectedArticle?.id === id) setSelectedArticle(null)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const totalPages = Math.ceil(articles.length / PAGE_SIZE)
  const pageArticles = articles.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

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
              {isAdmin && (
                <button onClick={() => handleDelete(selectedArticle.id)} className='btn btn-outline' style={{ marginTop: '1.5rem', color: '#d32f2f', borderColor: '#d32f2f' }}>
                  <Trash2 size={14} /> Șterge articolul
                </button>
              )}
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
          {isAdmin && (
            <button className='btn btn-primary' onClick={() => setShowForm(true)} style={{ marginBottom: '1.5rem' }}>
              <PlusCircle size={16} /> Adaugă articol
            </button>
          )}

          {showForm && (
            <div className='form-card' style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginTop: 0 }}>Articol nou</h3>
              <div className='form-group'><label>Titlu *</label><input className='form-input' value={form.title} onChange={e => update('title', e.target.value)} /></div>
              <div className='form-group'><label>Rezumat *</label><input className='form-input' value={form.summary} onChange={e => update('summary', e.target.value)} /></div>
              <div className='form-row'>
                <div className='form-group'><label>Categorie</label>
                  <select className='form-select' value={form.category} onChange={e => update('category', e.target.value)}>
                    <option value='campanii'>Campanii</option>
                    <option value='adoptii'>Adopții</option>
                    <option value='comunitate'>Comunitate</option>
                    <option value='educatie'>Educație</option>
                  </select>
                </div>
                <div className='form-group'><label>Data *</label><input className='form-input' type='date' value={form.date} onChange={e => update('date', e.target.value)} /></div>
              </div>
              <div className='form-group'><label>Conținut *</label><textarea className='form-textarea' value={form.content} onChange={e => update('content', e.target.value)} /></div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className='btn btn-primary' onClick={handleCreate} disabled={saving}>{saving ? 'Se salvează...' : 'Publică articolul'}</button>
                <button className='btn btn-outline' onClick={() => { setShowForm(false); setForm(emptyArticle) }}>Anulează</button>
              </div>
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>Se încarcă...</div>
          ) : (
            <>
              <div className='news-grid'>
                {pageArticles.map(article => (
                  <article key={article.id} className='news-card' onClick={() => setSelectedArticle(article)} style={{ cursor: 'pointer', position: 'relative' }}>
                    {isAdmin && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(article.id) }}
                        style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'white', border: '1px solid #ffcdd2', borderRadius: 6, padding: '0.25rem', cursor: 'pointer', color: '#d32f2f' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
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

              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
                  <button
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className='btn btn-outline'
                    style={{ opacity: page === 0 ? 0.5 : 1 }}
                  >
                    <ChevronLeft size={16} /> Anterior
                  </button>
                  <span style={{ fontSize: '0.875rem', color: '#888' }}>
                    Pagina {page + 1} din {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={page >= totalPages - 1}
                    className='btn btn-outline'
                    style={{ opacity: page >= totalPages - 1 ? 0.5 : 1 }}
                  >
                    Următor <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default NewsPage