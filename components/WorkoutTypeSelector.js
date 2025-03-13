import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

const WorkoutTypeSelector = ({ selectedWorkout, onSelect }) => {
    const { colors } = useTheme();

    const workoutTypes = [
        { type: 'Running', icon: 'run' },
        { type: 'Cycling', icon: 'bike' },
        { type: 'Swimming', icon: 'swim' },
    ];

    return (
        <View style={styles.container}>
            {workoutTypes.map((workout) => (
                <View key={workout.type} style={styles.iconContainer}>
                    <IconButton
                        icon={workout.icon}
                        size={30}
                        color={selectedWorkout === workout.type ? colors.primary : colors.text}
                        onPress={() => onSelect(workout.type)}
                        style={[
                            styles.iconButton,
                            selectedWorkout === workout.type && styles.selectedIconButton,
                        ]}
                    />
                    {selectedWorkout === workout.type && <View style={styles.circleBackground} />}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    iconContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconButton: {
        margin: 0, // Remove default margin
    },
    selectedIconButton: {
        zIndex: 1, // Ensure the icon is above the circle
    },
    circleBackground: {
        position: 'absolute',
        width: 50, // Circle size
        height: 50, // Circle size
        borderRadius: 25, // Make it circular
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light gray background
    },
});

export default WorkoutTypeSelector;