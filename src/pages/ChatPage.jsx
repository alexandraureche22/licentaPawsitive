import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { MessageCircle, Send, ArrowDown } from 'lucide-react'
import { SERVER } from '../config/global'
import './Pages.css'

const ChatPage = () => {
  const userData = useSelector(state => state.user.data)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const isAuthenticated = !!userData.token

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${SERVER}/api/messages/mine`, {
        headers: { authorization: userData.token }
      })
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return
    fetchMessages()
    const interval = setInterval(fetchMessages, 5000)
    return () => clearInterval(interval)
  }, [isAuthenticated])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!isAuthenticated) return
    fetch(`${SERVER}/api/messages/read`, {
      method: 'put',
      headers: { authorization: userData.token }
    })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
    setLoading(true)
    try {
      const response = await fetch(`${SERVER}/api/messages`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          authorization: userData.token
        },
        body: JSON.stringify({ text: input })
      })
      if (response.ok) {
        setInput('')
        fetchMessages()
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  if (!isAuthenticated) return <Navigate to='/autentificare' replace />

  return (
    <div className='page' style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
      <div className='container' style={{ maxWidth: '700px' }}>
        <div className='chat-container' style={{ height: '75vh' }}>
          <div className='chat-header'>
            <div className='chat-avatar'><MessageCircle size={20} /></div>
            <div>
              <h3>Chat cu Echipa AdoptăCuDrag</h3>
              <p>Întreabă orice despre adopție, animale sau platformă</p>
            </div>
          </div>

          <div className='chat-messages' style={{ maxHeight: 'none', flex: 1 }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', color: '#888', padding: '2rem', fontSize: '0.875rem' }}>
                <MessageCircle size={40} style={{ color: '#ddd', margin: '0 auto 1rem', display: 'block' }} />
                Trimite un mesaj și echipa noastră îți va răspunde cât mai curând!
              </div>
            )}
            {messages.map(msg => (
              <div key={msg.id} className={`chat-msg ${msg.isAdmin ? 'system' : 'user'}`}>
                {msg.isAdmin && <div style={{ fontSize: '0.6875rem', color: '#c2185b', fontWeight: 600, marginBottom: '0.25rem' }}>Admin</div>}
                {msg.text}
                <div style={{ fontSize: '0.625rem', opacity: 0.6, marginTop: '0.25rem', textAlign: 'right' }}>
                  {new Date(msg.createdAt).toLocaleString('ro-RO', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className='chat-input'>
            <input
              placeholder='Scrie un mesaj...'
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage