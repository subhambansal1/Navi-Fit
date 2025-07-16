import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

export default function SignUpScreen({ route }) {
  const { phone } = route.params;
  const { signIn } = useContext(AuthContext);

  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');

  const completeSignup = () => {
    signIn({ phone, age, weight, height, gender });
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Age" keyboardType="number-pad" style={styles.input} onChangeText={setAge} />
      <TextInput placeholder="Weight (kg)" keyboardType="decimal-pad" style={styles.input} onChangeText={setWeight} />
      <TextInput placeholder="Height (cm)" keyboardType="decimal-pad" style={styles.input} onChangeText={setHeight} />
      <TextInput placeholder="Gender" style={styles.input} onChangeText={setGender} />
      <TouchableOpacity style={styles.button} onPress={completeSignup}>
        <Text style={styles.buttonText}>Finish & Go to App</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 10 },
  button: { backgroundColor: '#af4ca0ff', padding: 15, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
