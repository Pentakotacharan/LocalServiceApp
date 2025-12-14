import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter, Slot } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, StatusBar } from "react-native";
// 1. Remove SafeAreaView import from react-native

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setIsAuthenticated(!!token);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setIsReady(true);
      }
    };

    initAuth();
  }, []);

  // 2. Redirect logic (Better than conditional rendering for Stacks)
  useEffect(() => {
    if (!isReady) return;

    if (isAuthenticated) {
      // If logged in, go to tabs (or your main flow)
      router.replace("/(tabs)"); 
    } else {
      // If NOT logged in, go to Auth
      router.replace("./(auth)");
    }
  }, [isReady, isAuthenticated]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2D5FDE" />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* 3. Keep the Stack clean. Do not wrap it in SafeAreaView */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(role)" />
        <Stack.Screen name="(client)" />
        <Stack.Screen name="(provider)" />
      </Stack>
    </>
  );
}