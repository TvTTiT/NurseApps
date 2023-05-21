import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/authenticationStyles/SigupStyles'; 

const SignupScreen = ({navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    // Perform sign-up logic here
  }

  const LogInHere = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sign Up</Text>
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
      <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
        <Text style={styles.signupText}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={LogInHere}>
        <Text style={styles.login}>Already have an account? Log in here</Text>
      </TouchableOpacity>
    </View>
  );
};



export default SignupScreen;
