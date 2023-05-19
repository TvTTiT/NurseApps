import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/ChangingInformationStyles'; 
const ChangingInformation = ({navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const Confirm = () => {
    // Perform sign-up logic here
  }

  const Cancel = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>New Account Information</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Full Name..."
          placeholderTextColor="#003f5c"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Confirm Password..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.confirmBtn} onPress={Confirm}>
        <Text style={styles.confirmText}>CONFIRM</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Cancel}>
        <Text style={styles.cancel}>Changing for mind? click here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangingInformation;
