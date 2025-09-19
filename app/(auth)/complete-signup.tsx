// app/(auth)/complete-profile.tsx
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
import { useAuth, useSignUp, useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function CompleteProfileScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const router = useRouter();
  const { email, clerkId } = useLocalSearchParams();
  const userEmail = typeof email === "string" ? email : "";

  const createUser = useMutation(api.controllers.user.createUser);

  const [username, setUsername] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const userClerkId = typeof clerkId === "string" ? clerkId : "";
  console.log(userClerkId);
  const completeProfile = async () => {
    if (!isLoaded || !signUp) return;

    setLoading(true);
    try {
      // Update Clerk profile with the form data
      await signUp.update({
        username: username.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      if (userClerkId) {
        // Create user in Convex using the data from params and form
        const result = await createUser({
          clerkId: userClerkId,
          email: userEmail,
          username: username.trim() || `user_${userClerkId.slice(0, 8)}`,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          picture: "", // You can add profile picture later
          onboardingComplete: false,
        });

        if (result.success) {
          console.log("User created in Convex:", result.userId);

          // Finalize the sign-up process
          if (signUp.status === "complete") {
            await setActive({ session: signUp.createdSessionId });
            router.push("/(dashboard)");
          }
        }
      } else {
        console.log("No user Id", userClerkId);
      }
    } catch (err: any) {
      console.error("Profile completion error:", err);
      Alert.alert(
        "Error",
        err.errors?.[0]?.message || "Failed to complete profile"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.background}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoid}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <Ionicons name="person" size={48} color="white" />
              <Text style={styles.title}>Complete Profile</Text>
              <Text style={styles.subtitle}>
                Almost done! Please provide some additional information
              </Text>
            </View>

            <View style={styles.card}>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="at"
                  size={20}
                  color="#667eea"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={username}
                  placeholder="Username"
                  placeholderTextColor="#9ca3af"
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoComplete="username"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="person"
                  size={20}
                  color="#667eea"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={firstName}
                  placeholder="First Name"
                  placeholderTextColor="#9ca3af"
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                  autoComplete="name-given"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="person"
                  size={20}
                  color="#667eea"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={lastName}
                  placeholder="Last Name"
                  placeholderTextColor="#9ca3af"
                  onChangeText={setLastName}
                  autoCapitalize="words"
                  autoComplete="name-family"
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.button,
                  (loading || !username || !firstName || !lastName) &&
                    styles.buttonDisabled,
                ]}
                onPress={completeProfile}
                disabled={loading || !username || !firstName || !lastName}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Complete Profile</Text>
                )}
              </TouchableOpacity>
            </View>
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
  button: {
    backgroundColor: "#667eea",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: { backgroundColor: "#9ca3af", opacity: 0.7 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
});
