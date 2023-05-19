import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fb5b5a',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
    },
    header: {
      backgroundColor: '#fff',
      borderRadius: 20,
      paddingVertical: 64,
      paddingHorizontal: 32,
      marginBottom: 50,
    },
    titleContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#fb5b5a',
      marginBottom: 16,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 24,
      color: '#fb5b5a',
      textAlign: 'center',
    },
  });