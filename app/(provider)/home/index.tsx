import React, { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, Modal, TextInput 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
  Briefcase, MapPin, ArrowRight, Users, IndianRupee, X, Star, ThumbsUp, ThumbsDown 
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Get screen width for responsive sizing
const { width, height } = Dimensions.get("window");

export default function ProviderHomeScreen() {
  const [isOnline, setIsOnline] = useState(false);
  const [userName, setUserName] = useState("Praneeth");
  
  // Task State
  const [incomingTask, setIncomingTask] = useState<any>(null);
  
  // Modal State
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [proposalText, setProposalText] = useState("");

  // SIMULATION: Go Online -> Find Task
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOnline) {
      setIncomingTask(null);
      timer = setTimeout(() => {
        setIncomingTask({
          id: 1,
          title: "Hiring UI/UX Designer Remote",
          location: "Visakhapatnam, AP",
          rate: "2K/h",
          persons: 4,
          clientStats: {
            rating: 4.5,
            totalJobs: 130,
            likes: 124,
            dislikes: 6
          }
        });
      }, 3000); 
    } else {
      setIncomingTask(null);
      setShowDetailModal(false);
    }
    return () => clearTimeout(timer);
  }, [isOnline]);

  const toggleSwitch = () => setIsOnline(prev => !prev);

  // Open the Modal
  const handleSlideComplete = () => {
    setShowDetailModal(true);
  };

  // Close the Modal
  const handleCloseModal = () => {
    setShowDetailModal(false);
  };

  // Final Actions inside Modal
  const handleRequestGig = () => {
    setShowDetailModal(false);
    setIncomingTask(null); // Remove task from screen
    Alert.alert("Success", "Gig Requested successfully!");
  };

  const handleNegotiate = () => {
    Alert.alert("Negotiate", "Negotiation chat feature coming soon!");
  };

  return (
    <View style={styles.container}>
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <SafeAreaView edges={['top', 'left', 'right']}>
          <View style={styles.headerContent}>
            <Text style={styles.logoText}>LAZY{"\n"}GANG</Text>
            <View style={{marginTop: 20}}>
               <Text style={styles.greeting}>Hi {userName}!</Text>
            </View>
            <View style={styles.toggleWrapper}>
              <TouchableOpacity 
                activeOpacity={0.9} 
                onPress={toggleSwitch}
                style={[styles.toggleBtn, isOnline ? styles.toggleOn : styles.toggleOff]}
              >
                <View style={[styles.toggleCircle, isOnline ? {right: 4} : {left: 4}]} />
                <Text style={styles.toggleText}>{isOnline ? "Online" : "Offline"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>

      {/* --- BODY --- */}
      <View style={styles.body}>
        {!isOnline && (
          <View style={styles.centerContent}>
            <View style={styles.iconBox}><Briefcase color="#93C5FD" size={50} /></View>
            <Text style={styles.linkText}>Go online to get gigs</Text>
          </View>
        )}

        {isOnline && !incomingTask && (
          <View style={styles.centerContent}>
            <View style={[styles.iconBox, { backgroundColor: '#E0F2FE' }]}><Briefcase color="#3B82F6" size={50} /></View>
            <Text style={styles.infoText}>Searching for gigs nearby...</Text>
          </View>
        )}

        {isOnline && incomingTask && (
          <View style={styles.taskCard}>
            <View style={styles.cardHeader}>
              <View style={styles.mapIconBox}><MapPin color="white" size={24} /></View>
              <Text style={styles.taskTitle}>{incomingTask.title}</Text>
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.detailChip}>
                <View style={styles.chipIcon}><IndianRupee size={14} color="white" /></View>
                <Text style={styles.detailText}>{incomingTask.rate}</Text>
              </View>
              <View style={[styles.detailChip, { marginLeft: 10 }]}>
                <View style={styles.chipIcon}><Users size={14} color="white" /></View>
                <Text style={styles.detailText}>{incomingTask.persons} Persons</Text>
              </View>
            </View>

            <View style={{flex: 1}} />

            <TouchableOpacity style={styles.slideButton} activeOpacity={0.8} onPress={handleSlideComplete}>
              <View style={styles.slideCircle}><ArrowRight color="#000" size={20} /></View>
              <Text style={styles.slideText}>Slide to request the gig</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* --- MODAL POPUP --- */}
      <Modal
        visible={showDetailModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          {/* Close Button (Top Left X) */}
          <SafeAreaView style={styles.closeButtonArea}>
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeIcon}>
              <X color="white" size={32} />
            </TouchableOpacity>
          </SafeAreaView>

          {/* White Card Container */}
          <View style={styles.modalCard}>
            
            {/* 1. Header Icon & Category */}
            <View style={styles.modalHeaderCenter}>
              <View style={styles.modalMapIcon}>
                <MapPin color="white" size={30} />
              </View>
              <View style={styles.categoryTag}>
                <Text style={styles.categoryText}>No Category</Text>
              </View>
            </View>

            {/* 2. Title */}
            <Text style={styles.modalTitle}>Hiring UI/UX{"\n"}Designer Remote</Text>

            {/* 3. Proposal Input Box */}
            <View style={styles.proposalBox}>
              <TextInput
                style={styles.proposalInput}
                placeholder="Your proposal will be mentioned here"
                placeholderTextColor="#9CA3AF"
                multiline
                value={proposalText}
                onChangeText={setProposalText}
              />
            </View>

            {/* 4. Client Stats Row */}
            <View style={styles.statsRow}>
              {/* Rating */}
              <View style={styles.statPillBlue}>
                <View style={styles.statIconCircle}><Star size={10} color="white" fill="white" /></View>
                <Text style={styles.statText}>4.5</Text>
              </View>

              {/* Jobs */}
              <View style={styles.statPillBlue}>
                <View style={styles.statIconCircle}><Briefcase size={10} color="white" /></View>
                <Text style={styles.statText}>130</Text>
              </View>

              {/* Likes */}
              <View style={styles.statPillBlue}>
                <View style={styles.statIconCircle}><ThumbsUp size={10} color="white" /></View>
                <Text style={styles.statText}>124</Text>
              </View>

              {/* Dislikes (Red) */}
              <View style={styles.statPillRed}>
                <View style={[styles.statIconCircle, {backgroundColor: '#EF4444'}]}><ThumbsDown size={10} color="white" /></View>
                <Text style={[styles.statText, {color: '#EF4444'}]}>6</Text>
              </View>
            </View>

            {/* 5. Action Buttons */}
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.requestBtn} onPress={handleRequestGig}>
                <Text style={styles.requestBtnText}>Request Gig</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.negotiateBtn} onPress={handleNegotiate}>
                <Text style={styles.negotiateBtnText}>Negotiate</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  // ... (Previous Styles remain the same) ...
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  header: { backgroundColor: "#0F172A", height: 280, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 },
  headerContent: { paddingHorizontal: 24, paddingTop: 10, height: '100%' },
  logoText: { color: "white", fontSize: 18, fontWeight: "900", lineHeight: 22 },
  greeting: { fontSize: 28, fontWeight: "bold", color: "white", textAlign: "center", marginTop: 20 },
  toggleWrapper: { alignItems: 'center', marginTop: 30 },
  toggleBtn: { width: 140, height: 44, borderRadius: 25, justifyContent: 'center', borderWidth: 2, borderColor: "white", flexDirection: 'row', alignItems: 'center', position: 'relative' },
  toggleOn: { backgroundColor: "#1E40AF" },
  toggleOff: { backgroundColor: "#0F172A" },
  toggleCircle: { position: 'absolute', width: 32, height: 32, borderRadius: 16, backgroundColor: "white", top: 4 },
  toggleText: { color: "white", fontWeight: "bold", fontSize: 15, textAlign: 'center', width: '100%' },
  body: { flex: 1, marginTop: 220, paddingHorizontal: 20, paddingBottom: 100, justifyContent: 'center', alignItems: 'center', zIndex: 2 },
  centerContent: { alignItems: 'center', justifyContent: 'center', marginTop: 50 },
  iconBox: { width: 100, height: 80, backgroundColor: "#DBEAFE", borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  linkText: { color: "#60A5FA", fontSize: 16, fontWeight: "600" },
  infoText: { color: "#6B7280", fontSize: 16 },
  taskCard: { backgroundColor: "white", width: '100%', height: 350, borderRadius: 20, padding: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, marginTop: 20 },
  cardHeader: { flexDirection: "row", alignItems: "flex-start", marginBottom: 20 },
  mapIconBox: { width: 50, height: 50, backgroundColor: "#2563EB", borderRadius: 12, justifyContent: "center", alignItems: "center", marginRight: 15 },
  taskTitle: { fontSize: 20, fontWeight: "bold", color: "#374151", flex: 1, lineHeight: 28 },
  detailsRow: { flexDirection: "row", marginTop: 10 },
  detailChip: { flexDirection: "row", backgroundColor: "#EFF6FF", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, alignItems: "center" },
  chipIcon: { width: 20, height: 20, borderRadius: 10, backgroundColor: "#1E40AF", justifyContent: "center", alignItems: "center", marginRight: 6 },
  detailText: { color: "#1E40AF", fontWeight: "bold", fontSize: 14 },
  slideButton: { backgroundColor: "#1E3A8A", height: 60, borderRadius: 30, flexDirection: "row", alignItems: "center", paddingHorizontal: 6 },
  slideCircle: { width: 48, height: 48, backgroundColor: "white", borderRadius: 24, justifyContent: "center", alignItems: "center" },
  slideText: { color: "white", fontSize: 16, fontWeight: "600", flex: 1, textAlign: "center", paddingRight: 10 },

  // --- MODAL STYLES ---
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.9)", // Dark Blue transparent overlay
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonArea: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  closeIcon: {
    padding: 10,
  },
  modalCard: {
    width: width * 0.85,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 24,
    alignItems: "center",
  },
  modalHeaderCenter: {
    alignItems: "center",
    marginTop: -50, // Pulls the icon up half-way out of the card
    marginBottom: 10,
  },
  modalMapIcon: {
    width: 70,
    height: 70,
    backgroundColor: "#2563EB",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 4,
    borderColor: "white", // Border to separate from background
  },
  categoryTag: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "600",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4B5563",
    marginVertical: 15,
  },
  proposalBox: {
    width: '100%',
    height: 140,
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  proposalInput: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
    textAlignVertical: "top", // Android specific
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
    marginBottom: 25,
  },
  statPillBlue: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: "center",
  },
  statPillRed: {
    flexDirection: "row",
    backgroundColor: "#FEF2F2",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: "center",
  },
  statIconCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#1E40AF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  statText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1E40AF",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
  },
  requestBtn: {
    flex: 1,
    backgroundColor: "#1E3A8A", // Dark Blue
    paddingVertical: 14,
    borderRadius: 12,
    marginRight: 10,
    alignItems: "center",
  },
  requestBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  negotiateBtn: {
    flex: 1,
    backgroundColor: "#0000FF", // Bright Blue
    paddingVertical: 14,
    borderRadius: 12,
    marginLeft: 10,
    alignItems: "center",
  },
  negotiateBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});