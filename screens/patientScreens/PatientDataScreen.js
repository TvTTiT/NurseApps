import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/patientStyles/PatientDataStyles';

const PatientDataScreen = ({ navigation }) => {
  const handleEmergencyContactsClick = () => {
    console.log("EmergencyContact");
    navigation.navigate('EmergencyContact');
  };

  const handleNotificationsClick = () => {
    console.log("notifications");
  };

  const handleMedicationsClick = () => {
    console.log("medications");
  };

  const handleBackButtonClick = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackButtonClick}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.itemsContainer}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={handleEmergencyContactsClick}
        >
          <Text style={styles.itemText}>Emergency Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={handleNotificationsClick}
        >
          <Text style={styles.itemText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={handleMedicationsClick}
        >
          <Text style={styles.itemText}>Medications</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PatientDataScreen;
