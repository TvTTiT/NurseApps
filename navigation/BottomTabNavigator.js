import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import PatientListScreen from '../screens/PatientListScreen';
import AppointmentManagementScreen from '../screens/AppointmentManagementScreen';
import MedicationManagementScreen from '../screens/MedicationManagementScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Determine the appropriate icon name based on the current route
          if (route.name === 'Patients') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Appointments') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Medications') {
            iconName = focused ? 'medkit' : 'medkit-outline';
          }

          // Render the Ionicons component with the chosen icon name, size, and color
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fb5b5a', // Set the active tab icon color
        tabBarInactiveTintColor: 'gray', // Set the inactive tab icon color
      })}
    >
      {/* Define each tab screen */}
      <Tab.Screen name="Patients" component={PatientListScreen} />
      <Tab.Screen name="Appointments" component={AppointmentManagementScreen} />
      <Tab.Screen name="Medications" component={MedicationManagementScreen} />
    </Tab.Navigator>
  );
}
