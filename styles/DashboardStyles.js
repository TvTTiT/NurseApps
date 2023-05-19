
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      alignItems: 'stretch',
      justifyContent: 'center',
      padding: 16,
    },
    card: {
      marginBottom: 16,
    },
    cardShape: {
      backgroundColor: '#fb5b5a',
      paddingVertical: 24,
      paddingHorizontal: 16,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    cardTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      textTransform: 'uppercase',
    },
  });