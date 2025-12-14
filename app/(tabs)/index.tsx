import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const services = [
  { id: 1, title: "Plumber", icon: "water-outline" },
  { id: 2, title: "Electrician", icon: "flash-outline" },
  { id: 3, title: "Carpenter", icon: "hammer-outline" },
  { id: 4, title: "Cleaner", icon: "sparkles-outline" },
];

export default function ClientHome() {
  const router = useRouter();

  const goToNewTask = (service?: string) => {
    router.push({
      pathname: "/(client)/newTask",
      params: { service },
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.location}>📍 Your Location</Text>

        <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
          <Image
            source={require("../../assets/profile.png")}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Find trusted professionals near you
          </Text>

          <TouchableOpacity
            style={styles.postBtn}
            onPress={() => goToNewTask()}
          >
            <Text style={styles.postBtnText}>Post a Task</Text>
          </TouchableOpacity>
        </View>

        {/* Suggested Services */}
        <Text style={styles.sectionTitle}>Suggested Services</Text>

        <View style={styles.servicesRow}>
          {services.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.serviceCard}
              onPress={() => goToNewTask(item.title)}
            >
              <Ionicons name={item.icon as any} size={28} color="#2D5FDE" />
              <Text style={styles.serviceText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

/* 🎨 Styles mapped from Figma */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  location: {
    color: "#fff",
    fontSize: 14,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  banner: {
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  bannerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  postBtn: {
    backgroundColor: "#2D5FDE",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  postBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  servicesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  serviceCard: {
    width: "48%",
    backgroundColor: "#111",
    borderRadius: 14,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
  },
  serviceText: {
    color: "#fff",
    marginTop: 8,
  },
});
