import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import { useColorScheme } from '@/hooks/useColorScheme';
import { tokenCache } from './cache';
import { useAuthStore } from '@/store/useAuthStore'; 

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) throw new Error('Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env');

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <AuthenticatedApp colorScheme={colorScheme} />
      </ClerkLoaded>
    </ClerkProvider>
  );
}


function AuthenticatedApp({ colorScheme }) {
  const { isSignedIn, isLoaded } = useAuth();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      setAuthenticated(isSignedIn);
      
      if (!isSignedIn) {
        router.replace('/(auth)/sign-in');
      }
    }
  }, [isSignedIn, isLoaded]);

  if (!isLoaded) return null; 

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />

      {isSignedIn ? (
     
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      ) : (
      
        <Stack screenOptions={{ headerShown: false }}>
      
       <Stack.Screen name="(auth)" />
       {/* <Stack.Screen name="(auth)/sign-up" /> */}

          
        </Stack>
      )}
    </ThemeProvider>
  );
}
