import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { User, Mail, Calendar, LogOut, ShoppingBag, Heart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user, signOut } = useAuth();

  const quickActions = [
    {
      icon: ShoppingBag,
      title: 'My Orders',
      description: 'View your catering orders',
      link: '/dashboard/orders',
      color: 'from-amber-500 to-yellow-500',
    },
    {
      icon: Calendar,
      title: 'Book Event',
      description: 'Plan your next event',
      link: '/contact',
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: Heart,
      title: 'Favorites',
      description: 'Your saved menu items',
      link: '/dashboard/favorites',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'Manage your account',
      link: '/dashboard/settings',
      color: 'from-purple-500 to-indigo-500',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Rebekha Caterers</title>
        <meta name="description" content="Manage your account and orders with Rebekha Caterers." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-white">
        <Navigation />

        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-900 via-amber-900 to-red-900 rounded-3xl p-8 md:p-12 mb-8 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5"></div>
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
                      <User className="h-8 w-8 text-amber-950" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-amber-100">Welcome back!</h1>
                      <p className="text-amber-300/80 mt-1">{user?.displayName || 'Guest'}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Mail className="h-4 w-4 text-amber-400" />
                        <p className="text-amber-300/70 text-sm">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={signOut}
                    variant="outline"
                    className="border-amber-300/30 text-amber-100 hover:bg-amber-100/10 hover:text-amber-200"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={index}
                      to={action.link}
                      className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                      <div className="relative z-10">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{action.title}</h3>
                        <p className="text-gray-600 text-sm">{action.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No recent orders</p>
                <Link to="/contact">
                  <Button className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-amber-950 font-bold">
                    Book Your First Event
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
