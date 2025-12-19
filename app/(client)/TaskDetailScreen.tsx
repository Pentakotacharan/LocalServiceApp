import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter,useLocalSearchParams } from "expo-router";
export default function TaskDetailScreen() {
  // Get the data passed from the Create Task screen
   const params = useLocalSearchParams();
  const router = useRouter();
  const title = params.title as string;
  const description = params.description as string;
  const pay = params.pay as string;
  const persons = Number(params.persons);
  const isRemote = params.isRemote === "true";
  const address = params.address as string;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER: Back Arrow & Share Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* HERO SECTION: Icon & Title */}
        <View style={styles.heroSection}>
          <View style={styles.heroIconContainer}>
            <Ionicons name="location-sharp" size={40} color="#fff" />
          </View>
          
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>No Category</Text>
          </View>

          <Text style={styles.titleText}>
            {title} {isRemote ? "Remote" : ""}
          </Text>
        </View>

        {/* ABOUT CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About the task</Text>
          <Text style={styles.descriptionText}>
            {description}
          </Text>
          <TouchableOpacity>
            <Text style={styles.moreText}>more..</Text>
          </TouchableOpacity>
        </View>

        {/* DETAILS CARD (Voice, Pay, Persons) */}
        <View style={styles.card}>
          {/* Voice Row */}
          <TouchableOpacity style={styles.voiceBtn}>
             <View style={styles.playIconCircle}>
               <Ionicons name="play" size={16} color="#fff" />
             </View>
             <Text style={styles.voiceBtnText}>Voice Instructions</Text>
          </TouchableOpacity>

          {/* Pay & Persons Row */}
          <View style={styles.statsRow}>
            {/* Pay Pill */}
            <View style={styles.statPill}>
              <View style={styles.statIconCircle}>
                 <FontAwesome5 name="rupee-sign" size={14} color="#fff" />
              </View>
              <Text style={styles.statText}>{pay || 0}/h</Text>
            </View>

            {/* Persons Pill */}
            <View style={styles.statPill}>
               <View style={styles.statIconCircle}>
                 <Ionicons name="people" size={16} color="#fff" />
               </View>
               <Text style={styles.statText}>{persons || 0} Persons</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkBtn} onPress={() => router.replace("./CheckRequestsScreen")}>
          <Text style={styles.checkBtnText}>Check Requests</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  
  scrollContent: {
    paddingBottom: 100, // Space for bottom button
  },

  // Hero Section
  heroSection: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  heroIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#2F5BEA",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#2F5BEA",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  categoryBadge: {
    backgroundColor: "#DCE6FF",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 15,
  },
  categoryText: {
    color: "#2F5BEA",
    fontWeight: "600",
    fontSize: 12,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    paddingHorizontal: 40,
  },

  // Common Card Style
  card: {
    backgroundColor: "#F0F2F5", // Light grayish blue background like image
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    marginBottom: 5,
  },
  moreText: {
    color: "#2F5BEA",
    fontWeight: "700",
    fontSize: 14,
  },

  // Details Buttons
  voiceBtn: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
    marginBottom: 15,
  },
  playIconCircle: {
    width: 28,
    height: 28,
    backgroundColor: "#000080", // Dark blue play button
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  voiceBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000080",
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statPill: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  statIconCircle: {
    width: 28,
    height: 28,
    backgroundColor: "#2F5BEA",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  statText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },

  // Footer Button
  footer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
  checkBtn: {
    backgroundColor: "#1F3FA3", // Darker blue for footer button
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  checkBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});