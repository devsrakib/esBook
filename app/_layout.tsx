import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { getOwnerProfile, migrateDbIfNeeded } from "@/databases/Database";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [profile, setProfile] = useState<any>([]);
  const db = useSQLiteContext();
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    console.log("Fonts Loaded: ", fontsLoaded);
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    async function getProfile() {
      // const result = await getOwnerProfile(db);
      // setProfile(result);
    }
    getProfile();
  }, []);

  console.log(profile);

  return (
    <SQLiteProvider databaseName="database.db" onInit={migrateDbIfNeeded}>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SQLiteProvider>
  );
}
