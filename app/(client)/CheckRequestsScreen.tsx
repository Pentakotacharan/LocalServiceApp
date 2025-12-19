import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

// --- MOCK DATA ---
const MOCK_REQUESTS = [
  {
    id: "1",
    username: "username123",
    avatarUrl: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg",
    bid: "1.5K/h",
    rating: "4.5",
    jobs: "130",
    likes: "124",
    dislikes: "6",
    isVerified: true,
    proposalText: "User's proposal will be mentioned here... I have extensive experience in UI/UX design and can deliver high-quality Figma screens within your timeline."
  },
  {
    id: "2",
    username: "designer_jane",
    avatarUrl: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
    bid: "2.0K/h",
    rating: "4.8",
    jobs: "85",
    likes: "200",
    dislikes: "2",
    isVerified: false,
    proposalText: "I specialize in mobile app interfaces. I can start immediately."
  }
];

export default function CheckRequestsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState("OpenRequests");
  const [subTab, setSubTab] = useState("Requests");

  // --- MODAL STATES ---
  const [proposalModalVisible, setProposalModalVisible] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  
  // Negotiation State
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [negotiationValue, setNegotiationValue] = useState("");

  // Success/Confirmation Modal State
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successType, setSuccessType] = useState<"accepted" | "counterSent">("accepted");

  // --- HANDLERS ---

  const handleOpenProposal = (item: any) => {
    setSelectedProposal(item);
    setIsNegotiating(false); // Reset negotiation mode
    setNegotiationValue("");
    setProposalModalVisible(true);
  };

  const handleAcceptProposal = () => {
    setProposalModalVisible(false);
    setSuccessType("accepted");
    setTimeout(() => setSuccessModalVisible(true), 300); // Small delay for smooth transition
  };

  const handleStartNegotiation = () => {
    setIsNegotiating(true);
  };

  const handleSendCounterOffer = () => {
    // Logic to send counter offer would go here
    setProposalModalVisible(false);
    setSuccessType("counterSent");
    setTimeout(() => setSuccessModalVisible(true), 300);
  };

  const handleGoToRoom = () => {
    setSuccessModalVisible(false);
    setActiveTab("Room"); // Switch tab to Room
    // navigation.navigate("ChatScreen"); // If you have a separate chat screen
  };

  // --- RENDER CARD ITEM ---
  const renderRequestCard = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
          <Text style={styles.username}>{item.username}</Text>
        </View>
        <View style={styles.priceBadge}>
          <View style={styles.rupeeCircle}>
            <FontAwesome5 name="rupee-sign" size={10} color="#fff" />
          </View>
          <Text style={styles.priceText}>{item.bid}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statBadge, styles.blueBadge]}>
          <Ionicons name="star" size={12} color="#fff" />
          <Text style={styles.statTextWhite}>{item.rating}</Text>
        </View>
        <View style={[styles.statBadge, styles.blueBadgeLight]}>
          <MaterialIcons name="work" size={12} color="#1F3FA3" />
          <Text style={styles.statTextBlue}>{item.jobs}</Text>
        </View>
        <View style={[styles.statBadge, styles.blueBadgeLight]}>
          <Ionicons name="thumbs-up" size={12} color="#1F3FA3" />
          <Text style={styles.statTextBlue}>{item.likes}</Text>
        </View>
        <View style={[styles.statBadge, styles.redBadge]}>
          <Ionicons name="thumbs-down" size={12} color="#fff" />
          <Text style={styles.statTextWhite}>{item.dislikes}</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.viewBtn} onPress={() => handleOpenProposal(item)}>
          <Text style={styles.viewBtnText}>View Proposal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn}>
          <Text style={styles.deleteBtnText}>Delete Proposal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* TOP TABS */}
      <View style={styles.topTabContainer}>
        <TouchableOpacity
          style={[styles.topTab, activeTab === "OpenRequests" && styles.topTabActive]}
          onPress={() => setActiveTab("OpenRequests")}
        >
          <Text style={[styles.topTabText, activeTab === "OpenRequests" && styles.topTabTextActive]}>
            Open Requests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.topTab, activeTab === "Room" && styles.topTabActive]}
          onPress={() => setActiveTab("Room")}
        >
          <Text style={[styles.topTabText, activeTab === "Room" && styles.topTabTextActive]}>
            Room
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      {activeTab === "OpenRequests" ? (
        <View style={styles.contentContainer}>
          <View style={styles.subTabContainer}>
            <TouchableOpacity
              style={[styles.subTab, subTab === "Requests" && styles.subTabActive]}
              onPress={() => setSubTab("Requests")}
            >
              <Text style={[styles.subTabText, subTab === "Requests" && styles.subTabTextActive]}>
                Requests
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.subTab, subTab === "Negotiation" && styles.subTabActive]}
              onPress={() => setSubTab("Negotiation")}
            >
              <Text style={[styles.subTabText, subTab === "Negotiation" && styles.subTabTextActive]}>
                Negotiation
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={MOCK_REQUESTS}
            keyExtractor={(item) => item.id}
            renderItem={renderRequestCard}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={styles.centerMsg}>
          <Text style={{ color: "#999" }}>Room Chat Coming Soon...</Text>
        </View>
      )}

      {/* ================================================= */}
      {/* 1. MAIN PROPOSAL POPUP                            */}
      {/* ================================================= */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={proposalModalVisible}
        onRequestClose={() => setProposalModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.closeModalBtn} 
            onPress={() => setProposalModalVisible(false)}
          >
            <Ionicons name="close" size={32} color="#fff" />
          </TouchableOpacity>

          {selectedProposal && (
            <View style={styles.modalCard}>
              {/* Profile Header */}
              <View style={styles.modalAvatarContainer}>
                <Image source={{ uri: selectedProposal.avatarUrl }} style={styles.modalAvatar} />
              </View>

              <View style={styles.modalNameRow}>
                <Text style={styles.modalUsername}>{selectedProposal.username}</Text>
                {selectedProposal.isVerified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>VERIFIED</Text>
                  </View>
                )}
              </View>

              <View style={styles.modalPriceContainer}>
                 <View style={styles.modalPricePill}>
                    <View style={styles.rupeeCircle}>
                      <FontAwesome5 name="rupee-sign" size={10} color="#fff" />
                    </View>
                    <Text style={styles.priceText}>{selectedProposal.bid}</Text>
                 </View>
              </View>

              <View style={styles.proposalBox}>
                <Text style={styles.proposalText}>
                  {selectedProposal.proposalText}
                </Text>
              </View>

              <View style={styles.modalStatsRow}>
                <View style={[styles.statBadge, styles.blueBadge]}>
                  <Ionicons name="star" size={12} color="#fff" />
                  <Text style={styles.statTextWhite}>{selectedProposal.rating}</Text>
                </View>
                <View style={[styles.statBadge, styles.blueBadgeLight]}>
                  <MaterialIcons name="work" size={12} color="#1F3FA3" />
                  <Text style={styles.statTextBlue}>{selectedProposal.jobs}</Text>
                </View>
                <View style={[styles.statBadge, styles.blueBadgeLight]}>
                  <Ionicons name="thumbs-up" size={12} color="#1F3FA3" />
                  <Text style={styles.statTextBlue}>{selectedProposal.likes}</Text>
                </View>
                <View style={[styles.statBadge, styles.redBadge]}>
                  <Ionicons name="thumbs-down" size={12} color="#fff" />
                  <Text style={styles.statTextWhite}>{selectedProposal.dislikes}</Text>
                </View>
              </View>

              {/* === DYNAMIC BUTTON ROW === */}
              <View style={styles.modalBtnRow}>
                {!isNegotiating ? (
                  // VIEW 1: Accept / Negotiate
                  <>
                    <TouchableOpacity 
                      style={styles.acceptBtn} 
                      onPress={handleAcceptProposal}
                    >
                      <Text style={styles.btnTextWhite}>Accept Proposal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={styles.negotiateBtn}
                      onPress={handleStartNegotiation}
                    >
                      <Text style={styles.btnTextWhite}>Negotiate</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  // VIEW 2: Input / Negotiate
                  <>
                    <TextInput
                      style={styles.negotiateInput}
                      placeholder="Enter Negotiated Value"
                      placeholderTextColor="#1F3FA3"
                      keyboardType="numeric"
                      value={negotiationValue}
                      onChangeText={setNegotiationValue}
                    />
                    
                    <TouchableOpacity 
                      style={styles.sendNegotiateBtn}
                      onPress={handleSendCounterOffer}
                    >
                      <Text style={styles.btnTextWhite}>Negotiate</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          )}
        </View>
      </Modal>

      {/* ================================================= */}
      {/* 2. SUCCESS / CONFIRMATION MODAL                   */}
      {/* ================================================= */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successCard}>
            <Text style={styles.successTitle}>
              {successType === "accepted" ? "Proposal Accepted" : "Counter Offer Sent"}
            </Text>

            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark" size={50} color="#fff" />
            </View>

            <TouchableOpacity 
              style={styles.goToRoomBtn} 
              onPress={handleGoToRoom}
            >
              <Text style={styles.goToRoomText}>
                 {successType === "accepted" ? "Go to Room" : "Done"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... (Previous styles remain unchanged) ...
  container: { flex: 1, backgroundColor: "#fff" },
  header: { paddingHorizontal: 20, paddingVertical: 10 },
  topTabContainer: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#eee" },
  topTab: { flex: 1, paddingVertical: 15, alignItems: "center" },
  topTabActive: { borderBottomWidth: 2, borderBottomColor: "#000" },
  topTabText: { fontSize: 16, fontWeight: "600", color: "#999" },
  topTabTextActive: { color: "#000" },
  contentContainer: { flex: 1, backgroundColor: "#F8F9FA" },
  subTabContainer: { flexDirection: "row", margin: 20, backgroundColor: "#E8EAF6", borderRadius: 12, padding: 4 },
  subTab: { flex: 1, paddingVertical: 8, alignItems: "center", borderRadius: 10 },
  subTabActive: { backgroundColor: "#fff", elevation: 2 },
  subTabText: { fontSize: 14, fontWeight: "600", color: "#666" },
  subTabTextActive: { color: "#000" },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  card: { backgroundColor: "#fff", borderRadius: 20, padding: 16, marginBottom: 16, elevation: 3 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  userInfo: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "#fff" },
  username: { fontSize: 16, fontWeight: "700", color: "#2F5BEA" },
  priceBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#DCE6FF", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, gap: 6 },
  rupeeCircle: { width: 16, height: 16, borderRadius: 8, backgroundColor: "#1F3FA3", justifyContent: "center", alignItems: "center" },
  priceText: { color: "#1F3FA3", fontWeight: "700", fontSize: 14 },
  statsRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 20 },
  statBadge: { flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, gap: 5 },
  blueBadge: { backgroundColor: "#1F3FA3" },
  blueBadgeLight: { backgroundColor: "#DCE6FF" },
  redBadge: { backgroundColor: "#FF8A80" },
  statTextWhite: { color: "#fff", fontWeight: "700", fontSize: 12 },
  statTextBlue: { color: "#1F3FA3", fontWeight: "700", fontSize: 12 },
  actionRow: { flexDirection: "row", gap: 10 },
  viewBtn: { flex: 1, backgroundColor: "#1F3FA3", paddingVertical: 12, borderRadius: 12, alignItems: "center" },
  viewBtnText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  deleteBtn: { flex: 1, backgroundColor: "#9CA3AF", paddingVertical: 12, borderRadius: 12, alignItems: "center" },
  deleteBtnText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  centerMsg: { flex: 1, justifyContent: "center", alignItems: "center" },

  // --- MODAL STYLES ---
  modalOverlay: { flex: 1, backgroundColor: 'rgba(23, 49, 126, 0.95)', justifyContent: 'center', alignItems: 'center' },
  closeModalBtn: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
  modalCard: { width: '85%', backgroundColor: '#fff', borderRadius: 30, padding: 20, alignItems: 'center', paddingTop: 40 },
  modalAvatarContainer: { marginBottom: 10 },
  modalAvatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#fff' },
  modalNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  modalUsername: { fontSize: 18, fontWeight: '700', color: '#2F5BEA' },
  verifiedBadge: { backgroundColor: '#1F3FA3', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  verifiedText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  modalPriceContainer: { marginBottom: 20 },
  modalPricePill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCE6FF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, gap: 8 },
  proposalBox: { width: '100%', backgroundColor: '#F0F4FF', borderRadius: 15, padding: 15, minHeight: 120, marginBottom: 20 },
  proposalText: { color: '#666', fontSize: 14, lineHeight: 20 },
  modalStatsRow: { flexDirection: 'row', gap: 8, marginBottom: 25 },
  
  modalBtnRow: { flexDirection: 'row', gap: 10, width: '100%' },
  acceptBtn: { flex: 1.2, backgroundColor: '#1F3FA3', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  negotiateBtn: { flex: 1, backgroundColor: '#2F5BEA', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  btnTextWhite: { color: '#fff', fontWeight: '600', fontSize: 14 },

  // Negotiation Styles
  negotiateInput: { 
    flex: 1.5, 
    backgroundColor: '#DCE6FF', 
    borderRadius: 12, 
    paddingHorizontal: 15, 
    fontSize: 14, 
    color: '#1F3FA3', 
    fontWeight: '600'
  },
  sendNegotiateBtn: { 
    flex: 1, 
    backgroundColor: '#2F5BEA', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 12 
  },

  // --- SUCCESS MODAL STYLES ---
  successCard: { width: '80%', backgroundColor: '#fff', borderRadius: 30, padding: 30, alignItems: 'center', elevation: 10 },
  successTitle: { fontSize: 22, fontWeight: '700', color: '#000', marginBottom: 30, textAlign: 'center' },
  successIconContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#2F5BEA', justifyContent: 'center', alignItems: 'center', marginBottom: 30, elevation: 8 },
  goToRoomBtn: { backgroundColor: '#2F5BEA', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30, width: '100%', alignItems: 'center' },
  goToRoomText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});