import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/patientStyles/EmergencyContactStyles';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabaseConfig';

const EmergencyContactScreen = ({ navigation, route }) => {
  const [emergencyContact, setEmergencyContact] = useState(null);
  const patientID = route.params?.patient;
  useEffect(() => {
    fetchEmergencyContact();
  }, [emergencyContact]);

  const fetchEmergencyContact = async () => {
    try {
      const { data: emergencyContacts, error } = await supabase
        .from('emergencycontacts')
        .select('*')
        .eq('patient_id', patientID)
        .limit(1);

      if (error) {
        console.error('Error fetching emergency contact:', error);
        return;
      }

      if (emergencyContacts.length > 0) {
        setEmergencyContact(emergencyContacts[0]);
      }
    } catch (error) {
      console.error('Error fetching emergency contact:', error);
    }
  };

  const handleBackButtonClick = () => {
    setEmergencyContact(null);
    navigation.navigate('PatientData',{patient: patientID});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackButtonClick}>
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        {emergencyContact ? (
          <>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>First Name:</Text>
              <Text style={styles.fieldValue}>{emergencyContact.first_name}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Last Name:</Text>
              <Text style={styles.fieldValue}>{emergencyContact.last_name}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Relationship:</Text>
              <Text style={styles.fieldValue}>{emergencyContact.relationship}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Contact Number:</Text>
              <Text style={styles.fieldValue}>{emergencyContact.contact_number}</Text>
            </View>
          </>
        ) : (
          <Text>No emergency contact found.</Text>
        )}
      </View>
    </View>
  );
};

export default EmergencyContactScreen;
