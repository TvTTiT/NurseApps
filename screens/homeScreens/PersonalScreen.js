import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/homeStyles/PersonalStyles';

const PersonalScreen = ({ navigation }) => {
  const handleEditName = () => {
    console.log('Edit Name button pressed');
    // Logic for editing the name
    navigation.navigate('ChangingName');
  };

  const handleEditEmail = () => {
    console.log('Edit Email button pressed');
    // Logic for editing the email
    navigation.navigate('ChangingEmail');
  };

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
          <Text style={styles.infoText}>name</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={handleEditName}>
            <Ionicons name="chevron-forward" size={18} color="#555" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>email</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={handleEditEmail}>
            <Ionicons name="chevron-forward" size={18} color="#555" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PersonalScreen;
