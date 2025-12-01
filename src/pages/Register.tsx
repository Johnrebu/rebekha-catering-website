import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, ChefHat, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Helmet } from 'react-helmet-async';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return;
    }

    if (password.length < 6) {
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password, fullName);

    if (!error) {
      navigate('/login');
    }

    setLoading(false);
  };

  const passwordsMatch = password === confirmPassword || confirmPassword === '';
  const passwordStrong = password.length >= 6 || password === '';

  return (
    <>
      <Helmet>
        <title>Sign Up - Rebekha Caterers</title>
        <meta name="description" content="Create your account to unlock exclusive catering services and personalized menu options." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-red-950 via-amber-950 to-red-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Back to Home */}
        <Link 
          to="/" 
          className="absolute top-6 left-6 flex items-center gap-2 text-amber-100 hover:text-amber-300 transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        <div className="w-full max-w-md relative z-10">
          {/* Card */}
          <div className="bg-gradient-to-b from-amber-950/80 to-red-950/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-500/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-900/50 to-amber-900/50 p-8 text-center border-b border-amber-500/20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 mb-4 shadow-lg shadow-amber-500/50">
                <ChefHat className="h-10 w-10 text-amber-950" />
              </div>
              <h1 className="text-3xl font-bold text-amber-100 mb-2">Join Us Today!</h1>
              <p className="text-amber-300/80">Create your account to get started</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Full Name Field */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-amber-100 font-medium">
                  Full Name
                </Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-400/60 group-focus-within:text-amber-400 transition-colors" />
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="pl-12 h-12 bg-amber-950/30 border-amber-500/30 text-amber-100 placeholder:text-amber-300/40 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl transition-all"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-amber-100 font-medium">
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-400/60 group-focus-within:text-amber-400 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="pl-12 h-12 bg-amber-950/30 border-amber-500/30 text-amber-100 placeholder:text-amber-300/40 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-amber-100 font-medium">
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-400/60 group-focus-within:text-amber-400 transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className={`pl-12 pr-12 h-12 bg-amber-950/30 border-amber-500/30 text-amber-100 placeholder:text-amber-300/40 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl transition-all ${
                      !passwordStrong && password ? 'border-red-500/50' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400/60 hover:text-amber-400 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {!passwordStrong && password && (
                  <p className="text-red-400 text-sm">Password must be at least 6 characters</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-amber-100 font-medium">
                  Confirm Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-400/60 group-focus-within:text-amber-400 transition-colors" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className={`pl-12 pr-12 h-12 bg-amber-950/30 border-amber-500/30 text-amber-100 placeholder:text-amber-300/40 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl transition-all ${
                      !passwordsMatch ? 'border-red-500/50' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400/60 hover:text-amber-400 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {!passwordsMatch && (
                  <p className="text-red-400 text-sm">Passwords do not match</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || !passwordsMatch || !passwordStrong}
                className="w-full h-12 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-amber-950 font-bold text-lg rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-amber-950/30 border-t-amber-950"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-amber-500/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gradient-to-b from-amber-950/80 to-red-950/80 text-amber-300/60">
                    Already have an account?
                  </span>
                </div>
              </div>

              {/* Sign In Link */}
              <div className="text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 font-medium transition-colors group"
                >
                  Sign in instead
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </form>
          </div>

          {/* Footer Note */}
          <p className="text-center text-amber-300/60 text-sm mt-6">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
