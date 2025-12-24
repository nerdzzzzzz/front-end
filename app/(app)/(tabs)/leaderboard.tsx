import { Text } from "@/components/nativewindui/Text";
import { View } from "react-native";

export default function LeaderboardScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text variant="largeTitle" className="font-bold mb-2">Aqui também não</Text>
      <Text variant="title3" className="text-muted-foreground">Sou foda dindindindin</Text>
    </View>
  );
}