// import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import React from 'react';
// import {
//     Image,
//     Platform,
//     SafeAreaView,
//     ScrollView,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from 'react-native';

// export default function HomeScreen() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />
      
//       {/* HEADER */}
//       <View style={styles.header}>
//         <Text style={styles.logoText}>LAZY{'\n'}GANG</Text>
//         <View style={styles.headerRight}>
//           <TouchableOpacity style={styles.iconButton}>
//             <Ionicons name="notifications" size={24} color="black" />
//           </TouchableOpacity>
//           <Image 
//             source={{ uri: 'https://i.pravatar.cc/100?img=11' }} // Placeholder avatar
//             style={styles.avatar} 
//           />
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* HERO SECTION - Post a Task */}
//         <TouchableOpacity style={styles.heroCard}>
//           <View style={styles.heroContent}>
//             <View style={styles.editIconCircle}>
//               <MaterialCommunityIcons name="pencil" size={20} color="#2563EB" />
//             </View>
//             <Text style={styles.heroText}>Post a task...</Text>
//           </View>
//         </TouchableOpacity>

//         {/* SUGGESTED SECTION */}
//         <Text style={styles.sectionTitle}>Suggested</Text>
        
//         <View style={styles.gridContainer}>
//           <CategoryItem icon="pot-steam" lib="MaterialCommunityIcons" label="Cooking" />
//           <CategoryItem icon="tools" lib="FontAwesome5" label="Construction" />
//           <CategoryItem icon="home" lib="Ionicons" label="Home Services" />
//           <CategoryItem icon="paw" lib="Ionicons" label="Pet Sitter" />
          
//           <CategoryItem icon="camera" lib="Ionicons" label="Photography" />
//           <CategoryItem icon="human-cane" lib="MaterialCommunityIcons" label="Caretaker" />
//           <CategoryItem icon="school" lib="Ionicons" label="Tutor Services" />
//           <CategoryItem icon="earth" lib="Ionicons" label="Remote Gigs" />
//         </View>
//       </ScrollView>

//       {/* BOTTOM NAVIGATION */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity style={styles.navItem}>
//           <Ionicons name="home" size={24} color="#2563EB" />
//           <Text style={[styles.navText, { color: '#2563EB', fontWeight: '600' }]}>Home</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity style={styles.navItem}>
//           <Ionicons name="briefcase-outline" size={24} color="#6B7280" />
//           <Text style={styles.navText}>Tasks</Text>
//         </TouchableOpacity>
//       </View>
      
//       {/* iOS Home Indicator Visual */}
//       <View style={styles.homeIndicatorContainer}>
//         <View style={styles.homeIndicator} />
//       </View>

//     </SafeAreaView>
//   );
// }
// interface CategoryItemProps {
//   icon: string; // The name of the icon is a string
//   label: string;
//   lib: "FontAwesome5" | "MaterialCommunityIcons" | "Ionicons"; // Specific string union or just 'string'
// }

// // 2. Apply the interface to the component
// const CategoryItem = ({ icon, label, lib }: CategoryItemProps) => {
//   // Helper to choose the right icon set dynamically
//   const IconTag = lib === 'FontAwesome5' ? FontAwesome5 : 
//                   lib === 'MaterialCommunityIcons' ? MaterialCommunityIcons : 
//                   Ionicons;

//   return (
//     <TouchableOpacity style={styles.gridItem}>
//       <IconTag name={icon} size={28} color="#2563EB" style={styles.gridIcon} />
//       <Text style={styles.gridLabel}>{label}</Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB', // Light gray background
//     paddingTop: Platform.OS === 'android' ? 30 : 0,
//   },
//   /* Header Styles */
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#fff',
//   },
//   logoText: {
//     fontFamily: Platform.OS === 'ios' ? 'Arial Rounded MT Bold' : 'Roboto',
//     fontWeight: '900',
//     fontSize: 20,
//     color: '#2563EB', // Brand Blue
//     lineHeight: 22,
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 15,
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#ddd',
//   },

//   /* Scroll Content */
//   scrollContent: {
//     padding: 20,
//     paddingBottom: 100, // Space for bottom nav
//   },

