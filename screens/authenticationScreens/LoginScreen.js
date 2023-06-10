import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { styles } from '../../styles/authenticationStyles/LoginStyles';
import { supabase } from '../../lib/supabaseConfig';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Check if email is in valid format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
  
    try {
      // Fetch user data for the entered email
      let { data: users, error } = await supabase
        .from('users')
        .select('email, password, user_role, user_id')
        .eq('email', email)
        .limit(1);
  
      if (error) {
        console.error('Error fetching user data:', error);
        return;
      }
  
      if (users.length === 0) {
        alert('Invalid email or password');
        return;
      }
  
      const user = users[0];
      const storedPassword = user.password;
      const userRole = user.user_role;
      const userId = user.user_id
      console.log(userId);
      // Compare stored password with entered password
      if (password !== storedPassword) {
        alert('Invalid email or password');
        return;
      }
  
      // Check if user role is "Admin"
      if (userRole !== 'Admin') {
        alert('Access restricted. Only medical professionals are allowed.');
        return;
      }
  
      // Authentication successful
      // Retrieve the user ID for further use
      const medicalprofessionalID = await fetchUserId(email);
      onLogin(medicalprofessionalID,userId);
    } catch (error) {
      console.error('Error performing login:', error);
    }
  };
  
  const fetchUserId = async (email) => {
    try {
      // Fetch user data for the entered email
      let { data: medicalprofessionals, error } = await supabase
        .from('medicalprofessionals')
        .select('medical_professional_id')
        .eq('email', email)
        .limit(1);
  
      if (error) {
        console.error('Error fetching user data:', error);
        return null;
      }
  
      if (medicalprofessionals.length === 0) {
        console.error('User not found');
        return null;
      }  
      return medicalprofessionals;
    } catch (error) {
      console.error('Error fetching user ID:', error);
      return null;
    }
  };

  const handleCreateAccount = () => {
    // Handle creating a new account here
    navigation.navigate('Signup Screen');
  };

  const handleForgotPassword = () => {
    // Handle resetting the password here
    navigation.navigate('Forgot Screen');
  };

  const handleGoogleLogin = () => {
    //onLogin();
  };
    
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>RoboMedic Solutions</Text>
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
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text style={styles.signup}>Don't have an account? Sign up here</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleLogin}>
        <AntDesign name="google" size={24} color="white" />
        <Text style={styles.googleText}>Login with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;