import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { styles } from '../../styles/authenticationStyles/ForgotStyles';
import { supabase } from '../../supabase/supabaseConfig';

const ForgotScreen = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        throw new Error(error.message);
      }
      Alert.alert('Password Reset', 'Reset password link sent to your email!');
    } catch (error) {
      console.log('Error sending password reset email:', error.message);
      Alert.alert('Error', 'Failed to send reset password link. Please try again.');
    }
  };

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
