# Ecommerce

This is a simple eCommerce web app demo that allows users to add products to their cart. The app uses **Supabase** for user authentication and basic cart management. When a user adds a product to the cart, they are redirected to a login page (for demo purposes). The app also uses **ShadCN** for modern UI components.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)


## Tech Stack

- **Frontend**:

  - [Next.js](https://nextjs.org/) for server-side rendering and static site generation.
  - [React](https://reactjs.org/) for the UI components.
  - [Tailwind CSS](https://tailwindcss.com/) for styling.
  - [Supabase](https://supabase.com/) for real-time databases, authentication, and backend services.
  - [ShadCN](https://shadcn.dev/) for pre-designed UI components and system-driven design.

- **Backend**:

  - Supabase (for Postgres Database, Authentication, Realtime subscriptions).
  - Serverless functions in Vercel.

- **Database**:
  - Postgres (Supabase-managed database).


## Getting Started

### Prerequisites

To get started with the development environment, you’ll need the following tools installed:

- Node.js (version 16 or higher)
- npm or yarn
- Supabase account for backend management

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/stastix/Ecommerce
   cd Ecommerce
   ```

2. Install dependecies:
   ```bash
   npm install
   ```
3. Set up Environment variables  
   Create a .env.local file and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. npm run dev
5. Open http://localhost:3000 in your browser.
