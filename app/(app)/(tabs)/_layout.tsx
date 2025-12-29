import { House, Award, User } from 'lucide-react-native';
import { Tabs } from "expo-router";
import { useColorScheme } from "@/lib/useColorScheme";
import { useTimer } from "@/context/TimerContext";

export default function TabLayout() {
  const { colors } = useColorScheme();
  const { mode } = useTimer();

  const isBreak = mode === "SHORT_BREAK";
  const activeColor = isBreak ? "#22c55e" : colors.primary;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: colors.grey,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarShowLabel: false, // Hide label
          tabBarIcon: ({ color, size }) => (
            <House size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Ranking",
          tabBarShowLabel: false, // Hide label
          tabBarIcon: ({ color, size }) => (
            <Award size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarShowLabel: false, // Hide label
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
