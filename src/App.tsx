import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const path = window.location.pathname;

  const renderPage = () => {
    switch (path) {
      case '/':
        return <Home />;
      case '/signup':
        return <SignUp />;
      case '/login':
        return <Login />;
      case '/dashboard':
        return (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        );
      default:
        return <Home />;
    }
  };

  return <AuthProvider>{renderPage()}</AuthProvider>;
}

export default App;
