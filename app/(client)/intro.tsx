import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function ClientIntroScreen() {
  const router = useRouter();

  const handleContinue = () => {
    // Redirect to Client Home
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      {/* Illustration */}
      <Image
        source={require("../../assets/client_intro.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>
        Find trusted service providers near you
      </Text>

      {/* Description */}
      <Text style={styles.description}>
        Post your task and get connected with verified professionals
        in your area quickly and safely.
      </Text>

      {/* Continue Button */}
      <TouchableOpacity onPress={handleContinue}>
        <LinearGradient
          colors={["#2D5FDE", "#183378"]}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

/* 🎨 Styles mapped from Figma */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // dark mode default
    alignItems: "center",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  button: {
    width: "100%",
    height: 60,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
