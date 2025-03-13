import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WorkoutTypeSelector from './components/WorkoutTypeSelector';
import WorkoutForm from './components/WorkoutForm';
import ProgressBarComponent from './components/ProgressBar';
import WorkoutList from './components/WorkoutList';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ selectedWorkout, setSelectedWorkout, handleAddWorkout }) => {
  return (
    <SafeAreaView style={styles.container}>
      <WorkoutTypeSelector selectedWorkout={selectedWorkout} onSelect={setSelectedWorkout} />
      <WorkoutForm onSubmit={handleAddWorkout} />
    </SafeAreaView>
  );
};

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
    <SafeAreaView style={styles.container}>
      <ProgressBarComponent {...totalDistance} />
      <WorkoutList workouts={workouts} />
    </SafeAreaView>
  );
};

const App = () => {
  const [selectedWorkout, setSelectedWorkout] = useState('Running');
  const [workouts, setWorkouts] = useState([]);

  const handleAddWorkout = (workout) => {
    const newWorkout = {
      ...workout,
      type: selectedWorkout,
      id: Date.now(), // Add a unique ID
    };
    setWorkouts([...workouts, newWorkout]);
  };

  return (
    <PaperProvider theme={DefaultTheme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: DefaultTheme.colors.primary,
            tabBarInactiveTintColor: DefaultTheme.colors.text,
          }}
        >
          <Tab.Screen
            name="Home"
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          >
            {() => (
              <HomeScreen
                selectedWorkout={selectedWorkout}
                setSelectedWorkout={setSelectedWorkout}
                handleAddWorkout={handleAddWorkout}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Progress"
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="chart-bar" color={color} size={size} />
              ),
            }}
          >
            {() => <ProgressScreen workouts={workouts} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default App;