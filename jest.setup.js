// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock document.cookie
let cookieStore = {}

Object.defineProperty(document, 'cookie', {
  get: jest.fn(() => {
    return Object.entries(cookieStore)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ')
  }),
  set: jest.fn((cookieString) => {
    const [fullCookie] = cookieString.split(';')
    const [key, value] = fullCookie.split('=')
    
    if (value === '' || cookieString.includes('expires=Thu, 01 Jan 1970')) {
      delete cookieStore[key]
    } else {
      cookieStore[key] = value
    }
  }),
})

// Helper to clear cookies between tests
global.clearCookies = () => {
  cookieStore = {}
}

// Mock localStorage (still needed for other components)
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

global.localStorage = localStorageMock

// Mock window.scrollTo
global.scrollTo = jest.fn()
