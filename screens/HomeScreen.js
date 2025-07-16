// HomeScreen.js
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { signOut, userProfile } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);

  const themeStyles = darkMode ? styles.prevDarkContainer : styles.lightContainer;
  const textColor = darkMode ? styles.textDark : styles.textLight;
  const cardBackground = darkMode ? styles.prevCardDark : styles.cardLight;

  const workoutBoxes = [
    { title: 'Cardio', detail: '15 mins | 120 cal', intensity: 'High', color: '#FFD54F', navigateTo: 'WorkoutDetail' },
    { title: 'Yoga', detail: '20 mins | 90 cal', intensity: 'Low', color: '#4FC3F7', navigateTo: 'WorkoutDetail' },
    { title: 'Upper Body', detail: '25 mins | 180 cal', intensity: 'Medium', color: '#A1887F', navigateTo: 'WorkoutDetail' },
    { title: 'Leg Day', detail: '18 mins | 150 cal', intensity: 'High', color: '#CE93D8', navigateTo: 'WorkoutDetail' },
    { title: 'Water Intake', detail: '2600 ml / 3000 ml', color: '#4DD0E1', navigateTo: 'Water' },
    { title: 'Steps', detail: '3986 / 10000', color: '#AED581', navigateTo: 'Steps' },
  ];

  const handleBoxPress = (box) => {
    if (box.navigateTo === 'WorkoutDetail') {
      navigation.navigate('WorkoutDetail', {
        title: box.title,
        workouts: ['Jumping Jacks', 'Squats', 'Pushups', 'Plank'],
      });
    } else {
      navigation.navigate(box.navigateTo);
    }
  };

  return (
    <ScrollView style={[styles.container, themeStyles]} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View>
            <Text style={[styles.greeting, textColor]}>
              Hi, {userProfile?.name || 'User'}
            </Text>
            <Text style={[styles.subGreeting, textColor]}>
              Let’s check today’s goals
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.rightHeader}>
          <Button title="Logout" onPress={signOut} color="#d9534f" />
          <TouchableOpacity onPress={() => setDarkMode(!darkMode)}>
            <Ionicons
              name={darkMode ? 'moon' : 'sunny'}
              size={26}
              color={darkMode ? 'white' : 'black'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={[styles.sectionTitle, textColor]}>Today’s Workouts</Text>
      <View style={styles.workoutRow}>
        <TouchableOpacity
          style={[styles.workoutCard, { backgroundColor: '#FFD54F' }]}
          onPress={() =>
            navigation.navigate('WorkoutDetail', {
              title: 'Cardio',
              workouts: ['Treadmill', 'Cycling', 'Jump Rope', 'HIIT Sprint'],
            })
          }
        >
          <Text style={styles.workoutTitle}>Cardio</Text>
          <Text style={styles.workoutDetails}>Treadmill, Cycling, etc</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.workoutCard, { backgroundColor: '#4FC3F7' }]}
          onPress={() =>
            navigation.navigate('WorkoutDetail', {
              title: 'Yoga',
              workouts: ["Sun Salutation", "Tree Pose", "Cobra Pose", "Child's Pose"],
            })
          }
        >
          <Text style={styles.workoutTitle}>Yoga</Text>
          <Text style={styles.workoutDetails}>Morning Flow, Pranayama</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, textColor]}>Today’s Summary</Text>
      <View style={styles.gridWrapper}>
        {workoutBoxes.map((box, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => handleBoxPress(box)}
            style={[styles.gridCardLarge, { backgroundColor: box.color }]}
          >
            <Text style={styles.gridTitle}>{box.title}</Text>
            <Text style={styles.gridDetail}>{box.detail}</Text>
            {box.intensity && (
              <Text style={styles.intensityLabel}>Intensity: {box.intensity}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.progressBox, cardBackground, { marginBottom: 40 }]}>
        <Ionicons name="trophy" size={24} color="#FFB300" />
        <View style={{ marginLeft: 10 }}>
          <Text style={[styles.progressTitle, textColor]}>Keep the progress!</Text>
          <Text style={[styles.progressSubtitle, textColor]}>
            You're ahead of 85% of users
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  prevDarkContainer: {
    backgroundColor: '#0b0c2a',
  },
  lightContainer: {
    backgroundColor: '#F6F6F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subGreeting: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  workoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  workoutCard: {
    borderRadius: 14,
    padding: 15,
    width: '48%',
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  workoutDetails: {
    fontSize: 12,
    marginTop: 6,
    color: '#444',
  },
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridCardLarge: {
    width: '100%',
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
  },
  gridTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  gridDetail: {
    fontSize: 14,
    marginTop: 6,
    color: '#444',
  },
  intensityLabel: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  progressBox: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  progressTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  progressSubtitle: {
    fontSize: 12,
  },
  textDark: {
    color: '#ffffff',
  },
  textLight: {
    color: '#000000',
  },
  prevCardDark: {
    backgroundColor: '#1c1d4f',
  },
  cardLight: {
    backgroundColor: '#ffffff',
  },
});
