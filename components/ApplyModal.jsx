import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ApplyModal = ({ visible, onClose, job }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState('');

  const handleSubmit = () => {
    console.log('Application submitted:', { name, email, resume });
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Apply for {job.title}</Text>
          
          <TextInput style={styles.input} placeholder="Your Name" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Your Email" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Resume Link (Google Drive, etc.)" value={resume} onChangeText={setResume} />

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ApplyModal;
const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)', // Slightly darker for better visibility
    },
    modalContainer: {
      width: '90%',
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // For Android shadow
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      color: '#333', // Darker color for better contrast
      textAlign: 'center',
    },
    input: {
      height: 45,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 14,
      marginBottom: 12,
      fontSize: 16,
      backgroundColor: '#f9f9f9', // Light background for a subtle effect
    },
    submitButton: {
      backgroundColor: '#007bff',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 8,
    },
    submitText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    cancelButton: {
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: 8,
    },
    cancelText: {
      color: '#d9534f',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  