import { Tabs } from "expo-router";
import { View, Platform, StyleSheet } from "react-native";
import { Home, Briefcase, Wallet, User } from "lucide-react-native";

export default function ProviderTabsLayout() {
  return (
   <Tabs
  screenOptions={{
    headerShown: false,
    tabBarShowLabel: true,

    tabBarStyle: {
      position: "absolute",
      bottom: 25,
      left: 20,
      right: 20,
      backgroundColor: "white",
      borderRadius: 25,
      height: 80,              // ⬅️ increase height
      borderTopWidth: 0,

      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },

    tabBarItemStyle: {
      paddingVertical: 6,      // ⬅️ use vertical padding instead
    },

    tabBarLabelStyle: {
      fontSize: 11,
      fontWeight: "600",
      marginTop: 2,           // ⬅️ push label slightly down
    },

    tabBarActiveTintColor: "#1E3A8A",
    tabBarInactiveTintColor: "#94A3B8",
  }}
>

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
             tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
                 tabBarLabel: "Tasks",
          tabBarIcon: ({ color }) => <Briefcase color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
                 tabBarLabel: "Wallet",
          tabBarIcon: ({ color }) => <Wallet color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
         tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}