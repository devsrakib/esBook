import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { getOwnerProfile, migrateDbIfNeeded } from "@/databases/Database";
import { openDatabaseAsync, SQLiteProvider } from "expo-sqlite";
import { ActivityIndicator, View } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      try {
        const db = await openDatabaseAsync("database.db");
        await migrateDbIfNeeded(db);

        const result = await getOwnerProfile(db);
        const user_data = result?.length > 0;

        const routeName = user_data ? "(tabs)" : "/index";

        setInitialRouteName(routeName);
      } catch (error) {
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
