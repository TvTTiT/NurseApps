import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/PasswordAndSecurityStyles';

const PasswordAndSecurityScreen = ({ navigation }) => {
  const handleChangePassword = () => {
    console.log('Change Password button pressed');
    // Logic for changing the password
    navigation.navigate('ChangingPassword');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Password and Security</Text>
      </View>
      <TouchableOpacity style={styles.infoContainer} onPress={handleChangePassword}>
        <Text style={styles.infoLabel}>Change Password</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>********</Text>
          <Ionicons name="chevron-forward" size={18} color="#555" style={styles.icon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordAndSecurityScreen;
