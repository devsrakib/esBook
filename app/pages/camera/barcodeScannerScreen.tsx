// import React, { useState, useEffect } from "react";
// import {
//   Text,
//   View,
//   Button,
//   StyleSheet,
//   Alert,
//   Platform,
//   StatusBar,
//   Linking,
// } from "react-native";
// import { CameraView } from "expo-camera";
// import { Stack } from "expo-router";

// const QRCodeScanner = () => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const [cameraRef, setCameraRef] = useState(null);
//   return (
//     <View style={styles.container}>
//       <Stack.Screen
//         options={{
//           headerShown: false,
//         }}
//       />
//       {Platform.OS === "android" ? <StatusBar hidden /> : null}
//       <CameraView
//         // ref={(ref) => setCameraRef(ref)}
//         style={StyleSheet.absoluteFillObject}
//         facing="back"
//         onBarcodeScanned={({ data }: { data: string }) => {
//           Linking.openURL(data);
//         }}
//         // barCodeScannerSettings={{
//         //   barCodeTypes: ["barcode"],
//         // }}
//       />
//       {/* <Overlay/>  */}
//       {scanned && (
//         <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
//       )}
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default QRCodeScanner;

import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Platform,
  StatusBar,
  Linking,
  AppState,
} from "react-native";
import { CameraView } from "expo-camera";
import { Stack } from "expo-router";

const QRCodeScanner = () => {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      {Platform.OS === "android" && <StatusBar hidden />}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            setTimeout(async () => {
              await Linking.openURL(data);
            }, 500);
          }
        }}
      />
      {/* Realistic QR Code Scanner Overlay */}
      <View style={styles.overlay}>
        {/* Darkened edges */}
        <View style={styles.overlayTop} />
        <View style={styles.overlayLeft} />
        <View style={styles.overlayRight} />
        <View style={styles.overlayBottom} />

        {/* Scanner Box */}
        <View style={styles.scannerBox}>
          <View style={styles.scannerCornerTopLeft} />
          <View style={styles.scannerCornerTopRight} />
          <View style={styles.scannerCornerBottomLeft} />
          <View style={styles.scannerCornerBottomRight} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "30%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  overlayLeft: {
    position: "absolute",
    top: "30%",
    left: 0,
    bottom: "30%",
    width: "20%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  overlayRight: {
    position: "absolute",
    top: "30%",
    right: 0,
    bottom: "30%",
    width: "20%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  overlayBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "30%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  scannerBox: {
    position: "absolute",
    top: "30%",
    left: "20%",
    right: "20%",
    bottom: "30%",
    borderColor: "#00FF00", // Green color for scanner box
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  scannerCornerTopLeft: {
    position: "absolute",
    top: -10,
    left: -10,
    width: 30,
    height: 30,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderColor: "#00FF00",
  },
  scannerCornerTopRight: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 30,
    height: 30,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderColor: "#00FF00",
  },
  scannerCornerBottomLeft: {
    position: "absolute",
    bottom: -10,
    left: -10,
    width: 30,
    height: 30,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderColor: "#00FF00",
  },
  scannerCornerBottomRight: {
    position: "absolute",
    bottom: -10,
    right: -10,
    width: 30,
    height: 30,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: "#00FF00",
  },
});

export default QRCodeScanner;
