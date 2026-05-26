import { render, screen } from '@testing-library/react'
import Gallery from './page'

describe('Gallery Page', () => {
  it('renders the gallery page correctly', () => {
    render(<Gallery />)

    // Check if main page heading is present (more specific than navigation link)
    expect(screen.getByRole('heading', { name: 'Project Gallery' })).toBeInTheDocument()
  })

  it('displays gallery content', () => {
    render(<Gallery />)

    // Check for gallery description
    expect(screen.getByText(/Visual journey through my projects/i)).toBeInTheDocument()
    expect(screen.getByText(/From AI dashboards to drone hardware/i)).toBeInTheDocument()
  })

  it('displays gallery items', () => {
    render(<Gallery />)

    // Check for specific gallery items
    expect(screen.getAllByText('OpenClimate Dashboard').length).toBeGreaterThan(0)
    expect(screen.getAllByText('RoutiQ App Interface').length).toBeGreaterThan(0)
    expect(screen.getAllByText('eNeza MarketPlace Demo').length).toBeGreaterThan(0)
  })
})
