import React, { useState, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/homeStyles/ChangeNameStyles'; 
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../supabase/supabaseConfig';
import { UserContext } from '../../../App';

const ChangeSpecializationScreen = ({ navigation,route }) => {
  const Specialization = route.params?.specialization;
  const { userPassword , userID} = useContext(UserContext);
  const [specialization, setSpecialization] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updateSpecialization= async () => {
    try {
      const { data, error } = await supabase
        .from('medicalprofessionals')
        .update({ 
          specialization: specialization
        })
        .eq('user_id', userID);

      if (error) {
        console.error('Error updating specialization:', error);
        return;
      }
      alert('specialization updated successfully');
      setSpecialization('');
      setConfirmPassword('');
      navigation.navigate('PersonalDetails');
    } catch (error) {
      console.error('Error updating specialization:', error);
    }
  };
  const handleUpdateSpecialization = async () => {
    if(confirmPassword !== userPassword){
      alert("Incorrect Password");
    }else{
      updateSpecialization();
    }
  };

  const goBack = () => {
    setSpecialization('');
    setConfirmPassword('');
    navigation.navigate('PersonalDetails');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Changing specialization</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder={Specialization}
          placeholderTextColor="#003f5c"
          value={specialization}
          onChangeText={(text) => setSpecialization(text)}
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
      <TouchableOpacity style={styles.signupBtn} onPress={handleUpdateSpecialization}>
        <Text style={styles.signupText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goBack}>
        <Text style={styles.back}>Changing your mind? Click here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeSpecializationScreen;
