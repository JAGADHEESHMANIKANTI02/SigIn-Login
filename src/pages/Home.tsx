import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Shield, Zap, Lock } from 'lucide-react';
import { useEffect } from 'react';

export default function Home() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      window.location.href = '/dashboard';
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">SecureAuth</h1>
            <div className="flex space-x-4">
              <a
                href="/login"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Secure Authentication
            <br />
            <span className="text-blue-600">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience seamless and secure user authentication with our modern platform.
            Sign up in seconds and start your journey today.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/signup"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Create Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/login"
              className="inline-flex items-center bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 rounded-lg font-semibold border-2 border-gray-200 transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Secure by Design</h3>
            <p className="text-gray-600">
              Industry-standard security with encrypted passwords and secure authentication flows.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
              <Zap className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
            <p className="text-gray-600">
              Quick sign up and login process with instant access to your dashboard.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <Lock className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy First</h3>
            <p className="text-gray-600">
              Your data is protected with enterprise-grade security and privacy measures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
