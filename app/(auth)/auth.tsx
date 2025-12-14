import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
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

GoogleSignin.configure({
  webClientId: "75389684556-9fpsf9r4vjk0fq1f3gd5el03ijode172.apps.googleusercontent.com",
});

export default function AuthScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  /* Save backend JWT */
  const saveToken = async (token: string) => {
    await AsyncStorage.setItem("token", token);
    axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    router.replace("/(tabs)");
  };

  /* Phone OTP */
  const handlePhoneLogin = async () => {
    if (!phone) return;
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+91${phone}`);
    //   router.push({
    //     pathname: "/(auth)/otpVerification",
    //     params: { confirmation },
    //   });
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Branding */}
        <View style={styles.brandContainer}>
          <LinearGradient
            colors={["#E2EBFF", "#FFFFFF"]}
            style={styles.brandBg}
          />
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.logo}
          />
          <Text style={styles.brandText}>LAZYGANG</Text>
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

        {/* OR */}
        <View style={styles.orRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.line} />
        </View>

        {/* Mail */}
        <TouchableOpacity
          style={styles.socialBtn}
        //   onPress={() => router.push("/(auth)/loginEmail")}
        >
          <Text style={styles.socialText}>Continue with Mail</Text>
        </TouchableOpacity>

        {/* Google */}
        <TouchableOpacity
          style={styles.socialBtn}
          onPress={() => alert("Google login here")}
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

/* 🎨 Styles (Mapped from Figma) */
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
  logo: { width: 90, height: 90, marginTop: 60 },
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
