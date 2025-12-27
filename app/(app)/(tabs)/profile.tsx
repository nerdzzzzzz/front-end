import { Text } from "@/components/nativewindui/Text";
import { PROFILE_DATA } from "@/constants/mockData";
import { useColorScheme } from "@/lib/useColorScheme";
import {
  BookOpen,
  Calendar,
  ChevronUp,
  ChevronsUp,
  DraftingCompass,
  GraduationCap,
  Lock,
  Pencil,
  Settings,
  Terminal,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import React from "react";
import { Image as RNImage, ScrollView, TouchableOpacity, View } from "react-native";

// Map string icon names to Lucide components
const ICON_MAP: Record<string, any> = {
  DraftingCompass: DraftingCompass,
  GraduationCap: GraduationCap,
  Terminal: Terminal,
  ChevronUp: ChevronUp,
  ChevronsUp: ChevronsUp,
  BookOpen: BookOpen,
};

export default function ProfileScreen() {
  const { colors } = useColorScheme();
  const { user, achievements } = PROFILE_DATA;
  const router = useRouter();

  const handleSettingsPress = () => {
    router.push("/(app)/settings");
  };

  // Calculate progress percentage
  const progressPercentage = (user.currentXP / user.maxXP) * 100;

  return (
    <View className="flex-1 bg-background relative">
      {/* Top Bar */}
      <View className="absolute top-0 left-0 right-0 z-10 flex-row items-center justify-end px-4 py-3 pt-safe">
        <TouchableOpacity 
          onPress={handleSettingsPress}
          className="w-10 h-10 items-center justify-center rounded-xl bg-background/50 backdrop-blur-md"
        >
          <Settings size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View className="flex-col items-center pt-32 pb-6 px-4">
          <View className="relative mb-4">
            <View className="w-32 h-32 rounded-full border-4 border-dashed border-border p-1">
              <RNImage
                source={user.avatar}
                className="w-full h-full rounded-full"
                resizeMode="cover"
              />
            </View>
            <TouchableOpacity className="absolute bottom-0 right-0 bg-secondary p-2 rounded-xl border-4 border-background shadow-sm">
              <Pencil size={16} color="white" />
            </TouchableOpacity>
          </View>

          <Text variant="title1" className="font-extrabold tracking-tight mb-1">
            {user.name}
          </Text>
          <Text className="text-muted-foreground font-bold text-lg">
            {user.handle}
          </Text>

          <View className="mt-4 flex-row items-center gap-1">
            <Calendar size={20} color={colors.grey} />
            <Text className="text-muted-foreground font-bold text-sm">
              {user.joinedDate}
            </Text>
          </View>
        </View>

        {/* Stats & Progress */}
        <View className="px-4 space-y-6 gap-6">
          {/* Experience Bar */}
          <View className="w-full max-w-md mx-auto">
            <View className="flex-row justify-between items-end mb-2 px-1">
              <Text className="font-bold text-lg text-primary">Level {user.level}</Text>
              <Text className="font-bold text-sm text-muted-foreground">
                {user.currentXP} / {user.maxXP} XP
              </Text>
            </View>
            <View className="h-6 w-full bg-border rounded-full relative overflow-hidden">
              <View
                className="h-full bg-primary rounded-full overflow-hidden"
                style={{ width: `${progressPercentage}%` }}
              >
                <View className="absolute top-0 left-0 w-full h-2 bg-white/20" />
              </View>
            </View>
          </View>

          <View className="h-px bg-border w-full my-2" />

          {/* Achievements */}
          <View>
            <View className="flex-row justify-between items-center mb-4 px-1">
              <Text variant="title3" className="font-extrabold">
                Achievements
              </Text>
              <TouchableOpacity>
                <Text className="text-primary font-bold text-sm uppercase tracking-wide">
                  View all
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row flex-wrap gap-3">
              {achievements.map((achievement) => {
                 const IconComponent = ICON_MAP[achievement.icon] || Pencil;
                 return (
                  <AchievementItem
                    key={achievement.id}
                    icon={IconComponent}
                    color={achievement.color}
                    title={achievement.title}
                    unlocked={achievement.unlocked}
                  />
                 );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function AchievementItem({
  icon: Icon,
  color,
  title,
  unlocked = false,
}: {
  icon: any;
  color: string;
  title: string;
  unlocked?: boolean;
}) {
  const { colors } = useColorScheme();

  const colorMap: Record<string, string> = {
    red: "bg-destructive",
    blue: "bg-info",
    yellow: "bg-warning",
    violet: "bg-violet",
    black: "bg-black",
  };

  const bgClass = unlocked ? (colorMap[color] ?? "bg-border") : "bg-border";
  const iconColor = unlocked ? "white" : colors.grey;

  return (
    <View
      className={`flex-col items-center gap-2 mb-4 w-[31%] ${
        !unlocked ? "opacity-60" : ""
      }`}
    >
      <View
        className={`w-20 h-20 rounded-full ${bgClass} items-center justify-center ${
          unlocked ? "shadow-sm" : ""
        }`}
      >
        <Icon size={40} color={iconColor} />
        {!unlocked && (
          <View className="absolute bottom-0 right-0 bg-gray-400 rounded-full p-1 border-2 border-background">
            <Lock size={12} color="white" />
          </View>
        )}
      </View>
      <View className="items-center">
        <Text className="font-bold text-sm text-foreground text-center leading-tight">
          {title}
        </Text>
      </View>
    </View>
  );
}