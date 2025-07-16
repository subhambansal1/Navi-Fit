// screens/WorkoutDetailScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Picker,
  Button,
} from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';

export default function WorkoutDetailScreen({ route }) {
  const { title, workouts } = route.params;

  const intensityLevels = {
    Low: 4,
    Medium: 6,
    High: 10,
  };

  const [timers, setTimers] = useState(
    workouts.map(() => ({ seconds: 0, running: false, interval: null, intensity: 'Medium', calories: 0 }))
  );

  const toggleTimer = (index) => {
    const updatedTimers = [...timers];
    const timer = updatedTimers[index];

    if (timer.running) {
      clearInterval(timer.interval);
      const minutes = timer.seconds / 60;
      timer.calories = Math.round(minutes * intensityLevels[timer.intensity]);
      timer.running = false;
      timer.interval = null;
    } else {
      timer.running = true;
      timer.interval = setInterval(() => {
        setTimers((prev) => {
          const copy = [...prev];
          copy[index].seconds += 1;
          return [...copy];
        });
      }, 1000);
    }
    setTimers(updatedTimers);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title} Exercises</Text>
      <FlatList
        data={workouts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.exerciseCard}>
            <Text style={styles.exerciseText}>{item}</Text>

            <Text style={styles.label}>Select Intensity:</Text>
            <RNPicker
              selectedValue={timers[index].intensity}
              style={styles.picker}
              dropdownIconColor="#00e676"
              onValueChange={(value) => {
                const copy = [...timers];
                copy[index].intensity = value;
                setTimers(copy);
              }}
            >
              <RNPicker.Item label="Low" value="Low" />
              <RNPicker.Item label="Medium" value="Medium" />
              <RNPicker.Item label="High" value="High" />
            </RNPicker>

            <Text style={styles.timerText}>Time: {formatTime(timers[index].seconds)}</Text>
            <TouchableOpacity style={styles.timerButton} onPress={() => toggleTimer(index)}>
              <Text style={styles.timerButtonText}>{timers[index].running ? 'Stop' : 'Start'} Timer</Text>
            </TouchableOpacity>

            <Text style={styles.calorieText}>Calories Burned: {timers[index].calories}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#0b0c2a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#fff',
  },
  exerciseCard: {
    backgroundColor: '#1c1d4f',
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#00f0ff',
  },
  exerciseText: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 5,
  },
  label: {
    color: '#ccc',
    marginTop: 8,
  },
  picker: {
    color: 'white',
    backgroundColor: '#333',
    marginTop: 5,
    marginBottom: 10,
  },
  timerText: {
    color: '#00e676',
    fontSize: 16,
    marginBottom: 5,
  },
  timerButton: {
    backgroundColor: '#1dafff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  timerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  calorieText: {
    marginTop: 10,
    fontSize: 14,
    color: '#ffcc00',
  },
});