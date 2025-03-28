import React, { useState, useEffect } from 'react';
import { 
  View, TextInput, FlatList, SafeAreaView, StyleSheet, 
  Text, TouchableOpacity, Image, RefreshControl, Modal, Linking 
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
  // const [filters, setFilters] = useState({
  //   location: '',
  //   jobType: '',
  // });
  // const [locationSuggestions, setLocationSuggestions] = useState([]);
  // const [jobTypeSuggestions, setJobTypeSuggestions] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('https://testapi.getlokalapp.com/common/jobs?page=1');

      if (response.data?.results && Array.isArray(response.data.results)) {
        setJobs(response.data.results);
        setFilteredJobs(response.data.results);
      } else {
        console.error('Unexpected API response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    applyFilters(text);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchJobs();
    setRefreshing(false);
  };

  const applyFilters = (searchText = searchQuery) => {
    let filtered = jobs;

    if (searchText) {
      filtered = filtered.filter(job => job.title && job.title.toLowerCase().includes(searchText.toLowerCase()));
    }

    if (filters.location) {
      filtered = filtered.filter(job => job.primary_details?.Place === filters.location);
    }

    if (filters.jobType) {
      filtered = filtered.filter(job => job.job_type === filters.jobType);
    }

    setFilteredJobs(filtered);
  };

  const openModal = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const handleWhatsApp = (job) => {
    const message = `Hello, I'm interested in the job: ${job.title}`;
    const phoneNumber = job.whatsapp_no;
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
  };

  const handleCallHR = (job) => {
    Linking.openURL(`tel:${job.whatsapp_no}`);
  };

  // const handleLocationInput = (text) => {
  //   setFilters({ ...filters, location: text });
  //   const suggestions = jobs
  //     .map(job => job.primary_details?.Place)
  //     .filter((place, index, self) => place && self.indexOf(place) === index)
  //     .filter(place => place.toLowerCase().includes(text.toLowerCase()));
  //   setLocationSuggestions(suggestions);
  // };

  // const handleJobTypeInput = (text) => {
  //   setFilters({ ...filters, jobType: text });
  //   const suggestions = jobs
  //     .map(job => job.job_type)
  //     .filter((type, index, self) => type && self.indexOf(type) === index)
  //     .filter(type => type.toLowerCase().includes(text.toLowerCase()));
  //   setJobTypeSuggestions(suggestions);
  // };

  // const selectLocation = (location) => {
  //   setFilters({ ...filters, location });
  //   setLocationSuggestions([]);
  // };

  // const selectJobType = (jobType) => {
  //   setFilters({ ...filters, jobType });
  //   setJobTypeSuggestions([]);
  // };

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

      {/* <View style={styles.filterContainer}>
        <View style={styles.filterInputContainer}>
          <TextInput
            style={styles.filterInput}
            placeholder="Location"
            value={filters.location}
            onChangeText={handleLocationInput}
          />
          {locationSuggestions.length > 0 && (
            <FlatList
              data={locationSuggestions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectLocation(item)}>
                  <Text style={styles.suggestionItem}>{item}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionsList}
            />
          )}
        </View> */}

        {/* <View style={styles.filterInputContainer}>
          <TextInput
            style={styles.filterInput}
            placeholder="Job Type"
            value={filters.jobType}
            onChangeText={handleJobTypeInput}
          />
          {jobTypeSuggestions.length > 0 && (
            <FlatList
              data={jobTypeSuggestions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectJobType(item)}>
                  <Text style={styles.suggestionItem}>{item}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionsList}
            />
          )}
        </View> */}

        {/* <TouchableOpacity style={styles.filterButton} onPress={applyFilters}>
          <Text style={styles.filterButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View> */}

      {filteredJobs.length > 0 ? (
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => <JobCard job={item} onPress={() => openModal(item)} />}
          contentContainerStyle={{ paddingBottom: 80 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      ) : (
        <Text style={styles.noResults}>No jobs found</Text>
      )}

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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  filterContainer: {
    marginBottom: 10,
  },
  filterInputContainer: {
    position: 'relative',
  },
  filterInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    height: 40,
  },
  suggestionsList: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 150,
    zIndex: 1,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  filterButton: {
    backgroundColor: '#e12c2b',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalCompany: {
    fontSize: 16,
    color: '#666',
  },
  modalSalary: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  modalLocation: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  modalButton: {
    backgroundColor: '#e12c2b',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchJobs;