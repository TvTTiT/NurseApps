import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/homeStyles/ChangePasswordStyles';

const ChangePasswordScreen = ({navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const confirm = () => {
    // Perform sign-up logic here
  }

  const changeMind = () => {
    navigation.navigate('PersonalDetails');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Changing Password</Text>
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
      <TouchableOpacity style={styles.signupBtn} onPress={confirm}>
        <Text style={styles.signupText}>Comfirm</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={changeMind}>
        <Text style={styles.back}>Changing your mind? click here</Text>
      </TouchableOpacity>
    </View>
  );
};



export default ChangePasswordScreen;
