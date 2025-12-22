import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import axiosClient from "../../api/axiosClient";

const { width, height } = Dimensions.get('window');

// Ensure this path matches where your AuthScreen is located
import { loginConfirmation } from "./auth";

export default function OtpVerificationScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<any>();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  
  // 1. Initialize the Ref for the hidden input
  const otpInputRef = useRef<TextInput>(null);

  // 2. Define Go Back Functionality
  const onGoBack = () => {
    router.back();
  };

  // 3. Handle touching the boxes to open keyboard
  const handleBoxPress = () => {
    otpInputRef.current?.focus();
  };

  // 4. Handle Resend (Go back to restart phone auth)
  const handleResendOtp = () => {
    Alert.alert("Resend OTP", "We will take you back to the login screen to send a new code.", [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => router.back() }
    ]);
  };

  // 5. Logic to render the 6 boxes based on 'otp' state
  const renderOtpBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 6; i++) {
        const digit = otp[i] || "";
        const isFilled = digit.length > 0;
        
        boxes.push(
            <View 
                key={i} 
                style={isFilled ? styles.otpBoxFilled : styles.otpBox}
            >
                <Text style={styles.otpDigit}>{digit}</Text>
            </View>
        );
    }
    return boxes;
  };

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
      // 1️⃣ Firebase OTP confirmation
      const userCredential = await loginConfirmation.confirm(otp);
      
      // 2️⃣ Get Token
      const firebaseToken = await userCredential.user.getIdToken();
      // 3️⃣ Send to backend
      const res = await axiosClient.post("/auth/login-phone-firebase", {
        token: firebaseToken,
      });
        console.log("Backend Response:", res.data);
      // 4️⃣ Save & Redirect
      await AsyncStorage.setItem("token", res.data.token);
      axiosClient.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
    //  alert("Success");
      router.replace("./roleSelection");
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
     <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
                    <Image
                        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/0k9b9575_expires_30_days.png" }}
                        resizeMode={"stretch"}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>OTP Verification</Text>
            </View>

            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
                <View style={styles.content}>
                    <Text style={styles.promptText}>
                        We have sent a verification code to{"\n"}
                        {/* Changed from mobileNumber to phone */}
                        <Text style={{ color: "#2D5FDE", fontWeight: 'bold' }}>+91 {phone}</Text>
                    </Text>

                    <TouchableOpacity onPress={handleBoxPress} activeOpacity={1}>
                        <View style={styles.otpInputContainer}>
                            {renderOtpBoxes()}
                        </View>
                    </TouchableOpacity>

                    {/* Hidden Input that actually captures typing */}
                    <TextInput
                        ref={otpInputRef}
                        style={styles.hiddenInput}
                        maxLength={6}
                        keyboardType="number-pad" // Changed to number-pad for better mobile experience
                        value={otp}
                        onChangeText={setOtp}
                        caretHidden={true}
                    />

                    <TouchableOpacity onPress={handleResendOtp} style={styles.resendButton}>
                        <Text style={styles.resendText}>Didn’t get the OTP? <Text style={styles.resendLink}>Resend SMS</Text></Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <TouchableOpacity onPress={onGoBack} style={styles.backToLogin}>
                    <Text style={styles.backToLoginText}>Go back to login methods</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.nextButton} onPress={handleVerifyOtp} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.nextButtonText}>Next</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.02,
        borderBottomWidth: 1,
        borderBottomColor: '#EDF1F3',
    },
    backButton: {
        paddingRight: width * 0.04,
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    headerText: {
        color: "#000000",
        fontSize: width * 0.045,
        fontWeight: "bold",
    },
    scrollView: {
        flex: 1,
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: width * 0.08,
        paddingTop: height * 0.05,
    },
    promptText: {
        color: "#000000",
        fontSize: width * 0.04,
        textAlign: "center",
        marginBottom: height * 0.04,
        lineHeight: 24,
    },
    otpInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: height * 0.04,
    },
    otpBox: {
        width: width * 0.12,
        height: width * 0.12,
        borderColor: "#00000026",
        borderRadius: 6,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    otpBoxFilled: {
        width: width * 0.12,
        height: width * 0.12,
        borderColor: "#2C5FDD",
        borderRadius: 6,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F5FF',
    },
    otpDigit: {
        fontSize: width * 0.06,
        fontWeight: '500', // Replaced Poppins font if not loaded
        color: '#000',
    },
    hiddenInput: {
        position: 'absolute',
        width: 1,
        height: 1,
        opacity: 0,
    },
    resendButton: {
        marginBottom: height * 0.05,
    },
    resendText: {
        fontSize: width * 0.035,
        color: '#000',
    },
    resendLink: {
        color: '#2C5FDD',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: height * 0.03,
        backgroundColor: '#fff',
        alignItems: 'center',
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10,
    },
    backToLogin: {
        marginBottom: height * 0.02,
    },
    backToLoginText: {
        color: '#2C5FDD',
        fontSize: width * 0.035,
        fontWeight: '500',
    },
    nextButton: {
        backgroundColor: '#2C5FDD',
        borderRadius: 10,
        paddingVertical: height * 0.02,
        width: '85%',
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
});