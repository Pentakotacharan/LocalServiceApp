import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router';
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axiosClient from "../../api/axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RoleSelectionScreen({ navigation }: any) {
  const [selectedRole, setSelectedRole] = useState<"client" | "provider" | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleContinue = async () => {
    if (!selectedRole) return;
    const token = AsyncStorage.getItem("token");
    try {
      setLoading(true);

      await axiosClient.post(
        "/users/set-role",
        { role: selectedRole }
      );

      if (selectedRole === "client") {
      router.replace("/(client)/userInfo");
      } 
      else {
        router.replace("/(provider)/userInfo");
      }
    } catch (error) {
      console.error("Role selection failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Gradient Header */}
      <LinearGradient
        colors={["#2F5BEA", "#1F3FA3"]}
        style={styles.header}
      >
        <Image source={require("../../assets/images/logo.png")}
                   style={styles.logo}     />
                  <Text style={styles.title}>Choose an user{"\n"}interface to proceed</Text>
      </LinearGradient>

      {/* Role Cards */}
      <View style={styles.cardsContainer}>
        {/* Client */}
        <TouchableOpacity
          style={[
            styles.card,
            selectedRole === "client" && styles.cardSelected,
          ]}
          onPress={() => setSelectedRole("client")}
        >
          <Ionicons name="person-outline" size={48} color="#fff" />
          <Text style={styles.cardText}>Client</Text>
          <View style={styles.selectBtn}>
            <Text style={styles.selectText}>Select</Text>
          </View>
        </TouchableOpacity>

        {/* Provider */}
        <TouchableOpacity
          style={[
            styles.card,
            selectedRole === "provider" && styles.cardSelected,
          ]}
          onPress={() => setSelectedRole("provider")}
        >
          <Ionicons name="construct-outline" size={48} color="#fff" />
          <Text style={styles.cardText}>Service Provider</Text>
          <View style={styles.selectBtn}>
            <Text style={styles.selectText}>Select</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        disabled={!selectedRole || loading}
        onPress={handleContinue}
        style={[
          styles.continueBtn,
          !selectedRole && styles.continueDisabled,
        ]}
      >
        <Text style={styles.continueText}>
          {loading ? "Please wait..." : "Continue"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: { width: 35, height: 45,  borderRadius: 20 },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 260,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 24,
  },
  card: {
    width: "47%",
    backgroundColor: "#2F5BEA",
    borderRadius: 24,
    alignItems: "center",
    paddingVertical: 30,
  },
  cardSelected: {
    borderWidth: 3,
    borderColor: "#1F3FA3",
  },
  cardText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  selectBtn: {
    marginTop: 16,
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  selectText: {
    color: "#fff",
    fontWeight: "600",
  },
  continueBtn: {
    margin: 24,
    backgroundColor: "#2F5BEA",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  continueDisabled: {
    backgroundColor: "#B4C6FF",
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
