import { Button } from "@/components";
import { spacing, typography } from "@/constants/theme";
import { useThemeColor } from "@/hooks";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen() {
  const { colors } = useThemeColor();

  const handleGetStarted = () => {
    // Navigate to tabs (home)
    router.replace("/(tabs)");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Logo/Icon */}
        <View style={styles.iconContainer}>
          <Image
            source={require("@/assets/images/nerdz-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome to <Text style={styles.titleBold}>Nerdz</Text>
        </Text>
      </View>

      {/* CTA Button */}
      <View style={styles.footer}>
        <Button
          title="I'm Ready."
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleGetStarted}
        />
        
        <Text style={[styles.termsText, { color: colors.text }]}>
          By continuing, you agree to our{" "}
          <Text style={styles.termsLink}>Terms of Service</Text>
          {" "}and{" "}
          <Text style={styles.termsLink}>Privacy Policy</Text>
          .
        </Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing["3xl"],
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: typography.fontSizes["4xl"],
    fontWeight: typography.fontWeights.regular,
    textAlign: "center",
    marginTop: -spacing["3xl"],
    marginBottom: spacing["4xl"],
  },
  titleBold: {
    fontWeight: typography.fontWeights.bold,
    color: "#38ACE2",
  },
  features: {
    width: "100%",
    gap: spacing.lg,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  featureIcon: {
    fontSize: 32,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontSize: typography.fontSizes.base,
    color: "#6B7280",
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing["2xl"],
  },
  termsText: {
    fontSize: typography.fontSizes.sm,
    textAlign: "center",
    marginTop: spacing.md,
    lineHeight: 20,
  },
  termsLink: {
    color: "#38ACE2",
    fontWeight: typography.fontWeights.medium,
  },
});
