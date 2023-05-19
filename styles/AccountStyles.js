import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 16,
      textTransform: 'uppercase',
    },
    card: {
      backgroundColor: '#fb5b5a',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      width: '80%',
    },
    infoText: {
      fontSize: 18,
      color: '#fff',
      marginBottom: 8,
      textAlign: 'center',
    },
    changeButton: {
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      alignSelf: 'center',
      marginBottom: 16,
    },
    changeButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fb5b5a',
      textTransform: 'uppercase',
    },
    logoutButton: {
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      alignSelf: 'center',
    },
    logoutButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fb5b5a',
      textTransform: 'uppercase',
    },
  });