import { render, screen } from '@testing-library/react'
import Projects from './page'

describe('Projects Page', () => {
  it('renders the projects page correctly', () => {
    render(<Projects />)

    // Check if main page heading is present (more specific than navigation link)
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
    expect(screen.getByText('Project Inquiries')).toBeInTheDocument()
  })

  it('displays project cards', () => {
    render(<Projects />)

    // Check for project information - use more specific selectors
    expect(screen.getAllByText('OpenClimate').length).toBeGreaterThan(0)
    expect(screen.getAllByText('RoutiQ').length).toBeGreaterThan(0)
    expect(screen.getAllByText('eNeza Marketplace').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Drone and UAVs').length).toBeGreaterThan(0)
  })

  it('displays project inquiry form', () => {
    render(<Projects />)

    // Check if inquiry form elements are present - use more specific selectors
    expect(screen.getByLabelText('Project *')).toBeInTheDocument()
    expect(screen.getByLabelText('Occupation *')).toBeInTheDocument()

    // Check for email field by input type and id - use getByRole instead
    const emailInputs = screen.getAllByRole('textbox')
    const emailInput = emailInputs.find(input => input.getAttribute('type') === 'email')
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute('id', 'email')

    // Check for project inquiry textarea by getting textarea elements
    const textareas = screen.getAllByRole('textbox')
    const inquiryTextarea = textareas.find(textarea => textarea.tagName === 'TEXTAREA')
    expect(inquiryTextarea).toBeInTheDocument()
    expect(inquiryTextarea).toHaveAttribute('id', 'inquiry')
  })
})
