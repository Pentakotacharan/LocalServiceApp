// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   Modal,
//   Linking,
//   Alert,
//   ScrollView,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// // --- MOCK DATA ---
// const MOCK_REQUESTS = [
//   {
//     id: "1",
//     username: "Rahul Kumar",
//     avatarUrl: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg",
//     bid: "1.5K/h",
//     rating: "4.8",
//     jobs: "130",
//     likes: "124",
//     dislikes: "6",
//     phoneNumber: "1234567890", // Mock phone number
//     isVerified: true,
//     proposalText: "Hi, I have 3 years of experience in React Native and UI design. I can help you build this screen exactly as per the Figma design. I am available to start immediately."
//   },
//   {
//     id: "2",
//     username: "Priya Sharma",
//     avatarUrl: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
//     bid: "2.0K/h",
//     rating: "4.5",
//     jobs: "85",
//     likes: "200",
//     dislikes: "2",
//     phoneNumber: "0987654321",
//     isVerified: false,
//     proposalText: "I am interested in this task. I have worked on similar on-demand apps before. Let's connect to discuss the requirements."
//   }
// ];

// export default function CheckRequestsScreen() {
//   const router = useRouter();
//   // --- STATE ---
//   const [proposalModalVisible, setProposalModalVisible] = useState(false);
//   const [successModalVisible, setSuccessModalVisible] = useState(false);
//   const [selectedProposal, setSelectedProposal] = useState<any>(null);

//   // --- HANDLERS ---
//   const handleOpenProposal = (item: any) => {
//     setSelectedProposal(item);
//     setProposalModalVisible(true);
//   };

//   const handleCallProvider = () => {
//     if (selectedProposal?.phoneNumber) {
//       Linking.openURL(`tel:${selectedProposal.phoneNumber}`).catch(() => 
//         Alert.alert("Error", "Unable to open dialer")
//       );
//     }
//   };

//   const handleAcceptProposal = () => {
//     setProposalModalVisible(false);
//     // Show success after a brief delay
//     setTimeout(() => setSuccessModalVisible(true), 300);
//   };

//   const handleGoToRoom = () => {
//     setSuccessModalVisible(false);
//     router.back(); // Or navigate to active task screen
//   };

//   // --- RENDER CARD ---
//   const renderRequestCard = ({ item }: { item: any }) => (
//     <View style={styles.card}>
//       {/* HEADER: Avatar, Name, Price */}
//       <View style={styles.cardHeader}>
//         <View style={styles.userInfo}>
//           <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
//           <Text style={styles.username}>{item.username}</Text>
//         </View>

//         <View style={styles.priceBadge}>
//           <View style={styles.rupeeCircle}>
//             <FontAwesome5 name="rupee-sign" size={10} color="#fff" />
//           </View>
//           <Text style={styles.priceText}>{item.bid}</Text>
//         </View>
//       </View>

//       {/* STATS ROW */}
//       <View style={styles.statsRow}>
//         <View style={[styles.statBadge, styles.blueBadge]}>
//           <Ionicons name="star" size={12} color="#fff" />
//           <Text style={styles.statTextWhite}>{item.rating}</Text>
//         </View>
//         <View style={[styles.statBadge, styles.blueBadgeLight]}>
//           <MaterialIcons name="work" size={12} color="#1F3FA3" />
//           <Text style={styles.statTextBlue}>{item.jobs}</Text>
//         </View>
//         <View style={[styles.statBadge, styles.blueBadgeLight]}>
//           <Ionicons name="thumbs-up" size={12} color="#1F3FA3" />
//           <Text style={styles.statTextBlue}>{item.likes}</Text>
//         </View>
//         <View style={[styles.statBadge, styles.redBadge]}>
//           <Ionicons name="thumbs-down" size={12} color="#fff" />
//           <Text style={styles.statTextWhite}>{item.dislikes}</Text>
//         </View>
//       </View>

//       {/* ACTION BUTTONS (Restored) */}
//       <View style={styles.actionRow}>
//         <TouchableOpacity 
//           style={styles.viewBtn} 
//           onPress={() => handleOpenProposal(item)}
//         >
//           <Text style={styles.viewBtnText}>View Proposal</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.deleteBtn}>
//           <Text style={styles.deleteBtnText}>Delete Proposal</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Received Proposals ({MOCK_REQUESTS.length})</Text>
//       </View>

