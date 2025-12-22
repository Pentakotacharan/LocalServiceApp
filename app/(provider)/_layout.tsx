// import { Stack } from "expo-router";

// export default function ProviderLayout() {
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="userInfo" />
//             <Stack.Screen name="kyc" />
//          <Stack.Screen name="home" />

//       {/* <Stack.Screen name="kyc" />

//       <Stack.Screen name="TaskDetailScreen" />

//       <Stack.Screen name="IncomingRequestsScreen" />
      
//        <Stack.Screen name="profile" /> */}
//     </Stack>
//   );
// }


import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import axiosClient from "@/api/axiosClient";
// Replace with your actual backend URL
const API_URL = "http://192.168.1.5:5000/api"; 

export default function ProviderLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkKycStatus();
  }, []);

  const checkKycStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        // Safety net: if no token, go back to auth
        router.replace("/(auth)/auth"); 
        return;
      }

      // Fetch latest user profile to check status
      const response = await axiosClient.get(`/users/me`);

      const user = response.data;
      const status = user.kycStatus; // 'not_submitted', 'pending', 'approved', 'rejected'

      // LOGIC: Where should the user go?
      if (status === "approved") {
        // If approved, go straight to Home (or Approved screen if you want to show it once)
        router.replace("/(provider)/home");
      } else if (status === "pending") {
        router.replace("/(provider)/kycPending");
      } else {
        // not_submitted or rejected -> Start at Info
        // We do nothing here, letting the default Stack load 'userInfo'
      }
    } catch (error) {
      console.error("Error checking KYC status:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1E40AF" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="userInfo" />
      <Stack.Screen name="kyc" />
      <Stack.Screen name="kycPending" />
      <Stack.Screen name="kycApproved" />
      <Stack.Screen name="home" />
    </Stack>
  );
}