# Personal Portfolio Website for Mugabo

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat&logo=next.js)](https://nextjs.org/)[![FastAPI](https://img.shields.io/badge/FastAPI-0.118-green?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-blue?style=flat&logo=tailwind-css)](https://tailwindcss.com/)[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, responsive personal portfolio website showcasing expertise in AI, IoT/CPS, cybersecurity, SpaceTech, and business. Designed for professionals, collaborators, and recruiters to highlight hands-on innovation and real-world impact.

## Features

- **Home**: Hero section with tagline, featured projects, and call-to-action.
- **About**: Detailed bio, expertise, educational background, and personality.
- **Projects**: Showcase of key works (OpenClimate, RoutiQ, eNeza Marketplace, Drone UAVs) with slogans, tech stacks, and outcomes.
- **Skills**: Interactive visualization of proficiencies in AI, IoT, cybersecurity, etc.
- **Gallery**: Visuals from projects, prototypes, and milestones.
- **Contact**: Integrated form for collaborations and inquiries.
- **Responsive Design**: Mobile-first with dark/light mode toggle.
- **Performance**: SEO-optimized, fast-loading, and accessible.

## Tech Stack

### Frontend

- **Next.js 15**: React-based framework for server-side rendering and static generation.
- **TypeScript**: Type-safe JavaScript for better development experience.
- **Tailwind CSS**: Utility-first CSS framework for rapid styling.
- **React Icons**: Icon library for UI elements.

### Backend

- **FastAPI**: Modern, fast web framework for building APIs.
- **Python 3.9+**: Core programming language.
- **Uvicorn**: ASGI server for running the API.
- **PostgreSQL** (optional): Database for dynamic data storage.

### Tools & Hosting

- **Git**: Version control.
- **ESLint/Prettier**: Code linting and formatting.
- **Vercel**: Hosting for frontend (free tier available).
- **Heroku/Railway**: Hosting for backend API.

## Project Structure

```bash
Portfolio-Website/
├── .git/                 # Git repository
├── .gitignore           # Git ignore file (add if needed)
├── README.md            # This file
├── backend/             # FastAPI application
│   ├── main.py          # Core API routes
│   ├── requirements.txt # Python dependencies
│   └── venv/            # Virtual environment (not in repo)
├── docs/                # Documentation
│   └── README.md        # Basic setup guide
└── frontend/            # Next.js application (to be set up)
    ├── app/             # Next.js App Router pages (home, about, projects, skills, gallery, contact)
    ├── components/      # Reusable UI components
    ├── public/          # Static assets
    └── package.json     # Node dependencies
```

## System Architecture

### High-Level Architecture Overview

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser] --> B[Next.js Frontend]
        B --> C[React Components]
        B --> D[Tailwind CSS]
    end
    
    subgraph "API Layer"
        E[FastAPI Backend]
        F[CORS Middleware]
        G[API Routes]
        E --> F
        E --> G
    end
    
    subgraph "Data Layer"
        H[PostgreSQL Database]
        I[Connection Pool]
        E --> I
        I --> H
    end
    
    subgraph "External Services"
        J[Email Service]
        K[Analytics]
    end
    
    B -->|HTTP/HTTPS| E
    G -->|SQL Queries| H
    E -->|Notifications| J
    B -->|Tracking| K
    
    %% Beautiful color scheme
    style A fill:#4FC3F7,stroke:#0288D1,color:#000
    style B fill:#81C784,stroke:#388E3C,color:#000
    style C fill:#FFB74D,stroke:#F57C00,color:#000
    style D fill:#9575CD,stroke:#5E35B1,color:#000
    style E fill:#4DB6AC,stroke:#00796B,color:#000
    style F fill:#FF8A65,stroke:#D84315,color:#000
    style G fill:#A1887F,stroke:#5D4037,color:#000
    style H fill:#F06292,stroke:#C2185B,color:#000
    style I fill:#BA68C8,stroke:#7B1FA2,color:#000
    style J fill:#64B5F6,stroke:#1976D2,color:#000
    style K fill:#4DD0E1,stroke:#0097A7,color:#000
```

### API Flow Architecture

```mermaid
sequenceDiagram
    participant C as Client
    participant F as Frontend
    participant A as Backend
    participant D as Database
    
    rect rgb(0, 0, 0)
        Note over C,D: Contact Form Submission Flow
        C->>+F: Fills contact form
        F->>F: Client-side validation
        F->>+A: POST /api/contact (JSON data)
        A->>A: Server-side validation
        A->>+D: INSERT INTO contact_messages
        D-->>-A: Return message_id
        A-->>-F: Success response
        F-->>-C: Show success message
    end
    
    rect rgba(0, 0, 0, 0)
        Note over C,D: Newsletter Subscription Flow
        C->>+F: Subscribe to newsletter
        F->>+A: POST /api/newsletter
        A->>+D: INSERT INTO newsletter_subscribers
        D-->>-A: Confirmation
        A-->>-F: Success response
        F-->>-C: Show confirmation
    end
