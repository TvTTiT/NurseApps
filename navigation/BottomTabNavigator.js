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

          if (route.name === 'Patients') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Appointments') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Medications') {
            iconName = focused ? 'medkit' : 'medkit-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fb5b5a',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Patients" component={PatientListScreen} />
      <Tab.Screen name="Appointments" component={AppointmentManagementScreen} />
      <Tab.Screen name="Medications" component={MedicationManagementScreen} />
    </Tab.Navigator>
  );
}
