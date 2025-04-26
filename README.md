# Museal Padel

Museal Padel is a web application designed to streamline various operations related to padel, such as booking, event management, and user interactions. It leverages Supabase as its backend to handle authentication, database management, and real-time data, while using ShadCN for UI components.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Integrated with Supabase for easy authentication using email/password or third-party logins.
- **Real-time Data**: Updates users on padel court availability and bookings in real-time.
- **Booking Management**: Users can view available courts and book them directly.
- **Event Management**: Organize padel events and allow users to register.
- **User Profile**: Personal profiles where users can manage their bookings, events, and preferences.
- **Modern UI**: Uses ShadCN for modern, responsive UI components that enhance the user experience.

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
  - Real-time sync for bookings and events.

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
   cd museal-padel
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
