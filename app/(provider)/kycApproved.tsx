import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Users, Check } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function KycApprovedScreen() {
  const router = useRouter();

  const handleRestart = () => {
    // In React Native logic, this just means "Go to the main dashboard"
    router.replace("/(provider)/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconCircle}><Users color="#1E40AF" size={40} /></View>
        <Text style={styles.headerTitle}>KYC Approved.</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.checkCircle}>
          <Check color="white" size={60} />
        </View>
        <Text style={styles.statusText}>
          Your KYC has been approved.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleRestart}>
          <Text style={styles.buttonText}>Restart App</Text>
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
  checkCircle: { width: 120, height: 120, backgroundColor: "#2563EB", borderRadius: 60, justifyContent: "center", alignItems: "center", marginBottom: 30 },
  statusText: { fontSize: 18, fontWeight: "600", textAlign: "center", marginBottom: 50 },
  button: { backgroundColor: "#1E40AF", width: '100%', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});