import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import PatientListScreen from '../screens/PatientListScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AccountScreen from '../screens/AccountScreen';
import ChangingInformation from '../screens/ChangingInformation';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Patient List') {
            iconName = 'speedometer';
          } else if (route.name === 'Dashboard') {
            iconName = 'list';
          } else if (route.name === 'Account') {
            iconName = 'settings';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Patient List" component={PatientListScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Account">
        {(props) => <AccountScreen {...props} onLogout={onLogout}  />}
      </Tab.Screen>
      <Tab.Screen
        name="ChangingInformation"
        component={ChangingInformation}
        options={{
          tabBarButton: () => null, 
          headerShown: false 
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
