import React, { useState, useEffect, useCallback,useContext } from 'react';
import { Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../styles/homeStyles/PatientListStyles';
import { supabase } from '../../supabase/supabaseConfig';
import { UserContext } from '../../App';
const PatientListScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [patients, setPatients] = useState([]);
  const { patientId,setPatientId } = useContext(UserContext);
  const fetchPatients = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchPatients);

    return unsubscribe;
  }, [navigation, fetchPatients]);

  useEffect(() => {
    if (patientId) {
      navigation.navigate('PatientData');
    }
  }, [patientId, navigation]);


  useEffect(() => {
    // Subscribe to the channel for new notification events
    const newPatientSubscription = supabase
      .channel('new-Patient-chanel')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'patients',
      }, handleUpdatePatient)
      .subscribe();

    // Unsubscribe from the channel when the component unmounts
    return () => {
      newPatientSubscription.unsubscribe();
    };
  }, []);


  useEffect(() => {
    // Subscribe to the channel for new notification events
    const updatePatientsubscription = supabase
      .channel('update-patients-chanel')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'patients',
      }, handleUpdatePatient)
      .subscribe();

    // Unsubscribe from the channel when the component unmounts
    return () => {
      updatePatientsubscription.unsubscribe();
    };
  }, []);

  const handleUpdatePatient = (payload) => {
    fetchPatients();
  }

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const navigateToPatientDetail = (patient_Id) => {
    setPatientId(patient_Id);
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
