import { useEffect } from 'react';
import { Stack, router, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { ThemeProvider, useAppTheme } from '@/contexts/ThemeContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ThemedNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}

function ThemedNavigator() {
  const { colors, isDark } = useAppTheme();
  const { session, loading } = useAuth();
  const segments = useSegments();
  const isLoginScreen = segments[0] === 'login';

  useEffect(() => {
    if (loading) return;
    if (!session && !isLoginScreen) router.replace('/login');
    if (session && isLoginScreen) router.replace('/home');
  }, [isLoginScreen, loading, session]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />
      {loading && (
        <View style={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
          <ActivityIndicator color={colors.accent} />
        </View>
      )}
    </View>
  );
}
