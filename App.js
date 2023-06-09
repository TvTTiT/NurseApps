import React, { useState, useEffect, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-url-polyfill/auto';

import TabNavigator from './navigation/TabNavigator';
import LoginScreen from './screens/authenticationScreens/LoginScreen';
import SignupScreen from './screens/authenticationScreens/SignupScreen';
import ForgotScreen from './screens/authenticationScreens/ForgotScreen';
import InformationFormScreen from './screens/authenticationScreens/InformationFormScreen';
const Stack = createNativeStackNavigator();
export const UserContext = createContext(); // Create the UserContext

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [medicalProfessionalId, setMedicalProfessionalId] = useState('');
  const [userID, setUserID, ] = useState('');
  const [userEmail, setUserEmail, ] = useState('');
  const [patientId, setPatientId, ] = useState(0);
  const [userPassword, setUserPassword, ] = useState('');
  
  const handleLogin = (medProfId,userId,userPass) => {
    setIsLoggedIn(true);
    setMedicalProfessionalId(medProfId);
    setUserID(userId);
    setPatientId(0);
    setUserPassword(userPass);
  };

  const handleLogout = () => {
    console.log("logout");
    setIsLoggedIn(false);
    setMedicalProfessionalId('');
    setUserID('');
    setPatientId(0);
    setUserPassword('');
  };

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <UserContext.Provider
    value={{
      medicalProfessionalId,
      userID,
      userEmail,
      setUserID,
      setMedicalProfessionalId,
      setUserEmail,
      patientId, 
      setPatientId,
      setUserPassword,
      userPassword,
    }}
  >
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
              <Stack.Screen
                name="Information Form"
                options={{
                  headerShown: false,
                  headerBackVisible: false,
                }}
              >
                {(props) => (
                  <InformationFormScreen {...props} onLogin={handleLogin} />
                )}
              </Stack.Screen>
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
    </UserContext.Provider>
  );
}