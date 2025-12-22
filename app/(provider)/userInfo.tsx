// import React, { useState } from "react";
// import { 
//   View, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   StyleSheet, 
//   ScrollView, 
//   KeyboardAvoidingView, 
//   Platform 
// } from "react-native";
// import { useRouter } from "expo-router";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Users, Calendar, MapPin, ChevronDown } from "lucide-react-native";

// export default function UserInfoScreen() {
//   const router = useRouter();

//   // Form State
//   const [name, setName] = useState("");
//   const [dob, setDob] = useState("");
//   const [gender, setGender] = useState("");
//   const [skill, setSkill] = useState("");
//   const [location, setLocation] = useState("");

//   const handleContinue = () => {
//     // In a real app, validate inputs here
//     console.log("Saving user info:", { name, dob, gender, skill, location });
    
//     // Navigate to the next step: KYC Documents
//     router.push("/(provider)/kyc");
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView 
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={{ flex: 1 }}
//       >
//         <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          
//           {/* Blue Header Section */}
//           <View style={styles.header}>
//             <View style={styles.iconCircle}>
//               <Users color="#1E40AF" size={40} />
//             </View>
//             <Text style={styles.headerTitle}>Let’s get to know{"\n"}about you</Text>
//           </View>

//           {/* White Form Section */}
//           <View style={styles.formContainer}>
            
//             {/* Name Input */}
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>What is your name?</Text>
//               <TextInput 
//                 style={styles.input} 
//                 placeholderTextColor="#000" placeholder="Enter your name..." 
//                 placeholderTextColor="#9CA3AF"
//                 value={name}
//                 onChangeText={setName}
//               />
//             </View>

//             {/* Row: Date of Birth & Gender */}
//             <View style={styles.row}>
//               <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
//                 <Text style={styles.label}>Date of birth</Text>
//                 <View style={styles.inputIconWrapper}>
//                   <TextInput 
//                     style={[styles.input, { flex: 1, borderWidth: 0 }]} 
//                     placeholderTextColor="#000" placeholder="DD-MM-YYYY" 
//                     placeholderTextColor="#9CA3AF"
//                     value={dob}
//                     onChangeText={setDob}
//                   />
//                   <Calendar color="#9CA3AF" size={20} />
//                 </View>
//               </View>

//               <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
//                 <Text style={styles.label}>Gender</Text>
//                 <View style={styles.inputIconWrapper}>
//                   {/* For now using TextInput, replace with Modal/Picker later */}
//                   <TextInput 
//                     style={[styles.input, { flex: 1, borderWidth: 0 }]} 
//                     placeholderTextColor="#000" placeholder="Select one" 
//                     placeholderTextColor="#9CA3AF"
//                     value={gender}
//                     onChangeText={setGender}
//                   />
//                   <ChevronDown color="#9CA3AF" size={20} />
//                 </View>
//               </View>
//             </View>

//             {/* Skill Input */}
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>What is your skill?</Text>
//               <TextInput 
//                 style={styles.input} 
//                 placeholderTextColor="#000" placeholder="Enter your skill..." 
//                 placeholderTextColor="#9CA3AF"
//                 value={skill}
//                 onChangeText={setSkill}
//               />
//             </View>

//             {/* Location Input */}
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Location?</Text>
//               <TextInput 
//                 style={styles.input} 
//                 placeholderTextColor="#000" placeholder="Enter Address or Select location" 
//                 placeholderTextColor="#9CA3AF"
//                 value={location}
//                 onChangeText={setLocation}
//               />
//             </View>

//             {/* Continue Button */}
//             <TouchableOpacity style={styles.button} onPress={handleContinue}>
//               <Text style={styles.buttonText}>Continue</Text>
//             </TouchableOpacity>

//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1E40AF", // Blue background matching header
//   },
//   header: {
//     paddingHorizontal: 24,
//     paddingTop: 20,
//     paddingBottom: 40,
//     backgroundColor: "#1E40AF",
//   },
//   iconCircle: {
//     width: 80,
//     height: 80,
//     backgroundColor: "white",
//     borderRadius: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "white",
//     lineHeight: 36,
//   },
//   formContainer: {
//     flex: 1,
//     backgroundColor: "white",
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 24,
//     paddingTop: 30,
//     paddingBottom: 40,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#000",
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 10,
//     padding: 14,
//     fontSize: 15,
//     color: "#000",
//     backgroundColor: "#fff",
//   },
//   inputIconWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 10,
//     paddingRight: 14, // Space for icon
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   button: {
//     backgroundColor: "#1E40AF",
//     borderRadius: 12,
//     paddingVertical: 16,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Users, Calendar, ChevronDown } from "lucide-react-native";

export default function UserInfoScreen() {
  const router = useRouter();

  // Form State
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");

  const handleContinue = () => {
    // Basic Validation
    if (!name || !skill) {
      alert("Please fill in at least Name and Skill");
      return;
    }

    // Pass data to the next screen (KYC Documents)
    router.push({
      pathname: "/(provider)/kyc",
      params: { 
        name, 
        dob, 
        gender, 
        skill, 
        // For now, passing location as string. In real app, convert to lat/lng here
        locationText: location 
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconCircle}><Users color="#1E40AF" size={40} /></View>
        <Text style={styles.headerTitle}>Let’s get to know{"\n"}about you</Text>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>What is your name?</Text>
          <TextInput style={styles.input}  placeholder="Enter your name..." placeholderTextColor="#000" value={name} onChangeText={setName} />
        </View>

        {/* DOB & Gender */}
        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Date of birth</Text>
            <View style={styles.inputIconWrapper}>
              <TextInput style={[styles.input, { flex: 1, borderWidth: 0 }]} placeholderTextColor="#000" placeholder="DD-MM-YYYY" value={dob} onChangeText={setDob} />
              <Calendar color="#9CA3AF" size={20} />
            </View>
          </View>
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.inputIconWrapper}>
              <TextInput style={[styles.input, { flex: 1, borderWidth: 0 }]} placeholderTextColor="#000" placeholder="Select" value={gender} onChangeText={setGender} />
              <ChevronDown color="#9CA3AF" size={20} />
            </View>
          </View>
        </View>

        {/* Skill */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>What is your skill?</Text>
          <TextInput style={styles.input} placeholderTextColor="#000" placeholder="Enter your skill..." value={skill} onChangeText={setSkill} />
        </View>

        {/* Location */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location?</Text>
          <TextInput style={styles.input} placeholderTextColor="#000" placeholder="Enter Address" value={location} onChangeText={setLocation} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E40AF" },
  header: { padding: 24, paddingBottom: 40, backgroundColor: "#1E40AF" },
  iconCircle: { width: 80, height: 80, backgroundColor: "white", borderRadius: 40, justifyContent: "center", alignItems: "center", marginBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "white" },
  formContainer: { flexGrow: 1, backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, paddingTop: 30 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 10, padding: 14, backgroundColor: "#fff" },
  inputIconWrapper: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 10, paddingRight: 14 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  button: { backgroundColor: "#1E40AF", borderRadius: 12, paddingVertical: 16, alignItems: "center", marginTop: 20 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});