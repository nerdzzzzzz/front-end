import { Text } from "@/components/nativewindui/Text";
import { TextField } from "@/components/nativewindui/TextField";
import { useAuth } from "@/context/AuthContext";
import { useTimer } from "@/context/TimerContext";
import { useColorScheme } from "@/lib/useColorScheme";
import { ChevronLeft, LogOut, Moon, Sun } from "lucide-react-native";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Toggle } from "@/components/nativewindui/Toggle";

export default function SettingsScreen() {
  const { colors, colorScheme, toggleColorScheme } = useColorScheme();
  const { logout } = useAuth();
  const {
    focusDuration,
    setFocusDuration,
    shortBreakDuration,
    setShortBreakDuration,
  } = useTimer();
  const router = useRouter();

  const [focusText, setFocusText] = React.useState(
    String(Math.floor(focusDuration / 60))
  );
  const [breakText, setBreakText] = React.useState(
    String(Math.floor(shortBreakDuration / 60))
  );

  return (
    <View className="flex-1 bg-background pt-safe">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-border/50 bg-background z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-xl active:bg-muted/20"
        >
          <ChevronLeft size={28} color={colors.foreground} />
        </TouchableOpacity>
        <Text variant="title3" className="font-bold">Settings</Text>
        <View className="w-10" />
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Timer Settings */}
        <View className="mb-6">
          <Text className="text-muted-foreground font-bold text-xs uppercase tracking-widest mb-2 ml-1">
            Timer Settings
          </Text>
          <View className="bg-card rounded-2xl overflow-hidden border border-border/50 p-4 gap-4">
            <TextField
              label="Focus (min)"
              keyboardType="numeric"
              value={focusText}
              onChangeText={(text) => {
                setFocusText(text);
                const val = parseInt(text);
                if (!isNaN(val)) setFocusDuration(val * 60);
                else if (text === "") setFocusDuration(0);
              }}
            />
            <View className="h-px bg-border/50" />
            <TextField
              label="Break (min)"
              keyboardType="numeric"
              value={breakText}
              onChangeText={(text) => {
                setBreakText(text);
                const val = parseInt(text);
                if (!isNaN(val)) setShortBreakDuration(val * 60);
                else if (text === "") setShortBreakDuration(0);
              }}
            />
          </View>
        </View>

        {/* Appearance Section */}
        <View className="mb-6">
          <Text className="text-muted-foreground font-bold text-xs uppercase tracking-widest mb-2 ml-1">
            Appearance
          </Text>
          <View className="bg-card rounded-2xl overflow-hidden border border-border/50">
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center">
                  {colorScheme === "dark" ? (
                    <Moon size={18} color={colors.primary} />
                  ) : (
                    <Sun size={18} color={colors.primary} />
                  )}
                </View>
                <Text className="font-semibold text-lg">Dark Mode</Text>
              </View>
              <Toggle
                value={colorScheme === "dark"}
                onValueChange={toggleColorScheme}
                trackColor={{ false: colors.grey, true: colors.primary }}
              />
            </View>
          </View>
        </View>

        {/* Account Section */}
        <View className="mb-6">
          <Text className="text-muted-foreground font-bold text-xs uppercase tracking-widest mb-2 ml-1">
            Account
          </Text>
          <View className="bg-card rounded-2xl overflow-hidden border border-border/50">
            <TouchableOpacity
              onPress={logout}
              className="flex-row items-center gap-3 p-4 active:bg-destructive/10"
            >
              <View className="w-8 h-8 rounded-full bg-destructive/10 items-center justify-center">
                <LogOut size={18} color={colors.destructive} />
              </View>
              <Text className="font-semibold text-lg text-destructive">
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="items-center mt-8">
          <Text className="text-muted-foreground text-xs">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}