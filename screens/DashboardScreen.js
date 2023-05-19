import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../styles/DashboardStyles'; 
const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Patient List Screen')}
      >
        <View style={styles.cardShape}>
          <Text style={styles.cardTitle}>Patient List</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Appointment Management')}
      >
        <View style={styles.cardShape}>
          <Text style={styles.cardTitle}>Appointment Management</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Medication Management')}
      >
        <View style={styles.cardShape}>
          <Text style={styles.cardTitle}>Medication Management</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};


export default DashboardScreen;
