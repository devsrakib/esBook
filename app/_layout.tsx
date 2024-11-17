import { Href, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { getOwnerProfile, migrateDbIfNeeded } from "@/databases/Database";
import { openDatabaseAsync, SQLiteProvider } from "expo-sqlite";
import { ActivityIndicator, View } from "react-native";
import axios from "axios";
import { apiUrl } from "@/hooks/all_api_hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      try {
        // Check for access token in AsyncStorage
        const accessToken = await AsyncStorage.getItem("access_token");

        const db = await openDatabaseAsync("database.db");
        await migrateDbIfNeeded(db);

        // Determine the initial route based on access token availability
        if (accessToken) {
          // Token exists, navigate to tabs
          setInitialRouteName("/(tabs)");
        } else {
          // No token, navigate to login (index)
          setInitialRouteName("/pages/login/Login");
        }

        // Hide splash screen after initialization
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error("Initialization error:", error);
        // Fallback route if there's an error
        setInitialRouteName("/index");
        await SplashScreen.hideAsync();
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    if (!isLoading && initialRouteName) {
      router.replace(initialRouteName);
    }
  }, [isLoading, initialRouteName, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Render the navigation stack once the initial route is determined
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="database.db" onInit={migrateDbIfNeeded}>
      <InitialLayout />
    </SQLiteProvider>
  );
}
