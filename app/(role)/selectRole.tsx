import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import axiosClient from "../../api/axiosClient";

const { width } = Dimensions.get("window");

export default function SelectRoleScreen() {
  const router = useRouter();
  const [role, setRole] = useState<"client" | "provider" | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * Save role in backend
   */
  const handleContinue = async () => {
    if (!role) {
      Alert.alert("Select Role", "Please select Client or Service Provider");
      return;
    }

    try {
      setLoading(true);

      // 🔗 Call backend to update role
      await axiosClient.post("/users/set-role", {
        role,
      });

      // Navigate based on role
      if (role === "client") {
        router.replace("/(tabs)");
      } else {
        router.replace("/(provider)/kyc");
      }
    } catch (err) {
      Alert.alert("Error", "Failed to save role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose how you want to continue</Text>

      {/* Client Card */}
      <TouchableOpacity
        style={[
          styles.card,
          role === "client" && styles.selectedCard,
        ]}
        onPress={() => setRole("client")}
      >
        <Text style={styles.cardTitle}>Client</Text>
        <Text style={styles.cardDesc}>
          I want to hire a service
        </Text>
      </TouchableOpacity>

      {/* Provider Card */}
      <TouchableOpacity
        style={[
          styles.card,
          role === "provider" && styles.selectedCard,
        ]}
        onPress={() => setRole("provider")}
      >
        <Text style={styles.cardTitle}>Service Provider</Text>
        <Text style={styles.cardDesc}>
          I want to offer services
        </Text>
      </TouchableOpacity>

      {/* Continue */}
      <TouchableOpacity onPress={handleContinue} disabled={loading}>
        <LinearGradient
          colors={["#2D5FDE", "#183378"]}
          style={styles.continueBtn}
        >
          <Text style={styles.continueText}>
            Continue
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

/* 🎨 Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#000", // dark mode default
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 14,
    padding: 24,
    marginBottom: 20,
    backgroundColor: "#111",
  },
  selectedCard: {
    borderColor: "#2D5FDE",
    backgroundColor: "rgba(45,95,222,0.1)",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 14,
    color: "#aaa",
  },
  continueBtn: {
    height: 60,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  continueText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
