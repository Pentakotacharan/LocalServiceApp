import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../../api/axiosClient";

const { width } = Dimensions.get("window");

export default function OtpVerificationScreen() {
  const router = useRouter();
  const { confirmation, phone } = useLocalSearchParams<any>();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Verify OTP → Firebase → Backend → JWT
   */
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert("Error", "Please enter valid 6 digit OTP");
      return;
    }

    setLoading(true);
    try {
      // 1️⃣ Firebase OTP confirmation
      const userCredential = await confirmation.confirm(otp);
      const firebaseToken = await userCredential.user.getIdToken();

      // 2️⃣ Send Firebase token to backend
      const res = await axiosClient.post("/auth/login-phone-firebase", {
        token: firebaseToken,
      });

      // 3️⃣ Save backend JWT
      await AsyncStorage.setItem("token", res.data.token);
      axiosClient.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;

      // 4️⃣ Redirect to app
      router.replace("/(tabs)");
    } catch (err: any) {
      Alert.alert("Invalid OTP", "Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit code sent to +91 {phone}
      </Text>

      {/* OTP Input */}
      <TextInput
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
        style={styles.otpInput}
        placeholder="••••••"
        placeholderTextColor="#999"
      />

      {/* Verify Button */}
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

      {/* Resend */}
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
