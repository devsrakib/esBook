import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { getOwnerProfile, migrateDbIfNeeded } from "@/databases/Database";
import { openDatabaseAsync, SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [profile, setProfile] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState<string>("");

  useEffect(() => {
    const initialize = async () => {
      const db = await openDatabaseAsync("database.db");
      console.log(db, "::::::: db ::::::");

      await migrateDbIfNeeded(db);

      try {
        const result = await getOwnerProfile(db);
        const profile = result?.length > 0 ? result[0] : null;
        console.log(profile, ":::::::");
        setProfile(profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }

      // Hide the splash screen
      await SplashScreen.hideAsync();
      setIsLoading(false);
    };

    initialize();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const routeName = profile ? "(tabs)" : "index"; // Adjust this as per your actual routes
      setInitialRouteName(routeName);
    }
  }, [isLoading, profile, initialRouteName]);

  if (isLoading || initialRouteName === "") {
    return null; // Or a loading indicator
  }

  console.log(profile, initialRouteName);

  return (
    <SQLiteProvider databaseName="database.db" onInit={migrateDbIfNeeded}>
      <Stack initialRouteName={initialRouteName}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SQLiteProvider>
  );
}
