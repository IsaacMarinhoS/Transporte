import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type AuthContextValue = {
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let initialized = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;
      setSession(nextSession);
      if (initialized) setLoading(false);
    });

    const initializeSession = async () => {
      try {
        const rememberMe = await AsyncStorage.getItem('transporte.auth.remember-me');
        if (rememberMe === 'false') await supabase.auth.signOut();
        const { data, error } = await supabase.auth.getSession();
        if (error) console.warn('Não foi possível recuperar a sessão:', error.message);
        if (mounted) setSession(data.session);
      } catch (error) {
        console.warn('Não foi possível recuperar a sessão:', error);
        if (mounted) setSession(null);
      } finally {
        initialized = true;
        if (mounted) setLoading(false);
      }
    };

    void initializeSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ session, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth precisa estar dentro de AuthProvider.');
  return value;
}
