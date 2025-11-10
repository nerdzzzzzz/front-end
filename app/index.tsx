import { Button } from "@/components";
import { colors, spacing, typography } from "@/constants/theme";
import { useThemeColor } from "@/hooks";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WelcomeScreen() {
  const { colors } = useThemeColor();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleGetStarted = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleLogin = () => {
    // TODO: Implement authentication
    setShowLoginModal(false);
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

      {/* Login Modal */}
      <Modal
        visible={showLoginModal}
        transparent
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleCloseModal}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.modalContent, { backgroundColor: colors.background }]}
          >
            <View style={styles.modalHeader}>
              <View style={styles.modalHandle} />
            </View>

            <View style={styles.modalBody}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Continue with...
              </Text>

              {/* Login buttons/options */}
              
              <View style={styles.loginOptions}>
                <Button
                  title="Apple"
                  variant="secondary"
                  fullWidth
                  onPress={handleLogin}
                  style={styles.loginButton}
                  icon={<Ionicons name="logo-apple" size={20} color={colors.text} />}
                />
                <Button
                  title="Google"
                  variant="secondary"
                  fullWidth
                  onPress={handleLogin}
                  style={styles.loginButton}
                  icon={<Ionicons name="logo-google" size={20} color={colors.text} />}
                />
                <Button
                  title="Email"
                  variant="secondary"
                  fullWidth
                  onPress={handleLogin}
                  style={styles.loginButton}
                  icon={<Ionicons name="mail-outline" size={20} color={colors.text} />}
                />
              </View>

              <Text style={styles.supportText}>
                Trouble signing in?{" "}
                <Text 
                  style={styles.supportLink}
                  onPress={() => {
                    // TODO: Open support contact (email or in-app support)
                  }}
                >
                  Contact support.
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
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
    fontSize: typography.fontSizes["3xl"],
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
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    paddingBottom: spacing.xl,
    maxHeight: "65%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    alignItems: "center",
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#323030ff",
    borderRadius: 2,
  },
  modalBody: {
    paddingHorizontal: spacing.lg,
  },
  modalTitle: {
    marginTop: spacing.md,
    fontSize: typography.fontSizes["3xl"],
    fontWeight: typography.fontWeights.bold,
    marginBottom: spacing.md,
  },
  modalSubtitle: {
    fontSize: typography.fontSizes.base,
    color: "#6B7280",
    marginBottom: spacing.xl,
  },
  loginOptions: {
    gap: spacing.md,
  },
  loginButton: {
    marginTop: 0,
  },
  supportText: {
    fontSize: typography.fontSizes.sm,
    color: "#6B7280",
    marginTop: spacing.lg,
  },
  supportLink: {
    color: colors.primary,
    fontWeight: typography.fontWeights.medium,
  },
});
