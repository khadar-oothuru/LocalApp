import { StyleSheet, Text, View, Button, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';

const Profile = () => {
  const { signOut } = useAuth();
  const { user, isLoaded } = useUser();

  const handleLogout = async () => {
    await signOut();
  };

  if (!isLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
      {/* <Text style={styles.name}>{user?.fullName || "No Name"}</Text> */}
      <Text style={styles.email}>{user?.primaryEmailAddress?.emailAddress || "No Email"}</Text>
      {/* <Text style={styles.info}>Username: {user?.username || "Not set"}</Text> */}
      <Text style={styles.info}>User ID: {user?.id}</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={handleLogout} color="#ff3b30" />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f7',
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
});
