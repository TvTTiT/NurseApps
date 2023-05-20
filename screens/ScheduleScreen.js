import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, Modal } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, TextInput, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { styles } from '../styles/ScheduleStyles';

const ScheduleScreen = () => {
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [appointmentText, setAppointmentText] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    setItems({});
  }, []);

  const handleItemPress = (item) => {
    setSelectedAppointment(item);
    setAppointmentText(item.name);
    setModalVisible(true);
  };

  const handleAddAppointment = () => {
    if (!selectedDate) {
      Alert.alert('Error', 'Please select a date.');
      return;
    }

    if (appointmentText.trim() === '') {
      Alert.alert('Error', 'Please enter appointment text.');
      return;
    }

    const newAppointment = { name: appointmentText.trim(), height: 80 };
    const updatedItems = { ...items };

    if (!updatedItems[selectedDate]) {
      updatedItems[selectedDate] = [];
    }

    updatedItems[selectedDate].push(newAppointment);
    setItems(updatedItems);
    setAppointmentText('');
    setModalVisible(false); // Close the modal
    setSelectedAppointment(null); // Reset selected appointment
  };

  const handleEditAppointment = () => {
    if (!selectedAppointment) return;

    if (appointmentText.trim() === '') {
      Alert.alert('Error', 'Please enter appointment text.');
      return;
    }

    const updatedAppointment = { ...selectedAppointment, name: appointmentText.trim() };
    const updatedItems = { ...items };
    const appointmentDate = selectedDate;

    if (updatedItems[appointmentDate]) {
      const index = updatedItems[appointmentDate].findIndex(
        (item) => item.name === selectedAppointment.name
      );
      if (index !== -1) {
        updatedItems[appointmentDate][index] = updatedAppointment;
        setItems(updatedItems);
        setAppointmentText('');
        setSelectedAppointment(null);
        setModalVisible(false);
      }
    }
  };

  const handleDeleteAppointment = () => {
    if (!selectedAppointment) return;

    const updatedItems = { ...items };
    const appointmentDate = selectedDate;

    if (updatedItems[appointmentDate]) {
      const index = updatedItems[appointmentDate].findIndex(
        (item) => item.name === selectedAppointment.name
      );
      if (index !== -1) {
        updatedItems[appointmentDate].splice(index, 1);
        setItems(updatedItems);
        setAppointmentText('');
        setSelectedAppointment(null);
        setModalVisible(false);
      }
    }
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)}>
        <Card>
          <Card.Content>
            <View style={styles.itemContent}>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDateContainer}>
        <Text style={styles.emptyDateText}>No appointments</Text>
      </View>
    );
  };

  const handleDayPress = (day) => {
    const today = new Date().toISOString().split('T')[0];
    if (day.dateString < today) {
      setSelectedDate(today);
    } else {
      setSelectedDate(day.dateString);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedAppointment(null); // Reset selected appointment
    setAppointmentText(''); // Reset appointment text
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        selected={selectedDate}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        onDayPress={handleDayPress}
        minDate={new Date().toISOString().split('T')[0]} // Set minDate to today's date
      />
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {/* Add/Edit Appointment Modal */}
      <Modal
        visible={isModalVisible}
        onRequestClose={handleCancel}
        transparent
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              label="Appointment"
              value={appointmentText}
              onChangeText={(text) => setAppointmentText(text)}
              style={styles.textInput}
            />
            <Button mode="contained" onPress={selectedAppointment ? handleEditAppointment : handleAddAppointment}>
              {selectedAppointment ? 'Edit Appointment' : 'Add Appointment'}
            </Button>
            {selectedAppointment && (
              <Button mode="outlined" onPress={handleDeleteAppointment} style={styles.deleteButton}>
                Delete Appointment
              </Button>
            )}
            <Button mode="outlined" onPress={handleCancel} style={styles.cancelButton}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ScheduleScreen;
