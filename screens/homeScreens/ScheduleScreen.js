import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import { styles } from '../../styles/homeStyles/ScheduleStyles';

const ScheduleScreen = () => {
  const [items, setItems] = useState({
    '2023-05-22': [
      {
        name: 'Appointment 1',
        patient_id: 'Patient 1',
        time: '10:00 AM',
        location: 'Clinic A',
        purpose: 'Checkup',
      },
      {
        name: 'Appointment 2',
        patient_id: 'Patient 2',
        time: '02:30 PM',
        location: 'Clinic B',
        purpose: 'Follow-up',
      },
    ],
    '2023-05-23': [
      {
        name: 'Appointment 3',
        patient_id: 'Patient 3',
        time: '09:00 AM',
        location: 'Clinic C',
        purpose: 'Consultation',
      },
    ],
  });

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.appointmentItem} onPress={() => handleAppointmentPress(item)}>
        <Card>
          <Card.Content>
            <View>
              <Text>{item.name}</Text>
            </View>
            <Text>Patient ID: {item.patient_id}</Text>
            <Text>Time: {item.time}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Purpose: {item.purpose}</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDateContainer}>
        <Text>No appointments available</Text>
      </View>
    );
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const loadItems = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleAppointmentPress = (item) => {
    const updatedItems = { ...items };
    if (updatedItems[selectedDate]) {
      const filteredAppointments = updatedItems[selectedDate].filter(
        (appointment) => appointment.name !== item.name
      );
      if (filteredAppointments.length === 0) {
        delete updatedItems[selectedDate];
        setSelectedDate('');
      } else {
        updatedItems[selectedDate] = filteredAppointments;
      }
      setItems(updatedItems);
    }
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={{ [selectedDate]: items[selectedDate] || [] }}
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