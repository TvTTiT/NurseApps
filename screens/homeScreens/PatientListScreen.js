import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../styles/homeStyles/PatientListStyles';
import { supabase } from '../../lib/supabaseConfig';

const PatientListScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      let { data: patients, error } = await supabase
        .from('patients')
        .select('patient_id,first_name,last_name');
      
      if (error) {
        console.error('Error fetching patients:', error);
        return;
      }
  
      setPatients(patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleSearch = (text) => {
    const filtered = patients.filter(
      (patient) =>
        patient.first_name.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
        patient.last_name.toLowerCase().indexOf(text.toLowerCase()) !== -1
    );
    setSearchText(text);
    setFilteredPatients(filtered);
  };

  const navigateToPatientDetail = (item) => {
    navigation.navigate('PatientData', { patient: item });
  };

  const renderPatient = ({ item }) => {
    const fullName = `${item.first_name} ${item.last_name}`;
    return (
      <TouchableOpacity
        style={styles.patientItem}
        onPress={() => navigateToPatientDetail(item)}
      >
        <View style={styles.patientShape}>
          <Text style={styles.patientName}>{fullName}</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={handleSearch}
          value={searchText}
          placeholder="Search for a patient"
          placeholderTextColor="#aaa"
        />
      </View>
      <FlatList
        data={patients}
        renderItem={renderPatient}
        keyExtractor={(item) => item.patient_id.toString()}
        style={styles.list}
      />
    </View>
  );
};

export default PatientListScreen;
