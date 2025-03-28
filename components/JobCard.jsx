import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useStore from "../store/store";

const JobCard = ({ job, onPress }) => {
  const { bookmarkedJobs, toggleBookmark } = useStore();
  const isBookmarked = bookmarkedJobs.some((bJob) => bJob.id === job.id);

  return (
    <View style={styles.jobCard}>
      {job.creatives[0]?.file && (
        <Image source={{ uri: job.creatives[0].file }} style={styles.jobImage} />
      )}

      <View style={styles.header}>
        <Text style={styles.jobTitle}>{job.title}</Text>
        <TouchableOpacity onPress={() => toggleBookmark(job)} style={styles.bookmarkIcon}>
          <Icon name={isBookmarked ? 'heart' : 'heart-o'} size={22} color={isBookmarked ? '#e12c2b' : '#888'} />
        </TouchableOpacity>
      </View>

      <Text style={styles.company}>{job.company_name}</Text>
      <Text style={styles.salary}>{`Salary: ₹${job.salary_min} - ₹${job.salary_max}`}</Text>
      <Text style={styles.location}>{`Location: ${job.primary_details?.Place || 'Unknown'}`}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPress} style={styles.applyButton}>
          <Text style={styles.applyText}>View Details</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hr} />
    </View>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  jobCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  jobImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  company: {
    fontSize: 16,
    color: '#666',
  },
  salary: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  bookmarkIcon: {
    padding: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  applyButton: {
    backgroundColor: '#e12c2b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  applyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 10,
  },
});