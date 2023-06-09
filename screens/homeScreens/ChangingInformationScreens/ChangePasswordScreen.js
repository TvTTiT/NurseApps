import React, { useState, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/homeStyles/ChangePasswordStyles';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabaseConfig';
import { UserContext } from '../../../App';

const ChangePasswordScreen = ({navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { userID } = useContext(UserContext);
  const updatePassword = async () => {
    try {
      const { error } = await supabase
        .from('users')
        .update({
          password: newPassword
        })
        .eq('user_id', userID);

      if (error) {
        console.error('Error updating password:', error);
        return;
      }
      alert('password updated successfully');
      setConfirmPassword('');
      navigation.navigate('PersonalDetails');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleUpdatePassword = () => {
   if(newPassword != confirmPassword){
    alert("Passwords do not match")
   }else {
    updatePassword();
   }
  };


  const goBack = () => {
    setNewPassword('');
    setConfirmPassword('');
    navigation.navigate('PersonalDetails');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Changing Password</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="New Password..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
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
      <TouchableOpacity style={styles.signupBtn} onPress={handleUpdatePassword}>
        <Text style={styles.signupText}>Comfirm</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goBack}>
        <Text style={styles.back}>Changing your mind? click here</Text>
      </TouchableOpacity>
    </View>
  );
};



export default ChangePasswordScreen;
