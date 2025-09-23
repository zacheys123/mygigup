import React, { useCallback, useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useSSO, useSignIn } from "@clerk/clerk-expo";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Platform,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function SignInPage() {
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO();
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const onGooglePress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }
            router.push("/(tabs)/home");
          },
        });
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", "Failed to sign in with Google");
    }
  }, []);

  const onEmailSignIn = async () => {
    if (!isLoaded) return;

    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/(tabs)/home");
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Sign in failed. Please check your credentials.");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert(
        "Error",
        err.errors?.[0]?.message || "Failed to sign in. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleEmailForm = () => {
    setShowEmailForm(!showEmailForm);
    setEmail("");
    setPassword("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Header */}
            <View style={styles.header}>
              <Ionicons name="musical-notes" size={48} color="white" />
              <Text style={styles.title}>GigUp</Text>
              <Text style={styles.subtitle}>
                {showEmailForm ? "Sign in with email" : "Welcome back"}
              </Text>
            </View>

            {/* Content */}
            <View style={styles.content}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>
                  {showEmailForm
                    ? "Enter your credentials"
                    : "Sign in to continue"}
                </Text>
                <Text style={styles.cardSubtitle}>
                  {showEmailForm
                    ? "Enter your email and password to access your account"
                    : "Access your account to book musicians or find gigs"}
                </Text>

                {showEmailForm ? (
                  /* Email/Password Form */
                  <View style={styles.emailForm}>
                    <View style={styles.inputContainer}>
                      <Ionicons
                        name="mail-outline"
                        size={20}
                        color="#6b7280"
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Email address"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholderTextColor="#9ca3af"
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#6b7280"
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholderTextColor="#9ca3af"
                      />
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.emailButton,
                        isLoading && styles.disabledButton,
                      ]}
                      onPress={onEmailSignIn}
                      disabled={isLoading}
                      activeOpacity={0.8}
                    >
                      {isLoading ? (
                        <ActivityIndicator size="small" color="white" />
                      ) : (
                        <Text style={styles.emailButtonText}>Sign In</Text>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={toggleEmailForm}
                      style={styles.backButton}
                    >
                      <Ionicons name="arrow-back" size={16} color="#667eea" />
                      <Text style={styles.backButtonText}>
                        Back to other options
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  /* OAuth Options */
                  <>
                    {/* Google Sign In Button */}
                    <TouchableOpacity
                      style={styles.googleButton}
                      onPress={onGooglePress}
                      activeOpacity={0.8}
                    >
                      <Image
                        source={{
                          uri: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
                        }}
                        style={styles.googleIcon}
                      />
                      <Text style={styles.googleButtonText}>
                        Continue with Google
                      </Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={styles.divider}>
                      <View style={styles.dividerLine} />
                      <Text style={styles.dividerText}>or</Text>
                      <View style={styles.dividerLine} />
                    </View>

                    {/* Email Sign In Button */}
                    <TouchableOpacity
                      style={styles.emailOptionButton}
                      onPress={toggleEmailForm}
                      activeOpacity={0.8}
                    >
                      <Ionicons
                        name="mail"
                        size={20}
                        color="#667eea"
                        style={styles.emailIcon}
                      />
                      <Text style={styles.emailOptionButtonText}>
                        Sign in with Email
                      </Text>
                    </TouchableOpacity>
                  </>
                )}

                {/* Alternative Options */}
                <View style={styles.alternativeOptions}>
                  <Text style={styles.alternativeText}>
                    Don&apos;t have an account?
                    <Text
                      style={styles.linkText}
                      onPress={() => router.push("/(auth)/sign-up")}
                    >
                      {" "}
                      Sign up
                    </Text>
                  </Text>
                </View>
              </View>

              {/* Footer */}
              <Text style={styles.footerText}>
                By continuing, you agree to our Terms of Service and Privacy
                Policy
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "white",
    marginTop: 12,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 8,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  // Email Form Styles
  emailForm: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#1f2937",
    height: "100%",
  },
  emailButton: {
    backgroundColor: "#667eea",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    height: 56,
  },
  disabledButton: {
    opacity: 0.6,
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  backButtonText: {
    color: "#667eea",
    fontWeight: "600",
    marginLeft: 8,
  },
  // OAuth Styles
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 56,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  emailOptionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f4ff",
    borderWidth: 1,
    borderColor: "#dbeafe",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    height: 56,
  },
  emailIcon: {
    marginRight: 12,
  },
  emailOptionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#667eea",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#6b7280",
    fontWeight: "500",
  },
  alternativeOptions: {
    alignItems: "center",
    marginTop: 8,
  },
  alternativeText: {
    color: "#6b7280",
    fontSize: 14,
  },
  linkText: {
    color: "#667eea",
    fontWeight: "600",
  },
  footerText: {
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    fontSize: 12,
    marginTop: 24,
    paddingHorizontal: 20,
  },
});
