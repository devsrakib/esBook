import { useFonts } from "expo-font";
import { Stack, useRouter, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { getOwnerProfile, migrateDbIfNeeded } from "@/databases/Database";
import { openDatabaseAsync, SQLiteProvider } from "expo-sqlite";
import { ActivityIndicator, View } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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
        const routeName = user_data ? "(tabs)" : "index";
        setInitialRouteName(routeName);
      } catch (error) {
        console.error("Error during initialization:", error);
      } finally {
        await SplashScreen.hideAsync();
        setIsLoading(false);
      }
    };

    initialize();
  }, [router]);

  useEffect(() => {
    if (!isLoading) {
      router.replace(initialRouteName);
    }
  }, [isLoading, router, initialRouteName]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Ensure a Slot or navigator is rendered
  return (
    <Stack initialRouteName="(tabs)">
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
