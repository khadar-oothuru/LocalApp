import { useRef, useEffect } from 'react';
import { Image, StyleSheet, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

// Custom Button Component
const ThemedButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <ThemedText style={styles.buttonText}>{title}</ThemedText>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={{ ...styles.animatedContainer, opacity: fadeAnim }}>
          {/* Logo */}
          <Image
            source={require('@/assets/images/homepage.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Welcome Message */}
          <ThemedText type="title" style={[styles.title, { color: theme.text }]}>
            Welcome to My Job Sphere 🚀
          </ThemedText>

       
          <ThemedText type="subtitle" style={[styles.subtitle, { color: theme.text }]}>
            Your personalized job search assistant. Get hired faster!
          </ThemedText>

      
          <ThemedView style={[styles.features, { backgroundColor: theme.tint }]}>
            <ThemedText style={[styles.featureText, { color: theme.text }]}>🔍 Find job listings tailored to your skills</ThemedText>
            <ThemedText style={[styles.featureText, { color: theme.text }]}>📩 Apply with one tap</ThemedText>
            <ThemedText style={[styles.featureText, { color: theme.text }]}>📊 Track your applications in real time</ThemedText>
            <ThemedText style={[styles.featureText, { color: theme.text }]}>📬 Get job alerts for new openings</ThemedText>
            <ThemedText style={[styles.featureText, { color: theme.text }]}>📝 Save and edit your resume on the go</ThemedText>
          </ThemedView>

          
          <ThemedButton title="Explore Jobs" onPress={() => navigation.navigate('SearchJobs')} />
        </Animated.View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  logo: {
    width: 200, // Adjusted for better visibility
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  features: {
    alignItems: 'flex-start',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    maxWidth: 350,
    elevation: 3,
    marginBottom: 20,
  },
  featureText: {
    fontSize: 16,
    marginBottom: 6,
  },
  button: {
    backgroundColor: '#e12c2b', // Updated button color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff', 
    fontWeight: 'bold',
    textAlign: 'center',
  },
})