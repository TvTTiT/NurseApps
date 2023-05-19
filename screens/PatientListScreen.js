import React, { useState } from 'react';
import { Text, View, FlatList, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../styles/PatientListStyles'; 
const mockPatients = [
  { id: 1, name: 'John Smith', age: 45, condition: 'Diabetes' },
  { id: 2, name: 'Jane Doe', age: 32, condition: 'Hypertension' },
  { id: 3, name: 'Bob Johnson', age: 65, condition: 'Heart Disease' },
  { id: 4, name: 'Samantha Lee', age: 28, condition: 'Asthma' },
  { id: 5, name: 'Michael Brown', age: 50, condition: 'Cancer' },
  { id: 6, name: 'John Smith', age: 45, condition: 'Diabetes' },
  { id: 7, name: 'Jane Doe', age: 32, condition: 'Hypertension' },
  { id: 8, name: 'Bob Johnson', age: 65, condition: 'Heart Disease' },
  { id: 9, name: 'Samantha Lee', age: 28, condition: 'Asthma' },
  { id: 10, name: 'Michael Brown', age: 50, condition: 'Cancer' },
];

const PatientListScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredPatients, setFilteredPatients] = useState(mockPatients);

  const handleSearch = (text) => {
    // Filter the mock patient list by name
    const filtered = mockPatients.filter(
      (patient) =>
        patient.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
    );
    setFilteredPatients(filtered);
    setSearchText(text);
  };

  const renderPatient = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.patientItem}
        onPress={() => navigation.navigate('Patient Detail', { patient: item })}
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
          placeholder="Search for patient"
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
