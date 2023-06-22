import React, { useState,useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/homeStyles/ChangeNameStyles';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../supabase/supabaseConfig';
import { UserContext } from '../../../App';

const ChangeContactScreen = ({ navigation,route }) => {
  const contactNumber = route.params?.contactNumber;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { medicalProfessionalId, userID } = useContext(UserContext);

  const updateContact = async () => {
    try {
      const { error } = await supabase
        .from('medicalprofessionals')
        .update({
          contact_number: phoneNumber
        })
        .eq('medical_professional_id', medicalProfessionalId);

      if (error) {
        console.error('Error updating phoneNumber:', error);
        return;
      }
      alert('phoneNumber updated successfully');
      setPhoneNumber('');
      setConfirmPassword('');
      navigation.navigate('PersonalDetails');
    } catch (error) {
      console.error('Error updating phoneNumber:', error);
    }
  };

  const handleUpdateContact = async () => {
    try {
      let { data: user_password, error } = await supabase
        .from('users')
        .select('password')
        .eq('user_id', userID);

      if (error) {
        console.error('Error selecting password:', error);
        alert('Error selecting password');
        return;
      }
      const userPassword = user_password[0]?.password;
      if (confirmPassword === userPassword) {
        updateContact();
      } else {
        alert('Incorrect password!!!');
      }
    } catch (error) {
      console.error('Error selecting password:', error);
    }
  };

  const goBack = () => {
    setConfirmPassword('');
    setPhoneNumber('');
    navigation.navigate('PersonalDetails');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Changing contact</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder={contactNumber}
          placeholderTextColor="#003f5c"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="phone-pad" // Set keyboard type to numeric
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
      <TouchableOpacity style={styles.signupBtn} onPress={handleUpdateContact}>
        <Text style={styles.signupText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goBack}>
        <Text style={styles.back}>Changing your mind? Click here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeContactScreen;
