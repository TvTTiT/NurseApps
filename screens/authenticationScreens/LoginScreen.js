import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { styles } from '../../styles/authenticationStyles/LoginStyles';
import { supabase } from '../../lib/supabaseConfig';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({navigation,onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    // Perform login logic here
    // Check if email is in valid format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    // authentication
    onLogin();
  }

  const handleCreateAccount = () => {
    // Handle creating a new account here
    navigation.navigate("Signup Screen");
    
  }

  const handleForgotPassword = () => {
    // Handle resetting the password here
    navigation.navigate("Forgot Screen");
  }

  const handleGoogleLogin = async () => {
    try {
      console.log('Fetching user data...');
      
      
      let { data: users, error } = await supabase
      .from('users')
      .select('user_id')

      if (error) {
        console.error('Error fetching user data:', error);
        return;
      }
      if (users && users.length > 0) {
        console.log(users);
      } else {
        console.log('No user data found.');
      }
    } catch (error) {
      console.error('Error performing Google login:', error);
    }
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
      <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleLogin} >
        <AntDesign name="google" size={24} color="white" />
        <Text style={styles.googleText}>Login with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;