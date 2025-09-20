import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createWelcomeStyles } from "@/assets/styles/auth.styles";
import { useTheme } from "@/hooks/useTheme";

export default function WelcomeScreen() {
  const { user, isLoaded } = useUser();
  const { colors } = useTheme();

  const styles = createWelcomeStyles(colors);
  // Redirect to tabs if user is signed in
  if (isLoaded && user) {
    return <Redirect href="/(dashboard)/home" />;
  }

  // Show loading state while checking auth
  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="musical-notes" size={48} color="#3b82f6" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Ionicons name="musical-notes" size={48} color="#3b82f6" />
        <Text style={styles.logoText}>Gigup</Text>
        <Text style={styles.tagline}>Book Musicians. Find Gigs.</Text>
      </View>

      {/* Auth Buttons */}
      <View style={styles.authContainer}>
        <Link href="/(auth)/sign-up" asChild>
          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>Create Account</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(auth)/sign-in" asChild>
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

// import { useUser } from "@clerk/clerk-expo";
// import { Link, Redirect } from "expo-router";
// import {
//   Text,
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   ImageBackground,
//   Dimensions,
//   SafeAreaView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";

// const { width, height } = Dimensions.get("window");

// export default function WelcomeScreen() {
//   const { user, isLoaded } = useUser();

//   // Redirect to tabs if user is signed in
//   if (isLoaded && user?.firstName) {
//     return <Redirect href="/(tabs)/home" />;
//   }

//   // Show loading state while checking auth
//   if (!isLoaded) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Ionicons name="musical-notes" size={48} color="#6366f1" />
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ImageBackground
//         source={{
//           uri: "https://res.cloudinary.com/dsziq73cb/image/upload/v1743295568/gigmeUpload/usrxmv9axlfxumfdnirh.jpg",
//         }}
//         style={styles.backgroundImage}
//         blurRadius={3}
//       >
//         <LinearGradient
//           colors={["rgba(15, 23, 42, 0.9)", "rgba(30, 41, 59, 0.95)"]}
//           style={styles.gradientOverlay}
//         >
//           <View style={styles.content}>
//             {/* Logo Section */}
//             <View style={styles.logoContainer}>
//               <View style={styles.iconCircle}>
//                 <Ionicons name="musical-notes" size={42} color="#818cf8" />
//               </View>
//               <Text style={styles.logoText}>Gigup</Text>
//               <Text style={styles.tagline}>
//                 Connect with musicians worldwide
//               </Text>

//               {/* Feature highlights */}
//               <View style={styles.featuresContainer}>
//                 <View style={styles.featureItem}>
//                   <Ionicons name="checkmark-circle" size={20} color="#4ade80" />
//                   <Text style={styles.featureText}>Find perfect gigs</Text>
//                 </View>
//                 <View style={styles.featureItem}>
//                   <Ionicons name="checkmark-circle" size={20} color="#4ade80" />
//                   <Text style={styles.featureText}>Book talented artists</Text>
//                 </View>
//                 <View style={styles.featureItem}>
//                   <Ionicons name="checkmark-circle" size={20} color="#4ade80" />
//                   <Text style={styles.featureText}>Manage bookings easily</Text>
//                 </View>
//               </View>
//             </View>

//             {/* Auth Buttons Section */}
//             <View style={styles.authContainer}>
//               <Link href="/(auth)/sign-up" asChild>
//                 <TouchableOpacity style={styles.signUpButton}>
//                   <Text style={styles.signUpButtonText}>Get Started</Text>
//                 </TouchableOpacity>
//               </Link>

//               <Link href="/(auth)/sign-in" asChild>
//                 <TouchableOpacity style={styles.signInButton}>
//                   <Text style={styles.signInButtonText}>
//                     Already have an account?
//                     <Text style={styles.signInLinkText}>Sign In</Text>
//                   </Text>
//                 </TouchableOpacity>
//               </Link>

//               <Text style={styles.termsText}>
//                 By continuing, you agree to our Terms of Service and Privacy
//                 Policy
//               </Text>
//             </View>
//           </View>
//         </LinearGradient>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0f172a",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#0f172a",
//   },
//   loadingText: {
//     marginTop: 16,
//     color: "#cbd5e1",
//     fontSize: 16,
//   },
//   backgroundImage: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//   },
//   gradientOverlay: {
//     flex: 1,
//     padding: 24,
//     justifyContent: "space-between",
//   },
//   content: {
//     flex: 1,
//     justifyContent: "space-around",
//   },
//   logoContainer: {
//     alignItems: "center",
//     marginTop: height * 0.1,
//   },
//   iconCircle: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: "rgba(99, 102, 241, 0.2)",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: "rgba(99, 102, 241, 0.3)",
//   },
//   logoText: {
//     fontSize: 42,
//     fontWeight: "800",
//     color: "#f1f5f9",
//     marginBottom: 8,
//     letterSpacing: 1.5,
//   },
//   tagline: {
//     fontSize: 18,
//     color: "#94a3b8",
//     textAlign: "center",
//     marginBottom: 40,
//   },
//   featuresContainer: {
//     marginTop: 20,
//     gap: 16,
//     width: "100%",
//     maxWidth: 300,
//   },
//   featureItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     backgroundColor: "rgba(30, 41, 59, 0.6)",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.05)",
//   },
//   featureText: {
//     color: "#e2e8f0",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   authContainer: {
//     marginBottom: 40,
//   },
//   signUpButton: {
//     backgroundColor: "#6366f1",
//     paddingVertical: 18,
//     borderRadius: 14,
//     alignItems: "center",
//     marginBottom: 16,
//     shadowColor: "#6366f1",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.4,
//     shadowRadius: 10,
//     elevation: 8,
//   },
//   signUpButtonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//     letterSpacing: 0.5,
//   },
//   signInButton: {
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.1)",
//     paddingVertical: 18,
//     borderRadius: 14,
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.03)",
//   },
//   signInButtonText: {
//     color: "#cbd5e1",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   signInLinkText: {
//     color: "#818cf8",
//     fontWeight: "600",
//   },
//   termsText: {
//     color: "#64748b",
//     fontSize: 12,
//     textAlign: "center",
//     marginTop: 24,
//     lineHeight: 18,
//   },
// });
