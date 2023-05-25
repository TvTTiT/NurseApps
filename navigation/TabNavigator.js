import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
//home screens
import HomeScreen from '../screens/homeScreens/HomeScreen';
import PatientListScreen from '../screens/homeScreens/PatientListScreen';
import SettingScreen from '../screens/homeScreens/SettingsScreen';
import PersonalScreen from '../screens/homeScreens/PersonalScreen';
import PasswordAndSecurityScreen from '../screens/homeScreens/PasswordAndSecurityScreen';
import ChangePasswordScreen from '../screens/homeScreens/ChangePasswordScreen';
import ChangeNameScreen from '../screens/homeScreens/ChangeNameScreen';
import ChangeEmailScreen from '../screens/homeScreens/ChangeEmailScreen';
import ScheduleScreen from '../screens/homeScreens/ScheduleScreen';
import NotificationsScreen from '../screens/homeScreens/Notifications';
//patient screens
import PatientData from '../screens/patientScreens/PatientDataScreen';
import EmergencyContactScreen from '../screens/patientScreens/EmergencyContactScreen';
import MedicationScreen from '../screens/patientScreens/MedicationScreen';
import EditMedicationsScreen from '../screens/patientScreens/EditMedicationsScreen';
import NewMedicationsScreen from '../screens/patientScreens/NewMedicationsScreen';
import MessagesScreen from '../screens/patientScreens/MessagesScreen';


const Tab = createBottomTabNavigator();

const TabNavigator = ({ onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Set the tab bar icon based on the route name
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
          } else if (route.name === 'Notifications') {
            iconName = 'notifications-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // Set the active and inactive tab bar colors
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {/* Define each screen with its respective component */}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Patients List" component={PatientListScreen} />
      <Tab.Screen name="Appointments" component={ScheduleScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Settings">
        {(props) => <SettingScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
      
      {/* Hide the following screens from the tab bar */}
      <Tab.Screen
        name="PersonalDetails"
        component={PersonalScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="PasswordAndSecurity"
        component={PasswordAndSecurityScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ChangingPassword"
        component={ChangePasswordScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ChangingName"
        component={ChangeNameScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ChangingEmail"
        component={ChangeEmailScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="PatientData"
        component={PatientData}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="EmergencyContact"
        component={EmergencyContactScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Medications"
        component={MedicationScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="EditMedications"
        component={EditMedicationsScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="NewMedications"
        component={NewMedicationsScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
