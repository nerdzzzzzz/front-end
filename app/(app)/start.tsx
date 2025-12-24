import { Button } from "@/components/nativewindui/Button";
import { Text } from "@/components/nativewindui/Text";
import { useAuth } from "@/context/AuthContext";
import { useColorScheme } from "@/lib/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";

export default function StartScreen() {
  const { colors } = useColorScheme();
  const { logout } = useAuth();

  const handleCreateGroup = () => {
    // TODO: Navigate to create group screen
    router.replace("/(app)/(tabs)/chat");
        console.log("Navigate to join code");
  };

  const handleJoinCode = () => {
    // TODO: Navigate to join code screen
    console.log("Navigate to join code");
  };

  return (
    <View className="flex-1 bg-background pt-24">
      {/* Logout Button */}
      <View className="absolute right-4 top-10 z-10">
        <Button variant="plain" onPress={logout} className="p-2">
            <Ionicons name="log-out-outline" size={24} color={colors.destructive} />
        </Button>
      </View>

      <View className="items-center pb-20">
        <Text variant="largeTitle" className="mb-1 font-bold tracking-tight">
          Get started
        </Text>
        <Text variant="body" className="font-thin tracking-widest">
          We&apos;re happy you&apos;re here.
        </Text>
      </View>

      <View className="items-center">
        <Image
          source={require("@/assets/images/logo.png")}
          className="h-[280px] w-[280px]"
          resizeMode="contain"
        />
      </View>

      <View className="px-2 pt-12">
        <View className="overflow-hidden rounded-2xl bg-card">
          
          <Pressable 
            onPress={handleCreateGroup}
            className="flex-row items-center gap-4 p-6 active:bg-muted/10"
          >
              <View className="h-12 w-12 items-center justify-center rounded-full bg-transparent">
                <Ionicons name="add" size={24} color={colors.foreground} />
              </View>
              <View className="flex-1">
                <Text variant="title3" className="mb-1 font-bold">
                  Create a group
                </Text>
                <Text variant="body" className="font-thin leading-[18px] tracking-wide">
                  Start something new and invite others to join.
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.grey} />
          </Pressable>

          <View className="mx-6 h-px bg-border" />

          <Pressable 
            onPress={handleJoinCode}
            className="flex-row items-center gap-4 p-6 active:bg-muted/10"
          >
              <View className="h-12 w-12 items-center justify-center rounded-full bg-transparent">
                <Ionicons name="people" size={24} color={colors.foreground} />
              </View>
              <View className="flex-1">
                <Text variant="title3" className="mb-1 font-bold">
                  Enter invite code
                </Text>
                <Text variant="body" className="font-thin leading-[18px] tracking-wide">
                  Join a private group you&apos;ve been invited to.
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.grey} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