//       {/* CONTENT (No Tabs, Just List) */}
//       <View style={styles.contentContainer}>
//         <FlatList
//           data={MOCK_REQUESTS}
//           keyExtractor={(item) => item.id}
//           renderItem={renderRequestCard}
//           contentContainerStyle={styles.listContent}
//           showsVerticalScrollIndicator={false}
//         />
//       </View>

//       {/* ================================================= */}
//       {/* 1. PROPOSAL DETAILS POPUP                         */}
//       {/* ================================================= */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={proposalModalVisible}
//         onRequestClose={() => setProposalModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <TouchableOpacity 
//             style={styles.closeModalBtn} 
//             onPress={() => setProposalModalVisible(false)}
//           >
//             <Ionicons name="close" size={32} color="#fff" />
//           </TouchableOpacity>

//           {selectedProposal && (
//             <View style={styles.modalCard}>
//               {/* Profile Header */}
//               <View style={styles.modalAvatarContainer}>
//                 <Image source={{ uri: selectedProposal.avatarUrl }} style={styles.modalAvatar} />
//               </View>

//               <View style={styles.modalNameRow}>
//                 <Text style={styles.modalUsername}>{selectedProposal.username}</Text>
//                 {selectedProposal.isVerified && (
//                   <View style={styles.verifiedBadge}>
//                     <Text style={styles.verifiedText}>VERIFIED</Text>
//                   </View>
//                 )}
//               </View>

//               <View style={styles.modalPriceContainer}>
//                  <View style={styles.modalPricePill}>
//                     <View style={styles.rupeeCircle}>
//                       <FontAwesome5 name="rupee-sign" size={10} color="#fff" />
//                     </View>
//                     <Text style={styles.priceText}>{selectedProposal.bid}</Text>
//                  </View>
//               </View>

//               {/* Proposal Text */}
//               <View style={styles.proposalBox}>
//                 <ScrollView>
//                   <Text style={styles.proposalText}>
//                     {selectedProposal.proposalText}
//                   </Text>
//                 </ScrollView>
//               </View>

//               {/* Stats */}
//               <View style={styles.modalStatsRow}>
//                 <View style={[styles.statBadge, styles.blueBadge]}>
//                   <Ionicons name="star" size={12} color="#fff" />
//                   <Text style={styles.statTextWhite}>{selectedProposal.rating}</Text>
//                 </View>
//                 <View style={[styles.statBadge, styles.blueBadgeLight]}>
//                   <MaterialIcons name="work" size={12} color="#1F3FA3" />
//                   <Text style={styles.statTextBlue}>{selectedProposal.jobs}</Text>
//                 </View>
//                 <View style={[styles.statBadge, styles.blueBadgeLight]}>
//                   <Ionicons name="thumbs-up" size={12} color="#1F3FA3" />
//                   <Text style={styles.statTextBlue}>{selectedProposal.likes}</Text>
//                 </View>
//               </View>

//               {/* ACTION BUTTONS: Call & Accept */}
//               <View style={styles.modalBtnRow}>
                
//                 {/* CALL BUTTON (Replaces Negotiate) */}
//                 <TouchableOpacity 
//                   style={styles.callBtn}
//                   onPress={handleCallProvider}
//                 >
//                   <Ionicons name="call" size={20} color="#fff" />
//                   <Text style={styles.btnTextWhite}>Call to Discuss</Text>
//                 </TouchableOpacity>

//                 {/* ACCEPT BUTTON */}
//                 <TouchableOpacity 
//                   style={styles.acceptBtn} 
//                   onPress={handleAcceptProposal}
//                 >
//                   <Text style={styles.btnTextWhite}>Accept Proposal</Text>
//                 </TouchableOpacity>

//               </View>
//             </View>
//           )}
//         </View>
//       </Modal>

//       {/* ================================================= */}
//       {/* 2. SUCCESS MODAL                                  */}
//       {/* ================================================= */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={successModalVisible}
//         onRequestClose={() => setSuccessModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.successCard}>
//             <Text style={styles.successTitle}>Proposal Accepted</Text>
            
//             <View style={styles.successIconContainer}>
//               <Ionicons name="checkmark" size={50} color="#fff" />
//             </View>

//             <TouchableOpacity 
//               style={styles.goToRoomBtn} 
//               onPress={handleGoToRoom}
//             >
//               <Text style={styles.goToRoomText}>Go to Active Task</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F9FAFB" },

//   // HEADER
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: "#fff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   headerTitle: { fontSize: 18, fontWeight: "700", color: "#111", marginLeft: 15 },

//   // CONTENT
//   contentContainer: { flex: 1, backgroundColor: "#F8F9FA" },
//   listContent: { padding: 20 },

//   // CARD STYLES
//   card: { backgroundColor: "#fff", borderRadius: 20, padding: 16, marginBottom: 16, elevation: 3, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
//   cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
//   userInfo: { flexDirection: "row", alignItems: "center", gap: 10 },
//   avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "#fff" },
//   username: { fontSize: 16, fontWeight: "700", color: "#2F5BEA" },
//   priceBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#DCE6FF", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, gap: 6 },
//   rupeeCircle: { width: 16, height: 16, borderRadius: 8, backgroundColor: "#1F3FA3", justifyContent: "center", alignItems: "center" },
//   priceText: { color: "#1F3FA3", fontWeight: "700", fontSize: 14 },
  
//   // STATS
//   statsRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 20 },
//   statBadge: { flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, gap: 5 },
//   blueBadge: { backgroundColor: "#1F3FA3" },
//   blueBadgeLight: { backgroundColor: "#DCE6FF" },
//   redBadge: { backgroundColor: "#FF8A80" },
//   statTextWhite: { color: "#fff", fontWeight: "700", fontSize: 12 },
//   statTextBlue: { color: "#1F3FA3", fontWeight: "700", fontSize: 12 },

//   // LIST BUTTONS
//   actionRow: { flexDirection: "row", gap: 10 },
//   viewBtn: { flex: 1, backgroundColor: "#1F3FA3", paddingVertical: 12, borderRadius: 12, alignItems: "center" },
//   viewBtnText: { color: "#fff", fontWeight: "600", fontSize: 14 },
//   deleteBtn: { flex: 1, backgroundColor: "#9CA3AF", paddingVertical: 12, borderRadius: 12, alignItems: "center" },
//   deleteBtnText: { color: "#fff", fontWeight: "600", fontSize: 14 },

//   // --- MODAL STYLES ---
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(23, 49, 126, 0.95)', justifyContent: 'center', alignItems: 'center' },
//   closeModalBtn: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
//   modalCard: { width: '85%', backgroundColor: '#fff', borderRadius: 30, padding: 20, alignItems: 'center', paddingTop: 40 },
//   modalAvatarContainer: { marginBottom: 10 },
//   modalAvatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#fff' },
//   modalNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
//   modalUsername: { fontSize: 18, fontWeight: '700', color: "#2F5BEA" },
//   verifiedBadge: { backgroundColor: '#1F3FA3', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
//   verifiedText: { color: '#fff', fontSize: 10, fontWeight: '700' },
//   modalPriceContainer: { marginBottom: 20 },
//   modalPricePill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCE6FF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, gap: 8 },
  
//   // Proposal Text Box
//   proposalBox: { width: '100%', backgroundColor: '#F0F4FF', borderRadius: 15, padding: 15, maxHeight: 150, marginBottom: 20 },
//   proposalText: { color: '#4B5563', fontSize: 14, lineHeight: 22 },

//   modalStatsRow: { flexDirection: 'row', gap: 8, marginBottom: 25 },
  
//   // Modal Buttons
//   modalBtnRow: { flexDirection: 'row', gap: 10, width: '100%' },
//   callBtn: { flex: 1, backgroundColor: '#10B981', paddingVertical: 14, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 },
//   acceptBtn: { flex: 1.2, backgroundColor: '#2F5BEA', paddingVertical: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
//   btnTextWhite: { color: '#fff', fontWeight: '600', fontSize: 14 },

//   // Success Modal
//   successCard: { width: '80%', backgroundColor: '#fff', borderRadius: 30, padding: 30, alignItems: 'center', elevation: 10 },
//   successTitle: { fontSize: 22, fontWeight: '700', color: '#000', marginBottom: 30 },
//   successIconContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#2F5BEA', justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
//   goToRoomBtn: { backgroundColor: '#2F5BEA', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30, width: '100%', alignItems: 'center' },
//   goToRoomText: { color: '#fff', fontWeight: '600', fontSize: 16 },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Linking,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// --- MOCK DATA ---
const INITIAL_REQUESTS = [
  {
    id: "1",
    username: "Rahul Kumar",
    avatarUrl: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg",
    bid: "1.5K/h",
    rating: "4.8",
    jobs: "130",
    likes: "124",
    dislikes: "6",
    phoneNumber: "1234567890",
    isVerified: true,
    proposalText: "Hi, I have 3 years of experience in React Native and UI design. I can help you build this screen exactly as per the Figma design. I am available to start immediately."
  },
  {
    id: "2",
    username: "Priya Sharma",
    avatarUrl: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
    bid: "2.0K/h",
    rating: "4.5",
    jobs: "85",
    likes: "200",
    dislikes: "2",
    phoneNumber: "0987654321",
    isVerified: false,
    proposalText: "I am interested in this task. I have worked on similar on-demand apps before. Let's connect to discuss the requirements."
  }
];

export default function CheckRequestsScreen() {
  const router = useRouter();
  // --- STATE ---
  const [activeTab, setActiveTab] = useState<"OpenRequests" | "Room">("OpenRequests");
  
  // Lists
  const [openRequests, setOpenRequests] = useState(INITIAL_REQUESTS);
  const [acceptedProviders, setAcceptedProviders] = useState<any[]>([]);

  // Modals
  const [proposalModalVisible, setProposalModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<any>(null);

  // --- HANDLERS ---

  const handleOpenProposal = (item: any) => {
    setSelectedProposal(item);
    setProposalModalVisible(true);
  };

  const handleCallProvider = (phoneNumber: string) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`).catch(() => 
        Alert.alert("Error", "Unable to open dialer")
      );
    }
  };

  const handleAcceptProposal = () => {
    if (!selectedProposal) return;

    // 1. Close Proposal Modal
    setProposalModalVisible(false);

    // 2. Move Item from Open -> Room
    setOpenRequests(prev => prev.filter(item => item.id !== selectedProposal.id));
    setAcceptedProviders(prev => [...prev, selectedProposal]);

    // 3. Show Success Modal
    setTimeout(() => setSuccessModalVisible(true), 300);
  };

  const handleGoToRoom = () => {
    setSuccessModalVisible(false);
    setActiveTab("Room"); // Switch tab automatically
  };

  // --- RENDER ITEM (OPEN REQUESTS) ---
  const renderRequestCard = ({ item }: { item: any }) => (
    <View style={styles.card}>
      {/* Header */}
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

      {/* Stats */}
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
      </View>

      {/* Actions */}
      <View style={styles.actionRow}>
        <TouchableOpacity 
          style={styles.viewBtn} 
          onPress={() => handleOpenProposal(item)}
        >
          <Text style={styles.viewBtnText}>View Proposal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn}>
          <Text style={styles.deleteBtnText}>Delete Proposal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // --- RENDER ITEM (ROOM / ACCEPTED) ---
  const renderAcceptedCard = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
          <View>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.statusText}>• Hired / Active</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.callIconBtn}
          onPress={() => handleCallProvider(item.phoneNumber)}
        >
          <Ionicons name="call" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.roomActionRow}>
        <TouchableOpacity style={styles.roomBtnSecondary}>
          <Text style={styles.roomBtnTextSecondary}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roomBtnPrimary}>
          <Text style={styles.roomBtnTextPrimary}>Track Work</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
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

      {/* CONTENT AREA */}
      <View style={styles.contentContainer}>
        {activeTab === "OpenRequests" ? (
          <FlatList
            data={openRequests}
            keyExtractor={(item) => item.id}
            renderItem={renderRequestCard}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No open requests.</Text>
              </View>
            }
          />
        ) : (
          <FlatList
            data={acceptedProviders}
            keyExtractor={(item) => item.id}
            renderItem={renderAcceptedCard}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No active providers in Room yet.</Text>
                <Text style={styles.emptySubText}>Accept a proposal to move it here.</Text>
              </View>
            }
          />
        )}
      </View>

      {/* ================================================= */}
      {/* 1. PROPOSAL MODAL                                 */}
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
                <ScrollView>
                  <Text style={styles.proposalText}>
                    {selectedProposal.proposalText}
                  </Text>
                </ScrollView>
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
              </View>

              <View style={styles.modalBtnRow}>
                <TouchableOpacity 
                  style={styles.callBtn}
                  onPress={() => handleCallProvider(selectedProposal.phoneNumber)}
                >
                  <Ionicons name="call" size={20} color="#fff" />
                  <Text style={styles.btnTextWhite}>Call to Discuss</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.acceptBtn} 
                  onPress={handleAcceptProposal}
                >
                  <Text style={styles.btnTextWhite}>Accept Proposal</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>

      {/* ================================================= */}
      {/* 2. SUCCESS MODAL                                  */}
      {/* ================================================= */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successCard}>
            <Text style={styles.successTitle}>Proposal Accepted</Text>
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark" size={50} color="#fff" />
            </View>
            <TouchableOpacity 
              style={styles.goToRoomBtn} 
              onPress={handleGoToRoom}
            >
              <Text style={styles.goToRoomText}>Go to Room</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // Header & Tabs
  header: { paddingHorizontal: 20, paddingVertical: 10 },
  topTabContainer: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#eee" },
  topTab: { flex: 1, paddingVertical: 15, alignItems: "center" },
  topTabActive: { borderBottomWidth: 2, borderBottomColor: "#000" },
  topTabText: { fontSize: 16, fontWeight: "600", color: "#999" },
  topTabTextActive: { color: "#000" },
  
  // Content
  contentContainer: { flex: 1, backgroundColor: "#F8F9FA" },
  listContent: { padding: 20 },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 16, color: '#999', fontWeight: '600' },
  emptySubText: { fontSize: 14, color: '#bbb', marginTop: 5 },

  // Card Styles (Common)
  card: { backgroundColor: "#fff", borderRadius: 20, padding: 16, marginBottom: 16, elevation: 3 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  userInfo: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "#fff" },
  username: { fontSize: 16, fontWeight: "700", color: "#2F5BEA" },
  priceBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#DCE6FF", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, gap: 6 },
  rupeeCircle: { width: 16, height: 16, borderRadius: 8, backgroundColor: "#1F3FA3", justifyContent: "center", alignItems: "center" },
  priceText: { color: "#1F3FA3", fontWeight: "700", fontSize: 14 },
  
  // Open Request Specifics
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

  // Room Specifics
  statusText: { fontSize: 12, color: '#10B981', fontWeight: '600' },
  callIconBtn: { backgroundColor: '#10B981', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  roomActionRow: { flexDirection: 'row', gap: 10, borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 15 },
  roomBtnPrimary: { flex: 1, backgroundColor: '#2F5BEA', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  roomBtnTextPrimary: { color: '#fff', fontWeight: '600' },
  roomBtnSecondary: { flex: 1, backgroundColor: '#F3F4F6', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  roomBtnTextSecondary: { color: '#333', fontWeight: '600' },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(23, 49, 126, 0.95)', justifyContent: 'center', alignItems: 'center' },
  closeModalBtn: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
  modalCard: { width: '85%', backgroundColor: '#fff', borderRadius: 30, padding: 20, alignItems: 'center', paddingTop: 40 },
  modalAvatarContainer: { marginBottom: 10 },
  modalAvatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#fff' },
  modalNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  modalUsername: { fontSize: 18, fontWeight: '700', color: "#2F5BEA" },
  verifiedBadge: { backgroundColor: '#1F3FA3', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  verifiedText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  modalPriceContainer: { marginBottom: 20 },
  modalPricePill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCE6FF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, gap: 8 },
  proposalBox: { width: '100%', backgroundColor: '#F0F4FF', borderRadius: 15, padding: 15, maxHeight: 150, marginBottom: 20 },
  proposalText: { color: '#4B5563', fontSize: 14, lineHeight: 22 },
  modalStatsRow: { flexDirection: 'row', gap: 8, marginBottom: 25 },
  modalBtnRow: { flexDirection: 'row', gap: 10, width: '100%' },
  callBtn: { flex: 1, backgroundColor: '#10B981', paddingVertical: 14, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 },
  acceptBtn: { flex: 1.2, backgroundColor: '#2F5BEA', paddingVertical: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  btnTextWhite: { color: '#fff', fontWeight: '600', fontSize: 14 },
  
  // Success Modal
  successCard: { width: '80%', backgroundColor: '#fff', borderRadius: 30, padding: 30, alignItems: 'center', elevation: 10 },
  successTitle: { fontSize: 22, fontWeight: '700', color: '#000', marginBottom: 30 },
  successIconContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#2F5BEA', justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  goToRoomBtn: { backgroundColor: '#2F5BEA', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30, width: '100%', alignItems: 'center' },
  goToRoomText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});