// app/(auth)/sign-up.tsx
import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [resendLoading, setResendLoading] = React.useState(false);

  // Ref for focusing on the OTP input
  const otpInputRef = React.useRef<TextInput>(null);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      Alert.alert("Success", "Verification code sent to your email");
    } catch (err: any) {
      console.error("Sign up error:", JSON.stringify(err, null, 2));
      Alert.alert(
        "Error",
        err.errors?.[0]?.longMessage ||
          err.errors?.[0]?.message ||
          "Something went wrong during sign up"
      );
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // Use signUp.id which is the temporary user ID during sign-up
      const clerkUserId = signUp.id;

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });

        router.push({
          pathname: "/(auth)/complete-signup",
          params: {
            email: emailAddress,
            clerkId: clerkUserId,
          },
        });
      } else if (signUpAttempt.status === "missing_requirements") {
        router.push({
          pathname: "/(auth)/complete-signup",
          params: {
            email: emailAddress,
            clerkId: clerkUserId,
          },
        });
      } else {
        Alert.alert("Info", "Please complete the verification process.");
      }
    } catch (err: any) {
      console.error("Verification error:", JSON.stringify(err, null, 2));
      if (err.errors?.[0]?.code === "form_code_incorrect") {
        Alert.alert("Invalid Code", "The verification code is incorrect.");
      } else {
        Alert.alert("Error", err.errors?.[0]?.message || "Verification failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    if (!isLoaded) return;

    setResendLoading(true);
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      Alert.alert(
        "New Code Sent",
        "A new verification code has been sent to your email."
      );
    } catch (err: any) {
      console.error("Resend error:", JSON.stringify(err, null, 2));
      Alert.alert(
        "Error",
        err.errors?.[0]?.message || "Failed to resend verification code"
      );
    } finally {
      setResendLoading(false);
    }
  };

  const restartSignUp = () => {
    setPendingVerification(false);
    setCode("");
    setEmailAddress("");
    setPassword("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle OTP input change
  const handleCodeChange = (text: string) => {
    // Only allow numbers and limit to 6 characters
    const numericText = text.replace(/[^0-9]/g, "");
    if (numericText.length <= 6) {
      setCode(numericText);
    }
  };

  // Render OTP input boxes
  const renderOtpBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 6; i++) {
      boxes.push(
        <View
          key={i}
          style={[
            styles.otpBox,
            code.length === i ? styles.otpBoxActive : {},
            code[i] ? styles.otpBoxFilled : {},
          ]}
        >
          <Text style={styles.otpText}>{code[i] || ""}</Text>
        </View>
      );
    }
    return boxes;
  };

  if (pendingVerification) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          style={styles.background}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoid}
          >
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <View style={styles.header}>
                <Ionicons name="mail-open" size={48} color="white" />
                <Text style={styles.title}>Verify Email</Text>
                <Text style={styles.subtitle}>
                  Enter the 6-digit code sent to{"\n"}
                  <Text style={styles.emailText}>{emailAddress}</Text>
                </Text>
                <Text style={styles.noteText}>
                  Check your spam folder if you don't see the email
                </Text>
              </View>

              <View style={styles.card}>
                {/* Hidden text input for actual input handling */}
                <TextInput
                  ref={otpInputRef}
                  style={styles.hiddenInput}
                  value={code}
                  onChangeText={handleCodeChange}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  maxLength={6}
                  autoFocus={true}
                />

                {/* OTP Boxes UI */}
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => otpInputRef.current?.focus()}
                  style={styles.otpContainer}
                >
                  {renderOtpBoxes()}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.button,
                    (loading || code.length !== 6) && styles.buttonDisabled,
                  ]}
                  onPress={onVerifyPress}
                  disabled={loading || code.length !== 6}
                >
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.buttonText}>Verify Email</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.resendButton}
                  onPress={resendCode}
                  disabled={resendLoading}
                >
                  {resendLoading ? (
                    <ActivityIndicator color="#667eea" />
                  ) : (
                    <Text style={styles.resendText}>
                      Didn't receive code?
                      <Text style={styles.resendLink}>Resend</Text>
                    </Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={restartSignUp}
                  style={styles.backButton}
                >
                  <Ionicons name="arrow-back" size={16} color="#667eea" />
                  <Text style={styles.backText}>Use different email</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.background}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoid}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <Ionicons name="musical-notes" size={48} color="white" />
              <Text style={styles.title}>Join Gigup</Text>
              <Text style={styles.subtitle}>
                Create your account to get started
              </Text>
            </View>

            <View style={styles.card}>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail"
                  size={20}
                  color="#667eea"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={emailAddress}
                  placeholder="Email address"
                  placeholderTextColor="#9ca3af"
                  onChangeText={setEmailAddress}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed"
                  size={20}
                  color="#667eea"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={password}
                  placeholder="Password"
                  placeholderTextColor="#9ca3af"
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#667eea"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.button,
                  (loading || !emailAddress || !password) &&
                    styles.buttonDisabled,
                ]}
                onPress={onSignUpPress}
                disabled={loading || !emailAddress || !password}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Create Account</Text>
                )}
              </TouchableOpacity>

              <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Already have an account? </Text>
                <Link href="/(auth)/sign-in" asChild>
                  <TouchableOpacity>
                    <Text style={styles.signInLink}>Sign in</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>

            <Text style={styles.termsText}>
              By creating an account, you agree to our Terms of Service and
              Privacy Policy
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  keyboardAvoid: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: "center", padding: 24 },
  header: { alignItems: "center", marginBottom: 40 },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "white",
    marginTop: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 22,
  },
  emailText: { fontWeight: "600", color: "white" },
  noteText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  inputIcon: { padding: 16 },
  input: { flex: 1, padding: 16, fontSize: 16, color: "#1f2937" },
  eyeIcon: { padding: 16 },
  button: {
    backgroundColor: "#667eea",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  buttonDisabled: { backgroundColor: "#9ca3af", opacity: 0.7 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
  resendButton: { alignItems: "center", marginBottom: 16 },
  resendText: { color: "#6b7280", fontSize: 14 },
  resendLink: { color: "#667eea", fontWeight: "600" },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  backText: { color: "#667eea", fontWeight: "600" },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  signInText: { color: "#6b7280", fontSize: 14 },
  signInLink: { color: "#667eea", fontWeight: "600", fontSize: 14 },
  termsText: {
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    fontSize: 12,
    marginTop: 24,
    paddingHorizontal: 20,
  },
  // OTP-specific styles
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  otpBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    padding: 3,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
  },
  otpBoxActive: {
    borderColor: "#667eea",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  otpBoxFilled: {
    borderColor: "#667eea",
    backgroundColor: "#f0f4ff",
  },
  otpText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
  },
});
