import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import LocationPickerModal from "../(client)/components/LocationPickerModal";
import axiosClient from "@/api/axiosClient";
// --- MOCK DATA FOR SEARCH ---
const MOCK_LOCATIONS = [
  { id: '1', address: 'Visakhapatnam, Andhra Pradesh' },
  { id: '2', address: 'Vijayawada, Andhra Pradesh' },
  { id: '3', address: 'Hyderabad, Telangana' },
  { id: '4', address: 'Bangalore, Karnataka' },
  { id: '5', address: 'Chennai, Tamil Nadu' },
  { id: '6', address: 'Mumbai, Maharashtra' },
  { id: '7', address: 'Delhi, New Delhi' },
  { id: '8', address: 'Kolkata, West Bengal' },
];

export default function CreateTaskScreen() {
    const router = useRouter();
  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pay, setPay] = useState("00");
  const [persons, setPersons] = useState(0);
  const [isRemote, setIsRemote] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Modal States
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
   const [createdTask, setCreatedTask] = useState<any>(null);
  // Search Logic
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLocations, setFilteredLocations] = useState(MOCK_LOCATIONS);
  const [tempSelected, setTempSelected] = useState("");
   const getCurrentLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const { latitude, longitude } = location.coords;

    setCoords({
      lat: latitude,
      lng: longitude,
    });

    return { lat: latitude, lng: longitude };
  } catch (err) {
    console.error("Location error:", err);
    alert("Unable to fetch location");
  }
};


  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text) {
      const newData = MOCK_LOCATIONS.filter((item) => {
        return item.address.toUpperCase().includes(text.toUpperCase());
      });
      setFilteredLocations(newData);
    } else {
      setFilteredLocations(MOCK_LOCATIONS);
    }
  };

  const handleSaveLocation = () => {
    setSelectedAddress(tempSelected);
    setLocationModalVisible(false);
  };

