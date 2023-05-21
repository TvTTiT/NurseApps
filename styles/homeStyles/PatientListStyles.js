import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
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
    flex: 1,
  },
  patientItem: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  patientShape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fb5b5a',
  },
  patientName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'capitalize',
    marginRight: 16,
  },
});
