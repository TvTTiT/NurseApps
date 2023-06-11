import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import { styles } from '../../styles/homeStyles/ScheduleStyles';
import { supabase } from '../../lib/supabaseConfig';
import { UserContext } from '../../App';

const ScheduleScreen = () => {
  const { medicalProfessionalId } = useContext(UserContext);
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchAppointments = async (date) => {
    try {
      const { data, error } = await supabase
        .from('appointmentschedule')
        .select('*')
        .eq('medical_professional_id', medicalProfessionalId[0].medical_professional_id)
        .eq('date', date);

      if (error) {
        console.error('Error fetching appointments', error);
      } else {
        // Organize fetched data by date
        const updatedItems = { [date]: data };
        setItems(updatedItems);
      }
    } catch (error) {
      console.error('Error fetching appointments', error);
    }
  };

  useEffect(() => {
    fetchAppointments(selectedDate); 
  }, [medicalProfessionalId]);

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.appointmentItem} onPress={() => handleAppointmentPress(item)}>
        <Card>
          <Card.Content style={styles.appointmentContent}>
            <Text style={styles.appointmentName}>{item.name}</Text>
            <Text style={styles.appointmentText}>Patient ID: {item.patient_id}</Text>
            <Text style={styles.appointmentText}>Time: {item.time}</Text>
            <Text style={styles.appointmentText}>Location: {item.location}</Text>
            <Text style={styles.appointmentText}>Purpose: {item.purpose}</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return null; // Return null when there are no appointments available for a date
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const loadItems = (day) => {
    const selectedDay = day.dateString;
    setSelectedDate(selectedDay);
    fetchAppointments(selectedDay);
  };

  const handleAppointmentPress = (item) => {
    // Handle appointment press here
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        current={currentDate}
        onDayPress={loadItems}
        selected={selectedDate}
        theme={{
          selectedDayBackgroundColor: '#fb5b5a',
          todayTextColor: '#fb5b5a',
          dotColor: '#fb5b5a',
          selectedDotColor: '#fb5b5a',
          agendaDayTextColor: '#fb5b5a',
          agendaDayNumColor: '#fb5b5a',
        }}
        style={{ borderWidth: 1 }}
      />
    </View>
  );
};

export default ScheduleScreen;