const handlePost = async () => {
  try {
    // 🔎 Validation
    if (!title || !description) {
      alert("Please enter title and description");
      return;
    }

    if (!coords) {
      alert("Please select a location");
      return;
    }

    if (!pay || Number(pay) <= 0) {
      alert("Please enter valid pay");
      return;
    }

    const payload = {
      category: title,            // or separate category field
      description,
      amount: Number(pay),
      persons,
      isRemote,
      address: selectedAddress,
      lat: coords.lat,
      lng: coords.lng,
      images: [],
    };

    // 🚀 Call backend
    const res = await axiosClient.post("/tasks/create-order", payload);

    const { task, order } = res.data;

    // ✅ Show success modal
    setSuccessModalVisible(true);

    // Store for navigation after user clicks "View Post"
    setCreatedTask({
      task,
      order,
    });

  } catch (err: any) {
    console.error("Create task failed:", err?.response?.data || err.message);
    alert("Failed to post task. Please try again.");
  }
};


 const handleViewPost = () => {
  if (!createdTask) return;

  const { task, order } = createdTask;

  setSuccessModalVisible(false);

  router.push({
    pathname: "./TaskDetailScreen",
    params: {
      taskId: task._id,
      title: task.category,
      description: task.description,
      pay: String(task.amount),
      persons: String(persons),
      isRemote: isRemote ? "true" : "false",
      address: selectedAddress,
      // razorpayOrderId: order.id,
    },
  });
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {/* HEADER */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={26} color="#2F5BEA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
            <Text style={styles.postText}>Post</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* TASK TITLE + DESCRIPTION */}
          <LinearGradient colors={["#1F3FA3", "#2F5BEA"]} style={styles.card}>
            <TextInput
              placeholder="Task Title"
              placeholderTextColor="rgba(255,255,255,0.6)"
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              placeholder="Task description"
              placeholderTextColor="rgba(255,255,255,0.6)"
              style={styles.descInput}
              multiline
              value={description}
              onChangeText={setDescription}
            />
            <TouchableOpacity style={styles.voiceRow}>
              <View style={styles.micCircle}>
                <Ionicons name="mic" size={20} color="#fff" />
              </View>
              <Text style={styles.voiceText}>Convey through voice note</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* ENTER PAY */}
          <LinearGradient colors={["#1F3FA3", "#2F5BEA"]} style={styles.cardSmall}>
            <Text style={styles.label}>Enter Pay</Text>
            <View style={styles.rowBetween}>
              <View style={styles.payInputGroup}>
                <View style={styles.payInputContainer}>
                  <TextInput
                    style={styles.payInput}
                    keyboardType="numeric"
                    value={pay}
                    onChangeText={setPay}
                    textAlign="center"
                  />
                </View>
                <Text style={styles.hrText}>/ hr</Text>
              </View>
              <Text style={styles.rupeeIcon}>₹</Text>
            </View>
          </LinearGradient>

          {/* PERSONS REQUIRED */}
          <LinearGradient colors={["#1F3FA3", "#2F5BEA"]} style={styles.cardSmall}>
            <Text style={styles.label}>No. of persons required</Text>
            <View style={styles.rowBetween}>
              <View style={styles.counterRow}>
                <TouchableOpacity onPress={() => setPersons(Math.max(0, persons - 1))}>
                  <View style={styles.iconBtn}>
                     <Text style={styles.iconBtnText}>−</Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.counterValue}>{persons < 10 ? `0${persons}` : persons}</Text>
                <TouchableOpacity onPress={() => setPersons(persons + 1)}>
                  <View style={styles.iconBtn}>
                     <Text style={styles.iconBtnText}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Ionicons name="people" size={40} color="#fff" style={{ opacity: 0.9 }} />
            </View>
          </LinearGradient>

          {/* LOCATION SECTION */}
          <LinearGradient colors={["#1F3FA3", "#2F5BEA"]} style={styles.cardSmall}>
            <Text style={styles.label}>Select Location</Text>

            <View style={styles.rowBetween}>
              <TouchableOpacity 
                style={styles.searchContainer} 
                onPress={() => setLocationModalVisible(true)}
              >
                <Ionicons name="search" size={18} color="#fff" />
                <Text style={styles.searchText} numberOfLines={1}>
                  {selectedAddress || "Search address"}
                </Text>
              </TouchableOpacity>
              
              <Ionicons name="location-sharp" size={40} color="#fff" style={{ opacity: 0.9 }} />
            </View>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setIsRemote(!isRemote)}
            >
              <View style={[styles.checkbox, isRemote && styles.checked]}>
                 {isRemote && <Ionicons name="checkmark" size={14} color="#2F5BEA" />}
              </View>
              <Text style={styles.checkboxText}>
                Select if the task to be done in remote.
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          
          <View style={{height: 40}} /> 
        </ScrollView>

        {/* ================================================= */}
        {/* LOCATION SEARCH MODAL               */}
        {/* ================================================= */}

        <LocationPickerModal
          visible={isLocationModalVisible}
          onClose={() => setLocationModalVisible(false)}
          onSelect={({ address, lat, lng }) => {
            setSelectedAddress(address);
            setCoords({ lat, lng });
            setLocationModalVisible(false);
          }}
        />

        {/* <Modal
          animationType="fade"
          transparent={true}
          visible={isLocationModalVisible}
          onRequestClose={() => setLocationModalVisible(false)}
        >
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalOverlay}
          >
            <View style={styles.locationModalContainer}>
         
              <View style={styles.locSearchBar}>
                 <Ionicons name="search" size={20} color="#1F3FA3" />
                 <TextInput 
                   style={styles.locSearchInput}
                   placeholder="Search address"
                   placeholderTextColor="#1F3FA3"
                   value={searchQuery}
                   onChangeText={handleSearch}
                   autoFocus={true}
                 />
              </View>

              <View style={styles.locListContainer}>
                <FlatList 
                  data={filteredLocations}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 80, paddingTop: 10 }}
                  renderItem={({item}) => (
                    <TouchableOpacity 
                      style={[
                        styles.locItem, 
                        tempSelected === item.address && styles.locItemSelected
                      ]}
                      onPress={() => setTempSelected(item.address)}
                    >
                      <Text style={[
                        styles.locItemText,
                        tempSelected === item.address && styles.locItemTextSelected
                      ]}>
                        {item.address}
                      </Text>
                      {tempSelected === item.address && (
                        <Ionicons name="checkmark-circle" size={20} color="#2F5BEA" />
                      )}
                    </TouchableOpacity>
                  )}
                />
              </View>

              <View style={styles.saveBtnContainer}>
                 <TouchableOpacity style={styles.saveBtn} onPress={handleSaveLocation}>
                   <Text style={styles.saveBtnText}>Save</Text>
                 </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal> */}



        {/* ================================================= */}
        {/* SUCCESS MODAL (Task Posted)         */}
        {/* ================================================= */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isSuccessModalVisible}
          onRequestClose={() => setSuccessModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.successCard}>
              <Text style={styles.successTitle}>Task Posted</Text>

              {/* Checkmark Icon Circle */}
              <View style={styles.successIconContainer}>
                <Ionicons name="checkmark" size={50} color="#fff" />
              </View>

              <TouchableOpacity style={styles.viewPostBtn} onPress={handleViewPost}>
                <Text style={styles.viewPostText}>View Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },

  topBar: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postBtn: {
    backgroundColor: "#2F5BEA",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 25,
  },
  postText: { color: "#fff", fontWeight: "600", fontSize: 16 },

  // --- Cards Common ---
  card: { marginHorizontal: 20, marginBottom: 20, borderRadius: 30, padding: 24, paddingBottom: 30 },
  cardSmall: { marginHorizontal: 20, marginBottom: 16, borderRadius: 30, padding: 24, justifyContent: 'center' },
  label: { color: "#fff", fontWeight: "700", fontSize: 16, marginBottom: 10 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },

  // --- Inputs ---
  titleInput: { fontSize: 22, fontWeight: "700", color: "#fff", marginBottom: 8 },
  descInput: { color: "#fff", fontSize: 16, minHeight: 60, lineHeight: 22 },
  voiceRow: { marginTop: 20, backgroundColor: "#fff", borderRadius: 30, paddingVertical: 10, paddingHorizontal: 16, flexDirection: "row", alignSelf: 'flex-start', alignItems: "center", gap: 10 },
  micCircle: { backgroundColor: '#2F5BEA', padding: 6, borderRadius: 20 },
  voiceText: { color: "#2F5BEA", fontWeight: "600", fontSize: 14 },

  // --- Pay & Persons ---
  payInputGroup: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  payInputContainer: { backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 8, minWidth: 80, alignItems: 'center' },
  payInput: { color: "#fff", fontSize: 20, fontWeight: "700", width: '100%' },
  hrText: { color: "#fff", fontSize: 20, fontWeight: '600' },
  rupeeIcon: { color: "#fff", fontSize: 42, fontWeight: '300' },
  
  counterRow: { flexDirection: "row", alignItems: "center", backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 16, padding: 6, gap: 15 },
  iconBtn: { paddingHorizontal: 10 },
  iconBtnText: { color: '#fff', fontSize: 24, fontWeight: '600' },
  counterValue: { color: "#fff", fontSize: 20, fontWeight: '700' },

  // --- Location ---
  searchContainer: { flex: 1, backgroundColor: "rgba(255,255,255,0.25)", borderRadius: 20, padding: 14, flexDirection: "row", gap: 10, alignItems: "center", marginRight: 15 },
  searchText: { color: "#fff", opacity: 0.9, flex: 1 },
  checkboxRow: { flexDirection: "row", alignItems: "flex-start", marginTop: 20, gap: 12 },
  checkbox: { width: 20, height: 20, borderRadius: 4, backgroundColor: "#fff", alignItems: 'center', justifyContent: 'center' },
  checked: { backgroundColor: "#fff" },
  checkboxText: { color: "#fff", flex: 1, fontSize: 14, lineHeight: 20 },

  // ==========================
  // LOCATION MODAL STYLES
  // ==========================
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(23, 49, 126, 0.9)', // Darker blue overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationModalContainer: {
    width: '90%',
    height: '60%',
    alignItems: 'center',
  },
  locSearchBar: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  locSearchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
    fontWeight: '500'
  },
  locListContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  locItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  locItemSelected: {
    backgroundColor: '#F5F7FF',
    borderRadius: 10,
    borderBottomWidth: 0,
  },
  locItemText: {
    fontSize: 16,
    color: '#333',
  },
  locItemTextSelected: {
    color: '#2F5BEA',
    fontWeight: '600',
  },
  saveBtnContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  saveBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  saveBtnText: {
    color: '#2F5BEA',
    fontSize: 16,
    fontWeight: '700',
  },

  // ==========================
  // SUCCESS MODAL STYLES
  // ==========================
  successCard: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 30,
  },
  successIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2F5BEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: "#2F5BEA",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  viewPostBtn: {
    backgroundColor: '#2F5BEA',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  viewPostText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});