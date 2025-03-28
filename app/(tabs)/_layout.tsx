import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SignedIn, useUser, useClerk } from '@clerk/clerk-expo';

export default function TabLayout() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [showLogout, setShowLogout] = useState(false);

  // Debugging: Log the user object to check if it exists
  console.log('User:', user);

  // Function to get the first letter of the user's name
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : '?');

  return (
    <View style={{ flex: 1 }}>
      {/* Custom Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Job Sphere </Text>

        <SignedIn>
          {user ? (
            <View>
              <TouchableOpacity
                style={styles.profileContainer}
                onPress={() => setShowLogout(!showLogout)}
              >
                {user.imageUrl ? (
                  <Image source={{ uri: user.imageUrl }} style={styles.profileImage} resizeMode="cover" />
                ) : (
                  <View style={styles.profilePlaceholder}>
                    <Text style={styles.initial}>{getInitial(user.fullName)}</Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Logout Button */}
              {showLogout && (
                <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <Text style={styles.loadingText}>Loading profile...</Text>
          )}
        </SignedIn>
      </View>

      {/* Bottom Tabs */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#e12c2b',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => (
              <Ionicons name="home" size={22} color={focused ? '#fff' : '#e12c2b'} />
            ),
          }}
        />
        <Tabs.Screen
          name="SearchJobs"
          options={{
            title: 'Search Jobs',
            tabBarIcon: ({ focused }) => (
              <Ionicons name="search" size={22} color={focused ? '#fff' : '#e12c2b'} />
            ),
          }}
        />
        <Tabs.Screen
          name="SavedJobs"
          options={{
            title: 'Saved Jobs',
            tabBarIcon: ({ focused }) => (
              <Ionicons name="bookmark" size={22} color={focused ? '#fff' : '#e12c2b'} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => (
              <Ionicons name="person" size={22} color={focused ? '#fff' : '#e12c2b'} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#101630',
    height: 100,
    paddingHorizontal: 20,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  profilePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    zIndex: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tabBar: {
    height: 75,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#101630',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 12,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
});