//   /* Hero Card */
//   heroCard: {
//     backgroundColor: '#2563EB', // Royal Blue
//     borderRadius: 24,
//     height: 180,
//     padding: 20,
//     justifyContent: 'flex-start',
//     shadowColor: "#2563EB",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//     marginBottom: 30,
//   },
//   heroContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   editIconCircle: {
//     width: 32,
//     height: 32,
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   heroText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },

//   /* Grid Section */
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 15,
//   },
//   gridContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     gap: 12,
//   },
//   gridItem: {
//     width: '22%', // Roughly 4 items per row
//     aspectRatio: 1,
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 2,
//     marginBottom: 12,
//   },
//   gridIcon: {
//     marginBottom: 8,
//   },
//   gridLabel: {
//     fontSize: 10,
//     fontWeight: '600',
//     color: '#1F2937',
//     textAlign: 'center',
//   },

//   /* Bottom Navigation */
//   bottomNav: {
//     position: 'absolute',
//     bottom: 20, // Adjusted for safe area
//     left: 0,
//     right: 0,
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#F3F4F6',
//   },
//   navItem: {
//     alignItems: 'center',
//     gap: 4,
//   },
//   navText: {
//     fontSize: 12,
//     color: '#6B7280',
//   },
//   homeIndicatorContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 20,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   homeIndicator: {
//     width: 130,
//     height: 5,
//     backgroundColor: '#2563EB', // Matching the blue line in design
//     borderRadius: 10,
//   },iconButton: {
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: '#F3F4F6', // Light grey background for the button
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const categories = [
  { label: "Cooking", icon: "restaurant-outline" },
  { label: "Construction", icon: "hammer-outline" },
  { label: "Home Services", icon: "home-outline" },
  { label: "Pet Sitter", icon: "paw-outline" },
  { label: "Photography", icon: "camera-outline" },
  { label: "Caretaker", icon: "walk-outline" },
  { label: "Tutor Services", icon: "school-outline" },
  { label: "Remote Gigs", icon: "globe-outline" },
];

export default function ClientHomeScreen() {
  const navigation = useRouter();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.logo}>LAZY{"\n"}GANG</Text>
          <View style={styles.headerRight}>
            <Ionicons name="notifications-outline" size={22} />
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              style={styles.avatar}
            />
          </View>
        </View>

        {/* POST TASK CARD */}
        <TouchableOpacity onPress={() => navigation.replace("./CreateTaskScreen")}>
          <LinearGradient
            colors={["#1F3FA3", "#2F5BEA"]}
            style={styles.postCard}
          >
            <View style={styles.postRow}>
              <Ionicons name="pencil-outline" size={22} color="#fff" />
              <Text style={styles.postText}>Post a task...</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* SUGGESTED */}
        <Text style={styles.sectionTitle}>Suggested</Text>

        <View style={styles.grid}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.categoryCard}
              onPress={() => navigation.replace("./CreateTaskScreen")}
              // onPress={() =>
              //   navigation.navigate("CreateTaskDetails", {
              //     category: item.label,
              //   })
              // }
            >
              <Ionicons name={item.icon as any} size={28} color="#2F5BEA" />
              <Text style={styles.categoryText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <View style={styles.activeTab}>
          <Ionicons name="home" size={22} color="#2F5BEA" />
          <Text style={styles.activeText}>Home</Text>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("./ClientTasks")}
        >
          <Ionicons name="briefcase-outline" size={22} color="#94A3B8" />
          <Text style={styles.inactiveText}>Tasks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2F5BEA",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  postCard: {
    margin: 20,
    height: 140,
    borderRadius: 32,
    justifyContent: "flex-start",
    padding: 24,
  },
  postRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  postText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  categoryCard: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 22,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryText: {
    marginTop: 10,
    fontWeight: "600",
    color: "#2F5BEA",
  },
  bottomNav: {
    height: 70,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  activeTab: {
    alignItems: "center",
  },
  tab: {
    alignItems: "center",
  },
  activeText: {
    color: "#2F5BEA",
    fontWeight: "600",
  },
  inactiveText: {
    color: "#94A3B8",
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "#E5E7EB",
  },
});
