import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { TimerProvider } from "../context/TimerContext";
import "../global.css";
import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider as NavThemeProvider } from "@react-navigation/native";
import { NAV_THEME } from "@/theme";
import { useColorScheme } from "@/lib/useColorScheme";
import { configureGoogleSignIn } from "@/lib/google-auth";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

configureGoogleSignIn();

function InitialLayout() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)");
    } else if (user && inAuthGroup) {
      router.replace("/(app)/start");
    }
  }, [user, loading, segments, router]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)/index" />
            <Stack.Screen name="(app)/start" />
            <Stack.Screen name="(app)/(tabs)" />
          </Stack>
  )

}

export default function RootLayout() {
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? "light" : "dark"}`}
        style={isDarkColorScheme ? "light" : "dark"}
      />

      <NavThemeProvider value={NAV_THEME[colorScheme]}>
        <AuthProvider>
          <TimerProvider>
            <InitialLayout />
          </TimerProvider>
        </AuthProvider>
      </NavThemeProvider>
    </>
  );
}
