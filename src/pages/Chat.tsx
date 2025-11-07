import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatMessage from '../components/ChatMessage'
import { getZenoResponse, conversationStarters } from '../lib/zeno'
import type { Message, ZenoContext } from '../lib/zeno'
import { mockEBTBalance } from '../lib/mockData'

export default function Chat() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm ZENO, your personal assistant for SNAP benefits and community resources. I'm here to help you check your EBT balance, find food pantries in Jackson, budget your benefits, and prepare for any government changes.\n\nHow can I help you today?",
      timestamp: new Date(),
      suggestedActions: [
        { label: 'Check My Balance', action: 'navigate_balance', icon: '💳' },
        { label: 'Find Food Banks', action: 'navigate_map', icon: '📍' },
        { label: 'Budget Help', action: 'navigate_budget', icon: '📊' }
      ]
    }
  ])
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // User context for ZENO
  const userContext: ZenoContext = {
    ebtBalance: mockEBTBalance.balance,
    daysUntilRefill: mockEBTBalance.daysUntilRefill,
    familySize: 4,
    location: 'Jackson, TN'
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!inputText.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setLoading(true)

    try {
      // Get response from ZENO
      const response = await getZenoResponse(inputText, messages, userContext)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        suggestedActions: response.suggestedActions
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('ZENO error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'navigate_balance':
        navigate('/balance')
        break
      case 'navigate_map':
        navigate('/map')
        break
      case 'navigate_budget':
        navigate('/budget')
        break
      case 'navigate_shutdown':
        navigate('/shutdown')
        break
    }
  }

  const handleStarterClick = (starter: string) => {
    setInputText(starter)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="mr-3 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mr-3">
              Z
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">ZENO</h1>
              <p className="text-sm text-gray-500">Your Benefits Assistant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message}
            onActionClick={handleActionClick}
          />
        ))}

        {loading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 rounded-2xl px-4 py-3 rounded-tl-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Conversation Starters (show only if first message) */}
        {messages.length === 1 && (
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-3 text-center">Try asking:</p>
            <div className="grid grid-cols-1 gap-2">
              {conversationStarters.map((starter, index) => (
                <button
                  key={index}
                  onClick={() => handleStarterClick(starter)}
                  className="bg-white border border-gray-200 text-gray-700 px-4 py-3 rounded-lg text-sm hover:bg-gray-50 hover:border-blue-300 transition-colors text-left"
                >
                  💬 {starter}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="flex items-end space-x-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask ZENO anything..."
            className="flex-1 resize-none bg-gray-100 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-32"
            rows={1}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || loading}
            className={`p-3 rounded-full transition-colors ${
              inputText.trim() && !loading
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
