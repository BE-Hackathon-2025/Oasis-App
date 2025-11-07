// ZENO AI Assistant - Claude API Integration

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  suggestedActions?: SuggestedAction[]
}

export interface SuggestedAction {
  label: string
  action: 'navigate_balance' | 'navigate_map' | 'navigate_budget' | 'navigate_shutdown'
  icon?: string
}

export interface ZenoContext {
  ebtBalance: number
  daysUntilRefill: number
  familySize: number
  location: string
}

// Predefined responses for common questions (for demo reliability)
const commonResponses: Record<string, { content: string; actions?: SuggestedAction[] }> = {
  'balance': {
    content: "I can help you check your EBT balance! You currently have $127.43 remaining, with 23 days until your next refill. That means you have about $5.54 per day to work with.\n\nWould you like me to help you create a budget plan to make your benefits last?",
    actions: [
      { label: 'View Full Balance', action: 'navigate_balance', icon: '💳' },
      { label: 'Get Budget Help', action: 'navigate_budget', icon: '📊' }
    ]
  },
  'food': {
    content: "I understand you need food assistance. Don't worry - there are several resources in Jackson that can help you right now.\n\nThe West Tennessee Food Bank is open today until 4 PM and has good stock of fresh produce, protein, and non-perishables. They're located at 562 Airways Blvd and don't require an appointment.\n\nWould you like me to show you all the food pantries near you?",
    actions: [
      { label: 'Find Food Banks', action: 'navigate_map', icon: '📍' },
      { label: 'Check My Balance', action: 'navigate_balance', icon: '💳' }
    ]
  },
  'shutdown': {
    content: "Great question. Right now, the government shutdown risk is LOW (15%). The current funding deadline is 45 days away, and Congress recently reached a bipartisan agreement.\n\nHowever, it's always smart to prepare. I recommend stocking up on non-perishables, knowing where your nearest food pantries are, and saving a small emergency fund if possible.\n\nWould you like to see the full shutdown risk dashboard?",
    actions: [
      { label: 'View Shutdown Risk', action: 'navigate_shutdown', icon: '⚠️' },
      { label: 'Find Food Pantries', action: 'navigate_map', icon: '📍' }
    ]
  },
  'budget': {
    content: "I'd be happy to help you budget! With your current balance of $127.43 and 23 days until refill, you have about $5.54 per day.\n\nHere are some quick tips:\n• Shop at Dollar General or Family Dollar for basics\n• Buy store brands instead of name brands\n• Stock up on rice, beans, pasta - they're filling and cheap\n• Check food bank hours - it's okay to use them!\n\nWould you like me to create a detailed meal plan for the week?",
    actions: [
      { label: 'Get Smart Budget', action: 'navigate_budget', icon: '📊' },
      { label: 'Find Cheap Stores', action: 'navigate_map', icon: '📍' }
    ]
  },
  'hello': {
    content: "Hello! I'm ZENO, your personal assistant for navigating SNAP benefits and finding resources in Jackson. I'm here to help you make the most of your benefits, find food when you need it, and plan ahead.\n\nHow can I help you today? You can ask me about your EBT balance, food pantries, budget tips, or anything else related to getting assistance.",
    actions: [
      { label: 'Check My Balance', action: 'navigate_balance', icon: '💳' },
      { label: 'Find Food Banks', action: 'navigate_map', icon: '📍' },
      { label: 'Budget Help', action: 'navigate_budget', icon: '📊' }
    ]
  }
}

// Detect intent from user message
function detectIntent(message: string): string | null {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('balance') || lowerMessage.includes('ebt') || lowerMessage.includes('snap') || lowerMessage.includes('card')) {
    return 'balance'
  }
  if (lowerMessage.includes('food') || lowerMessage.includes('hungry') || lowerMessage.includes('eat') || lowerMessage.includes('pantry') || lowerMessage.includes('running out')) {
    return 'food'
  }
  if (lowerMessage.includes('shutdown') || lowerMessage.includes('government') || lowerMessage.includes('disruption')) {
    return 'shutdown'
  }
  if (lowerMessage.includes('budget') || lowerMessage.includes('money') || lowerMessage.includes('stretch') || lowerMessage.includes('save')) {
    return 'budget'
  }
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi ') || lowerMessage.includes('hey') || lowerMessage === 'hi' || lowerMessage === 'hey') {
    return 'hello'
  }

  return null
}

// Main function to get ZENO response
export async function getZenoResponse(
  userMessage: string,
  _conversationHistory: Message[],
  _context: ZenoContext
): Promise<{ content: string; suggestedActions?: SuggestedAction[] }> {
  // Try to detect intent and use predefined response for demo reliability
  const intent = detectIntent(userMessage)
  if (intent && commonResponses[intent]) {
    // Add slight delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    return commonResponses[intent]
  }

  // For other questions, use a generic helpful response
  // In production, this would call Claude API
  await new Promise(resolve => setTimeout(resolve, 1000))

  return {
    content: "That's a great question! While I'm still learning, I can help you with:\n\n• Checking your EBT balance and transaction history\n• Finding food pantries and emergency food in Jackson\n• Creating a budget to make your benefits last\n• Understanding government shutdown risks\n\nWhat would you like help with?",
    suggestedActions: [
      { label: 'Check Balance', action: 'navigate_balance', icon: '💳' },
      { label: 'Find Food', action: 'navigate_map', icon: '📍' },
      { label: 'Budget Help', action: 'navigate_budget', icon: '📊' }
    ]
  }
}

// Generate conversation starters
export const conversationStarters = [
  "What's my EBT balance?",
  "I'm running out of food",
  "Help me budget my benefits",
  "What if there's a government shutdown?"
]
