import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        padding: 16,
      },
      searchContainer: {
        marginBottom: 16,
      },
      searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 18,
        color: '#333',
        backgroundColor: '#fff',
      },
      list: {
        flexGrow: 1,
      },
      patientItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
      },
      patientShape: {
        backgroundColor: '#fb5b5a',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      },
      patientName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'lowercase',
      },
  });