import { Stack } from "expo-router";

export default function ClientLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="userInfo" />
      <Stack.Screen name="home" />
      <Stack.Screen name="CreateTaskScreen" />
      <Stack.Screen name="TaskDetailScreen" />
      <Stack.Screen name="CheckRequestsScreen" />
    </Stack>
  );
}
