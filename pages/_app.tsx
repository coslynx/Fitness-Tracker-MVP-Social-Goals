import { SessionProvider } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { api } from '../utils/api';
import Layout from '../components/Layout';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@supabase/auth-helpers-react';
import { supabaseUrl, supabaseKey } from '../utils/supabase';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: React.ComponentType;
  pageProps: { session: any; [key: string]: any };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = useSupabaseClient();
  const user = useUser();
  const { setUser, user: storeUser, setGoals, goals } = useStore();

  const fetchGoals = async () => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', storeUser?.id);

      if (error) {
        console.error('Error fetching goals:', error);
      } else {
        setGoals(data);
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  useEffect(() => {
    setUser(user);
    if (user?.id) {
      fetchGoals();
    }
  }, [user]);

  return (
    <SessionProvider session={session}>
      <Layout goals={goals}>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}