import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ProgressBarComponent from './components/ProgressBar';
import WorkoutList from './components/WorkoutList';

const ProgressScreen = ({ workouts }) => {
    const totalDistance = {
        running: workouts
            .filter((w) => w.type === 'Running')
            .reduce((sum, w) => sum + (w.distance || 0), 0),
        cycling: workouts
            .filter((w) => w.type === 'Cycling')
            .reduce((sum, w) => sum + (w.distance || 0), 0),
        swimming: workouts
            .filter((w) => w.type === 'Swimming')
            .reduce((sum, w) => sum + (w.distance || 0), 0),
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ProgressBarComponent {...totalDistance} />
            <WorkoutList workouts={workouts} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
});

export default ProgressScreen;