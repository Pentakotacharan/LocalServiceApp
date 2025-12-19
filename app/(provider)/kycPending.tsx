import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Users, Hourglass } from "lucide-react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "https://service-app-backend-two.vercel.app/api/v1";

export default function KycPendingScreen() {
  const router = useRouter();

  const checkStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.kycStatus === "approved") {
        router.replace("/(provider)/kycApproved");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconCircle}><Users color="#1E40AF" size={40} /></View>
        <Text style={styles.headerTitle}>Pending KYC</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.hourglassCircle}>
          <Hourglass color="white" size={60} />
        </View>
        <Text style={styles.statusText}>
          Your KYC has been submitted and waiting for approval.
        </Text>
        
        {/* Optional: A button for impatient users */}
        <TouchableOpacity onPress={checkStatus} style={{marginTop: 20}}>
          <Text style={{color: "#1E40AF", fontWeight: 'bold'}}>Check Status</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E40AF" },
  header: { padding: 24, paddingBottom: 40 },
  iconCircle: { width: 80, height: 80, backgroundColor: "white", borderRadius: 40, justifyContent: "center", alignItems: "center", marginBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "white" },
  contentContainer: { flex: 1, backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 30, justifyContent: 'center', alignItems: 'center', padding: 40 },
  hourglassCircle: { width: 120, height: 120, backgroundColor: "#2563EB", borderRadius: 60, justifyContent: "center", alignItems: "center", marginBottom: 30 },
  statusText: { fontSize: 18, fontWeight: "600", textAlign: "center", lineHeight: 26 },
});