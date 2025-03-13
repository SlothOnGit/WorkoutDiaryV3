import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Button, useTheme } from 'react-native-paper';

const WorkoutList = ({ workouts }) => {
    const { colors } = useTheme();
    const [visible, setVisible] = useState(true);

    const getWorkoutIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'running':
                return 'run';
            case 'cycling':
                return 'bike';
            case 'swimming':
                return 'swim';
            default:
                return 'help';
        }
    };

    const renderItem = ({ item }) => (
        <List.Item
            title={`${item.type} - ${item.distance}m`}
            description={`${item.duration} mins on ${item.date.toLocaleDateString()}`}
            left={() => <List.Icon icon={getWorkoutIcon(item.type)} />}
        />
    );

    return (
        <View style={styles.container}>
            <Button onPress={() => setVisible(!visible)} mode="outlined">
                {visible ? 'Hide List' : 'Show List'}
            </Button>
            {visible && (
                <FlatList
                    data={workouts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
});

export default WorkoutList;