# Secure Authentication System

A modern, secure authentication system built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **User Registration**: Complete sign-up flow with name, email, and password
- **Secure Login**: Email and password authentication
- **Password Validation**:
  - Minimum 6 characters
  - At least one uppercase letter
  - At least one special character
- **Email Validation**: Proper email format checking
- **Protected Routes**: Dashboard accessible only to authenticated users
- **User Dashboard**: Personalized welcome page with user information
- **Clean UI**: Modern, responsive design with Tailwind CSS
- **Form Validation**: Real-time validation with clear error messages
- **Secure by Design**: Built on Supabase with Row Level Security (RLS)

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/
│   └── ProtectedRoute.tsx      # Route protection component
├── contexts/
│   └── AuthContext.tsx         # Authentication state management
├── lib/
│   └── supabase.ts            # Supabase client configuration
├── pages/
│   ├── Home.tsx               # Landing page
│   ├── SignUp.tsx             # Registration page
│   ├── Login.tsx              # Login page
│   └── Dashboard.tsx          # Protected dashboard
├── utils/
│   └── validation.ts          # Form validation helpers
├── App.tsx                    # Main app with routing
└── main.tsx                   # Entry point
```

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Environment variables are already configured in `.env`:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Routes

- `/` - Landing page
- `/signup` - User registration
- `/login` - User login
- `/dashboard` - Protected user dashboard

## Database Schema

### profiles table
- `id` (uuid) - User ID, references auth.users
- `name` (text) - User's full name
- `email` (text) - User's email
- `created_at` (timestamptz) - Account creation timestamp
- `updated_at` (timestamptz) - Last update timestamp

### Security
- Row Level Security (RLS) enabled
- Users can only access their own profile data
- Secure authentication with Supabase Auth

## Validation Rules

### Password Requirements
- Minimum 6 characters
- At least one uppercase letter (A-Z)
- At least one special character (!@#$%^&*(),.?":{}|<>)

### Email Requirements
- Valid email format (example@domain.com)
- Required field

### Name Requirements
- Minimum 2 characters
- Required field

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions on deploying to:
- Vercel
- Netlify
- Render

## Security Features

- **Password Encryption**: Passwords are hashed and securely stored
- **Row Level Security**: Database-level access control
- **Protected Routes**: Client-side route protection
- **Secure Authentication**: Built on Supabase's secure authentication system
- **Session Management**: Automatic session handling and refresh

## Optional: n8n Integration

To integrate with n8n for welcome emails or Google Sheets logging:

1. Create an n8n workflow with a webhook trigger
2. Add the webhook URL to your sign-up function
3. Send user data to the webhook after successful registration

Example integration in `AuthContext.tsx`:

```typescript
// After successful signup
if (data.user) {
  // Create profile
  await supabase.from('profiles').insert([...]);

  // Optional: Trigger n8n webhook
  await fetch('YOUR_N8N_WEBHOOK_URL', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      email: email,
      timestamp: new Date().toISOString()
    })
  });
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please open an issue on GitHub.
