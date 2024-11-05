import { Href, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { getOwnerProfile, migrateDbIfNeeded } from "@/databases/Database";
import { openDatabaseAsync, SQLiteProvider } from "expo-sqlite";
import { ActivityIndicator, View } from "react-native";
import axios from "axios";
import { apiUrl } from "@/hooks/all_api_hooks";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await axios.get(apiUrl + "owners");
        const db = await openDatabaseAsync("database.db");
        await migrateDbIfNeeded(db);

        // const result = await getOwnerProfile(db);
        // const user_data = result?.length > 0;

        const user_data = response?.data?.results?.length > 0;
        // Determine the initial route based on profile data
        const routeName = user_data ? "/(tabs)" : "/";
        setInitialRouteName(routeName);

        // Hide splash screen after initialization
        await SplashScreen.hideAsync();
      } catch (error) {
        // Fallback route to "index" if there's an error
        setInitialRouteName("/(tabs)");
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [initialRouteName]);

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
    <Stack initialRouteName={initialRouteName}>
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
