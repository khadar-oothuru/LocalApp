import React, { useState, useEffect } from 'react';
import { 
  View, TextInput, FlatList, SafeAreaView, StyleSheet, 
  Text, TouchableOpacity, Image, RefreshControl, Modal, Linking, ActivityIndicator 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import JobCard from '../../components/JobCard';

const SearchJobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchJobs(1, true);
  }, []);

  const fetchJobs = async (pageNumber, reset = false) => {
    try {
      if (!reset) setLoadingMore(true);
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${pageNumber}`);
      if (response.data?.results && Array.isArray(response.data.results)) {
        setJobs(reset ? response.data.results : [...jobs, ...response.data.results]);
        setFilteredJobs(reset ? response.data.results : [...filteredJobs, ...response.data.results]);
        setPage(pageNumber);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = jobs.filter(job => job.title && job.title.toLowerCase().includes(text.toLowerCase()));
    setFilteredJobs(filtered);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchJobs(1, true);
    setRefreshing(false);
  };

  const loadMoreJobs = () => {
    if (!loadingMore) {
      fetchJobs(page + 1);
    }
  };

  const openModal = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const handleWhatsApp = (job) => {
    const message = `Hello, I'm interested in the job: ${job.title}`;
    Linking.openURL(`whatsapp://send?phone=${job.whatsapp_no}&text=${encodeURIComponent(message)}`);
  };

  const handleCallHR = (job) => {
    Linking.openURL(`tel:${job.whatsapp_no}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search Jobs..." 
          value={searchQuery} 
          onChangeText={handleSearch} 
        />
      </View>

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => <JobCard job={item} onPress={() => openModal(item)} />}
        contentContainerStyle={{ paddingBottom: 80 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onEndReached={loadMoreJobs}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="#e12c2b" /> : null}
      />

      {/* Job Details Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedJob && (
              <>
                <Image source={{ uri: selectedJob.creatives[0]?.file }} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedJob.title}</Text>
                <Text style={styles.modalCompany}>{selectedJob.company_name}</Text>
                <Text style={styles.modalSalary}>{`Salary: ₹${selectedJob.salary_min} - ₹${selectedJob.salary_max}`}</Text>
                <Text style={styles.modalLocation}>{`Location: ${selectedJob.primary_details?.Place || 'Unknown'}`}</Text>

                <TouchableOpacity style={styles.modalButton} onPress={() => handleWhatsApp(selectedJob)}>
                  <Text style={styles.modalButtonText}>WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalButton} onPress={() => handleCallHR(selectedJob)}>
                  <Text style={styles.modalButtonText}>Call HR</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, marginBottom: 10, backgroundColor: '#f9f9f9' },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 40 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '90%' },
  modalImage: { width: '100%', height: 150, borderRadius: 8, marginBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  modalCompany: { fontSize: 16, color: '#666' },
  modalSalary: { fontSize: 14, color: '#444', marginTop: 4 },
  modalLocation: { fontSize: 14, color: '#777', marginTop: 4 },
  modalButton: { backgroundColor: '#e12c2b', paddingVertical: 10, borderRadius: 6, alignItems: 'center', marginTop: 10 },
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default SearchJobs;
