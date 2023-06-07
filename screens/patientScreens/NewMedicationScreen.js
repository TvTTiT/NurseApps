import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { styles } from '../../styles/patientStyles/EditMedicationStyles';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabaseConfig';
import { UserContext } from '../../App'; 

const NewMedicationScreen = ({ navigation, route }) => {
  const patientID = route.params?.patient;
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [instructions, setInstructions] = useState('');
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
  const { medicalProfessionalId } = useContext(UserContext);
  console.log('medicalProfessionalId:', medicalProfessionalId); 
  const clearData = () => {
    setMedicationName('');
    setDosage('');
    setFrequency('');
    setStartDate('');
    setEndDate('');
    setInstructions('');
    setShowStartDateCalendar(false);
    setShowEndDateCalendar(false);
  }
  const handleSaveClick = async () => {
    try {
      const { data: allMedications, error } = await supabase
        .from('medications')
        .select('medication_id');
  
      if (error) {
        console.error('Error fetching medications:', error);
        return;
      }
  
      // Find the maximum medication ID from the fetched data
      const maxMedicationID = allMedications.reduce((maxID, medication) => {
        return medication.medication_id > maxID ? medication.medication_id : maxID;
      }, 0);
  
      const newMedicationID = maxMedicationID + 1;
  
      // Create the new medication with the patient ID, medical professional ID, and new medication ID
      const { data, error: createError } = await supabase
        .from('medications')
        .insert([
          {
            patient_id: patientID,
            medical_professional_id: medicalProfessionalId[0].medical_professional_id,
            medication_name: medicationName,
            medication_id: newMedicationID,
            dosage,
            frequency,
            start_date: startDate,
            end_date: endDate,
            instructions,
          },
        ]);
  
      if (createError) {
        console.error('Error creating new medication:', createError);
        return;
      }
  
      console.log('New medication created:', data);
      clearData();
      navigation.navigate('Medications', { patient: patientID });
    } catch (error) {
      console.error('Error creating new medication:', error);
    }
  };
  
  
  const handleCancelClick = () => {
    clearData();
    navigation.navigate('Medications',{patient: patientID});
  };

  const handleStartDatePress = () => {
    setShowStartDateCalendar(true);
  };

  const handleEndDatePress = () => {
    setShowEndDateCalendar(true);
  };

  const handleDayPress = (day) => {
    if (showStartDateCalendar) {
      setStartDate(day.dateString);
      setShowStartDateCalendar(false);
    } else if (showEndDateCalendar) {
      setEndDate(day.dateString);
      setShowEndDateCalendar(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleCancelClick}>
          <Ionicons name="arrow-back" size={24} color="#fb5b5a" />
        </TouchableOpacity>
        <Text style={styles.title}>New Medication</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Medication Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Medication Name"
            value={medicationName}
            onChangeText={setMedicationName}
          />

          <Text style={styles.label}>Dosage</Text>
          <TextInput
            style={styles.input}
            placeholder="Dosage"
            value={dosage}
            onChangeText={setDosage}
          />

          <Text style={styles.label}>Frequency</Text>
          <TextInput
            style={styles.input}
            placeholder="Frequency"
            value={frequency}
            onChangeText={setFrequency}
          />

          <Text style={styles.label}>Start Date</Text>
          <TouchableOpacity style={styles.input} onPress={handleStartDatePress}>
            <Text>{startDate}</Text>
          </TouchableOpacity>
          {showStartDateCalendar && (
            <Calendar
              style={styles.calendar}
              onDayPress={handleDayPress}
              current={startDate}
            />
          )}

          <Text style={styles.label}>End Date</Text>
          <TouchableOpacity style={styles.input} onPress={handleEndDatePress}>
            <Text>{endDate}</Text>
          </TouchableOpacity>
          {showEndDateCalendar && (
            <Calendar
              style={styles.calendar}
              onDayPress={handleDayPress}
              current={endDate}
            />
          )}

          <Text style={styles.label}>Instructions</Text>
          <TextInput
            style={styles.input}
            placeholder="Instructions"
            value={instructions}
            onChangeText={setInstructions}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveClick}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelClick}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default NewMedicationScreen;
