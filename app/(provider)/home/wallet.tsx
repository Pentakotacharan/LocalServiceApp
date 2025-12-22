import React, { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Wallet as WalletIcon } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Constants
const API_URL = "http://192.168.1.5:5000/api";

export default function WalletScreen() {
  const [balance, setBalance] = useState(0); // Initial 0
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      // 1. Get User Profile for Balance (assuming balance is stored in user object)
      // Or if you have a specific /wallet endpoint, use that.
      const res = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update balance if backend has it, else 0
      setBalance(res.data.walletBalance || 0);
      
      // 2. Mocking Transactions (since backend might be empty)
      // setTransactions(res.data.transactions || []);
      
    } catch (error) {
      console.log("Error fetching wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = () => {
    if (balance <= 0) {
      Alert.alert("Balance Empty", "You have no funds to withdraw.");
      return;
    }
    Alert.alert("Withdraw", `Request withdrawal of ₹${balance}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Confirm", onPress: () => Alert.alert("Success", "Withdrawal request sent to Admin.") }
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      
      {/* --- 1. HEADER --- */}
      <View style={styles.header}>
        <Text style={styles.logoText}>LAZY{"\n"}GANG</Text>
      </View>

      {/* --- 2. BLUE BACKGROUND CURVE --- */}
      <View style={styles.blueBackground} />

      {/* --- 3. MAIN CONTENT BODY --- */}
      <View style={styles.contentBody}>
        
        {/* --- WALLET CARD (Floating) --- */}
        <View style={styles.walletCard}>
          
          {/* Left: Icon */}
          <View style={styles.iconContainer}>
            <WalletIcon color="#2563EB" size={28} />
          </View>

          {/* Middle: Text */}
          <View style={styles.balanceContainer}>
            <Text style={styles.label}>Earnings</Text>
            {loading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text style={styles.amount}>₹{balance}</Text>
            )}
          </View>

          {/* Right: Button */}
          <TouchableOpacity style={styles.withdrawBtn} onPress={handleWithdraw}>
            <Text style={styles.withdrawText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        {/* --- TRANSACTIONS SECTION --- */}
        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>Recent transactions</Text>
          
          <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
            {transactions.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No transactions found.</Text>
              </View>
            ) : (
              transactions.map((txn, index) => (
                <View key={index} style={styles.txnItem}>
                  <Text>Transaction Item...</Text>
                </View>
              ))
            )}
            
            {/* Spacer for bottom tabs */}
            <View style={{height: 100}} />
          </ScrollView>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" }, // Dark Blue Top
  
  header: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    zIndex: 10,
  },
  logoText: {
    color: "white",
    fontSize: 18,
    fontWeight: "900",
    lineHeight: 22,
  },

  blueBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180, // Height of blue area
    backgroundColor: "#0F172A",
    zIndex: -1,
  },

  contentBody: {
    flex: 1,
    backgroundColor: "#F3F4F6", // Light Gray Body
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
    paddingTop: 40, // Space for the floating card overlap
    position: 'relative',
  },

  // WALLET CARD
  walletCard: {
    position: 'absolute',
    top: -40, // Pull up to overlap blue/gray
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#EFF6FF", // Light Blue
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  balanceContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },
  amount: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
  },
  withdrawBtn: {
    backgroundColor: "#2563EB", // Blue
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  withdrawText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },

  // TRANSACTIONS
  transactionsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40, // Space below floating card
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  listContainer: {
    flexGrow: 1,
  },
  emptyState: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: "#9CA3AF", // Light Gray
    fontSize: 16,
  },
  txnItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
});