```

### Database Schema Architecture

```mermaid
erDiagram
    contact_messages {
        int id PK
        varchar name
        varchar email
        text message
        varchar phone
        varchar occupation
        timestamp created_at
    }
    
    newsletter_subscribers {
        int id PK
        varchar name
        varchar email UK
        timestamp subscribed_at
    }
    
    project_inquiries {
        int id PK
        varchar project_name
        varchar name
        varchar email
        text inquiry
        varchar phone
        varchar occupation
        timestamp created_at
    }
    
    feedback {
        int id PK
        varchar type
        text content
        int rating
        timestamp created_at
    }
    
    users {
        int id PK
        varchar username UK
        varchar email UK
        varchar password_hash
        timestamp created_at
    }
    
    blogs {
        int id PK
        varchar title
        text content
        int author_id FK
        timestamp created_at
        timestamp updated_at
    }
    
    users ||--o{ blogs : "creates"
```

### Deployment Architecture

```mermaid
graph TB
    subgraph "Development Environment"
        A1[Local Machine]
        B1[Next.js :3000]
        C1[FastAPI :8000]
        D1[PostgreSQL :5432]
        A1 --> B1
        A1 --> C1
        C1 --> D1
    end
    
    subgraph "Production Environment"
        A2[Users]
        B2[Vercel - Frontend]
        C2[Railway - Backend]
        D2[PostgreSQL Cloud]
        E2[Domain Name]
        F2[SSL Certificate]
        
        A2 -->|HTTPS| E2
        E2 --> B2
        B2 -->|API Calls| C2
        C2 -->|Database| D2
        E2 --> F2
    end
    
    subgraph "CI/CD Pipeline"
        G1[GitHub Repository]
        G2[Automated Tests]
        G3[Build Process]
        G4[Deployment]
        
        G1 --> G2
        G2 --> G3
        G3 --> G4
        G4 --> B2
        G4 --> C2
    end
    
    %% Beautiful color scheme
    style A1 fill:#E1F5FE,stroke:#0288D1,color:#000
    style B1 fill:#E8F5E8,stroke:#388E3C,color:#000
    style C1 fill:#FFF3E0,stroke:#F57C00,color:#000
    style D1 fill:#F3E5F5,stroke:#7B1FA2,color:#000
    style A2 fill:#FFEBEE,stroke:#D32F2F,color:#000
    style B2 fill:#E8F5E8,stroke:#388E3C,color:#000
    style C2 fill:#FFF3E0,stroke:#F57C00,color:#000
    style D2 fill:#F3E5F5,stroke:#7B1FA2,color:#000
    style E2 fill:#E1F5FE,stroke:#0288D1,color:#000
    style F2 fill:#FFEBEE,stroke:#D32F2F,color:#000
    style G1 fill:#F3E5F5,stroke:#7B1FA2,color:#000
    style G2 fill:#FFF3E0,stroke:#F57C00,color:#000
    style G3 fill:#E8F5E8,stroke:#388E3C,color:#000
    style G4 fill:#E1F5FE,stroke:#0288D1,color:#000
```

### Technology Stack Overview

```mermaid
mindmap
  root((Portfolio Website))
    Frontend
      Next.js 16
      React 19
      TypeScript
      Tailwind CSS
      Framer Motion
      React Icons
    Backend
      FastAPI
      Python 3.9+
      Uvicorn
      Pydantic
      AsyncPG
    Database
      PostgreSQL
      Connection Pooling
      Indexing
    DevOps
      Git
      Vercel
      Railway
      GitHub Actions
      Environment Variables
```

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher) for frontend.
- **Python** (v3.9 or higher) for backend.
- **PostgreSQL** (optional) for database features.
- **Git** for cloning the repository.

### Installation & Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/merma1509/Portfolio-Website.git
   cd Portfolio-Website
   ```

2.**Backend Setup** (for contact form and dynamic features):

   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload  # Runs on http://localhost:8000
   ```

3.**Frontend Setup** (main website):

   ```bash
   cd frontend
   npx create-next-app@latest . --typescript --tailwind --eslint --app --yes
   npm install
   npm run dev  # Runs on http://localhost:3000
   ```

4.**Environment Variables** (create `.env` in backend/):

   ```bash
   DATABASE_URL=postgresql://username:password@localhost/portfolio_db
   SECRET_KEY=your-secret-key-here
   ```

5.**Build for Production**:

- Frontend: `npm run build && npm start`
- Backend: Deploy to hosting service.

## Development

- **Adding Pages**: Edit files in `frontend/app/` for routing.
- **Styling**: Use Tailwind classes in components.
- **API Endpoints**: Extend `backend/main.py` for new features.
- **Testing**: Use `npm test` for frontend; run API manually for backend.

## Deployment

- **Frontend**: Push to Vercel – auto-deploys from GitHub.
- **Backend**: Deploy to Heroku, Railway, or similar; set environment variables.
- **Custom Domain**: Configure in hosting dashboard.

## Contributing

1. Fork the repo.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit changes: `git commit -m 'Add amazing feature'`.
4. Push branch: `git push origin feature/amazing-feature`.
5. Open a Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

- 📧 [aimemartin018@gmail.com](mailto:aimemartin018@gmail.com)
- 💼 [nshuti-martin15](https://linkedin.com/in/nshuti-martin15)
- 🐙 [merma1509](https://github.com/merma1509)

---

Built for innovation and impact with ❤️ by Mugabo. Let's connect!
