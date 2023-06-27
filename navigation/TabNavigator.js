import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
//home screens
import PatientListScreen from '../screens/homeScreens/PatientListScreen';
import SettingScreen from '../screens/homeScreens/SettingsScreen';
import PersonalScreen from '../screens/homeScreens/PersonalScreen';
import PasswordAndSecurityScreen from '../screens/homeScreens/PasswordAndSecurityScreen';
import ChangePasswordScreen from '../screens/homeScreens/ChangingInformationScreens/ChangePasswordScreen';
import ChangeNameScreen from '../screens/homeScreens/ChangingInformationScreens/ChangeNameScreen';
import ChangeEmailScreen from '../screens/homeScreens/ChangingInformationScreens/ChangeEmailScreen';
import ScheduleScreen from '../screens/homeScreens/ScheduleScreen';
import NotificationsScreen from '../screens/homeScreens/Notifications';
import ChangeContactScreen from '../screens/homeScreens/ChangingInformationScreens/ChangeContactScreen';
import ChangeJobScreen from '../screens/homeScreens/ChangingInformationScreens/ChangeJobScreen';
import ChangeSpecializationScreen from '../screens/homeScreens/ChangingInformationScreens/ChangeSpecializationScreen';
import ChangeWorkPlaceScreen from '../screens/homeScreens/ChangingInformationScreens/ChangeWorkPlaceScreen';

//patient screens
import PatientData from '../screens/patientScreens/PatientDataScreen';
import EmergencyContactScreen from '../screens/patientScreens/EmergencyContactScreen';
import MedicationScreen from '../screens/patientScreens/MedicationScreen';
import EditMedicationScreen from '../screens/patientScreens/EditMedicationScreen';
import NewMedicationScreen from '../screens/patientScreens/NewMedicationScreen';
import MessagesScreen from '../screens/homeScreens/MessagesScreen';


const Tab = createBottomTabNavigator();

const TabNavigator = ({ onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Set the tab bar icon based on the route name
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Patients List') {
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
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarButton: () => null,
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
        component={EditMedicationScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="NewMedications"
        component={NewMedicationScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
       <Tab.Screen
        name="ChangingContact"
        component={ChangeContactScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
       <Tab.Screen
        name="ChangingJob"
        component={ChangeJobScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
       <Tab.Screen
        name="ChangingSpecialization"
        component={ChangeSpecializationScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
       <Tab.Screen
        name="ChangingWorkPlace"
        component={ChangeWorkPlaceScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
