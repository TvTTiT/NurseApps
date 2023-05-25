import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './navigation/TabNavigator';
import LoginScreen from './screens/authenticationScreens/LoginScreen';
import SignupScreen from './screens/authenticationScreens/SignupScreen';
import ForgotScreen from './screens/authenticationScreens/ForgotScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log("logout");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Check if the user is logged in */}
        {!isLoggedIn ? (
          // If not logged in, show authentication screens
          <>
            <Stack.Screen name="Login Screen">
              {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="Signup Screen" component={SignupScreen} />
            <Stack.Screen name="Forgot Screen" component={ForgotScreen} />
          </>
        ) : (
          // If logged in, show the home screen
          <>
            <Stack.Screen
              name="Home Screen"
              options={{ headerShown: false }} // Hide the header on the home screen
            >
              {/* Pass the logout handler to the TabNavigator */}
              {(props) => <TabNavigator {...props} onLogout={handleLogout} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
