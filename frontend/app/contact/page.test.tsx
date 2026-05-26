import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import Contact from './page'

// Mock fetch globally with proper typing
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>
global.fetch = mockFetch

describe('Contact Form', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
    // Mock successful fetch response
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response)
  })

  it('renders the contact form correctly', () => {
    render(<Contact />)

    // Check if main elements are present
    expect(screen.getByText('Send a Message')).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    const submitButton = screen.getByRole('button', { name: /send message/i })

    // Try to submit without filling required fields
    await user.click(submitButton)

    // Check if form prevents submission (HTML5 validation)
    // The form should not submit if required fields are empty
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('validates email format', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /send message/i })

    // Enter invalid email
    await user.type(emailInput, 'invalid-email')
    await user.click(submitButton)

    // Form should not submit with invalid email
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('validates message length', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    const messageInput = screen.getByLabelText(/message/i)
    const submitButton = screen.getByRole('button', { name: /send message/i })

    // Enter short message
    await user.type(messageInput, 'Short message')
    await user.click(submitButton)

    // Form should not submit with short message
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('accepts valid form submission', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    // Fill in valid data
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'This is a valid message with more than ten words to test the form validation properly.')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    // Should call fetch with form data
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/contact'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('John Doe'),
        })
      )
    })
  })

  it('handles form submission failure', async () => {
    // Mock failed fetch response
    mockFetch.mockResolvedValue({
      ok: false,
    } as Response)

    const user = userEvent.setup()
    render(<Contact />)

    // Fill in valid data
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'This is a valid message with more than ten words to test the form validation properly.')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    // Should handle error response
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled()
    })
  })
})
