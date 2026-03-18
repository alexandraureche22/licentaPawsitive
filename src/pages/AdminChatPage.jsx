import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { MessageCircle, Send, Users } from 'lucide-react'
import { SERVER } from '../config/global'
import './Pages.css'

const AdminChatPage = () => {
  const userData = useSelector(state => state.user.data)
  const [conversations, setConversations] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const isAdmin = userData.type === 'admin'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fetchConversations = async () => {
    try {
      const response = await fetch(`${SERVER}/api/messages/conversations`, {
        headers: { authorization: userData.token }
      })
      if (response.ok) {
        const data = await response.json()
        setConversations(data)
        if (selectedUser) {
          const updated = data.find(c => c.userId === selectedUser.userId)
          if (updated) setMessages(updated.messages)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!isAdmin) return
    fetchConversations()
    const interval = setInterval(fetchConversations, 5000)
    return () => clearInterval(interval)
  }, [isAdmin])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const selectConversation = (convo) => {
    setSelectedUser(convo)
    setMessages(convo.messages)
  }

  const sendReply = async () => {
    if (!input.trim() || !selectedUser) return
    setLoading(true)
    try {
      const response = await fetch(`${SERVER}/api/messages/reply/${selectedUser.userId}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          authorization: userData.token
        },
        body: JSON.stringify({ text: input })
      })
      if (response.ok) {
        setInput('')
        fetchConversations()
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  if (!userData.token) return <Navigate to='/autentificare' replace />
  if (!isAdmin) return <Navigate to='/' replace />

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0)

  return (
    <div className='page' style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
      <div className='container'>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <MessageCircle size={28} style={{ color: '#c2185b' }} />
          Mesaje
          {totalUnread > 0 && (
            <span style={{ background: '#c2185b', color: 'white', borderRadius: 50, padding: '0.25rem 0.75rem', fontSize: '0.875rem', fontWeight: 600 }}>
              {totalUnread} necitite
            </span>
          )}
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem', height: '70vh' }}>
          {/* Lista conversații */}
          <div className='form-card' style={{ overflow: 'auto', padding: '0.5rem' }}>
            {conversations.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#888', padding: '2rem', fontSize: '0.875rem' }}>
                <Users size={32} style={{ color: '#ddd', margin: '0 auto 0.75rem', display: 'block' }} />
                Nu există conversații
              </div>
            ) : (
              conversations.map(convo => (
                <div
                  key={convo.userId}
                  onClick={() => selectConversation(convo)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem',
                    borderRadius: 8, cursor: 'pointer', transition: 'background 0.2s',
                    background: selectedUser?.userId === convo.userId ? '#fce4ec' : 'transparent'
                  }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fce4ec', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Users size={18} style={{ color: '#c2185b' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.875rem' }}>{convo.userName}</strong>
                      {convo.unread > 0 && (
                        <span style={{ background: '#c2185b', color: 'white', borderRadius: 50, padding: '0.125rem 0.5rem', fontSize: '0.6875rem', fontWeight: 700 }}>
                          {convo.unread}
                        </span>
                      )}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {convo.lastMessage.text}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Chat activ */}
          <div className='chat-container'>
            {selectedUser ? (
              <>
                <div className='chat-header'>
                  <div className='chat-avatar'><Users size={20} /></div>
                  <div>
                    <h3>{selectedUser.userName}</h3>
                    <p>{selectedUser.userEmail}</p>
                  </div>
                </div>

                <div className='chat-messages' style={{ maxHeight: 'none', flex: 1 }}>
                  {messages.map(msg => (
                    <div key={msg.id} className={`chat-msg ${msg.isAdmin ? 'user' : 'system'}`}>
                      {msg.isAdmin && <div style={{ fontSize: '0.6875rem', fontWeight: 600, marginBottom: '0.25rem', opacity: 0.8 }}>Tu (Admin)</div>}
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
                    placeholder='Scrie un răspuns...'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendReply()}
                    disabled={loading}
                  />
                  <button onClick={sendReply} disabled={loading || !input.trim()}>
                    <Send size={16} />
                  </button>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#888' }}>
                <MessageCircle size={48} style={{ color: '#ddd', marginBottom: '1rem' }} />
                <p>Selectează o conversație din stânga</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminChatPage