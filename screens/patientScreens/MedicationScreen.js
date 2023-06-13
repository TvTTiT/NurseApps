import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/patientStyles/MedicationStyles';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabaseConfig';

const MedicationScreen = ({ navigation, route }) => {
  const patientID = route.params?.patient;
  const [medications, setMedications] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState(null);

  const fetchMedications = useCallback(async () => {
    try {
      const { data: medications, error } = await supabase
        .from('medications')
        .select('*')
        .eq('patient_id', patientID);

      if (error) {
        console.error('Error fetching medications:', error);
        return;
      }

      console.log(medications);
      setMedications(medications);
    } catch (error) {
      console.error('Error fetching medications:', error);
    }
  }, [patientID]);

  useEffect(() => {
    fetchMedications();

    // Clean up function
    return () => {
      setMedications([]); // Reset medications when component unmounts
    };
  }, [fetchMedications]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchMedications);

    return unsubscribe;
  }, [navigation, fetchMedications]);

  const handleBackButtonClick = () => {
    navigation.navigate('PatientData', { patient: patientID });
  };

  const handleMedicationClick = (medication) => {
    setSelectedMedication(medication);
  };

  const handleEditClick = () => {
    if (selectedMedication) {
      navigation.navigate('EditMedications', {
        patient: patientID,
        medication: selectedMedication.medication_id,
      });
    }
  };

  const handleDeleteClick = async () => {
    if (selectedMedication) {
      try {
        const { error } = await supabase
          .from('medications')
          .delete()
          .eq('medication_id', selectedMedication.medication_id);

        if (error) {
          console.error('Error deleting medication:', error);
          return;
        }

        console.log('Medication deleted');
        setSelectedMedication(null);
        fetchMedications(); // Fetch medications after deletion
      } catch (error) {
        console.error('Error deleting medication:', error);
      }
    }
  };

  const handleAddNewMedication = () => {
    navigation.navigate('NewMedications', {
      patient: patientID,
    });
  };

  const handleMedicationDetailsBackClick = () => {
    setSelectedMedication(null);
  };
  return (
    <View style={styles.container}>
      {selectedMedication ? (
        <View style={styles.medicationDetailsContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleMedicationDetailsBackClick}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.medicationDetailsTitle}>Medication Details</Text>
          <View style={styles.medicationDetailsCard}>
            <View style={styles.medicationInfoContainer}>
              <Text style={styles.medicationInfoLabel}>Medication Name:</Text>
              <Text style={styles.medicationInfoText}>{selectedMedication.medication_name}</Text>
              <Text style={styles.medicationInfoLabel}>Dosage:</Text>
              <Text style={styles.medicationInfoText}>{selectedMedication.dosage}</Text>
              <Text style={styles.medicationInfoLabel}>Frequency:</Text>
              <Text style={styles.medicationInfoText}>{selectedMedication.frequency}</Text>
              <Text style={styles.medicationInfoLabel}>Start Date:</Text>
              <Text style={styles.medicationInfoText}>{selectedMedication.start_date}</Text>
              <Text style={styles.medicationInfoLabel}>End Date:</Text>
              <Text style={styles.medicationInfoText}>{selectedMedication.end_date}</Text>
              <Text style={styles.medicationInfoLabel}>Instructions:</Text>
              <Text style={styles.medicationInfoText}>{selectedMedication.instructions}</Text>
            </View>
            <View style={styles.medicationDetailsButtonsContainer}>
              <TouchableOpacity style={styles.editMedicationButton} onPress={handleEditClick}>
                <Text style={styles.editMedicationButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteMedicationButton} onPress={handleDeleteClick}>
                <Text style={styles.deleteMedicationButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.itemsContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackButtonClick}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.title}>Medications</Text>
          {medications.map((medication) => (
            <TouchableOpacity
              key={medication.medication_id}
              style={styles.itemContainer}
              onPress={() => handleMedicationClick(medication)}
            >
              <Text style={styles.itemText}>{medication.medication_name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addNewMedicationButton} onPress={handleAddNewMedication}>
            <Text style={styles.addNewMedicationButtonText}>Add New Medication</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MedicationScreen;