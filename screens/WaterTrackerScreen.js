import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  AppState,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function WaterTrackerScreen() {
  const [currentML, setCurrentML] = useState(0);
  const [goalML, setGoalML] = useState(1800);
  const [inputAmount, setInputAmount] = useState('');
  const [appState, setAppState] = useState(AppState.currentState);

  // FAKE weekly water data in ml
  const [weeklyData, setWeeklyData] = useState([2000, 3000, 1500, 2500, 1800, 3200, 2700]);

  const handleAdd = () => {
    const amount = parseInt(inputAmount);
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    if (currentML + amount > goalML) {
      alert('You’ve reached your daily goal!');
      return;
    }
    setCurrentML(currentML + amount);
    setInputAmount('');
  };

  const increaseGoal = () => {
    const amount = parseInt(inputAmount);
    if (!amount || amount <= 0) {
      alert('Enter amount to increase goal');
      return;
    }
    setGoalML(goalML + amount);
    setInputAmount('');
  };

  const decreaseGoal = () => {
    const amount = parseInt(inputAmount);
    if (!amount || amount <= 0) {
      alert('Enter amount to decrease goal');
      return;
    }
    if (goalML - amount < 500) {
      alert('Goal too low!');
      return;
    }
    setGoalML(goalML - amount);
    setInputAmount('');
  };

  // Auto-reset at midnight
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        setCurrentML(0);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        const now = new Date();
        if (now.getHours() === 0) {
          setCurrentML(0);
        }
      }
      setAppState(nextAppState);
    });

    return () => subscription.remove();
  }, [appState]);

  const percentage = (currentML / goalML) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Water Tracker 💧</Text>

      <View style={styles.progressWrapper}>
        <AnimatedCircularProgress
          size={200}
          width={15}
          fill={percentage}
          tintColor="#ffffff"
          backgroundColor="#66b3ff"
          rotation={0}
          lineCap="round"
        />
        <View style={styles.centerIcon}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/100/ffffff/water.png' }}
            style={styles.waterIcon}
          />
        </View>
      </View>

      <View style={styles.percentageBlock}>
        <Text style={styles.percentageText}>{Math.round(percentage)}%</Text>
        <Text style={styles.perDay}>/day</Text>
      </View>

      <View style={styles.mlInfo}>
        <View style={styles.mlBlock}>
          <Text style={styles.mlValue}>{currentML} ml</Text>
          <Text style={styles.mlLabel}>Now</Text>
        </View>
        <View style={styles.mlBlock}>
          <Text style={styles.mlValue}>{goalML} ml</Text>
          <Text style={styles.mlLabel}>Goal</Text>
        </View>
      </View>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={inputAmount}
        onChangeText={setInputAmount}
        placeholder="Enter ml"
        placeholderTextColor="#ccc"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addText}>+ Add Water</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: '#007acc' }]}
          onPress={increaseGoal}
        >
          <Text style={styles.addText}>+ Increase Goal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: '#003f5c' }]}
          onPress={decreaseGoal}
        >
          <Text style={styles.addText}>- Decrease Goal</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.weekTitle}>Weekly Water Intake</Text>
      <View style={styles.chart}>
        {weeklyData.map((value, idx) => (
          <View key={idx} style={styles.chartItem}>
            <Text style={styles.mlChartText}>{value}ml</Text>
            <View
              style={[
                styles.bar,
                {
                  height: Math.min((value / goalML) * 100, 100),
                },
              ]}
            />
            <Text style={styles.dayLabel}>{DAYS[idx]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00bfff',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  progressWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  centerIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  waterIcon: {
    width: 50,
    height: 50,
    tintColor: '#fff',
  },
  percentageBlock: {
    alignItems: 'center',
    marginBottom: 25,
  },
  percentageText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  perDay: {
    fontSize: 14,
    color: '#fff',
  },
  mlInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  mlBlock: {
    alignItems: 'center',
  },
  mlValue: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mlLabel: {
    color: 'yellow',
    fontSize: 14,
    marginTop: 4,
  },
  input: {
    backgroundColor: '#1dafff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    color: '#fff',
    fontSize: 16,
    width: '80%',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  addButton: {
    backgroundColor: '#1dafff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 3,
  },
  addText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  weekTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 40,
  },
  chartItem: {
    alignItems: 'center',
  },
  bar: {
    width: 20,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 5,
  },
  dayLabel: {
    color: '#fff',
    fontSize: 12,
  },
  mlChartText: {
    color: 'white',
    fontSize: 12,
    marginBottom: 4,
  },
});
