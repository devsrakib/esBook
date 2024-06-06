import { StyleSheet, View } from "react-native";
import Home from "../pages/home/home";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { bottom, top } = useSafeAreaInsets();
  return (
    <View
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
