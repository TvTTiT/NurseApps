import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/homeStyles/PersonalStyles';
import { supabase } from '../../supabase/supabaseConfig';
import { UserContext } from '../../App';

const PersonalScreen = ({ navigation }) => {
  const { medicalProfessionalId } = useContext(UserContext);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [contactNumber, setContactNumber] = useState(null);

  const fetchMedicalProfessional = async () => {
    try {
      const { data, error } = await supabase
        .from('medicalprofessionals')
        .select('*')
        .eq('medical_professional_id', medicalProfessionalId[0].medical_professional_id);

      if (error) {
        console.error('Error fetching medical professional:', error);
        return;
      }

      const { first_name, last_name, contact_number, email } = data[0];
      const name = `${first_name} ${last_name}`;
      setFirstName(first_name);
      setLastName(last_name);
      setFullName(name);
      setContactNumber(contact_number);
      setEmail(email);
    } catch (error) {
      console.error('Error fetching medical professional:', error);
    }
  };

  useEffect(() => {
    fetchMedicalProfessional();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMedicalProfessional();
    });

    return unsubscribe;
  }, [navigation]);

  const handleEditName = () => {
    console.log('Edit Name button pressed');
    // Logic for editing the name
    navigation.navigate('ChangingName', { first_name: firstName, last_name: lastName });
  };

  const handleEditEmail = () => {
    console.log('Edit Email button pressed');
    // Logic for editing the email
    navigation.navigate('ChangingEmail', {email: email });
  };

  const handleEditContact = () => {
    console.log('Edit Contact button pressed');
    // Logic for editing the contact number
    navigation.navigate('ChangingContact', {contactNumber: contactNumber });
  };

  useEffect(() => {
    console.log('Data updated:', fullName, email, contactNumber);
  }, [fullName, email, contactNumber]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Personal Details</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Name</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>{fullName}</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={handleEditName}>
            <Ionicons name="chevron-forward" size={18} color="#555" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>{email}</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={handleEditEmail}>
            <Ionicons name="chevron-forward" size={18} color="#555" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Contact Number</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>{contactNumber}</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={handleEditContact}>
            <Ionicons name="chevron-forward" size={18} color="#555" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PersonalScreen;
