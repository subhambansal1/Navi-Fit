// screens/StepTrackerScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Appearance,
  TextInput,
  ScrollView,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Feather } from '@expo/vector-icons';

export default function StepTrackerScreen() {
  const [stepsToday, setStepsToday] = useState(3986); // mock steps
  const [stepGoal, setStepGoal] = useState(8000);
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [inputAmount, setInputAmount] = useState('');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const background = theme === 'dark' ? '#000' : '#fff';
  const textColor = theme === 'dark' ? '#fff' : '#000';
  const secondaryText = theme === 'dark' ? '#ccc' : '#333';

  const mockStats = {
    kcal: '221 Kcal',
    kms: '3.45 km',
  };

  const weeklyData = [5200, 6400, 4800, 7000, 8200, 5900, 3500];
  const maxSteps = 10000;

  const increaseGoal = () => {
    const amount = parseInt(inputAmount);
    if (!amount || amount <= 0) {
      alert('Enter valid number to increase goal');
      return;
    }
    setStepGoal(stepGoal + amount);
    setInputAmount('');
  };

  const decreaseGoal = () => {
    const amount = parseInt(inputAmount);
    if (!amount || amount <= 0) {
      alert('Enter valid number to decrease goal');
      return;
    }
    if (stepGoal - amount < 1000) {
      alert('Goal cannot be too low');
      return;
    }
    setStepGoal(stepGoal - amount);
    setInputAmount('');
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: textColor }]}>HEALTH TRACKER</Text>
        <TouchableOpacity onPress={toggleTheme}>
          <Feather name={theme === 'dark' ? 'sun' : 'moon'} size={24} color={textColor} />
        </TouchableOpacity>
      </View>

      {/* Steps Circular Progress */}
      <AnimatedCircularProgress
        size={200}
        width={15}
        fill={(stepsToday / stepGoal) * 100}
        tintColor="#00e676"
        backgroundColor="#3d3d3d"
        rotation={0}
      >
        {() => (
          <Text style={[styles.stepText, { color: textColor }]}>{stepsToday}</Text>
        )}
      </AnimatedCircularProgress>

      <Text style={[styles.stepLabel, { color: secondaryText }]}>Steps / Goal: {stepGoal}</Text>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: textColor }]}>{mockStats.kcal}</Text>
          <Text style={[styles.statLabel, { color: secondaryText }]}>Calorie</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: textColor }]}>{mockStats.kms}</Text>
          <Text style={[styles.statLabel, { color: secondaryText }]}>Kilometers</Text>
        </View>
      </View>

      {/* Step Goal Adjuster */}
      <TextInput
        style={[styles.input, { color: textColor, borderColor: secondaryText }]}
        placeholder="Enter step amount"
        placeholderTextColor={secondaryText}
        keyboardType="numeric"
        value={inputAmount}
        onChangeText={setInputAmount}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.goalButton} onPress={increaseGoal}>
          <Text style={styles.goalButtonText}>+ Increase Goal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.goalButton} onPress={decreaseGoal}>
          <Text style={styles.goalButtonText}>- Decrease Goal</Text>
        </TouchableOpacity>
      </View>

      {/* Weekly Bar Chart */}
      <View style={{ height: 20 }} />
      <Text style={[styles.weeklyTitle, { color: textColor }]}>Weekly Step Summary</Text>
      <View style={{ height: 20 }} />
      <View style={styles.barChartWrapper}>
        {weeklyData.map((value, index) => {
          const barHeight = (value / maxSteps) * 100;
          const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
          return (
            <View key={index} style={styles.barItem}>
              <View style={[styles.bar, { height: `${barHeight}%`, backgroundColor: '#00e676' }]} />
              <Text style={[styles.barLabel, { color: textColor }]}>{dayLabels[index]}</Text>
              <Text style={[styles.barValue, { color: secondaryText }]}>{value} steps</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 60,
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  stepLabel: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 20,
    marginBottom: 30,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: '80%',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 30,
  },
  goalButton: {
    backgroundColor: '#1dafff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  goalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  weeklyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  barChartWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    height: 180,
    alignItems: 'flex-end',
  },
  barItem: {
    alignItems: 'center',
    width: 40,
  },
  bar: {
    width: 20,
    borderRadius: 6,
    marginBottom: 4,
  },
  barLabel: {
    fontSize: 14,
    marginBottom: 2,
  },
  barValue: {
    fontSize: 12,
    textAlign: 'center',
  },
});
