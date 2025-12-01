import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const SupabaseTest = () => {
  const [status, setStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const [message, setMessage] = useState('Testing Supabase connection...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test 1: Check if Supabase client is configured
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

        if (!supabaseUrl || !supabaseKey) {
          setStatus('error');
          setMessage('Supabase environment variables are missing!');
          return;
        }

        console.log('Supabase URL:', supabaseUrl);
        console.log('Supabase Key exists:', !!supabaseKey);

        // Test 2: Try to get session (should work even if no user is logged in)
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Session check error:', error);
          setStatus('error');
          setMessage(`Connection error: ${error.message}`);
          return;
        }

        console.log('Session check successful:', data);
        setStatus('success');
        setMessage('✅ Supabase connection is working! You can proceed with authentication.');

      } catch (err: any) {
        console.error('Test failed:', err);
        setStatus('error');
        setMessage(`Connection failed: ${err.message || 'Unknown error'}`);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-sm z-50"
      style={{
        backgroundColor: status === 'success' ? '#10b981' : status === 'error' ? '#ef4444' : '#f59e0b',
        color: 'white'
      }}
    >
      <div className="font-bold mb-1">Supabase Status</div>
      <div className="text-sm">{message}</div>
    </div>
  );
};

export default SupabaseTest;
