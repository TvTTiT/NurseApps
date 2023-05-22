import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/patientStyles/MedicationStyles';
import { Ionicons } from '@expo/vector-icons';

const MedicationScreen = ({ navigation }) => {
  const [medications, setMedications] = useState([
    {
      medication_name: 'Medication 1',
      dosage: '10mg',
      frequency: 'Twice daily',
      start_date: '2023-05-01',
      end_date: '2023-05-10',
      instructions: 'Take with food',
    },
    {
      medication_name: 'Medication 2',
      dosage: '5mg',
      frequency: 'Once daily',
      start_date: '2023-05-05',
      end_date: '2023-05-15',
      instructions: 'Take in the morning',
    },
  ]);
  const [selectedMedication, setSelectedMedication] = useState(null);

  const handleBackButtonClick = () => {
    navigation.navigate('PatientData');
  };

  const handleMedicationClick = (medication) => {
    setSelectedMedication(medication);
  };

  const handleEditClick = () => {
    if (selectedMedication) {
      console.log('Edit medication:', selectedMedication.medication_name);
      navigation.navigate('EditMedications', { medication: selectedMedication });
    }
  };
  
  const handleDeleteClick = () => {
    if (selectedMedication) {
      console.log('Delete medication:', selectedMedication.medication_name);
      setMedications((prevMedications) =>
        prevMedications.filter((med) => med.medication_name !== selectedMedication.medication_name)
      );
      setSelectedMedication(null);
    }
  };

  const handleAddNewMedication = () => {
    console.log('Add new medication');
    navigation.navigate('NewMedications');
  };

  const handleMedicationDetailsBackClick = () => {
    setSelectedMedication(null);
  };

  return (
    <View style={styles.container}>
      {selectedMedication ? (
        <View style={styles.medicationDetailsContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleMedicationDetailsBackClick}>
            <Ionicons name="arrow-back" size={24} color="#fb5b5a" />
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
            <Ionicons name="arrow-back" size={24} color="#fb5b5a" />
          </TouchableOpacity>
          <Text style={styles.title}>Medications</Text>
          {medications.map((medication, index) => (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={() => handleMedicationClick(medication)}
            >
              <Text style={styles.itemText}>{medication.medication_name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.itemContainer} onPress={handleAddNewMedication}>
            <Text style={styles.itemText}>Add New Medication</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MedicationScreen;
