import { Text } from "@/components/nativewindui/Text";
import { LEADERBOARD_DATA, LEADERBOARD_CONFIG } from "@/constants/mockData";
import { useColorScheme } from "@/lib/useColorScheme";
import React from "react";
import { FlatList, View, Image as RNImage } from "react-native";

export default function LeaderboardScreen() {
  const { colors } = useColorScheme();

  const topThree = LEADERBOARD_DATA.slice(0, 3);
  const restOfList = LEADERBOARD_DATA.slice(3);

  // Helper to get rank styling
  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          color: colors.gold,
          scale: "scale-110", // 1st place is bigger
          zIndex: "z-20",
        };
      case 2:
        return {
          color: colors.silver,
          scale: "scale-100",
          zIndex: "z-10",
        };
      case 3:
        return {
          color: colors.bronze,
          scale: "scale-100",
          zIndex: "z-10",
        };
      default:
        return {
          color: colors.border,
          scale: "scale-100",
          zIndex: "z-0",
        };
    }
  };

  const renderPodiumItem = (item: typeof LEADERBOARD_DATA[0], rank: number) => {
    const styles = getRankStyle(rank);
    // Adjust layout for podium positions
    const avatarSize = rank === 1 ? "w-32 h-32" : "w-24 h-24";

        return (
          <View className={`items-center w-1/3 flex-col`}>
            <View className={`relative ${avatarSize}`}>
               {/* Avatar Container */}
              <View
                className={`w-full h-full rounded-full border-4 p-1 bg-card relative z-10`}
                style={{ borderColor: styles.color, shadowColor: styles.color, shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 }}
              >
                <RNImage
                  source={typeof item.avatar === 'string' ? { uri: item.avatar } : item.avatar}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              </View>
              
              {/* Rank Badge */}
              <View 
                className="absolute -bottom-3 self-center px-3 py-1 rounded-2xl border-2 border-card z-20"
                style={{ backgroundColor: styles.color }}
              >
                 <Text className="text-white text-xs font-extrabold">#{rank}</Text>
              </View>
            </View>
        <View className="mt-4 items-center">
          <Text
            className="font-bold text-sm text-foreground text-center"
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text className="font-extrabold text-xs" style={{ color: styles.color }}>
            {item.xp} XP
          </Text>
        </View>
      </View>
    );
  };

  const renderListItem = ({ item, index }: { item: typeof LEADERBOARD_DATA[0]; index: number }) => {
    const rank = index + 4; // Since we sliced the first 3

    return (
      <View className="flex-row items-center gap-4 bg-card p-4 mx-4 mb-3 rounded-2xl border-2 border-border/50">
        <Text className="text-muted-foreground font-bold w-6 text-center text-sm">
          {rank}
        </Text>
        <RNImage
          source={typeof item.avatar === 'string' ? { uri: item.avatar } : item.avatar}
          className="w-12 h-12 rounded-full bg-muted"
          resizeMode="cover"
        />
        <View className="flex-1 min-w-0">
          <Text className={`font-bold text-base truncate ${item.isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
            {item.name}
          </Text>
        </View>
        <View className="shrink-0 text-right">
          <Text className="text-muted-foreground font-bold text-sm">
            {item.xp} XP
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-background pt-safe">
      <FlatList
        data={restOfList}
        keyExtractor={(item) => item.id}
        renderItem={renderListItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
            <View className="pt-20 pb-8 px-4 relative mb-2">
                {/* Group Title */}
                <View className="items-center mb-14">
                    <Text className="text-3xl font-black tracking-tight text-center text-foreground">
                        {LEADERBOARD_CONFIG.title}
                    </Text>
                </View>

                {/* Podium Layout: 2 - 1 - 3 */}
                <View className="flex-row items-end justify-center">
                    {/* Rank 2 (Left) */}
                    {topThree[1] && renderPodiumItem(topThree[1], 2)}
                    
                    {/* Rank 1 (Center) */}
                    {topThree[0] && renderPodiumItem(topThree[0], 1)}

                    {/* Rank 3 (Right) */}
                    {topThree[2] && renderPodiumItem(topThree[2], 3)}
                </View>
            </View>
        )}
      />
    </View>
  );
}