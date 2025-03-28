import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import useStore from "../../store/store"
const SavedJobs = () => {
  const { bookmarkedJobs, toggleBookmark } = useStore();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Saved Jobs</Text>
      {bookmarkedJobs.length > 0 ? (
        <FlatList
          data={bookmarkedJobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.jobCard}>
              <Text style={styles.jobTitle}>{item.title}</Text>
              <Text style={styles.company}>{item.company_name}</Text>
              <TouchableOpacity onPress={() => toggleBookmark(item)} style={styles.removeButton}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 80 }} // Extra space for bottom UI
        />
      ) : (
        <Text style={styles.noJobs}>No saved jobs yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  jobCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 16,
    color: '#666',
  },
  removeButton: {
    marginTop: 8,
    backgroundColor: '#e12c2b',
    padding: 6,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  removeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noJobs: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SavedJobs;
