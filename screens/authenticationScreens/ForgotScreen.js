import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from '../../styles/authenticationStyles/ForgotStyles';
import { supabase } from '../../lib/supabaseConfig';

const ForgotScreen = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single();

      if (error) {
        console.error('Error selecting user:', error);
        alert('Error selecting user');
        return;
      }

      if (!data) {
        console.error('User not found');
        alert('User not found');
        return;
      }

      // Send the reset password email to the user (Step 1)
      // You can use an external service or your own backend to send the email

      alert('Reset password email sent successfully');
    } catch (error) {
      alert('Invalid email address');
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
