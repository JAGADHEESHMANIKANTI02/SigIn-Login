import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Mail, Calendar } from 'lucide-react';

export default function Dashboard() {
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">My Dashboard</h1>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome, {profile?.name || 'User'}!
            </h2>
            <p className="text-gray-600">You're successfully logged in</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <User className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Full Name</h3>
              </div>
              <p className="text-gray-700 text-lg">{profile?.name}</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Mail className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">Email Address</h3>
              </div>
              <p className="text-gray-700 text-lg">{profile?.email || user?.email}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Calendar className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Member Since</h3>
              </div>
              <p className="text-gray-700 text-lg">
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Recently joined'}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <User className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Account Status</h3>
              </div>
              <p className="text-gray-700 text-lg">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-600 text-white">
                  Active
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
              <h4 className="font-semibold text-gray-900 mb-1">Update Profile</h4>
              <p className="text-sm text-gray-600">Edit your account information</p>
            </button>
            <button className="p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors text-left">
              <h4 className="font-semibold text-gray-900 mb-1">Security Settings</h4>
              <p className="text-sm text-gray-600">Manage your password and security</p>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
              <h4 className="font-semibold text-gray-900 mb-1">Help Center</h4>
              <p className="text-sm text-gray-600">Get support and documentation</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
