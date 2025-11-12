import { spacing, typography } from "@/constants/theme";
import { useThemeColor } from "@/hooks";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function StartScreen() {
  const { colors } = useThemeColor();

  const handleCreateGroup = () => {
    // TODO: Navigate to create group screen
    router.replace("/(tabs)");
  };

  const handleJoinCode = () => {
    // TODO: Navigate to join code screen
    console.log("Navigate to join code");
  };

  // const handleExploreGroups = () => {
    // TODO: Navigate to explore groups screen
    // For now, just navigate to tabs
   // router.replace("/(tabs)");
 // };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Get started
        </Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          We&apos;re happy you&apos;re here.
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.optionsWrapper}>
        <View style={[styles.optionsContainer, { backgroundColor: colors.card }]}>
          <Pressable
            onPress={handleCreateGroup}
          >
          <View style={styles.optionContent}>
            <View style={styles.iconCircle}>
              <Ionicons name="add" size={24} color={colors.text} />
            </View>
            <View style={styles.optionText}>
              <Text style={[styles.optionTitle, { color: colors.text }]}>
                Create a group
              </Text>
              <Text style={[styles.optionDescription, { color: colors.text}]}>
                Start something new and invite others to join.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text} />
          </View>
          </Pressable>

          <View style={[styles.separator, { backgroundColor: colors.separator }]} />

          <Pressable

            onPress={handleJoinCode}
          >
          <View style={styles.optionContent}>
            <View style={styles.iconCircle}>
              <Ionicons name="people" size={24} color={colors.text} />
            </View>
            <View style={styles.optionText}>
              <Text style={[styles.optionTitle, { color: colors.text }]}>
                Enter invite code
              </Text>
              <Text style={[styles.optionDescription, { color: colors.text }]}>
                Join a private group you&apos;ve been invited to.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text} />
          </View>
          </Pressable>

          {/*<View style={[styles.separator, { backgroundColor: colors.separator }]} />

          <Pressable
            onPress={handleExploreGroups}
          >

          
           POSSÍVEL IMPLEMENTAÇÃO FUTURA

          <View style={styles.optionContent}>
            <View style={styles.iconCircle}>
              <Ionicons name="globe" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.optionText}>
              <Text style={[styles.optionTitle, { color: "#FFFFFF" }]}>
                Explore community groups
              </Text>
              <Text style={[styles.optionDescription, { color: colors.text }]}>
                Discover and join groups created by the community.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A1A1A6" />
          </View>
          </Pressable>*/}
        </View>
      </View>
    </View>
  );
}const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing["5xl"],
  },
  header: {
    paddingBottom: spacing["4xl"],
    alignItems: "center",
  },
  title: {
    fontFamily: typography.fontFamily.system,
    fontSize: typography.fontSizes["3xl"],
    fontWeight: typography.fontWeights.bold,
    letterSpacing: typography.letterSpacing.tight,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: typography.fontFamily.system,
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.thin,
    letterSpacing: typography.letterSpacing.md,
  },
  imageContainer: {
    alignItems: "center",    
  },
  image: {
    width: 280,
    height: 280,
  },
  optionsWrapper: {
    paddingTop: spacing["2xl"],
    paddingHorizontal: spacing.sm,
  },
  optionsContainer: {
    borderRadius: 16,
    overflow: "hidden",
  },

  separator: {
    height: 1,
    marginHorizontal: spacing.lg,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    gap: spacing.md,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: typography.fontFamily.system,
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    letterSpacing: typography.letterSpacing.normal,
    marginBottom: spacing.xs,
  },
  optionDescription: {
    fontFamily: typography.fontFamily.system,
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.thin,
    lineHeight: 18,
    letterSpacing: typography.letterSpacing.md,
  },
});

