
import { Text } from "@/components/nativewindui/Text";
import { useColorScheme } from "@/lib/useColorScheme";
import { ChevronRight, LogOut, Plus, Users } from "lucide-react-native";
import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";

export default function StartScreen() {
  const { colors } = useColorScheme();

  const handleCreateGroup = () => {
    // TODO: Navigate to create group screen
    router.replace("/(app)/(tabs)");
        console.log("Navigate to join code");
  };

  const handleJoinCode = () => {
    // TODO: Navigate to join code screen
    console.log("Navigate to join code");
  };

  return (
    <View className="flex-1 bg-background pt-24">

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
                <Plus size={24} color={colors.foreground} />
              </View>
              <View className="flex-1">
                <Text variant="title3" className="mb-1 font-bold">
                  Create a group
                </Text>
                <Text variant="body" className="font-thin leading-[18px] tracking-wide">
                  Start something new and invite others to join.
                </Text>
              </View>
              <ChevronRight size={20} color={colors.grey} />
          </Pressable>

          <View className="mx-6 h-px bg-border" />

          <Pressable 
            onPress={handleJoinCode}
            className="flex-row items-center gap-4 p-6 active:bg-muted/10"
          >
              <View className="h-12 w-12 items-center justify-center rounded-full bg-transparent">
                <Users size={24} color={colors.foreground} />
              </View>
              <View className="flex-1">
                <Text variant="title3" className="mb-1 font-bold">
                  Enter invite code
                </Text>
                <Text variant="body" className="font-thin leading-[18px] tracking-wide">
                  Join a private group you&apos;ve been invited to.
                </Text>
              </View>
              <ChevronRight size={20} color={colors.grey} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
