// import React, { useState, useEffect } from "react";
// import { 
//   View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, Modal
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { 
//   Briefcase, MapPin, ArrowRight, Users, IndianRupee, X, Star, ThumbsUp, ThumbsDown, Phone
// } from "lucide-react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { useRouter } from "expo-router";

// // Get screen width
// const { width } = Dimensions.get("window");

// // Replace with your IP
// const API_URL = "http://192.168.1.5:5000/api"; 

// export default function ProviderHomeScreen() {
//   const router = useRouter();
//   const [isOnline, setIsOnline] = useState(false);
//   const [userName, setUserName] = useState("Provider");
  
//   // Task State
//   const [incomingTask, setIncomingTask] = useState<any>(null);
  
//   // Modal State
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // 1. Fetch User Name
//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       if(token) {
//         const res = await axios.get(`${API_URL}/users/me`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setUserName(res.data.name);
//       }
//     } catch (e) {
//       console.log("Error profile", e);
//     }
//   };

//   // 2. Poll for Tasks when Online
//   // useEffect(() => {
//   //   let interval: NodeJS.Timeout;

//   //   const fetchTasks = async () => {
//   //     if (!isOnline) return;
//   //     try {
//   //       const token = await AsyncStorage.getItem("token");
//   //       // Endpoint to get tasks nearby
//   //       const res = await axios.get(`${API_URL}/tasks/feed`, {
//   //         headers: { Authorization: `Bearer ${token}` }
//   //       });

//   //       if (res.data && res.data.length > 0) {
//   //         setIncomingTask(res.data[0]); 
//   //       }
//   //     } catch (err) {
//   //       console.log("No tasks found yet...");
//   //     }
//   //   };

//   //   if (isOnline) {
//   //     fetchTasks(); 
//   //     interval = setInterval(fetchTasks, 5000); // Poll every 5 seconds
//   //   } else {
//   //     setIncomingTask(null);
//   //     setShowDetailModal(false);
//   //   }

//   //   return () => clearInterval(interval);
//   // }, [isOnline]);
//   let timer: number;

//    useEffect(() => {
//   let timer: ReturnType<typeof setTimeout>;

//   if (isOnline) {
//     setIncomingTask(null);
//     timer = setTimeout(() => {
//       setIncomingTask({
//         id: 1,
//         title: "Hiring UI/UX Designer Remote",
//         location: "Visakhapatnam, AP",
//         rate: "2K/h",
//         persons: 4,
//         clientStats: {
//           rating: 4.5,
//           totalJobs: 130,
//           likes: 124,
//           dislikes: 6,
//         },
//       });
//     }, 3000);
//   } else {
//     setIncomingTask(null);
//     setShowDetailModal(false);
//   }

//   return () => {
//     if (timer) clearTimeout(timer);
//   };
// }, [isOnline]);


//   const toggleSwitch = () => setIsOnline(prev => !prev);

//   // 3. Open Modal
//   const handleSlideComplete = () => {
//     setShowDetailModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowDetailModal(false);
//   };

//   // 4. Submit Interest (MVP SIMPLIFIED LOGIC)
//   const handleInterest = async () => {
//     setLoading(true);
//     try {
//       const token = await AsyncStorage.getItem("token");
      
//       // --- CHANGE: Endpoint is now simple interest, no payload body needed ---
//       await axios.post(`${API_URL}/tasks/${incomingTask._id}/interest`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setShowDetailModal(false);
//       setIncomingTask(null); // Clear from home
      
//       // --- CHANGE: Message reflects the new flow (Waiting for client to call) ---
//       Alert.alert("Interest Sent!", "You are now on the list. The client will call you if selected.", [
//         { text: "OK", onPress: () => router.push("/(provider)/home/tasks") }
//       ]);

//     } catch (error) {
//       console.log(error);
//       Alert.alert("Error", "Failed to send interest. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
      
//       {/* --- HEADER --- */}
//       <View style={styles.header}>
//         <SafeAreaView edges={['top', 'left', 'right']}>
//           <View style={styles.headerContent}>
//             <Text style={styles.logoText}>LAZY{"\n"}GANG</Text>
//             <View style={{marginTop: 20}}>
//                <Text style={styles.greeting}>Hi {userName}!</Text>
//             </View>
//             <View style={styles.toggleWrapper}>
//               <TouchableOpacity 
//                 activeOpacity={0.9} 
//                 onPress={toggleSwitch}
//                 style={[styles.toggleBtn, isOnline ? styles.toggleOn : styles.toggleOff]}
//               >
//                 <View style={[styles.toggleCircle, isOnline ? {right: 4} : {left: 4}]} />
//                 <Text style={styles.toggleText}>{isOnline ? "Online" : "Offline"}</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </SafeAreaView>
//       </View>

//       {/* --- BODY --- */}
//       <View style={styles.body}>
//         {!isOnline && (
//           <View style={styles.centerContent}>
//             <View style={styles.iconBox}><Briefcase color="#93C5FD" size={50} /></View>
//             <Text style={styles.linkText}>Go online to get gigs</Text>
//           </View>
//         )}

//         {isOnline && !incomingTask && (
//           <View style={styles.centerContent}>
//             <View style={[styles.iconBox, { backgroundColor: '#E0F2FE' }]}><Briefcase color="#3B82F6" size={50} /></View>
//             <Text style={styles.infoText}>Searching for gigs nearby...</Text>
//           </View>
//         )}

//         {isOnline && incomingTask && (
//           <View style={styles.taskCard}>
//             <View style={styles.cardHeader}>
//               <View style={styles.mapIconBox}><MapPin color="white" size={24} /></View>
//               <Text style={styles.taskTitle}>{incomingTask.title || "New Task"}</Text>
//             </View>

//             <View style={styles.detailsRow}>
//               <View style={styles.detailChip}>
//                 <View style={styles.chipIcon}><IndianRupee size={14} color="white" /></View>
//                 <Text style={styles.detailText}>{incomingTask.amount || "N/A"}</Text>
//               </View>
//               <View style={[styles.detailChip, { marginLeft: 10 }]}>
//                 <View style={styles.chipIcon}><Users size={14} color="white" /></View>
//                 <Text style={styles.detailText}>{incomingTask.persons || 1} Persons</Text>
//               </View>
//             </View>

//             <View style={{flex: 1}} />

//             <TouchableOpacity style={styles.slideButton} activeOpacity={0.8} onPress={handleSlideComplete}>
//               <View style={styles.slideCircle}><ArrowRight color="#000" size={20} /></View>
//               <Text style={styles.slideText}>Slide to view details</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>

//       {/* --- MODAL POPUP (MVP Version) --- */}
//       <Modal
//         visible={showDetailModal}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={handleCloseModal}
//       >
//         <View style={styles.modalOverlay}>
//           <SafeAreaView style={styles.closeButtonArea}>
//             <TouchableOpacity onPress={handleCloseModal} style={styles.closeIcon}>
//               <X color="white" size={32} />
//             </TouchableOpacity>
//           </SafeAreaView>

//           <View style={styles.modalCard}>
            
//             <View style={styles.modalHeaderCenter}>
//               <View style={styles.modalMapIcon}>
//                 <MapPin color="white" size={30} />
//               </View>
//               <View style={styles.categoryTag}>
//                 <Text style={styles.categoryText}>{incomingTask?.category || "General"}</Text>
//               </View>
//             </View>

//             <Text style={styles.modalTitle}>{incomingTask?.title || "Task Details"}</Text>
//             <Text style={styles.modalSubtitle}>{incomingTask?.description || "No description provided."}</Text>

//             {/* --- CHANGE: Removed Input Box --- */}

//             {/* Stats Row */}
//             <View style={styles.statsRow}>
//               <View style={styles.statPillBlue}>
//                 <View style={styles.statIconCircle}><Star size={10} color="white" fill="white" /></View>
//                 <Text style={styles.statText}>4.5</Text>
//               </View>
//               <View style={styles.statPillBlue}>
//                 <View style={styles.statIconCircle}><Briefcase size={10} color="white" /></View>
//                 <Text style={styles.statText}>130</Text>
//               </View>
//               <View style={styles.statPillBlue}>
//                 <View style={styles.statIconCircle}><ThumbsUp size={10} color="white" /></View>
//                 <Text style={styles.statText}>124</Text>
//               </View>
//             </View>

//             {/* --- CHANGE: Single Action Button --- */}
//             <View style={styles.actionRow}>
//               <TouchableOpacity 
//                 style={styles.interestBtn} 
//                 onPress={handleInterest}
//                 disabled={loading}
//               >
//                 <Text style={styles.interestBtnText}>
//                   {loading ? "Sending..." : "I'm Interested"}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//           </View>
//         </View>
//       </Modal>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F3F4F6" },
//   header: { backgroundColor: "#0F172A", height: 280, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 },
//   headerContent: { paddingHorizontal: 24, paddingTop: 10, height: '100%' },
//   logoText: { color: "white", fontSize: 18, fontWeight: "900", lineHeight: 22 },
//   greeting: { fontSize: 28, fontWeight: "bold", color: "white", textAlign: "center", marginTop: 20 },
//   toggleWrapper: { alignItems: 'center', marginTop: 30 },
//   toggleBtn: { width: 140, height: 44, borderRadius: 25, justifyContent: 'center', borderWidth: 2, borderColor: "white", flexDirection: 'row', alignItems: 'center', position: 'relative' },
//   toggleOn: { backgroundColor: "#1E40AF" },
//   toggleOff: { backgroundColor: "#0F172A" },
//   toggleCircle: { position: 'absolute', width: 32, height: 32, borderRadius: 16, backgroundColor: "white", top: 4 },
//   toggleText: { color: "white", fontWeight: "bold", fontSize: 15, textAlign: 'center', width: '100%' },
//   body: { flex: 1, marginTop: 220, paddingHorizontal: 20, paddingBottom: 100, justifyContent: 'center', alignItems: 'center', zIndex: 2 },
//   centerContent: { alignItems: 'center', justifyContent: 'center', marginTop: 50 },
//   iconBox: { width: 100, height: 80, backgroundColor: "#DBEAFE", borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
//   linkText: { color: "#60A5FA", fontSize: 16, fontWeight: "600" },
//   infoText: { color: "#6B7280", fontSize: 16 },
//   taskCard: { backgroundColor: "white", width: '100%', height: 350, borderRadius: 20, padding: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, marginTop: 20 },
//   cardHeader: { flexDirection: "row", alignItems: "flex-start", marginBottom: 20 },
//   mapIconBox: { width: 50, height: 50, backgroundColor: "#2563EB", borderRadius: 12, justifyContent: "center", alignItems: "center", marginRight: 15 },
//   taskTitle: { fontSize: 20, fontWeight: "bold", color: "#374151", flex: 1, lineHeight: 28 },
//   detailsRow: { flexDirection: "row", marginTop: 10 },
//   detailChip: { flexDirection: "row", backgroundColor: "#EFF6FF", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, alignItems: "center" },
//   chipIcon: { width: 20, height: 20, borderRadius: 10, backgroundColor: "#1E40AF", justifyContent: "center", alignItems: "center", marginRight: 6 },
//   detailText: { color: "#1E40AF", fontWeight: "bold", fontSize: 14 },
//   slideButton: { backgroundColor: "#1E3A8A", height: 60, borderRadius: 30, flexDirection: "row", alignItems: "center", paddingHorizontal: 6 },
//   slideCircle: { width: 48, height: 48, backgroundColor: "white", borderRadius: 24, justifyContent: "center", alignItems: "center" },
//   slideText: { color: "white", fontSize: 16, fontWeight: "600", flex: 1, textAlign: "center", paddingRight: 10 },
  
//   // Modal
//   modalOverlay: { flex: 1, backgroundColor: "rgba(15, 23, 42, 0.9)", justifyContent: "center", alignItems: "center" },
//   closeButtonArea: { position: 'absolute', top: 20, left: 20, zIndex: 10 },
//   closeIcon: { padding: 10 },
//   modalCard: { width: width * 0.85, backgroundColor: "white", borderRadius: 30, padding: 24, alignItems: "center" },
//   modalHeaderCenter: { alignItems: "center", marginTop: -50, marginBottom: 10 },
//   modalMapIcon: { width: 70, height: 70, backgroundColor: "#2563EB", borderRadius: 20, justifyContent: "center", alignItems: "center", marginBottom: 10, borderWidth: 4, borderColor: "white" },
//   categoryTag: { backgroundColor: "#DBEAFE", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
//   categoryText: { color: "#2563EB", fontSize: 12, fontWeight: "600" },
//   modalTitle: { fontSize: 22, fontWeight: "bold", textAlign: "center", color: "#4B5563", marginTop: 10 },
//   modalSubtitle: { fontSize: 14, color: "#9CA3AF", textAlign: "center", marginBottom: 20, paddingHorizontal: 10 },
//   statsRow: { flexDirection: "row", justifyContent: "center", width: '100%', marginBottom: 30, gap: 10 },
//   statPillBlue: { flexDirection: "row", backgroundColor: "#EFF6FF", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16, alignItems: "center" },
//   statIconCircle: { width: 16, height: 16, borderRadius: 8, backgroundColor: "#1E40AF", justifyContent: "center", alignItems: "center", marginRight: 6 },
//   statText: { fontSize: 12, fontWeight: "bold", color: "#1E40AF" },
  
//   // --- CHANGE: New Single Button Style ---
//   actionRow: { width: '100%' },
//   interestBtn: { 
//     backgroundColor: "#1E3A8A", // Dark Blue
//     paddingVertical: 16, 
//     borderRadius: 15, 
//     alignItems: "center",
//     width: '100%',
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   interestBtnText: { color: "white", fontWeight: "bold", fontSize: 16 },
// });


import React, { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, Modal, TextInput 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
  Briefcase, MapPin, ArrowRight, Users, IndianRupee, X, Star, ThumbsUp, ThumbsDown 
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";

// Get screen width
const { width } = Dimensions.get("window");

// Replace with your IP
const API_URL = "http://192.168.1.5:5000/api"; 

export default function ProviderHomeScreen() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(false);
  const [userName, setUserName] = useState("Provider");
  
  // Task State
  const [incomingTask, setIncomingTask] = useState<any>(null);
  
  // Modal State
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [proposalText, setProposalText] = useState(""); // Stores the typed message
  const [loading, setLoading] = useState(false);

  // 1. Fetch User Name
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if(token) {
        const res = await axios.get(`${API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserName(res.data.name);
      }
    } catch (e) {
      console.log("Error profile", e);
    }
  };

  // 2. Poll for Tasks when Online
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;


    const fetchTasks = async () => {
      if (!isOnline) return;
      try {
        const token = await AsyncStorage.getItem("token");
        // Endpoint to get tasks nearby
        const res = await axios.get(`${API_URL}/tasks/feed`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data && res.data.length > 0) {
          setIncomingTask(res.data[0]); 
        }
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
          dislikes: 6,
        },
      });
      } catch (err) {
        console.log("No tasks found yet...");
      }
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
          dislikes: 6,
        },
      });
    };

    if (isOnline) {
      fetchTasks(); 
      interval = setInterval(fetchTasks, 5000); // Poll every 5 seconds
    } else {
      setIncomingTask(null);
      setShowDetailModal(false);
    }

    return () => clearInterval(interval);
  }, [isOnline]);

  const toggleSwitch = () => setIsOnline(prev => !prev);

  // 3. Open Modal
  const handleSlideComplete = () => {
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
  };

  // 4. ACTION LOGIC
  const handleSubmit = async (type: 'fixed' | 'negotiate') => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      
      // If Negotiate is clicked but text is empty, warn user
      if (type === 'negotiate' && !proposalText.trim()) {
        Alert.alert("Proposal Needed", "Please type a message to negotiate.");
        setLoading(false);
        return;
      }

      // Backend Endpoint: POST /tasks/:id/apply
      await axios.post(`${API_URL}/tasks/${incomingTask._id}/apply`, {
        bidType: type, // 'fixed' or 'negotiate'
        proposal: type === 'negotiate' ? proposalText : "Fixed Price Request",
        amount: incomingTask.amount // You can enable editing this if needed
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setShowDetailModal(false);
      setIncomingTask(null); // Clear from home
      setProposalText(""); // Reset text
      
      const message = type === 'fixed' 
        ? "Request sent to Client!" 
        : "Negotiation sent to Client!";

      Alert.alert("Success", message, [
        { text: "OK", onPress: () => router.push("/(provider)/home/tasks") }
      ]);

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to submit request.");
    } finally {
      setLoading(false);
    }
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
              <Text style={styles.taskTitle}>{incomingTask.title || "New Task"}</Text>
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.detailChip}>
                <View style={styles.chipIcon}><IndianRupee size={14} color="white" /></View>
                <Text style={styles.detailText}>{incomingTask.amount || "N/A"}</Text>
              </View>
              <View style={[styles.detailChip, { marginLeft: 10 }]}>
                <View style={styles.chipIcon}><Users size={14} color="white" /></View>
                <Text style={styles.detailText}>{incomingTask.persons || 1} Persons</Text>
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

      {/* --- MODAL POPUP (Old Version with 2 Buttons) --- */}
      <Modal
        visible={showDetailModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.closeButtonArea}>
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeIcon}>
              <X color="white" size={32} />
            </TouchableOpacity>
          </SafeAreaView>

          <View style={styles.modalCard}>
            
            <View style={styles.modalHeaderCenter}>
              <View style={styles.modalMapIcon}>
                <MapPin color="white" size={30} />
              </View>
              <View style={styles.categoryTag}>
                <Text style={styles.categoryText}>{incomingTask?.category || "No Category"}</Text>
              </View>
            </View>

            <Text style={styles.modalTitle}>{incomingTask?.title || "Task Details"}</Text>

            {/* --- PROPOSAL INPUT --- */}
            <View style={styles.proposalBox}>
              <TextInput
                style={styles.proposalInput}
                placeholder="Your proposal will be mentioned here..."
                placeholderTextColor="#9CA3AF"
                multiline
                value={proposalText}
                onChangeText={setProposalText}
              />
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statPillBlue}>
                <View style={styles.statIconCircle}><Star size={10} color="white" fill="white" /></View>
                <Text style={styles.statText}>4.5</Text>
              </View>
              <View style={styles.statPillBlue}>
                <View style={styles.statIconCircle}><Briefcase size={10} color="white" /></View>
                <Text style={styles.statText}>130</Text>
              </View>
              <View style={styles.statPillBlue}>
                <View style={styles.statIconCircle}><ThumbsUp size={10} color="white" /></View>
                <Text style={styles.statText}>124</Text>
              </View>
              <View style={styles.statPillRed}>
                <View style={[styles.statIconCircle, {backgroundColor: '#EF4444'}]}><ThumbsDown size={10} color="white" /></View>
                <Text style={[styles.statText, {color: '#EF4444'}]}>6</Text>
              </View>
            </View>

            {/* --- TWO BUTTONS --- */}
            <View style={styles.actionRow}>
              {/* Button 1: Request Gig (Fixed) */}
              <TouchableOpacity 
                style={styles.requestBtn} 
                onPress={() => handleSubmit('fixed')}
                disabled={loading}
              >
                <Text style={styles.requestBtnText}>Request Gig</Text>
              </TouchableOpacity>
              
              {/* Button 2: Negotiate (Custom) */}
              <TouchableOpacity 
                style={styles.negotiateBtn} 
                onPress={() => handleSubmit('negotiate')}
                disabled={loading}
              >
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
  
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: "rgba(15, 23, 42, 0.9)", justifyContent: "center", alignItems: "center" },
  closeButtonArea: { position: 'absolute', top: 20, left: 20, zIndex: 10 },
  closeIcon: { padding: 10 },
  modalCard: { width: width * 0.85, backgroundColor: "white", borderRadius: 30, padding: 24, alignItems: "center" },
  modalHeaderCenter: { alignItems: "center", marginTop: -50, marginBottom: 10 },
  modalMapIcon: { width: 70, height: 70, backgroundColor: "#2563EB", borderRadius: 20, justifyContent: "center", alignItems: "center", marginBottom: 10, borderWidth: 4, borderColor: "white" },
  categoryTag: { backgroundColor: "#DBEAFE", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  categoryText: { color: "#2563EB", fontSize: 12, fontWeight: "600" },
  modalTitle: { fontSize: 22, fontWeight: "bold", textAlign: "center", color: "#4B5563", marginVertical: 15 },
  
  // Proposal Box
  proposalBox: { width: '100%', height: 140, backgroundColor: "#F3F4F6", borderRadius: 16, padding: 16, marginBottom: 20 },
  proposalInput: { flex: 1, fontSize: 14, color: "#374151", textAlignVertical: "top" },
  
  // Stats
  statsRow: { flexDirection: "row", justifyContent: "space-between", width: '100%', marginBottom: 25 },
  statPillBlue: { flexDirection: "row", backgroundColor: "#EFF6FF", paddingHorizontal: 8, paddingVertical: 6, borderRadius: 16, alignItems: "center" },
  statPillRed: { flexDirection: "row", backgroundColor: "#FEF2F2", paddingHorizontal: 8, paddingVertical: 6, borderRadius: 16, alignItems: "center" },
  statIconCircle: { width: 16, height: 16, borderRadius: 8, backgroundColor: "#1E40AF", justifyContent: "center", alignItems: "center", marginRight: 6 },
  statText: { fontSize: 12, fontWeight: "bold", color: "#1E40AF" },
  
  // Action Buttons
  actionRow: { flexDirection: "row", justifyContent: "space-between", width: '100%' },
  requestBtn: { flex: 1, backgroundColor: "#1E3A8A", paddingVertical: 14, borderRadius: 12, marginRight: 10, alignItems: "center" },
  requestBtnText: { color: "white", fontWeight: "bold", fontSize: 15 },
  negotiateBtn: { flex: 1, backgroundColor: "#0000FF", paddingVertical: 14, borderRadius: 12, marginLeft: 10, alignItems: "center" },
  negotiateBtnText: { color: "white", fontWeight: "bold", fontSize: 15 },
});