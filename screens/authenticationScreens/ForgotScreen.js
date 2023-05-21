import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from '../../styles/authenticationStyles/ForgotStyles'; 
const ForgotScreen = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    // Here, you can add code to send a reset password link to the user's email address
    // Once the email is sent, you can display a success message to the user
    // You can also handle errors if the email address is not registered or if there's a problem sending the email
    // For now, we'll just log the email address to the console
    console.log(email);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Forgot Password</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleForgotPassword}>
        <Text style={styles.loginText}>Send Reset Password Link</Text>
      </TouchableOpacity>
    </View>
  );
};


export default ForgotScreen;
