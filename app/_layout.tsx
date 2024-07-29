import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { getOwnerProfile, migrateDbIfNeeded } from "@/databases/Database";
import { openDatabaseAsync, SQLiteProvider } from "expo-sqlite";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState<string | any>("");
  const router = useRouter();
  useEffect(() => {
    const initialize = async () => {
      try {
        const db = await openDatabaseAsync("database.db");
        await migrateDbIfNeeded(db);

        const result = await getOwnerProfile(db);
        const user_data = result?.length > 0 ? result[0] : null;
        const routeName = user_data && "(tabs)";
        console.log(user_data);
        setInitialRouteName(routeName);
      } catch (error) {
        console.error("Error during initialization:", error);
      } finally {
        await SplashScreen.hideAsync();
        setIsLoading(false);
      }
    };

    initialize();
  }, [initialRouteName, router]);

  useEffect(() => {
    if (!isLoading && initialRouteName !== "") {
      router.replace(initialRouteName);
    }
  }, [isLoading, initialRouteName]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  console.log(initialRouteName);

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
