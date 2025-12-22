import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axiosClient from '../../api/axiosClient'; // Ensure this points to your axios config

export default function UserInfoScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [roleInput, setRoleInput] = useState(''); // Text input for UI
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!name.trim()) {
      Alert.alert("Required", "Please enter your name.");
      return;
    }

    // Simple logic to determine role from text input, or default to client
    // In a real app, you might use a Dropdown or 2 Selection Cards instead of a TextInput for Role.
    // For now, we default to 'client' unless they type 'work' or 'provider'.
    // const determinedRole = roleInput.toLowerCase().includes('work') || roleInput.toLowerCase().includes('job') 
    //   ? 'provider' 
    //   : 'client';
  
    setLoading(true);
    try {
      // 1. Send data to Backend
      const res = await axiosClient.put('/users/profile', {
        name: name,
      });

      // 2. Update Local Storage if you store user details there
      // await AsyncStorage.setItem('userRole', determinedRole);
      await AsyncStorage.setItem('userName', name);
       router.push('/(client)/home');
      // 3. Navigate based on Role
    //   if (determinedRole === 'client') {
    //     router.push('/(client)/home');
    //   } else {
    //     // If you have a provider home, go there, otherwise go to client home or KYC
    //     router.push('/(provider)/dashboard'); 
    //   }

    } catch (error: any) {
      console.error("Update Error:", error);
      Alert.alert("Error", "Could not save details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Blue Header Section */}
      <View style={styles.headerContainer}>
        <SafeAreaView edges={['top', 'left', 'right']}>
          <View style={styles.headerContent}>
            {/* Illustration Placeholder */}
            <View style={styles.illustrationContainer}>
              {/* Replace with your actual illustration image */}
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/476/476863.png' }} 
                style={styles.illustration} 
                resizeMode="contain"
              />
            </View>
            
            <Text style={styles.headerTitle}>Let’s get to know{'\n'}about you</Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Form Section */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formWrapper}
      >
        <ScrollView contentContainerStyle={styles.formContainer}>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>What is your name?</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name..."
              placeholderTextColor="#A0A0A0"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>How do you want to use this app?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. I want to hire, or I want to work..."
              placeholderTextColor="#A0A0A0"
              value={roleInput}
              onChangeText={setRoleInput}
            />
             <Text style={styles.hintText}>
              *Type "work" to become a service provider, otherwise you will be a Client.
            </Text>
          </View>

        </ScrollView>

        {/* Continue Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleContinue} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Continue</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#1E40AF', // Deep Blue matching Figma
    paddingBottom: 40,
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0, 
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    alignItems: 'flex-start', // Align text to left
  },
  illustrationContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden'
  },
  illustration: {
    width: 60,
    height: 60,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 40,
  },
  formWrapper: {
    flex: 1,
  },
  formContainer: {
    padding: 24,
    paddingTop: 40,
  },
  inputGroup: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
  hintText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 6,
    fontStyle: 'italic',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderColor: '#F3F4F6',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#1E40AF', // Match header blue
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});