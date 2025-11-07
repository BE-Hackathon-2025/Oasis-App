// API utility functions for AI/ML integrations

export interface APIError {
  message: string
  status?: number
}

export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = 30000
): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    clearTimeout(id)
    return response
  } catch (error) {
    clearTimeout(id)
    throw error
  }
}

export async function handleAPIResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: APIError = {
      message: `API Error: ${response.statusText}`,
      status: response.status
    }
    try {
      const errorData = await response.json()
      error.message = errorData.message || error.message
    } catch {
      // Use default error message
    }
    throw error
  }

  return response.json()
}

// Example: OpenAI API call (you can adapt this for any AI service)
export async function callOpenAI(
  apiKey: string,
  prompt: string,
  model: string = 'gpt-4'
): Promise<string> {
  const response = await fetchWithTimeout('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }]
    })
  })

  const data = await handleAPIResponse<any>(response)
  return data.choices[0].message.content
}

// Example: Claude API call
export async function callClaude(
  apiKey: string,
  prompt: string,
  model: string = 'claude-3-5-sonnet-20241022'
): Promise<string> {
  const response = await fetchWithTimeout('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    })
  })

  const data = await handleAPIResponse<any>(response)
  return data.content[0].text
}
