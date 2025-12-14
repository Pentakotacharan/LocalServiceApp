import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../../api/axiosClient";

// Import the confirmation object from your AuthScreen
import { loginConfirmation } from "./auth"; // <-- Adjust path if needed

export default function OtpVerificationScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<any>();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert("Error", "Please enter valid 6 digit OTP");
      return;
    }

    if (!loginConfirmation) {
      Alert.alert("Error", "Session expired. Please try logging in again.");
      router.back();
      return;
    }

    setLoading(true);
    try {
      // 1️⃣ Firebase OTP confirmation using the imported object
      const userCredential = await loginConfirmation.confirm(otp);
      
      // 2️⃣ Get Token
      const firebaseToken = await userCredential.user.getIdToken();

      // 3️⃣ Send to backend
      const res = await axiosClient.post("/auth/login-phone-firebase", {
        token: firebaseToken,
      });

      // 4️⃣ Save & Redirect
      await AsyncStorage.setItem("token", res.data.token);
      axiosClient.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;

      router.replace("/(tabs)");
    } catch (err: any) {
      console.log(err);
      if (err.code === 'auth/invalid-verification-code') {
        Alert.alert("Invalid Code", "The OTP you entered is incorrect.");
      } else {
        Alert.alert("Error", err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit code sent to +91 {phone}
      </Text>

      <TextInput
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
        style={styles.otpInput}
        placeholder="••••••"
        placeholderTextColor="#999"
      />

      <TouchableOpacity onPress={handleVerifyOtp} disabled={loading}>
        <LinearGradient
          colors={["#2D5FDE", "#183378"]}
          style={styles.verifyBtn}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.verifyText}>Verify</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.resendText}>
          Didn’t receive code? <Text style={styles.resendLink}>Resend</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#6C7278",
    marginBottom: 30,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 10,
    paddingVertical: 16,
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 10,
    marginBottom: 24,
  },
  verifyBtn: {
    height: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  verifyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  resendText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    color: "#000",
  },
  resendLink: {
    color: "#2D5FDE",
    fontWeight: "600",
  },
});
