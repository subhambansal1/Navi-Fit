import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const workoutCategories = [
  {
    id: '1',
    title: 'Cardio',
    emoji: '🏃',
    workouts: ['Treadmill', 'Cycling', 'Jump Rope', 'HIIT Sprint'],
    image: 'https://img.icons8.com/color/96/treadmill.png',
  },
  {
    id: '2',
    title: 'Arms',
    emoji: '💪',
    workouts: ['Bicep Curls', 'Tricep Dips', 'Hammer Curls', 'Pushups'],
    image: 'https://img.icons8.com/color/96/dumbbell.png',
  },
  {
    id: '3',
    title: 'Chest',
    emoji: '🧍‍♂️',
    workouts: ['Bench Press', 'Incline Pushups', 'Chest Flys', 'Cable Crossover'],
    image: 'https://img.icons8.com/color/96/bench-press.png',
  },
  {
    id: '4',
    title: 'Back',
    emoji: '🔙',
    workouts: ['Deadlifts', 'Pull-ups', 'Lat Pulldown', 'Barbell Row'],
    image: 'https://img.icons8.com/color/96/pullups.png',
  },
  {
    id: '5',
    title: 'Legs',
    emoji: '🦵',
    workouts: ['Squats', 'Lunges', 'Leg Press', 'Calf Raises'],
    image: 'https://img.icons8.com/color/96/squat.png',
  },
  {
    id: '6',
    title: 'Core',
    emoji: '🧘‍♂️',
    workouts: ['Plank', 'Crunches', 'Russian Twists', 'Leg Raises'],
    image: 'https://img.icons8.com/color/96/plank-exercise.png',
  },
  {
    id: '7',
    title: 'HIIT',
    emoji: '⚡',
    workouts: ['Burpees', 'Mountain Climbers', 'Jump Squats', 'High Knees'],
    image: 'https://img.icons8.com/color/96/intensity.png',
  },
  {
    id: '8',
    title: 'Yoga',
    emoji: '🧘',
    workouts: ['Sun Salutation', 'Tree Pose', 'Cobra Pose', "Child's Pose"],
    image: 'https://img.icons8.com/color/96/yoga.png',
  },
  {
    id: '9',
    title: 'Stretching',
    emoji: '🤸',
    workouts: ['Hamstring Stretch', 'Quad Stretch', 'Shoulder Stretch', 'Neck Rolls'],
    image: 'https://img.icons8.com/color/96/stretching-exercises.png',
  },
  {
    id: '10',
    title: 'Full Body',
    emoji: '🏋️',
    workouts: ['Burpee + Pushup', 'Jumping Jacks', 'Squat to Press', 'Bear Crawl'],
    image: 'https://img.icons8.com/color/96/full-body.png',
  },
];

export default function WorkoutScreen() {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(true);

  const themeStyles = darkMode ? styles.darkTheme : styles.lightTheme;
  const textColor = darkMode ? styles.textDark : styles.textLight;

  return (
    <View style={[styles.container, themeStyles]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, textColor]}>Workout Categories 💪</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <FlatList
        data={workoutCategories}
        numColumns={2}
        columnWrapperStyle={styles.row}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, themeStyles]}
            onPress={() =>
              navigation.navigate('WorkoutDetail', {
                title: item.title,
                workouts: item.workouts,
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={[styles.cardText, textColor]}>
              {item.title} {item.emoji}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: 8,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#00f0ff',
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  darkTheme: {
    backgroundColor: '#0b0c2a',
  },
  lightTheme: {
    backgroundColor: '#ffffff',
  },
  textDark: {
    color: '#ffffff',
  },
  textLight: {
    color: '#000000',
  },
});
