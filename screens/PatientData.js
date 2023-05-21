import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { patientDataStyles as styles } from '../styles/PatientDataStyles';

const PatientData = () => {
  // Sample data for the line chart
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [80, 85, 90, 88, 92, 95],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Line color
        strokeWidth: 2, // Line width
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Data</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={300}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          bezier
        />
      </View>
    </View>
  );
};

export default PatientData;
