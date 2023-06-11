import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/patientStyles/PatientDataStyles';
import { Ionicons } from '@expo/vector-icons';

const PatientDataScreen = ({ navigation, route }) => {
  const patient = route.params?.patient;

  const handleEmergencyContactsClick = () => {
    navigation.navigate('EmergencyContact', { patient: patient});
  };

  const handleMedicationsClick = () => {
    navigation.navigate('Medications', { patient: patient});
  };

  const handleMessagesClick = () => {
    navigation.navigate('Messages', { patient: patient});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Patients List')}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Patient Details</Text>
      </View>
      <TouchableOpacity style={styles.infoContainer} onPress={handleMessagesClick}>
        <Text style={styles.infoLabel}>Messages</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Tap to send messages</Text>
          <Ionicons name="chevron-forward" size={18} color="#555" style={styles.icon} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoContainer} onPress={handleMedicationsClick}>
        <Text style={styles.infoLabel}>Medications</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Tap to view medications</Text>
          <Ionicons name="chevron-forward" size={18} color="#555" style={styles.icon} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoContainer} onPress={handleEmergencyContactsClick}>
        <Text style={styles.infoLabel}>Emergency Contact</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Tap to view details</Text>
          <Ionicons name="chevron-forward" size={18} color="#555" style={styles.icon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PatientDataScreen;
