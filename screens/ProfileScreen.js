import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const { userProfile, saveProfile } = useContext(AuthContext); // ✅ fix here
  const [name, setName] = useState(userProfile?.name || '');
  const [age, setAge] = useState(userProfile?.age || '');
  const [weight, setWeight] = useState(userProfile?.weight || '');
  const [gender, setGender] = useState(userProfile?.gender || '');
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    if (!name || !age || !weight || !gender) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    saveProfile({ name, age, weight, gender }); // ✅ fix here
    Alert.alert('Success', 'Profile updated!');
    navigation.goBack();
  };

  const themeContainer = darkMode ? styles.darkContainer : styles.lightContainer;
  const textColor = darkMode ? styles.textDark : styles.textLight;
  const inputStyle = darkMode ? styles.inputDark : styles.input;

  return (
    <View style={[styles.container, themeContainer]}>
      <View style={styles.header}>
        <Text style={[styles.heading, textColor]}>User Profile</Text>
        <TouchableOpacity onPress={() => setDarkMode(!darkMode)}>
          <Ionicons
            name={darkMode ? 'moon' : 'sunny'}
            size={24}
            color={darkMode ? '#fff' : '#000'}
          />
        </TouchableOpacity>
      </View>

      <Text style={[styles.label, textColor]}>Name:</Text>
      <TextInput style={inputStyle} value={name} onChangeText={setName} placeholder="Enter name" placeholderTextColor="#999" />

      <Text style={[styles.label, textColor]}>Age:</Text>
      <TextInput style={inputStyle} value={age} onChangeText={setAge} keyboardType="numeric" placeholder="Enter age" placeholderTextColor="#999" />

      <Text style={[styles.label, textColor]}>Weight (kg):</Text>
      <TextInput style={inputStyle} value={weight} onChangeText={setWeight} keyboardType="numeric" placeholder="Enter weight" placeholderTextColor="#999" />

      <Text style={[styles.label, textColor]}>Gender:</Text>
      <TextInput style={inputStyle} value={gender} onChangeText={setGender} placeholder="Enter gender" placeholderTextColor="#999" />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>{userProfile?.name ? 'Update Profile' : 'Save Profile'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80, // ✅ moved it down from 60 to improve spacing
  },
  lightContainer: {
    backgroundColor: '#f6f6f6',
  },
  darkContainer: {
    backgroundColor: '#1e1e1e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    fontWeight: 'bold',
  },
  textLight: {
    color: '#000',
  },
  textDark: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
    color: '#000',
  },
  inputDark: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
    color: '#fff',
    backgroundColor: '#2c2c2c',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#af4ca0ff',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
