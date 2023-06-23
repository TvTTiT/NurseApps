import React, { useState, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/homeStyles/ChangeNameStyles'; 
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../supabase/supabaseConfig';
import { UserContext } from '../../../App';

const ChangeJobScreen = ({ navigation,route }) => {
  const jobTitle = route.params?.jobTitle;
  const { userPassword , userID} = useContext(UserContext);
  const [job, setJob] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updateJob= async () => {
    try {
      const { data, error } = await supabase
        .from('medicalprofessionals')
        .update({ 
          job_title: job
        })
        .eq('user_id', userID);

      if (error) {
        console.error('Error updating job:', error);
        return;
      }
      alert('job updated successfully');
      setJob('');
      setConfirmPassword('');
      navigation.navigate('PersonalDetails');
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };
  const handleUpdateJob = async () => {
    if(confirmPassword !== userPassword){
      alert("Incorrect Password");
    }else{
      updateJob();
    }
  };

  const goBack = () => {
    setJob('');
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
      <Text style={styles.title}>Changing job title</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder={jobTitle}
          placeholderTextColor="#003f5c"
          value={job}
          onChangeText={(text) => setJob(text)}
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
      <TouchableOpacity style={styles.signupBtn} onPress={handleUpdateJob}>
        <Text style={styles.signupText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goBack}>
        <Text style={styles.back}>Changing your mind? Click here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeJobScreen;
