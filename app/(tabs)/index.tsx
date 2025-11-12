import { useThemeColor } from "@/hooks";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { colors } = useThemeColor();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Ainda não mexi aqui</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#8E8E93",
  },
});
