import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/AccountStyles'; 
const AccountScreen = ({ navigation, name, email, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  const handleChangeInformation = () => {
    // Handle the logic for changing information here
    // You can navigate to a different screen or show a modal, etc.
    // For simplicity, let's log a message to the console
    console.log('Change Information button pressed');
    navigation.navigate("ChangingInformation");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Information</Text>
      <View style={styles.card}>
        <Text style={styles.infoText}>Name: {name}</Text>
        <Text style={styles.infoText}>Email: {email}</Text>
      </View>
      <TouchableOpacity style={styles.changeButton} onPress={handleChangeInformation}>
        <Text style={styles.changeButtonText}>Change Information</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};


export default AccountScreen;
