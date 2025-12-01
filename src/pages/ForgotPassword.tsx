import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, ChefHat, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Helmet } from 'react-helmet-async';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await resetPassword(email);

    if (!error) {
      setSent(true);
    }

    setLoading(false);
  };

  if (sent) {
    return (
      <>
        <Helmet>
          <title>Check Your Email - Rebekha Caterers</title>
        </Helmet>

        <div className="min-h-screen bg-gradient-to-br from-red-950 via-amber-950 to-red-950 flex items-center justify-center p-4 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="w-full max-w-md relative z-10">
            <div className="bg-gradient-to-b from-amber-950/80 to-red-950/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-500/20 overflow-hidden p-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-4">
                  <CheckCircle className="h-10 w-10 text-green-400" />
                </div>
                <h1 className="text-2xl font-bold text-amber-100">Check Your Email</h1>
                <p className="text-amber-300/80">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-amber-300/60 text-sm">
                  Click the link in the email to reset your password. If you don't see it, check your spam folder.
                </p>
                <div className="pt-4">
                  <Link to="/login">
                    <Button className="w-full h-12 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-amber-950 font-bold rounded-xl">
                      Back to Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Forgot Password - Rebekha Caterers</title>
        <meta name="description" content="Reset your Rebekha Caterers account password." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-red-950 via-amber-950 to-red-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Back to Login */}
        <Link 
          to="/login" 
          className="absolute top-6 left-6 flex items-center gap-2 text-amber-100 hover:text-amber-300 transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Login</span>
        </Link>

        <div className="w-full max-w-md relative z-10">
          {/* Card */}
          <div className="bg-gradient-to-b from-amber-950/80 to-red-950/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-500/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-900/50 to-amber-900/50 p-8 text-center border-b border-amber-500/20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 mb-4 shadow-lg shadow-amber-500/50">
                <ChefHat className="h-10 w-10 text-amber-950" />
              </div>
              <h1 className="text-3xl font-bold text-amber-100 mb-2">Forgot Password?</h1>
              <p className="text-amber-300/80">No worries, we'll send you reset instructions</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
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
                <p className="text-amber-300/60 text-sm">
                  Enter the email address associated with your account
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-amber-950 font-bold text-lg rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-amber-950/30 border-t-amber-950"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
