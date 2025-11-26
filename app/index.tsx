import { Button, Input } from "@/components";
import { colors as themeColors, spacing, typography } from "@/constants/theme";
import { useThemeColor } from "@/hooks";
import { useAuth } from "@/context/AuthContext";
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
  Alert,
  ActivityIndicator,
} from "react-native";

type AuthMode = 'options' | 'login' | 'signup';

export default function WelcomeScreen() {
  const { colors } = useThemeColor();
  const { signInWithGoogle, signInWithEmailPassword, signUpWithEmailPassword, resetPassword } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('options');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});

  const handleGetStarted = () => {
    setShowLoginModal(true);
    setAuthMode('options');
    resetForm();
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setAuthMode('options');
    resetForm();
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
    setIsLoading(false);
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (authMode === 'signup') {
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const success = await signInWithGoogle();
      if (success) {
        setShowLoginModal(false);
        router.replace("/start");
      }
    } catch {
      Alert.alert("Login Error", "Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const success = await signInWithEmailPassword(email, password);
      if (success) {
        setShowLoginModal(false);
        router.replace("/start");
      }
    } catch (error: any) {
      Alert.alert("Login Error", error.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const success = await signUpWithEmailPassword(email, password);
      if (success) {
        setShowLoginModal(false);
        router.replace("/start");
      }
    } catch (error: any) {
      Alert.alert("Sign Up Error", error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Email Required", "Please enter your email address first");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);
      await resetPassword(email);
      Alert.alert("Email Sent", "Check your email for password reset instructions");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = () => {
    // TODO: Implement Apple Sign In
    Alert.alert("Coming Soon", "Apple Sign In will be available soon");
  };

  const renderAuthOptions = () => (
    <>
      <Text style={[styles.modalTitle, { color: colors.text }]}>
        Continue with...
      </Text>

      <View style={styles.loginOptions}>
        <Button
          title="Apple"
          variant="secondary"
          fullWidth
          onPress={handleAppleLogin}
          disabled
          style={styles.loginButton}
          icon={<Ionicons name="logo-apple" size={20} color={colors.text} style={{ opacity: 0.5 }} />}
        />
        <Button
          title="Google"
          variant="secondary"
          fullWidth
          onPress={handleGoogleLogin}
          style={styles.loginButton}
          icon={<Ionicons name="logo-google" size={20} color={colors.text} />}
        />
        <Button
          title="Email"
          variant="secondary"
          fullWidth
          onPress={() => setAuthMode('login')}
          style={styles.loginButton}
          icon={<Ionicons name="mail-outline" size={20} color={colors.text} />}
        />
      </View>
    </>
  );

  const renderEmailForm = () => (
    <>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => setAuthMode('options')}
      >
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>

      <Text style={[styles.modalTitle, { color: colors.text }]}>
        {authMode === 'login' ? 'Sign In' : 'Create Account'}
      </Text>

      <View style={styles.formContainer}>
        <Input
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
          error={errors.email}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors({ ...errors, password: undefined });
          }}
          error={errors.password}
        />

        {authMode === 'signup' && (
          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
            }}
            error={errors.confirmPassword}
          />
        )}

        {authMode === 'login' && (
          <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
        )}

        <Button
          title={isLoading ? '' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
          variant="primary"
          fullWidth
          onPress={authMode === 'login' ? handleEmailLogin : handleEmailSignUp}
          disabled={isLoading}
          style={styles.submitButton}
          icon={isLoading ? <ActivityIndicator color="#FFFFFF" size="small" /> : undefined}
        />

        <TouchableOpacity 
          onPress={() => {
            setAuthMode(authMode === 'login' ? 'signup' : 'login');
            setErrors({});
          }}
          style={styles.switchMode}
        >
          <Text style={[styles.switchModeText, { color: colors.text }]}>
            {authMode === 'login' 
              ? "Don't have an account? " 
              : "Already have an account? "}
            <Text style={styles.switchModeLink}>
              {authMode === 'login' ? 'Sign Up' : 'Sign In'}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );

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
          onPress={authMode === 'options' ? handleCloseModal : undefined}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.modalContent, { backgroundColor: colors.background }]}
          >
            <View style={styles.modalHeader}>
              <View style={styles.modalHandle} />
            </View>

            <View style={styles.modalBody}>
              {authMode === 'options' ? renderAuthOptions() : renderEmailForm()}

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
    color: themeColors.primary,
    fontWeight: typography.fontWeights.medium,
  },
  backButton: {
    marginBottom: spacing.sm,
  },
  formContainer: {
    gap: spacing.md,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -spacing.xs,
  },
  forgotPasswordText: {
    color: themeColors.primary,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
  },
  submitButton: {
    marginTop: spacing.md,
  },
  switchMode: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  switchModeText: {
    fontSize: typography.fontSizes.sm,
  },
  switchModeLink: {
    color: themeColors.primary,
    fontWeight: typography.fontWeights.semibold,
  },
});
