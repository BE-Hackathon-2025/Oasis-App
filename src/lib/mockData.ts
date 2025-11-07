// Mock data for Oasis demo

export interface EBTBalance {
  balance: number
  lastDeposit: {
    amount: number
    date: string
  }
  daysUntilRefill: number
  transactions: Transaction[]
  lastChecked: string
}

export interface Transaction {
  id: string
  date: string
  merchant: string
  amount: number
  type: 'purchase' | 'deposit'
}

export interface FoodPantry {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  latitude: number
  longitude: number
  phone: string
  hours: {
    monday?: string
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
    sunday?: string
  }
  services: string[]
  requirements: string[]
  openNow: boolean
  inventory: {
    produce: 'high' | 'medium' | 'low'
    protein: 'high' | 'medium' | 'low'
    dairy: 'high' | 'medium' | 'low'
    nonPerishables: 'high' | 'medium' | 'low'
  }
  waitTime: number // minutes
  accessibility: {
    wheelchairAccessible: boolean
    parking: boolean
    publicTransit: boolean
  }
}

// Mock EBT Balance Data
export const mockEBTBalance: EBTBalance = {
  balance: 127.43,
  lastDeposit: {
    amount: 234.00,
    date: '2025-11-01'
  },
  daysUntilRefill: 23,
  transactions: [
    {
      id: '1',
      date: '2025-11-05',
      merchant: 'Walmart Supercenter #453',
      amount: -23.15,
      type: 'purchase'
    },
    {
      id: '2',
      date: '2025-11-04',
      merchant: 'Kroger #2891',
      amount: -45.67,
      type: 'purchase'
    },
    {
      id: '3',
      date: '2025-11-03',
      merchant: 'Dollar General #8234',
      amount: -12.50,
      type: 'purchase'
    },
    {
      id: '4',
      date: '2025-11-02',
      merchant: 'Family Dollar #4512',
      amount: -18.92,
      type: 'purchase'
    },
    {
      id: '5',
      date: '2025-11-01',
      merchant: 'SNAP Benefits Deposit',
      amount: 234.00,
      type: 'deposit'
    }
  ],
  lastChecked: new Date().toISOString()
}

