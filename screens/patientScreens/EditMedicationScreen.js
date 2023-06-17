import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { styles } from '../../styles/patientStyles/EditMedicationStyles';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../supabase/supabaseConfig';

const EditMedicationScreen = ({ navigation, route }) => {
  const medicationID = route.params?.medication;
  const { medication } = route.params;
  const [medicationName, setMedicationName] = useState(medication?.medication_name || '');
  const [dosage, setDosage] = useState(medication?.dosage || '');
  const [frequency, setFrequency] = useState(medication?.frequency || '');
  const [startDate, setStartDate] = useState(medication?.start_date || '');
  const [endDate, setEndDate] = useState(medication?.end_date || '');
  const [instructions, setInstructions] = useState(medication?.instructions || '');
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);

  const handleSaveClick = async () => {
    try {
      console.log('Updating medication:', {
        medicationID,
        medicationName,
        dosage,
        frequency,
        startDate,
        endDate,
        instructions,
      });
  
      const { data, error } = await supabase
        .from('medications')
        .update({
          medication_name: medicationName,
          dosage,
          frequency,
          start_date: startDate,
          end_date: endDate,
          instructions,
        })
        .eq('medication_id', medicationID);
  
      if (error) {
        console.error('Error updating medication:', error);
        return;
      }
  
      console.log('Medication updated:', data);
  
      navigation.navigate('Medications');
    } catch (error) {
      console.error('Error updating medication:', error);
    }
  };
  
  
  const handleCancelClick = () => {
    navigation.navigate('Medications');
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
        <Ionicons name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>
      <Text style={styles.title}>Edit Medication</Text>
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

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelClick}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

export default EditMedicationScreen;