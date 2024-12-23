import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('window');

const CustomLoader = ({ size = 30, colors = ['#007AFF', '#00E0FF'] }) => {
    const rotateValue = useRef(new Animated.Value(0)).current;
    const pulseValue = useRef(new Animated.Value(1)).current;

    // Spin animation
    useEffect(() => {
        const spinAnimation = Animated.loop(
            Animated.timing(rotateValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        );
        spinAnimation.start();

        return () => spinAnimation.stop();
    }, [rotateValue]);

    // Pulsating animation
    useEffect(() => {
        const pulseAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseValue, {
                    toValue: 1.3,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );
        pulseAnimation.start();

        return () => pulseAnimation.stop();
    }, [pulseValue]);

    const rotateInterpolate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            {/* Pulsating Glow */}
            <Animated.View
                style={[
                    styles.glow,
                    {
                        width: size * 2,
                        height: size * 2,
                        borderRadius: size,
                        transform: [{ scale: pulseValue }],
                    },
                ]}
            />
            {/* Spinning Gradient Loader */}
            <Animated.View
                style={[
                    styles.loader,
                    {
                        width: size,
                        height: size,
                        transform: [{ rotate: rotateInterpolate }],
                    },
                ]}
            >
                <LinearGradient
                    colors={[ Colors.gray,  Colors.green]}
                    style={{
                        flex: 1,
                        borderRadius: size / 2,
                    }}
                />
            </Animated.View>
                {/* <Text style={{fontWeight: '900'}}>...</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    glow: {
        position: 'absolute',
        backgroundColor: Colors.mainColor,
        opacity: 0.7,
    },
    loader: {
        borderRadius: 50,
        overflow: 'hidden',
    },
});

export default CustomLoader;
