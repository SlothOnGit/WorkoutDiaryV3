const HomeScreen = ({ selectedWorkout, setSelectedWorkout, handleAddWorkout, isDarkTheme }) => {
    return (
        <SafeAreaView style={styles.container}>
            <WorkoutTypeSelector selectedWorkout={selectedWorkout} onSelect={setSelectedWorkout} />
            <WorkoutForm onSubmit={handleAddWorkout} isDarkTheme={isDarkTheme} /> {/* Pass isDarkTheme */}
        </SafeAreaView>
    );
};