// Real Jackson, TN Food Pantries
export const jacksonFoodPantries: FoodPantry[] = [
  {
    id: '1',
    name: 'West Tennessee Food Bank',
    address: '562 Airways Blvd',
    city: 'Jackson',
    state: 'TN',
    zip: '38301',
    latitude: 35.6145,
    longitude: -88.8139,
    phone: '(731) 422-8789',
    hours: {
      monday: '8:00 AM - 4:00 PM',
      tuesday: '8:00 AM - 4:00 PM',
      wednesday: '8:00 AM - 4:00 PM',
      thursday: '8:00 AM - 4:00 PM',
      friday: '8:00 AM - 4:00 PM',
      saturday: 'Closed',
      sunday: 'Closed'
    },
    services: ['Food Pantry', 'Emergency Food', 'Food Bank Distribution'],
    requirements: ['Photo ID', 'Proof of Address', 'No appointment needed'],
    openNow: true,
    inventory: {
      produce: 'high',
      protein: 'medium',
      dairy: 'high',
      nonPerishables: 'high'
    },
    waitTime: 15,
    accessibility: {
      wheelchairAccessible: true,
      parking: true,
      publicTransit: true
    }
  },
  {
    id: '2',
    name: 'Salvation Army - Jackson',
    address: '224 E Chester St',
    city: 'Jackson',
    state: 'TN',
    zip: '38301',
    latitude: 35.6175,
    longitude: -88.8140,
    phone: '(731) 422-6419',
    hours: {
      monday: '9:00 AM - 12:00 PM',
      tuesday: '9:00 AM - 12:00 PM',
      wednesday: '9:00 AM - 12:00 PM',
      thursday: '9:00 AM - 12:00 PM',
      friday: '9:00 AM - 12:00 PM',
      saturday: 'Closed',
      sunday: 'Closed'
    },
    services: ['Food Pantry', 'Hot Meals', 'Clothing', 'Emergency Assistance'],
    requirements: ['Photo ID', 'Walk-in welcome'],
    openNow: true,
    inventory: {
      produce: 'medium',
      protein: 'low',
      dairy: 'medium',
      nonPerishables: 'high'
    },
    waitTime: 25,
    accessibility: {
      wheelchairAccessible: true,
      parking: true,
      publicTransit: true
    }
  },
  {
    id: '3',
    name: 'Jackson Dream Center',
    address: '261 Carriage House Dr',
    city: 'Jackson',
    state: 'TN',
    zip: '38305',
    latitude: 35.6389,
    longitude: -88.8647,
    phone: '(731) 300-3303',
    hours: {
      monday: '9:00 AM - 3:00 PM',
      tuesday: '9:00 AM - 3:00 PM',
      wednesday: '9:00 AM - 3:00 PM',
      thursday: '9:00 AM - 3:00 PM',
      friday: '9:00 AM - 3:00 PM',
      saturday: '10:00 AM - 1:00 PM',
      sunday: 'Closed'
    },
    services: ['Food Pantry', 'Clothing Closet', 'Job Training', 'Youth Programs'],
    requirements: ['No appointment needed', 'Serving Madison County residents'],
    openNow: true,
    inventory: {
      produce: 'high',
      protein: 'high',
      dairy: 'medium',
      nonPerishables: 'high'
    },
    waitTime: 10,
    accessibility: {
      wheelchairAccessible: true,
      parking: true,
      publicTransit: false
    }
  },
  {
    id: '4',
    name: 'St. Mary\'s Catholic Church Food Pantry',
    address: '529 N Highland Ave',
    city: 'Jackson',
    state: 'TN',
    zip: '38301',
    latitude: 35.6228,
    longitude: -88.8267,
    phone: '(731) 422-5541',
    hours: {
      monday: 'Closed',
      tuesday: '10:00 AM - 12:00 PM',
      wednesday: 'Closed',
      thursday: '10:00 AM - 12:00 PM',
      friday: 'Closed',
      saturday: 'Closed',
      sunday: 'Closed'
    },
    services: ['Food Pantry', 'Emergency Food Boxes'],
    requirements: ['Open to all', 'No documentation required'],
    openNow: false,
    inventory: {
      produce: 'low',
      protein: 'medium',
      dairy: 'low',
      nonPerishables: 'medium'
    },
    waitTime: 20,
    accessibility: {
      wheelchairAccessible: true,
      parking: true,
      publicTransit: true
    }
  },
  {
    id: '5',
    name: 'First United Methodist Church Food Pantry',
    address: '200 S Church St',
    city: 'Jackson',
    state: 'TN',
    zip: '38301',
    latitude: 35.6143,
    longitude: -88.8139,
    phone: '(731) 422-5382',
    hours: {
      monday: '9:00 AM - 11:00 AM',
      tuesday: 'Closed',
      wednesday: '9:00 AM - 11:00 AM',
      thursday: 'Closed',
      friday: '9:00 AM - 11:00 AM',
      saturday: 'Closed',
      sunday: 'Closed'
    },
    services: ['Food Pantry', 'Meal Programs'],
    requirements: ['Call ahead recommended', 'Serving Jackson residents'],
    openNow: true,
    inventory: {
      produce: 'medium',
      protein: 'medium',
      dairy: 'medium',
      nonPerishables: 'high'
    },
    waitTime: 15,
    accessibility: {
      wheelchairAccessible: true,
      parking: true,
      publicTransit: true
    }
  }
]

// Budget calculation helpers
export function calculateDailyBudget(balance: number, daysUntilRefill: number): number {
  return balance / daysUntilRefill
}

export function calculateRunOutDate(balance: number, avgDailySpending: number): Date {
  const daysRemaining = Math.floor(balance / avgDailySpending)
  const runOutDate = new Date()
  runOutDate.setDate(runOutDate.getDate() + daysRemaining)
  return runOutDate
}

export function getAvgDailySpending(transactions: Transaction[]): number {
  const purchases = transactions.filter(t => t.type === 'purchase')
  if (purchases.length === 0) return 0

  const totalSpent = purchases.reduce((sum, t) => sum + Math.abs(t.amount), 0)
  return totalSpent / purchases.length
}

// Shutdown risk data (mock)
export interface ShutdownRisk {
  percentage: number
  level: 'low' | 'medium' | 'high'
  lastUpdated: string
  factors: string[]
  preparationChecklist: {
    id: string
    task: string
    completed: boolean
  }[]
}

export const mockShutdownRisk: ShutdownRisk = {
  percentage: 15,
  level: 'low',
  lastUpdated: new Date().toISOString(),
  factors: [
    'Congressional budget deadline: 45 days away',
    'Recent bipartisan agreement on funding',
    'No major policy disputes reported'
  ],
  preparationChecklist: [
    {
      id: '1',
      task: 'Stock up on non-perishable food items',
      completed: false
    },
    {
      id: '2',
      task: 'Know locations of nearby food pantries',
      completed: true
    },
    {
      id: '3',
      task: 'Save emergency cash fund ($20-50)',
      completed: false
    },
    {
      id: '4',
      task: 'Sign up for ZENO alerts',
      completed: true
    }
  ]
}
