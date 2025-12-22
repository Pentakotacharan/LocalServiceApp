import React, { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Dimensions 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MapPin, Star, Briefcase, ThumbsUp, ThumbsDown, IndianRupee } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Constants
const API_URL = "http://192.168.1.5:5000/api";
const { width } = Dimensions.get("window");

export default function TasksScreen() {
  // 1. Tab States
  const [mainTab, setMainTab] = useState<'InProgress' | 'Completed'>('InProgress');
  const [subTab, setSubTab] = useState<'Process' | 'Room'>('Process');

  // 2. Data State
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // MOCK DATA FOR DEMO (Replace with backend fetch later)
  const MOCK_PROCESS_TASKS = [
    {
      _id: '1',
      title: 'UI/UX Designer Remote',
      location: 'Visakhapatnam',
      amount: '1.3K/h',
      stats: { rating: 4.5, jobs: 130, likes: 124, dislikes: 6 },
      status: 'process' 
    }
  ];

  const MOCK_ROOM_TASKS = [
    {
      _id: '2',
      title: 'React Native Developer',
      location: 'Hyderabad',
      amount: '2K/h',
      stats: { rating: 4.8, jobs: 40, likes: 38, dislikes: 0 },
      status: 'room'
    }
  ];

  useEffect(() => {
    // In real app: fetchTasks(mainTab, subTab);
    // For now, switch mock data
    if (mainTab === 'InProgress') {
      if (subTab === 'Process') setTasks(MOCK_PROCESS_TASKS);
      else setTasks(MOCK_ROOM_TASKS);
    } else {
      setTasks([]); // Empty for Completed
    }
  }, [mainTab, subTab]);

  // ACTIONS
  const handleAcceptGig = (taskId: string) => {
    Alert.alert("Confirm", "Accept this gig and move to Room?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Accept", 
        onPress: () => {
          // Logic: Call API to change status from 'negotiating' to 'accepted'
          setSubTab('Room'); // Move user to Room tab to see it
          Alert.alert("Success", "Gig moved to Room!");
        } 
      }
    ]);
  };

  const handleRejectGig = (taskId: string) => {
    Alert.alert("Delete", "Are you sure you want to remove this request?", [
      { text: "No", style: "cancel" },
      { 
        text: "Yes, Delete", 
        style: 'destructive',
        onPress: () => {
          setTasks(prev => prev.filter(t => t._id !== taskId));
        } 
      }
    ]);
  };

  const handleFinalNegotiation = (taskId: string) => {
    Alert.alert("Negotiate", "Open Negotiation Chat?");
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      
      {/* --- 1. HEADER & LOGO --- */}
      <View style={styles.header}>
        <Text style={styles.logoText}>LAZY{"\n"}GANG</Text>
      </View>

      {/* --- 2. TOP TABS (In Progress / Completed) --- */}
      <View style={styles.topTabsContainer}>
        <TouchableOpacity 
          style={[styles.topTab, mainTab === 'InProgress' && styles.topTabActive]}
          onPress={() => setMainTab('InProgress')}
        >
          <Text style={[styles.topTabText, mainTab === 'InProgress' && styles.topTabTextActive]}>
            In Progress
          </Text>
          {mainTab === 'InProgress' && <View style={styles.activeLine} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.topTab, mainTab === 'Completed' && styles.topTabActive]}
          onPress={() => setMainTab('Completed')}
        >
          <Text style={[styles.topTabText, mainTab === 'Completed' && styles.topTabTextActive]}>
            Completed
          </Text>
          {mainTab === 'Completed' && <View style={styles.activeLine} />}
        </TouchableOpacity>
      </View>

      {/* --- 3. BLUE BACKGROUND CURVE --- */}
      {/* This mimics the dark blue curve behind the white content */}
      <View style={styles.blueBackground} />

      {/* --- 4. CONTENT BODY --- */}
      <View style={styles.contentBody}>
        
        {/* SUB TABS (Process / Room) - Only for In Progress */}
        {mainTab === 'InProgress' && (
          <View style={styles.subTabContainer}>
            <TouchableOpacity 
              style={[styles.subTab, subTab === 'Process' ? styles.subTabActive : styles.subTabInactive]}
              onPress={() => setSubTab('Process')}
            >
              <Text style={[styles.subTabText, subTab === 'Process' ? styles.subTabTextActive : styles.subTabTextInactive]}>
                Process
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.subTab, subTab === 'Room' ? styles.subTabActive : styles.subTabInactive]}
              onPress={() => setSubTab('Room')}
            >
              <Text style={[styles.subTabText, subTab === 'Room' ? styles.subTabTextActive : styles.subTabTextInactive]}>
                Room
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* TASK LIST */}
        <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
          {tasks.map((task) => (
            <View key={task._id} style={styles.taskCard}>
              
              {/* Header: Icon + Title + Price */}
              <View style={styles.cardHeader}>
                <View style={styles.mapIconCircle}>
                   <MapPin color="white" size={20} />
                </View>
                <View style={{flex: 1, marginLeft: 10}}>
                   <Text style={styles.taskTitle} numberOfLines={1}>{task.title}</Text>
                </View>
                <View style={styles.pricePill}>
                  <View style={styles.rupeeCircle}>
                    <IndianRupee size={10} color="white" />
                  </View>
                  <Text style={styles.priceText}>{task.amount}</Text>
                </View>
              </View>

              {/* Stats Row */}
              <View style={styles.statsRow}>
                <View style={styles.statPillBlue}>
                  <View style={styles.statIconCircle}><Star size={10} color="white" fill="white" /></View>
                  <Text style={styles.statText}>{task.stats.rating}</Text>
                </View>
                <View style={styles.statPillBlue}>
                  <View style={styles.statIconCircle}><Briefcase size={10} color="white" /></View>
                  <Text style={styles.statText}>{task.stats.jobs}</Text>
                </View>
                <View style={styles.statPillBlue}>
                  <View style={styles.statIconCircle}><ThumbsUp size={10} color="white" /></View>
                  <Text style={styles.statText}>{task.stats.likes}</Text>
                </View>
                <View style={styles.statPillRed}>
                  <View style={[styles.statIconCircle, {backgroundColor: '#EF4444'}]}><ThumbsDown size={10} color="white" /></View>
                  <Text style={[styles.statText, {color: '#EF4444'}]}>{task.stats.dislikes}</Text>
                </View>
              </View>

              {/* Buttons: Only for Process Tab */}
              {subTab === 'Process' && (
                <View style={styles.actionRow}>
                  <TouchableOpacity 
                    style={styles.btnAccept} 
                    onPress={() => handleAcceptGig(task._id)}
                  >
                    <Text style={styles.btnText}>Accept Gig</Text>
                  </TouchableOpacity>
                  
                  {/* User asked for "Accept or Delete". 
                      But design shows "Final Negotiation". 
                      I will add 'Final Negotiation' as per image and 'Delete' logic on long press or X if needed.
                      For now matching image strictly. */}
                  <TouchableOpacity 
                    style={styles.btnNegotiate} 
                    onPress={() => handleFinalNegotiation(task._id)}
                  >
                    <Text style={styles.btnText}>Final Negotiation</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Delete Button (Small text below, optional for cleanup) */}
              {subTab === 'Process' && (
                <TouchableOpacity style={{marginTop: 10, alignSelf:'center'}} onPress={() => handleRejectGig(task._id)}>
                   <Text style={{color: '#9CA3AF', fontSize: 12}}>Reject / Delete Request</Text>
                </TouchableOpacity>
              )}

              {/* Room State - Maybe "Enter Chat" */}
              {subTab === 'Room' && (
                 <TouchableOpacity style={[styles.btnAccept, {width: '100%', marginTop: 10}]}>
                    <Text style={styles.btnText}>Enter Room</Text>
                 </TouchableOpacity>
              )}

            </View>
          ))}
          
          {/* Spacer for Floating Tabs */}
          <View style={{height: 100}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" }, // Dark Blue Background Header
  
  header: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  logoText: {
    color: "white",
    fontSize: 18,
    fontWeight: "900",
    lineHeight: 22,
  },
  
  // Top Tabs
  topTabsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  topTab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  topTabActive: {},
  topTabText: {
    color: "#94A3B8",
    fontWeight: "600",
    fontSize: 16,
  },
  topTabTextActive: {
    color: "white",
    fontWeight: "bold",
  },
  activeLine: {
    width: 40,
    height: 3,
    backgroundColor: "white",
    borderRadius: 2,
    marginTop: 5,
  },

  // Background Logic
  blueBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: "#0F172A",
    zIndex: -1,
  },

  // White Body
  contentBody: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
    overflow: 'hidden',
  },

  // Sub Tabs (Pills)
  subTabContainer: {
    flexDirection: 'row',
    backgroundColor: "#1E3A8A", // Dark blue pill container
    marginHorizontal: 40,
    marginTop: 20,
    borderRadius: 12,
    padding: 4,
  },
  subTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  subTabInactive: {
    backgroundColor: "transparent",
  },
  subTabActive: {
    backgroundColor: "white",
  },
  subTabText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subTabTextActive: {
    color: "#0F172A",
  },
  subTabTextInactive: {
    color: "white",
  },

  // List
  listContainer: {
    padding: 20,
  },
  taskCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  
  // Card Content
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  mapIconCircle: {
    width: 40,
    height: 40,
    backgroundColor: "#3B82F6",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
  },
  pricePill: {
    flexDirection: 'row',
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
  },
  rupeeCircle: {
    width: 16,
    height: 16,
    backgroundColor: "#1E40AF",
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  priceText: {
    color: "#1E40AF",
    fontWeight: "bold",
    fontSize: 12,
  },
  
  // Stats
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statPillBlue: { flexDirection: "row", backgroundColor: "#EFF6FF", paddingHorizontal: 8, paddingVertical: 6, borderRadius: 16, alignItems: "center" },
  statPillRed: { flexDirection: "row", backgroundColor: "#FEF2F2", paddingHorizontal: 8, paddingVertical: 6, borderRadius: 16, alignItems: "center" },
  statIconCircle: { width: 16, height: 16, borderRadius: 8, backgroundColor: "#1E40AF", justifyContent: "center", alignItems: "center", marginRight: 6 },
  statText: { fontSize: 12, fontWeight: "bold", color: "#1E40AF" },

  // Buttons
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  btnAccept: {
    flex: 1,
    backgroundColor: "#1E3A8A", // Dark Navy
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnNegotiate: {
    flex: 1,
    backgroundColor: "#2563EB", // Blue
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
});