// App.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, AuthContext } from './contexts/AuthContext';

import SignInScreen from './screens/SignInScreen';
import OTPScreen from './screens/OTPScreen';
import SignUpScreen from './screens/SignUpScreen';
import BottomTabs from './navigation/BottomTabs';
import WorkoutDetailScreen from './screens/WorkoutDetailScreen';
import ProfileScreen from './screens/ProfileScreen'; // ✅ Make sure this exists

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { userProfile, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userProfile ? (
          <>
            <Stack.Screen name="MainTabs" component={BottomTabs} />
            <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="OTP" component={OTPScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
