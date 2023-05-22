import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/patientStyles/PatientDataStyles';
import { Ionicons } from '@expo/vector-icons';

const PatientDataScreen = ({ navigation }) => {
  const handleEmergencyContactsClick = () => {
    console.log("EmergencyContact");
    navigation.navigate('EmergencyContact');
  };

  const handleNotificationsClick = () => {
    console.log("Messages");
    navigation.navigate('Messages')
  };

  const handleMedicationsClick = () => {
    console.log("medications");
    navigation.navigate('Medications');
  };

  const handleBackButtonClick = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackButtonClick}>
        <Ionicons name="arrow-back" size={24} color="#fb5b5a" />
      </TouchableOpacity>
      <View style={styles.itemsContainer}>
      <Text style={styles.title}>Care Management</Text>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={handleNotificationsClick}
        >
          <Text style={styles.itemText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={handleMedicationsClick}
        >
          <Text style={styles.itemText}>Medications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={handleEmergencyContactsClick}
        >
          <Text style={styles.itemText}>Emergency Contacts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PatientDataScreen;
