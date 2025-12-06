# Deployment Guide

This guide will help you deploy your authentication system to Vercel, Netlify, or Render.

## Prerequisites

Before deploying, ensure you have:
- A GitHub account
- Your code pushed to a GitHub repository
- Your Supabase project URL and API key (already configured in .env)

## Option 1: Deploy to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure your project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add Environment Variables:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key
7. Click "Deploy"

Your site will be live at: `https://your-project-name.vercel.app`

## Option 2: Deploy to Netlify

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up or log in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub and select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add Environment Variables:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key
7. Add a `netlify.toml` file in your project root:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```
8. Click "Deploy site"

Your site will be live at: `https://your-site-name.netlify.app`

## Option 3: Deploy to Render

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy to Render
1. Go to [render.com](https://render.com)
2. Sign up or log in with GitHub
3. Click "New +" → "Static Site"
4. Connect your GitHub repository
5. Configure your service:
   - Name: your-app-name
   - Build Command: `npm run build`
   - Publish Directory: `dist`
6. Add Environment Variables:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key
7. Click "Create Static Site"

Your site will be live at: `https://your-app-name.onrender.com`

## Important Notes

### Environment Variables
Make sure to add these environment variables in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Routing Configuration
For single-page applications, you need to configure redirects so all routes point to index.html:

**Vercel**: Create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

**Netlify**: Create `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Render**: Render handles this automatically for static sites.

## Testing Your Deployment

After deployment:
1. Visit your live URL
2. Test the sign-up flow with a new email
3. Test the login flow
4. Verify the dashboard displays correctly
5. Test sign out functionality

## Troubleshooting

### Build Fails
- Check that all dependencies are in package.json
- Verify build command is correct: `npm run build`
- Check that Node version is compatible (16+)

### Environment Variables Not Working
- Ensure variable names start with `VITE_`
- Redeploy after adding environment variables
- Check that variables are set in the deployment platform

### Authentication Not Working
- Verify Supabase URL and API key are correct
- Check browser console for errors
- Ensure Supabase project is active

### 404 Errors on Routes
- Add redirect configuration file (see above)
- Redeploy after adding the file

## Need Help?

If you encounter issues:
1. Check the deployment platform's logs
2. Verify all environment variables are set
3. Test locally first with `npm run dev`
4. Check browser console for errors
