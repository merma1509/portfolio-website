import { render, screen } from '@testing-library/react'
import About from './page'

describe('About Page', () => {
  it('renders the about page correctly', () => {
    render(<About />)

    // Check if main sections are present
    expect(screen.getByText('About Mugabo')).toBeInTheDocument()
    expect(screen.getByText('Who I Am')).toBeInTheDocument()
    expect(screen.getByText('Key Expertise')).toBeInTheDocument()
    expect(screen.getByText('Educational Journey')).toBeInTheDocument()
  })

  it('displays personal information', () => {
    render(<About />)

    // Check for key personal info sections
    expect(screen.getByText('Who I Am')).toBeInTheDocument()
    expect(screen.getByText('Key Expertise')).toBeInTheDocument()
  })

  it('displays education section', () => {
    render(<About />)

    // Check for education content
    expect(screen.getByText('Educational Journey')).toBeInTheDocument()
    // Check for institution names that should be visible
    expect(screen.getByText(/University of Rwanda/i)).toBeInTheDocument()
    expect(screen.getByText(/RUDN University/i)).toBeInTheDocument()
  })
})
