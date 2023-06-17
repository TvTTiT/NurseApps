import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../../styles/authenticationStyles/InformationFormStyles';
import { supabase } from '../../supabase/supabaseConfig';
import { UserContext } from '../../App';

const InformationFormScreen = ({ navigation, onLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [hospitalOrClinic, setHospitalOrClinic] = useState('');
  const [specialization, setSpecialization] = useState('');
  const { userID, setMedicalProfessionalId,medicalProfessionalId, userEmail } = useContext(UserContext);

  useEffect(() => {
    console.log(userID);
    console.log(medicalProfessionalId);
  }, [userID, medicalProfessionalId, userEmail]);

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('medicalprofessionals')
        .select('medical_professional_id')
        .order('medical_professional_id', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error retrieving max medical professional ID:', error);
        return;
      }

      const maxId = data[0]?.medical_professional_id || 0;
      const newProfessionalId = maxId + 1;

      const { error: createMedicalProfessionalError } = await supabase
        .from('medicalprofessionals')
        .insert([
          {
            medical_professional_id: newProfessionalId,
            first_name: firstName,
            last_name: lastName,
            job_title: jobTitle,
            contact_number: contactNumber,
            hospital_or_clinic: hospitalOrClinic,
            specialization: specialization,
            email: userEmail,
            user_id: userID
          },
        ]);

      if (createMedicalProfessionalError) {
        console.error('Error creating new medical Professional:', createMedicalProfessionalError);
        return;
      }

      console.log('New medical professional added successfully');

      setFirstName('');
      setLastName('');
      setJobTitle('');
      setContactNumber('');
      setHospitalOrClinic('');
      setSpecialization('');

      setMedicalProfessionalId(newProfessionalId); // Update the medicalProfessionalId in the context
      console.log(medicalProfessionalId);

      onLogin(newProfessionalId, userID);
    } catch (error) {
      console.error('Error adding new medical professional:', error);
    }
  };

  const handleCancel = async () => {
    try {
      const { error } = await supabase.from('users').delete().match({ user_id: userID });

      if (error) {
        console.error('Error deleting user data:', error);
        return;
      }

      console.log('User data deleted successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting user data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Personal Information</Text>
        <View style={styles.form}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />

          <Text style={styles.label}>Job Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Job Title"
            value={jobTitle}
            onChangeText={(text) => setJobTitle(text)}
          />

          <Text style={styles.label}>Hospital or Clinic</Text>
          <TextInput
            style={styles.input}
            placeholder="Hospital or Clinic"
            value={hospitalOrClinic}
            onChangeText={(text) => setHospitalOrClinic(text)}
          />

          <Text style={styles.label}>Specialization</Text>
          <TextInput
            style={styles.input}
            placeholder="Specialization"
            value={specialization}
            onChangeText={(text) => setSpecialization(text)}
          />

          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            keyboardType="phone-pad"
            value={contactNumber}
            onChangeText={(text) => setContactNumber(text)}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default InformationFormScreen;
