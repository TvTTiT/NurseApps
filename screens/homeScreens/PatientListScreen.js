import React, { useState, useEffect, useContext } from 'react';
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
      const { data: patients, error } = await supabase
        .from('patients')
        .select('patient_id, first_name, last_name');

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
    setSearchText(text);
  };

  const navigateToPatientDetail = (patientId) => {
    navigation.navigate('PatientData', { patient: patientId });
  };

  const renderPatient = ({ item }) => {
    const fullName = `${item.first_name} ${item.last_name}`;

    if (
      searchText &&
      fullName.toLowerCase().indexOf(searchText.toLowerCase()) === -1
    ) {
      return null;
    }

    return (
      <TouchableOpacity
        style={styles.patientItem}
        onPress={() => navigateToPatientDetail(item.patient_id)}
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
