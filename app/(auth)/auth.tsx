import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axiosClient from "../../api/axiosClient";

const { width } = Dimensions.get("window");

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: "75389684556-9fpsf9r4vjk0fq1f3gd5el03ijode172.apps.googleusercontent.com",
});

// ⚠️ HACK: Export this variable to share the confirmation object with the next screen
// Expo Router params cannot pass functions (like confirmation.confirm)
export let loginConfirmation: any = null;

export default function AuthScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  /* Helper: Save Token & Redirect */
  const handleBackendAuth = async (firebaseToken: string) => {
    try {
      // Send Firebase Token to your Backend
      const res = await axiosClient.post("/auth/login-google-firebase", {
        token: firebaseToken,
      });
      
      const backendToken = res.data.token; // Assuming your API returns { token: "..." }

      await AsyncStorage.setItem("token", backendToken);
      axiosClient.defaults.headers.common.Authorization = `Bearer ${backendToken}`;
      alert("Success");
      router.replace("./roleSelection");
    } catch (error: any) {
      console.error("Backend Auth Error:", error);
      Alert.alert("Login Failed", "Could not verify with server.");
    }
  };

  /* 🟢 Google Login Logic */
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // 1. Check Play Services
      await GoogleSignin.hasPlayServices();
      
      // 2. Get ID Token
      const signInResult = await GoogleSignin.signIn();
      let idToken =  signInResult.data?.idToken;

      if (!idToken) throw new Error("No ID Token found");

      // 3. Create Credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log("hellll")
      console.log(googleCredential);
      // 4. Sign In to Firebase
      const userCredential = await auth().signInWithCredential(googleCredential);
      console.log("Firebase User:", userCredential.user);
      // 5. Get JWT Token for Backend
      const firebaseToken = await userCredential.user.getIdToken();
      console.log("Firebase Token:", firebaseToken);
      // 6. Send to Backend
      await handleBackendAuth(firebaseToken);

    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled login");
      } else {
        console.error(error);
        Alert.alert("Google Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  /* 🔵 Phone OTP Logic */
  const handlePhoneLogin = async () => {
    if (!phone || phone.length < 10) {
        Alert.alert("Error", "Enter a valid phone number");
        return;
    }
    setLoading(true);
    try {
      // 1. Send OTP
      const confirmation = await auth().signInWithPhoneNumber(`+91${phone}`);
       console.log(confirmation);
      // 2. Store confirmation object in the exported variable
      loginConfirmation = confirmation;

      // 3. Navigate
      router.push({
        pathname: "./otpVerification",
        params: { phone }, // Only pass serializable data (strings/numbers)
      });
    } catch (e: any) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Branding */}
        <View style={styles.brandContainer}>
        
          <Image
            source={require("../../assets/images/banner.png")}
            style={styles.logo}
          />
        </View>

        {/* Phone Input */}
        <View style={styles.phoneInput}>
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>+91</Text>
          </View>
          <TextInput
            placeholder="Enter your mobile number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity onPress={handlePhoneLogin} disabled={loading}>
          <LinearGradient
            colors={["#2D5FDE", "#183378"]}
            style={styles.continueBtn}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.continueText}>Continue</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* OR Divider */}
        <View style={styles.orRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.line} />
        </View>

        {/* Mail Button */}
        <TouchableOpacity
          style={styles.socialBtn}
          onPress={() => router.push("./loginEmail")}
        >
          <Text style={styles.socialText}>Continue with Mail</Text>
        </TouchableOpacity>

        {/* Google Button */}
        <TouchableOpacity
          style={styles.socialBtn}
          onPress={handleGoogleLogin}
          disabled={loading}
        >
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>
          By continuing, you agree to our{"\n"}
          <Text style={styles.link}>Terms of Service</Text> |{" "}
          <Text style={styles.link}>Privacy Policy</Text> |{" "}
          <Text style={styles.link}>Content Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

/* 🎨 Styles */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 24 },
  brandContainer: { alignItems: "center", marginBottom: 40 },
  brandBg: {
    width: 370,
    height: 296,
    borderRadius: 30,
    position: "absolute",
    top: -40,
  },
  logo: { width: 300, height: 200, marginTop: 60, borderRadius: 20 },
  brandText: {
    fontSize: 40,
    fontWeight: "900",
    color: "#2D5FDE",
    marginTop: 10,
    letterSpacing: 1,
  },
  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    marginBottom: 20,
  },
  codeBox: {
    backgroundColor: "rgba(186,208,255,0.53)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
  },
  codeText: { color: "#2D5FDE", fontWeight: "600" },
  input: { flex: 1, fontSize: 14 },
  continueBtn: {
    height: 64,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  continueText: { color: "#fff", fontSize: 20, fontWeight: "600" },
  orRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  line: { flex: 1, height: 1, backgroundColor: "#EDF1F3" },
  orText: { marginHorizontal: 12, color: "#6C7278", fontSize: 12 },
  socialBtn: {
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EFF0F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  socialText: { fontSize: 14, fontWeight: "500" },
  footer: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 20,
    color: "#000",
  },
  link: { color: "#2D5FDE", fontWeight: "600" },
});