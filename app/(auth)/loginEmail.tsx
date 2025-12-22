import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../../api/axiosClient";
import { useRouter } from "expo-router";

export default function LoginEmail() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Fill all fields");
      return;
    }

    if (isSignup && password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      let userCred;

      if (isSignup) {
        userCred = await auth().createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        userCred = await auth().signInWithEmailAndPassword(email, password);
      }
      const firebaseToken = await userCred.user.getIdToken();
      const res = await axiosClient.post("/auth/login-email-firebase", {
        token: firebaseToken,
      });

      await AsyncStorage.setItem("token", res.data.token);
      axiosClient.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      
      router.replace("./roleSelection");
      // Redirect to role selection
      // router.replace("../(role)/selectRole");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
    
      <Text style={styles.title}>
        {isSignup ? "Create Account" : "Welcome Back"}
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#777"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {isSignup && (
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#777"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />
      )}

      <TouchableOpacity onPress={handleAuth} disabled={loading}>
        <LinearGradient
          colors={["#2D5FDE", "#183378"]}
          style={styles.button}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isSignup ? "Sign Up" : "Login"}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
        <Text style={styles.switchText}>
          {isSignup
            ? "Already have an account? Login"
            : "Don’t have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* 🎨 Styles (same theme) */
const styles = StyleSheet.create({
  container: {
    // marginTop :0,
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    color: "#000",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  button: {
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  switchText: {
    color: "#2D5FDE",
    textAlign: "center",
    marginTop: 20,
  },
});
