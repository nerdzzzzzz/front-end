import { Text } from "@/components/nativewindui/Text";
import { useColorScheme } from "@/lib/useColorScheme";
import { SquareStar } from "@/components/icons/SquareStar";
import { Image } from "expo-image";
import { FlatList, View } from "react-native";
import { LEADERBOARD_DATA } from "@/constants/mockData"; // Import mock data

export default function LeaderboardScreen() {
  const { colors } = useColorScheme();

  const renderItem = ({
    item,
    index,
  }: {
    item: (typeof LEADERBOARD_DATA)[0];
    index: number;
  }) => {
    const rank = index + 1;
    let rankColor = "text-foreground";
    let squareStarColor: string = colors.grey; // Default color for SquareStar

    // Top 3 Logic
    if (rank === 1) {
      rankColor = "text-yellow-500";
      squareStarColor = "#EAB308"; // Gold
    } else if (rank === 2) {
      rankColor = "text-gray-400";
      squareStarColor = "#9CA3AF"; // Silver
    } else if (rank === 3) {
      rankColor = "text-orange-500";
      squareStarColor = "#F97316"; // Bronze
    }

    return (
      <View
        className={`flex-row items-center p-4 mx-4 mb-3 rounded-2xl bg-card border ${
          item.isCurrentUser
            ? "border-primary bg-primary/5"
            : "border-transparent"
        }`}
      >
        {/* Rank Column */}
        <View className="w-10 items-center justify-center mr-4">
          {rank <= 3 ? ( // Use SquareStar for top 3
            <SquareStar size={24} color={squareStarColor}/>
          ) : (
            <Text variant="title3" className={`font-bold ${rankColor}`}>
              {rank}
            </Text>
          )}
        </View>

        {/* Avatar */}
        <Image
          source={{ uri: item.avatar }}
          style={{ width: 44, height: 44, borderRadius: 22 }}
          className="mr-4 bg-muted"
        />

        {/* Name */}
        <View className="flex-1 ml-4">
          <Text
            variant="body"
            className={`font-semibold ${item.isCurrentUser ? "text-primary font-bold" : ""}`}
          >
            {item.name}
          </Text>
        </View>

        {/* XP */}
        <View className="items-end">
          <Text variant="callout" className="font-bold text-foreground">
            {item.xp} XP
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-background pt-safe">
      {/* Header */}
      <View className="px-6 pt-12 pb-6 border-b border-border/50 mb-2">
        <View className="flex-row justify-center items-center mb-1">
          <Text variant="largeTitle" className="font-bold">
            Ranking do Grupo
          </Text>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={LEADERBOARD_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
