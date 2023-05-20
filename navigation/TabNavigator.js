import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import PatientListScreen from '../screens/PatientListScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingScreen from '../screens/SettingsScreen';
import PersonalScreen from '../screens/PersonalScreen';
import PasswordAndSecurityScreen from '../screens/PasswordAndSecurityScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ChangeNameScreen from '../screens/ChangeNameScreen';
import ChangeEmailScreen from '../screens/ChangeEmailScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
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
          } else if (route.name === 'Notifications') {
            iconName = 'notifications';
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
      <Tab.Screen name="Notifications" component={NotificationScreen} />
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
        name="Appointment"
        component={ScheduleScreen}
        options={{
          tabBarButton: () => null, 
          headerShown: false 
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
