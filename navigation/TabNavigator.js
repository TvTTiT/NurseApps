import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/homeScreens/HomeScreen';
import PatientListScreen from '../screens/homeScreens/PatientListScreen';
import SettingScreen from '../screens/homeScreens/SettingsScreen';
import PersonalScreen from '../screens/homeScreens/PersonalScreen';
import PasswordAndSecurityScreen from '../screens/homeScreens/PasswordAndSecurityScreen';
import ChangePasswordScreen from '../screens/homeScreens/ChangePasswordScreen';
import ChangeNameScreen from '../screens/homeScreens/ChangeNameScreen';
import ChangeEmailScreen from '../screens/homeScreens/ChangeEmailScreen';
import ScheduleScreen from '../screens/homeScreens/ScheduleScreen';
import PatientData from '../screens/patientScreens/PatientDataScreen';
import EmergencyContactScreen from '../screens/patientScreens/EmergencyContactScreen';
import MedicationScreen from '../screens/patientScreens/MedicationScreen';
import EditMedicationsScreen from '../screens/patientScreens/EditMedicationsScreen';
import NewMedicationsScreen from '../screens/patientScreens/NewMedicationsScreen';
import NotificationsScreen from '../screens/patientScreens/MessagesScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Patients List') {
            iconName = 'list';
          } else if (route.name === 'Appointments') {
            iconName = 'calendar-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Patients List" component={PatientListScreen} />
      <Tab.Screen name="Appointments" component={ScheduleScreen} />
      <Tab.Screen name="Settings">
        {(props) => <SettingScreen {...props} onLogout={onLogout}  />}
      </Tab.Screen>
      <Tab.Screen
        name="PersonalDetails"
        component={PersonalScreen}
        options={{
          tabBarButton: () => null, 
          headerShown: false 
        }}
      />
       <Tab.Screen
        name="PasswordAndSecurity"
        component={PasswordAndSecurityScreen}
        options={{
          tabBarButton: () => null, 
          headerShown: false 
        }}
      />
      <Tab.Screen
        name="ChangingPassword"
        component={ChangePasswordScreen}
        options={{
          tabBarButton: () => null, 
          headerShown: false 
        }}
      />
      <Tab.Screen
        name="ChangingName"
        component={ChangeNameScreen}
        options={{
          tabBarButton: () => null, 
          headerShown: false 
        }}
      />
      <Tab.Screen
        name="ChangingEmail"
        component={ChangeEmailScreen}
        options={{
          tabBarButton: () => null, 
          headerShown: false 
        }}
      />
      <Tab.Screen
        name="PatientData"
        component={PatientData}
        options={{
          tabBarButton: () => null, 
          headerShown: false 
        }}
      />
      <Tab.Screen
        name="EmergencyContact"
        component={EmergencyContactScreen}
        options={{
          tabBarButton: () => null, 
          headerShown: false 
        }}
      />
      <Tab.Screen
        name="Medications"
        component={MedicationScreen}
        options={{
          tabBarButton: () => null, 
          headerShown: false 
        }}
      />
      <Tab.Screen
        name="EditMedications"
        component={EditMedicationsScreen}
        options={{
          tabBarButton: () => null, 
          headerShown: false 
        }}
      />
      <Tab.Screen
        name="NewMedications"
        component={NewMedicationsScreen}
        options={{
          tabBarButton: () => null, 
          headerShown: false 
        }}
      />
      <Tab.Screen
        name="Messages"
        component={NotificationsScreen}
        options={{
          tabBarButton: () => null, 
          headerShown: false 
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
