/* eslint-disable import/order */
import { StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect, useMemo } from "react";
import {
  BlurMask,
  Canvas,
  Path,
  Skia,
  SweepGradient,
  vec,
} from "@shopify/react-native-skia";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const CanvasSize = 100;
const CircleSize = 54;
const strokeWidth = 10;
const CircleRadius = (CircleSize - strokeWidth) / 2;
const ActivityIndicator = () => {
  const progress = useSharedValue(0);

  const circlePath = useMemo(() => {
    const skPath = Skia.Path.Make();
    skPath.addCircle(CanvasSize / 2, CanvasSize / 2, CircleRadius);
    return skPath;
  }, []);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.linear }),
      -1,
      false
    );
  }, [progress]);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progress.value * 2 * Math.PI}rad` }],
    };
  }, []);

  const startAnimated = useDerivedValue(() => {
    return interpolate(progress.value, [0, 0.5, 1], [0.3, 0.6, 0.3]);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={rStyle}>
        <Canvas style={{ width: CanvasSize, height: CanvasSize }}>
          <Path
            path={circlePath}
            color="white"
            style="stroke"
            strokeWidth={strokeWidth}
            start={startAnimated}
            end={1}
            strokeCap="round"
          >
            <SweepGradient
              c={vec(CanvasSize / 2, CanvasSize / 2)}
              colors={["cyan", "magenta", "yellow", "cyan"]}
            />
            <BlurMask blur={6} style="solid" />
          </Path>
        </Canvas>
      </Animated.View>
    </SafeAreaView>
  );
};

export default ActivityIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
