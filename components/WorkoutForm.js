import React, { useState } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const WorkoutForm = ({ onSubmit }) => {
    const { colors } = useTheme();
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false); // Hide date picker
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const handleSubmit = () => {
        const distanceValue = parseFloat(distance);
        const durationValue = parseFloat(duration);

        if (isNaN(distanceValue)) {
            alert('Please enter a valid number for distance.');
            return;
        }
        if (isNaN(durationValue)) {
            alert('Please enter a valid number for duration.');
            return;
        }

        // Dismiss keyboard
        Keyboard.dismiss();

        // Submit workout
        onSubmit({ distance: distanceValue, duration: durationValue, date });

        // Clear form
        setDistance('');
        setDuration('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Distance (meters)"
                value={distance}
                onChangeText={setDistance}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                label="Duration (minutes)"
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
                style={styles.input}
            />
            <Button onPress={() => setShowDatePicker(true)} mode="outlined">
                {date.toLocaleDateString()}
            </Button>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                Add Workout
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
    },
});

export default WorkoutForm;