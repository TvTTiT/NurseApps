import React, { useState } from 'react';
import { Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../styles/homeStyles/PatientListStyles';

const mockPatients = [
  { id: 1, name: 'John Smith'},
  { id: 2, name: 'Jane Doe'},
  { id: 3, name: 'Bob Johnson'},
  { id: 4, name: 'Samantha Lee'},
  { id: 5, name: 'Michael Brown'},
  { id: 6, name: 'John Smith'},
  { id: 7, name: 'Jane Doe'},
  { id: 8, name: 'Bob Johnson'},
  { id: 9, name: 'Samantha Lee'},
  { id: 10, name: 'Michael Brown'},
];

const PatientListScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredPatients, setFilteredPatients] = useState(mockPatients);

  const handleSearch = (text) => {
    const filtered = mockPatients.filter(
      (patient) =>
        patient.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
    );
    setFilteredPatients(filtered);
    setSearchText(text);
  };

  const navigateToPatientDetail = (item) => {
    //navigation.navigate('Patient Detail', { patient: item });
    navigation.navigate('PatientData', { patient: item });
  };

  const renderPatient = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.patientItem}
        onPress={() => navigateToPatientDetail(item)}
      >
        <View style={styles.patientShape}>
          <Text style={styles.patientName}>{item.name}</Text>
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
        data={filteredPatients}
        renderItem={renderPatient}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
};

export default PatientListScreen;
