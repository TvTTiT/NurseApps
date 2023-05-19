import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/HomeStyles'; 
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>Manage your patients' health information with ease</Text>
          </View>
        </View>
      </View>
    </View>
  );
};



export default HomeScreen;
