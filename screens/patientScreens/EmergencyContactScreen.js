import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/patientStyles/EmergencyContactStyles';

const EmergencyContactScreen = ({ navigation }) => {
  const handleBackButtonClick = () => {
    navigation.navigate('PatientData');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackButtonClick}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>First Name:</Text>
          <Text style={styles.fieldValue}>John</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Last Name:</Text>
          <Text style={styles.fieldValue}>Doe</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Relationship:</Text>
          <Text style={styles.fieldValue}>Parent</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Contact Number:</Text>
          <Text style={styles.fieldValue}>123-456-7890</Text>
        </View>
      </View>
    </View>
  );
};

export default EmergencyContactScreen;
