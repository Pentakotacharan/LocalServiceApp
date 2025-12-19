import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Users } from "lucide-react-native";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Replace with your actual backend URL
const API_URL = "http://192.168.1.5:5000/api"; 

export default function KycScreen() {
  const router = useRouter();
  const params = useLocalSearchParams(); // Data from Step 1
  
  const [loading, setLoading] = useState(false);
  const [aadhaarNo, setAadhaarNo] = useState("");
  const [panNo, setPanNo] = useState("");
  
  const [aadhaarFront, setAadhaarFront] = useState<string | null>(null);
  const [aadhaarBack, setAadhaarBack] = useState<string | null>(null);
  const [panFront, setPanFront] = useState<string | null>(null);
  const [panBack, setPanBack] = useState<string | null>(null);

  const pickImage = async (setImage: (uri: string) => void) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    // if (!aadhaarNo || !panNo || !aadhaarFront || !aadhaarBack || !panFront) {
    //   Alert.alert("Missing Details", "Please fill all fields and upload images.");
    //   return;
    // }

    setLoading(true);
    try {
    //   const token = await AsyncStorage.getItem("token");
    //   const formData = new FormData();

    //   // 1. Append Data from Step 1
    //   formData.append("name", params.name as string);
    //   formData.append("dob", params.dob as string);
    //   formData.append("gender", params.gender as string);
    //   formData.append("skill", params.skill as string);
      
    //   // 2. Append Data from Step 2
    //   formData.append("aadhaarNumber", aadhaarNo);
    //   formData.append("panNumber", panNo);

    //   // 3. Append Files
    //   // Note: React Native FormData requires 'uri', 'name', 'type'
    //   formData.append("aadhaarFront", { uri: aadhaarFront, name: 'af.jpg', type: 'image/jpeg' } as any);
    //   formData.append("aadhaarBack", { uri: aadhaarBack, name: 'ab.jpg', type: 'image/jpeg' } as any);
    //   formData.append("panFront", { uri: panFront, name: 'pf.jpg', type: 'image/jpeg' } as any);
    //   formData.append("panBack", { uri: panBack, name: 'pb.jpg', type: 'image/jpeg' } as any);

    //   // 4. Send Request
    //   await axios.post(`${API_URL}/users/kyc`, formData, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });

      // 5. Success -> Go to Pending
      router.replace("/(provider)/kycPending");

    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to submit KYC. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const UploadBox = ({ label, uri, onPick }: any) => (
    <TouchableOpacity style={styles.uploadBox} onPress={onPick}>
      {uri ? (
        <Image source={{ uri }} style={styles.uploadedImage} />
      ) : (
        <Text style={styles.uploadText}>{label}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconCircle}><Users color="#1E40AF" size={40} /></View>
        <Text style={styles.headerTitle}>Complete KYC</Text>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Aadhaar Section */}
        <Text style={styles.label}>Aadhaar No.</Text>
        <TextInput style={styles.input} placeholder="12 digit number" keyboardType="numeric" maxLength={12} value={aadhaarNo} onChangeText={setAadhaarNo} />
        
        <Text style={[styles.label, { marginTop: 15 }]}>Upload Aadhaar Images</Text>
        <View style={styles.row}>
          <UploadBox label="Front" uri={aadhaarFront} onPick={() => pickImage(setAadhaarFront)} />
          <View style={{width: 15}} />
          <UploadBox label="Back" uri={aadhaarBack} onPick={() => pickImage(setAadhaarBack)} />
        </View>

        {/* PAN Section */}
        <Text style={[styles.label, { marginTop: 25 }]}>Pan Card</Text>
        <TextInput style={styles.input} placeholder="PAN Number" autoCapitalize="characters" maxLength={10} value={panNo} onChangeText={setPanNo} />

        <Text style={[styles.label, { marginTop: 15 }]}>Upload Pan Images</Text>
        <View style={styles.row}>
          <UploadBox label="Front" uri={panFront} onPick={() => pickImage(setPanFront)} />
          <View style={{width: 15}} />
          <UploadBox label="Back" uri={panBack} onPick={() => pickImage(setPanBack)} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Continue</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E40AF" },
  header: { padding: 24, paddingBottom: 40, backgroundColor: "#1E40AF" },
  iconCircle: { width: 80, height: 80, backgroundColor: "white", borderRadius: 40, justifyContent: "center", alignItems: "center", marginBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "white" },
  formContainer: { flexGrow: 1, backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, paddingTop: 30 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 10, padding: 14, backgroundColor: "#fff" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  uploadBox: { flex: 1, height: 120, borderWidth: 1.5, borderColor: "#BFDBFE", borderStyle: "dashed", borderRadius: 12, backgroundColor: "#F9FAFB", justifyContent: "center", alignItems: "center", overflow: 'hidden' },
  uploadText: { color: "#93C5FD", fontWeight: "600" },
  uploadedImage: { width: '100%', height: '100%' },
  button: { backgroundColor: "#1E40AF", borderRadius: 12, paddingVertical: 16, alignItems: "center", marginTop: 30, marginBottom: 20 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});