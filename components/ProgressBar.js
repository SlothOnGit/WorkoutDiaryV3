import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ProgressBar, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProgressBarComponent = ({ running, cycling, swimming }) => {
    const { colors } = useTheme();
    const totalDistance = running + cycling + swimming;

    // Fix div by zero
    const runningProgress = totalDistance > 0 ? running / totalDistance : 0;
    const cyclingProgress = totalDistance > 0 ? cycling / totalDistance : 0;
    const swimmingProgress = totalDistance > 0 ? swimming / totalDistance : 0;

    // Combined progress (total distance relative to self, always 1)
    const combinedProgress = 1;

    // Convert m to km if distance is >= 1000m
    const formatDistance = (distance) => {
        if (distance >= 1000) {
            return `${(distance / 1000).toFixed(2)} km`; // Convert to km with 2 decimal places
        }
        return `${distance}m`; // Keep dist in meters
    };

    return (
        <View style={styles.container}>
            {/* Combined Progress Bar */}
            <View style={styles.progressContainer}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="chart-bar" size={24} color={colors.text} />
                    <Text style={[styles.distanceText, { color: colors.text }]}>
                        {formatDistance(totalDistance)} (Total)
                    </Text>
                </View>
            </View>

            {/* Running Progress */}
            <View style={styles.progressContainer}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="run" size={24} color={colors.primary} />
                    <Text style={[styles.distanceText, { color: colors.text }]}>
                        {formatDistance(running)}
                    </Text>
                </View>
                <ProgressBar
                    progress={runningProgress}
                    color={colors.primary}
                    style={styles.progressBar}
                />
            </View>

            {/* Cycling Progress */}
            <View style={styles.progressContainer}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="bike" size={24} color="#656565" />
                    <Text style={[styles.distanceText, { color: colors.text }]}>
                        {formatDistance(cycling)}
                    </Text>
                </View>
                <ProgressBar
                    progress={cyclingProgress}
                    color="#656565"
                    style={styles.progressBar}
                />
            </View>

            {/* Swimming Progress */}
            <View style={styles.progressContainer}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="swim" size={24} color={colors.error} />
                    <Text style={[styles.distanceText, { color: colors.text }]}>
                        {formatDistance(swimming)}
                    </Text>
                </View>
                <ProgressBar
                    progress={swimmingProgress}
                    color={colors.error}
                    style={styles.progressBar}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    progressContainer: {
        marginVertical: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    distanceText: {
        marginLeft: 10,
        fontSize: 16,
    },
    progressBar: {
        height: 10,
        marginTop: 5,
    },
});

export default ProgressBarComponent;